# -*- coding: utf-8 -*-
"""
Maqueta urbana em três dimensões, a partir de `<zona>.scene.json`.

    blender -b --factory-startup --python scripts/blender/maqueta.py -- rua-do-brasil

Constrói a cena, guarda `<zona>.blend`, exporta `<zona>.glb` (com Draco) e
renderiza as vistas para `public/maquetas/`. Corre sem interface: o ficheiro
de entrada vem do `scripts/build-urban-model.mjs` e nada aqui é feito à mão.

PORQUE É QUE ISTO PARECE UMA MAQUETA E NÃO UMA FOTOGRAFIA

Uma renderização fotorrealista de um modelo cujo dado de partida tem metade
das alturas em falta seria uma mentira bem iluminada. Uma maqueta de cartão
não finge: é obviamente uma representação, lê-se à distância, e admite sem
esforço que uma parte do edificado esteja desenhada no chão em vez de
levantada. A paleta é a do site — papel, tinta e terracota.

AS TRÊS CLASSES, QUE SÃO O ASSUNTO

    medida        volume branco, com aresta desenhada
    tipo          volume baixo, tom de cartão
    desconhecida  SEM volume — mancha no chão, à cota do terreno

A terceira é a que importa. Quem olha vê onde é que o modelo sabe e onde é
que não sabe, sem ler uma legenda.
"""

import bpy
import json
import math
import os
import sys
from mathutils import Vector

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ZONA = ARGS[0] if ARGS else 'rua-do-brasil'
SO_MODELO = '--so-modelo' in ARGS
# Estampa de ensaio com a ortofoto no chão (ver scripts/build-orto.mjs).
# Não grava o .blend nem o .glb, e escreve ao lado deste ficheiro, fora de
# public/: é para comparar, não para o site.
ORTO = '--orto' in ARGS

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
SAIDA = os.path.join(RAIZ, '..', 'public', 'maquetas')
CENA = json.load(open(os.path.join(AQUI, ZONA + '.scene.json'), encoding='utf8'))

# ---------------------------------------------------------------- paleta ----
# Os mesmos valores de `app/globals.css`, convertidos de sRGB para linear:
# o Blender trabalha em linear, e passar o hexadecimal directamente daria
# cores lavadas.

def srgb(h):
    h = h.lstrip('#')
    canal = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in canal]
    return tuple(lin) + (1.0,)


PAPEL = srgb('F2EEE6')      # --bg-primary
TERRACOTA = srgb('B03A0B')  # --accent
TINTA = (0.09, 0.10, 0.12)  # --text-primary


def material(nome, cor, aspereza=0.85, especular=0.2):
    m = bpy.data.materials.new(nome)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = cor
    b.inputs['Roughness'].default_value = aspereza
    # O nome mudou em Blender 4.x; aceitar os dois evita prender a uma versão.
    for chave in ('Specular IOR Level', 'Specular'):
        if chave in b.inputs:
            b.inputs[chave].default_value = especular
            break
    return m


def malha(nome, verts, faces, mat):
    me = bpy.data.meshes.new(nome)
    me.from_pydata(verts, [], faces)
    me.validate(clean_customdata=False)
    me.update()
    ob = bpy.data.objects.new(nome, me)
    ob.data.materials.append(mat)
    bpy.context.collection.objects.link(ob)
    return ob


def area_assinada(pts):
    a = 0.0
    for i in range(len(pts)):
        j = (i + 1) % len(pts)
        a += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1]
    return a / 2


# ----------------------------------------------------------------- cena -----
bpy.ops.wm.read_factory_settings(use_empty=True)

M_MEDIDA = material('altura-medida', PAPEL, 0.62, 0.35)
M_TIPO = material('altura-por-tipo', srgb('CFC6B2'), 0.85)
M_DESCONHECIDA = material('altura-desconhecida', srgb('B4AB97'), 0.95)
M_TERRENO = material('terreno', srgb('D6CFBE'), 0.95)
M_BASE = material('base', srgb('BFB6A2'), 0.90)
M_VIA = material('via', TERRACOTA, 0.70, 0.30)

dem = CENA['dem']
NR, NC = dem['nRow'], dem['nCol']
GX0, GX1 = dem['x0'], dem['x1']
GY0, GY1 = dem['y0'], dem['y1']


def cota(x, y):
    """Altitude interpolada na grelha do EU-DEM."""
    fc = (x - GX0) / (GX1 - GX0) * (NC - 1)
    fr = (y - GY0) / (GY1 - GY0) * (NR - 1)
    c = max(0, min(NC - 2, int(math.floor(fc))))
    r = max(0, min(NR - 2, int(math.floor(fr))))
    tc = max(0.0, min(1.0, fc - c))
    tr = max(0.0, min(1.0, fr - r))
    g = lambda rr, cc: dem['elev'][rr * NC + cc]
    return (g(r, c) * (1 - tc) * (1 - tr) + g(r, c + 1) * tc * (1 - tr) +
            g(r + 1, c) * (1 - tc) * tr + g(r + 1, c + 1) * tc * tr)


# --- terreno, recortado à placa ---
placa = CENA['placa']
if 'x0' in placa:                  # placa ajustada ao edificado
    PX0, PX1, PY0, PY1 = placa['x0'], placa['x1'], placa['y0'], placa['y1']
else:                              # cenas antigas: simétrica em torno do centro
    PX0, PX1, PY0, PY1 = -placa['x'], placa['x'], -placa['y'], placa['y']
PASSO = float(placa.get('passo', 12.0))   # metros por quadrícula da malha do terreno
if placa.get('grelha'):
    # A grelha de altimetria cobre a placa nó a nó: os vértices do terreno
    # são os próprios nós, sem reamostrar (ver o gerador — reamostrar a outro
    # passo desenha moiré na encosta).
    NX, NY = NC - 1, NR - 1
else:
    NX = max(24, int((PX1 - PX0) / PASSO))
    NY = max(24, int((PY1 - PY0) / PASSO))
Z_BASE = min(dem['elev']) - 12.0   # face inferior do plinto

verts = []
for r in range(NY + 1):
    for c in range(NX + 1):
        x = PX0 + (PX1 - PX0) * c / NX
        y = PY0 + (PY1 - PY0) * r / NY
        verts.append((x, y, cota(x, y)))
faces = []
L = NX + 1
for r in range(NY):
    for c in range(NX):
        a = r * L + c
        faces.append((a, a + 1, a + L + 1, a + L))
terreno = malha('Terreno', verts, faces, M_TERRENO)
# Sombreamento suave no terreno. Com o LiDAR a malha apanha os muros de
# suporte e os socalcos da encosta, e cada um atravessa as quadrículas na
# oblíqua: com facetas planas, o degrau desenhava-se como uma fila de dentes.
# Interpolar as normais não mexe em cota nenhuma — só deixa de mostrar a
# triangulação. Os edifícios ficam com facetas: são prismas, e as arestas
# são o desenho.
for p in terreno.data.polygons:
    p.use_smooth = True

if ORTO:
    # A imagem cobre a placa exactamente (x0..x1, y0..y1), com o norte em
    # cima; as coordenadas UV são a posição do vértice na placa.
    img = bpy.data.images.load(os.path.join(AQUI, ZONA + '.orto.jpg'))
    m_orto = bpy.data.materials.new('ortofoto')
    m_orto.use_nodes = True
    nt = m_orto.node_tree
    bsdf = nt.nodes['Principled BSDF']
    tex = nt.nodes.new('ShaderNodeTexImage')
    tex.image = img
    nt.links.new(tex.outputs['Color'], bsdf.inputs['Base Color'])
    bsdf.inputs['Roughness'].default_value = 0.95
    terreno.data.materials[0] = m_orto
    uv = terreno.data.uv_layers.new(name='UV')
    for loop in terreno.data.loops:
        co = terreno.data.vertices[loop.vertex_index].co
        uv.data[loop.index].uv = ((co.x - PX0) / (PX1 - PX0), (co.y - PY0) / (PY1 - PY0))

# --- plinto: o modelo pousa numa placa, não flutua ---
bordo = ([c for c in range(L)] +
         [r * L + NX for r in range(1, NY + 1)] +
         [NY * L + c for c in range(NX - 1, -1, -1)] +
         [r * L for r in range(NY - 1, -1, -1)])
bv, bf = [], []
for i in bordo:
    x, y, z = verts[i]
    bv.append((x, y, z))
    bv.append((x, y, Z_BASE))
for k in range(len(bordo) - 1):
    o = 2 * k
    bf.append((o, o + 2, o + 3, o + 1))
bf.append(tuple(2 * k + 1 for k in range(len(bordo) - 1)))
malha('Base', bv, bf, M_BASE)

# --- edificado ---
grupos = {'medida': ([], []), 'tipo': ([], []), 'desconhecida': ([], [])}
for b in CENA['buildings']:
    p = b['p']
    if area_assinada(p) < 0:
        p = p[::-1]                # anti-horário: normais para cima
    n = len(p)
    V, F = grupos[b['c']]
    o = len(V)
    if b['c'] == 'desconhecida':
        # Sem altura publicada não há volume. Fica a implantação, pousada no
        # terreno: o modelo mostra o que sabe e cala o que não sabe.
        for (x, y) in p:
            V.append((x, y, cota(x, y) + 0.30))
        F.append(tuple(o + i for i in range(n)))
        continue
    z0 = b['z'] - 2.0              # enterrada, para não flutuar no declive
    z1 = b['z'] + b['h']
    for (x, y) in p:
        V.append((x, y, z0))
    for (x, y) in p:
        V.append((x, y, z1))
    for i in range(n):
        j = (i + 1) % n
        F.append((o + i, o + j, o + n + j, o + n + i))
    F.append(tuple(o + n + i for i in range(n)))

for classe, mat in (('medida', M_MEDIDA), ('tipo', M_TIPO), ('desconhecida', M_DESCONHECIDA)):
    V, F = grupos[classe]
    if V:
        malha('Edif_' + classe, V, F, mat)

# --- árvores ---
# Posição, altura e raio da copa vêm medidos (ortofoto + LiDAR, ver o
# gerador). A forma não: é uma bola de cartão achatada, do mesmo material
# mate dos edifícios, com um tronco fino para não flutuar. A copa não desce
# abaixo de 10% da altura, e nunca é mais alta do que 45% da árvore.
ARVORES = CENA.get('arvores', [])
if ARVORES:
    import bmesh
    M_ARVORE = material('arvore', srgb('A7B08F'), 0.9)
    M_TRONCO = material('tronco', srgb('8C8272'), 0.9)
    bm = bmesh.new()
    tv, tf = [], []
    for a in ARVORES:
        x, y = a['p']
        h, r, z0 = a['h'], a['r'], a['z']
        rv = min(r, h * 0.45)
        zc = z0 + h - rv
        geo = bmesh.ops.create_icosphere(bm, subdivisions=1, radius=1.0)
        for v in geo['verts']:
            v.co = Vector((x + v.co.x * r, y + v.co.y * r, zc + v.co.z * rv))
        # tronco: prisma quadrado de 0,5 m, do chão (enterrado 1 m) à copa
        o, m = len(tv), 0.25
        for zz in (z0 - 1.0, zc):
            tv += [(x - m, y - m, zz), (x + m, y - m, zz), (x + m, y + m, zz), (x - m, y + m, zz)]
        tf += [(o + i, o + (i + 1) % 4, o + 4 + (i + 1) % 4, o + 4 + i) for i in range(4)]
    me = bpy.data.meshes.new('Arvores')
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new('Arvores', me)
    ob.data.materials.append(M_ARVORE)
    bpy.context.collection.objects.link(ob)
    for p in me.polygons:
        p.use_smooth = True
    malha('Troncos', tv, tf, M_TRONCO)
    print('árvores: %d' % len(ARVORES))

# --- via ---
LARGURA = {'1': 4.0, '2': 7.0, '3': 10.0}
vv, vf = [], []
for w in CENA['eixo']:
    # Largura medida no OSM quando existe; senão, pela contagem de vias.
    meia = (w.get('largura') or LARGURA.get(str(w.get('lanes') or '2'), 7.0)) / 2
    pts = w['pts']
    for i in range(len(pts) - 1):
        ax, ay, az = pts[i]
        bx, by, bz = pts[i + 1]
        dx, dy = bx - ax, by - ay
        comp = math.hypot(dx, dy)
        if comp < 0.5:
            continue
        nx, ny = -dy / comp * meia, dx / comp * meia
        o = len(vv)
        vv += [(ax + nx, ay + ny, az + 0.25), (ax - nx, ay - ny, az + 0.25),
               (bx - nx, by - ny, bz + 0.25), (bx + nx, by + ny, bz + 0.25)]
        vf.append((o, o + 1, o + 2, o + 3))
if vv:
    malha('Via', vv, vf, M_VIA)

# Sem cópia .blend1 a cada gravação: o ficheiro é regenerável a partir do
# .scene.json, e um duplicado de meio megabyte no repositório não serve.
bpy.context.preferences.filepaths.save_version = 0
if not ORTO:
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(AQUI, ZONA + '.blend'))

tris = 0
for ob in bpy.data.objects:
    if ob.type == 'MESH':
        ob.data.calc_loop_triangles()
        tris += len(ob.data.loop_triangles)
print('maqueta: %d triângulos' % tris)

# glTF comprimido, servido à página para o 3D interactivo.
#
# `export_yup` porque o three.js tem o Y para cima e o Blender o Z; converter
# aqui poupa uma rotação em toda a cena do lado do cliente.
os.makedirs(SAIDA, exist_ok=True)
if not ORTO:
  bpy.ops.export_scene.gltf(
    filepath=os.path.join(SAIDA, ZONA + '.glb'), export_format='GLB', export_apply=True,
    export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6,
    export_yup=True)

if SO_MODELO:
    raise SystemExit(0)

# --------------------------------------------------------------- render -----
sc = bpy.context.scene

# O mundo ilumina, mas não se vê: o fotograma sai com canal alfa para a
# maqueta pousar directamente no papel da página. Um céu opaco desenharia um
# rectângulo cinzento no meio de um fundo cor de papel.
mundo = bpy.data.worlds.new('Ceu')
sc.world = mundo
mundo.use_nodes = True
fundo = mundo.node_tree.nodes['Background']
fundo.inputs[0].default_value = (0.86, 0.84, 0.79, 1.0)
fundo.inputs[1].default_value = 0.55
sc.render.film_transparent = True
sc.render.image_settings.color_mode = 'RGBA'

luz = bpy.data.lights.new('Sol', type='SUN')
luz.energy = 3.8
luz.angle = math.radians(1.2)
luz.color = (1.0, 0.955, 0.885)
sol = bpy.data.objects.new('Sol', luz)
sc.collection.objects.link(sol)
sol.rotation_euler = (math.radians(48), 0, math.radians(-128))

cam_dados = bpy.data.cameras.new('Camara')
cam = bpy.data.objects.new('Camara', cam_dados)
sc.collection.objects.link(cam)
sc.camera = cam
# O limite de corte por omissão são 100 m e a câmara fica a mais de 3 km.
cam_dados.clip_start, cam_dados.clip_end = 1.0, 20000.0

# Contorno. A frente de rua é uma fila de volumes brancos encostados; sem
# aresta desenhada fecham num bloco só. É também a linguagem gráfica do site.
sc.render.use_freestyle = True
camada = bpy.context.view_layer
camada.use_freestyle = True
fs = camada.freestyle_settings
fs.crease_angle = math.radians(134)
lineset = fs.linesets[0] if fs.linesets else fs.linesets.new('contorno')
lineset.select_silhouette = True
lineset.select_border = True
lineset.select_crease = True
# O terreno fica sem contorno, como no 3D da página: com o LiDAR, cada muro
# de suporte da encosta fazia um vinco, e o Freestyle desenhava-os como
# ziguezagues. As arestas do terreno são malha, não desenho; a placa (Base)
# continua a ter o seu contorno.
sem_linha = bpy.data.collections.new('SemContorno')
sc.collection.children.link(sem_linha)
ob_terreno = sc.objects.get('Terreno')
if ob_terreno:
    for col in list(ob_terreno.users_collection):
        col.objects.unlink(ob_terreno)
    sem_linha.objects.link(ob_terreno)
lineset.select_by_collection = True
lineset.collection = sem_linha
lineset.collection_negation = 'EXCLUSIVE'
estilo = lineset.linestyle or bpy.data.linestyles.new('contorno')
lineset.linestyle = estilo
estilo.color = TINTA
estilo.thickness = 1.5
estilo.alpha = 0.8


def pontos_do_edificado(passo=7):
    """Vértices do edificado e da via, em mundo.

    Não servem as caixas envolventes: os edifícios estão fundidos numa malha
    por classe, e oito cantos a ±1000 m não sabem enquadrar uma secção.
    """
    pts = []
    for ob in sc.objects:
        if ob.type != 'MESH' or ob.name in ('Terreno', 'Base'):
            continue
        M = ob.matrix_world
        vs = ob.data.vertices
        for i in range(0, len(vs), passo):
            pts.append(M @ vs[i].co)
    return pts


def enquadrar(alvo, azimute, elevacao, lente, pts, folga=1.04):
    """Recua a câmara na direcção dada até todos os `pts` caberem no fotograma."""
    cam_dados.lens = lente
    fov_h = 2 * math.atan(cam_dados.sensor_width / (2 * lente))
    proporcao = sc.render.resolution_x / sc.render.resolution_y
    th = math.tan(fov_h / 2)
    tv = th / proporcao
    a, e = math.radians(azimute), math.radians(elevacao)
    direccao = Vector((math.cos(a) * math.cos(e), math.sin(a) * math.cos(e), math.sin(e)))
    T = Vector(alvo)

    def excesso(dist):
        C = T + direccao * dist
        q = (T - C).to_track_quat('-Z', 'Y')
        R, U, F = q @ Vector((1, 0, 0)), q @ Vector((0, 1, 0)), q @ Vector((0, 0, -1))
        pior = 0.0
        for P in pts:
            v = P - C
            z = v.dot(F)
            if z <= 0.5:
                return 1e9
            pior = max(pior, abs(v.dot(R)) / (z * th), abs(v.dot(U)) / (z * tv))
        return pior

    lo, hi = 10.0, 40.0
    while excesso(hi) > 1.0 and hi < 60000:
        hi *= 1.6
    for _ in range(46):
        meio = (lo + hi) / 2
        if excesso(meio) > 1.0 / folga:
            lo = meio
        else:
            hi = meio
    C = T + direccao * hi
    cam.location = C
    cam.rotation_euler = (T - C).to_track_quat('-Z', 'Y').to_euler()
    return hi


# Por zona: nome -> (alvo (x, y), eixo do recorte, meia-largura do recorte —
# None = tudo, azimute, elevação, lente, resolução). O recorte é uma faixa ao
# longo do eixo em que a rua corre: x na Rua do Brasil, que vai de poente a
# nascente; y na Baixa, que vai da Portagem, a sul, ao fim da Sofia, a norte.
#
# O azimute diz de onde a câmara olha. A Baixa vê-se de poente, do lado do
# rio — é a vista de quem chega por Santa Clara, com a Alta a subir por trás.
VISTAS_POR_ZONA = {
    'rua-do-brasil': {
        'conjunto': ((0, 0), 'x', None, -104, 34, 55, (2000, 900)),
        'nascente': ((560, 0), 'x', 190, -46, 26, 55, (1600, 1000)),
        'centro': ((150, 0), 'x', 180, -104, 28, 55, (1600, 1000)),
        'poente': ((-600, 0), 'x', 200, -140, 24, 55, (1600, 1000)),
    },
    'baixa': {
        'conjunto': ((0, 0), 'y', None, 196, 34, 55, (2000, 900)),
        'sul': ((110, -300), 'y', 150, 205, 30, 55, (1600, 1000)),
        'centro': ((40, 0), 'y', 150, 190, 30, 55, (1600, 1000)),
        # A Sofia corre para noroeste; de 200° a câmara fica-lhe de frente.
        'norte': ((-100, 260), 'y', 170, 200, 32, 55, (1600, 1000)),
    },
}
VISTAS = VISTAS_POR_ZONA[ZONA]
SO_VISTAS = [a[len('--vista='):] for a in ARGS if a.startswith('--vista=')]

sc.render.engine = 'CYCLES'
sc.cycles.samples = 110
sc.cycles.use_denoising = True
sc.cycles.device = 'CPU'
sc.view_settings.view_transform = 'AgX'
# O nome do "look" mudou entre versões do Blender (5.1 já não tem
# "AgX - Medium Contrast"). Escolher da lista da versão em uso.
_looks = [i.identifier for i in sc.view_settings.bl_rna.properties['look'].enum_items]
for _preferido in ('AgX - Base Contrast', 'AgX - Medium Contrast', 'AgX - Medium High Contrast', 'None'):
    if _preferido in _looks:
        sc.view_settings.look = _preferido
        break

TODOS = pontos_do_edificado()
for nome, ((cx, cy), eixo, meia, azimute, elevacao, lente, res) in VISTAS.items():
    if SO_VISTAS and nome not in SO_VISTAS:
        continue
    sc.render.resolution_x, sc.render.resolution_y = res
    c_eixo = cx if eixo == 'x' else cy
    alvos = TODOS if meia is None else [
        p for p in TODOS if abs((p.x if eixo == 'x' else p.y) - c_eixo) <= meia]
    if not alvos:
        raise SystemExit('recorte vazio na vista %s' % nome)
    if meia is None:
        for nome_ob in ('Terreno', 'Base'):
            ob = sc.objects.get(nome_ob)
            if ob:
                alvos += [ob.matrix_world @ Vector(c) for c in ob.bound_box]
    zc = sum(p.z for p in alvos) / len(alvos)
    dist = enquadrar((cx, cy, zc), azimute, elevacao, lente, alvos)
    if ORTO:
        sc.render.filepath = os.path.join(AQUI, '%s-orto-%s.png' % (ZONA, nome))
    else:
        sc.render.filepath = os.path.join(SAIDA, '%s-%s.png' % (ZONA, nome))
    print('vista %s: %d pontos, câmara a %.0f m' % (nome, len(alvos), dist))
    bpy.ops.render.render(write_still=True)
