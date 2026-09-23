# -*- coding: utf-8 -*-
"""
Maqueta de um monumento, a partir de `<id>.scene.json`.

    blender -b --factory-startup --python scripts/blender/monumento.py -- paco-das-escolas

Constrói a cena, guarda `<id>.blend`, exporta `public/maquetas/<id>.glb`
(com Draco) e renderiza as vistas para `public/maquetas/`. O ficheiro de
entrada vem do `scripts/build-monumento.mjs` e nada aqui é feito à mão.

A MESMA LINGUAGEM DAS ZONAS URBANAS, UM GRAU MAIS PERTO

Maqueta de cartão com contorno desenhado, nunca fotorrealismo (ver o
`maqueta.py`). O que muda é o assunto: numa zona urbana todos os prédios
valem o mesmo; aqui há um monumento e há a cidade à volta dele. O monumento
é papel branco com as coberturas em terracota — a telha de Coimbra, na cor
de acento do site —, e o contexto é cartão de um tom só, paredes e telhados
iguais. Lê-se qual é o assunto sem legenda.

O disco serra tudo: terreno, edifícios e o que estiver no caminho. O corte
do terreno mostra o perfil da colina na borda da placa.
"""

import bpy
import bmesh
import json
import math
import os
import sys
from mathutils import Vector

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
ID = ARGS[0] if ARGS else 'paco-das-escolas'
SO_MODELO = '--so-modelo' in ARGS
SO_VISTAS = [a[len('--vista='):] for a in ARGS if a.startswith('--vista=')]

AQUI = os.path.dirname(os.path.abspath(__file__))
SAIDA = os.path.join(AQUI, '..', '..', 'public', 'maquetas')
CENA = json.load(open(os.path.join(AQUI, ID + '.scene.json'), encoding='utf8'))
R = CENA['raio']


def srgb(h):
    h = h.lstrip('#')
    canal = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in canal]
    return tuple(lin) + (1.0,)


TINTA = (0.09, 0.10, 0.12)


def material(nome, cor, aspereza=0.85, especular=0.2):
    m = bpy.data.materials.new(nome)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = cor
    b.inputs['Roughness'].default_value = aspereza
    for chave in ('Specular IOR Level', 'Specular'):
        if chave in b.inputs:
            b.inputs[chave].default_value = especular
            break
    return m


def objecto(nome, me, mats):
    ob = bpy.data.objects.new(nome, me)
    for m in mats:
        ob.data.materials.append(m)
    bpy.context.collection.objects.link(ob)
    return ob


def aplicar(ob, mod):
    bpy.context.view_layer.objects.active = ob
    for o in bpy.context.view_layer.objects:
        o.select_set(o == ob)
    bpy.ops.object.modifier_apply(modifier=mod.name)


bpy.ops.wm.read_factory_settings(use_empty=True)

M_TERRENO = material('terreno', srgb('E6E0D2'), 0.95)
M_CORTE = material('corte', srgb('BDB39E'), 0.92)
M_PAREDE = material('monumento-parede', srgb('F7F3EC'), 0.6, 0.35)
M_TELHA = material('monumento-telhado', srgb('B8522C'), 0.72, 0.25)
M_CONTEXTO = material('contexto', srgb('CBC1AB'), 0.88)
M_CONTEXTO_TELHADO = material('contexto-telhado', srgb('BCB199'), 0.9)
M_ARVORE = material('arvore', srgb('A7B08F'), 0.9)

# A FOTOGRAFIA
#
# Por omissão a maqueta veste a ortofoto (ver `fotografia` no gerador): o
# chão, os telhados e o alto das copas são a imagem, projectada de cima; as
# paredes são reboco liso, porque das fachadas não há dado nenhum e desenhar
# janelas seria inventá-las. O corte do disco é terra.
#
# `--cartao` volta à maqueta de cartão, só para estampas de comparação.
CARTAO = '--cartao' in ARGS
FOTO = None if CARTAO else CENA.get('foto')
# `--rico`: a reconstituição (ver `reconstituicao.py`) — a fotografia fica no
# chão, e os edifícios ganham texturas e pormenores desenhados. Sai com o
# sufixo `-rico`, ao lado das outras versões, para se poderem comparar.
RICO = '--rico' in ARGS and FOTO is not None
SUF = '-rico' if RICO else ''


def material_foto(nome, imagem, aspereza):
    m = bpy.data.materials.new(nome)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    t = nt.nodes.new('ShaderNodeTexImage')
    t.image = imagem
    t.interpolation = 'Cubic'
    t.extension = 'EXTEND'
    nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
    b.inputs['Roughness'].default_value = aspereza
    for chave in ('Specular IOR Level', 'Specular'):
        if chave in b.inputs:
            b.inputs[chave].default_value = 0.15
            break
    return m


if FOTO:
    IMAGEM = bpy.data.images.load(os.path.join(AQUI, FOTO['ficheiro']))
    M_TERRENO = material_foto('chao-foto', IMAGEM, 0.95)
    M_TELHA = M_CONTEXTO_TELHADO = material_foto('telhado-foto', IMAGEM, 0.8)
    # A fotografia numa bola esticava-se pelos lados e lia-se como mármore.
    # A copa fica num verde só, e a forma deixa de ser uma bola lisa (ver
    # as árvores, em baixo).
    M_ARVORE = material('copa', srgb('5F6F44'), 0.92, 0.1)
    M_PAREDE = material('monumento-parede', srgb('EFE9DD'), 0.85, 0.2)
    M_CONTEXTO = material('contexto-parede', srgb('DDD5C4'), 0.9, 0.15)
    M_CORTE = material('corte', srgb('A39276'), 0.95, 0.1)

if RICO:
    sys.path.insert(0, AQUI)
    import reconstituicao as rc
    MATS = rc.Materiais()
    CTX = rc.Contexto(CENA, R, IMAGEM)

# --- o cilindro que serra a placa ---
Z_MIN = min(CENA['dem']['elev']) - 10.0
Z_MAX = max(b.get('cumeeira', 0) for b in CENA['buildings']) + 20.0
bpy.ops.mesh.primitive_cylinder_add(vertices=256, radius=R, depth=Z_MAX - Z_MIN,
                                    location=(0, 0, (Z_MAX + Z_MIN) / 2))
SERRA = bpy.context.active_object
SERRA.name = 'Serra'


def serrar(ob):
    """Corta pelo cilindro. Se o corte exacto devolver nada (malha que não
    fecha bem), tenta o de vírgula flutuante sobre uma cópia; se também
    falhar, devolve False e o objecto fica vazio."""
    original = ob.data.copy()
    for solver in ('EXACT', 'FLOAT'):
        mod = ob.modifiers.new('serra', 'BOOLEAN')
        mod.operation = 'INTERSECT'
        mod.solver = solver
        mod.object = SERRA
        aplicar(ob, mod)
        if len(ob.data.polygons):
            return True
        vazio = ob.data
        ob.data = original.copy()
        bpy.data.meshes.remove(vazio)
    ob.data = bpy.data.meshes.new('vazio')
    return False


# ------------------------------------------------------------- terreno ------
dem = CENA['dem']
NC, NR, P = dem['nCol'], dem['nRow'], dem['passo']
X0, Y0 = dem['x0'], dem['y0']
Z_BASE = Z_MIN + 4.0

bm = bmesh.new()
topo = [[bm.verts.new((X0 + c * P, Y0 + r * P, dem['elev'][r * NC + c])) for c in range(NC)] for r in range(NR)]
for r in range(NR - 1):
    for c in range(NC - 1):
        bm.faces.new((topo[r][c], topo[r][c + 1], topo[r + 1][c + 1], topo[r + 1][c]))
# Saia até à base e fundo: o terreno tem de ser sólido para a serra o cortar.
bordo = ([topo[0][c] for c in range(NC)] + [topo[r][NC - 1] for r in range(1, NR)] +
         [topo[NR - 1][c] for c in range(NC - 2, -1, -1)] + [topo[r][0] for r in range(NR - 2, 0, -1)])
baixo = [bm.verts.new((v.co.x, v.co.y, Z_BASE)) for v in bordo]
n = len(bordo)
for i in range(n):
    j = (i + 1) % n
    bm.faces.new((bordo[j], bordo[i], baixo[i], baixo[j]))
bm.faces.new(baixo)
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
me = bpy.data.meshes.new('Terreno')
bm.to_mesh(me)
bm.free()
M_MURO = material('muro', srgb('B8AE9C'), 0.95, 0.1)
terreno = objecto('Terreno', me, [M_TERRENO, M_CORTE, M_MURO])
serrar(terreno)
# O corte da serra é o que fica na borda do disco ou no fundo. Não basta
# "o que não olha para cima": os muros de suporte da Alta são faces quase
# verticais do próprio terreno, e ficavam com a cor da terra do corte.
for p in terreno.data.polygons:
    c = p.center
    corte = math.hypot(c.x, c.y) > R - 0.4 or c.z < Z_BASE + 0.1
    # Onde o terreno é vertical — as faces de muro que o LiDAR apanha —,
    # a fotografia vista de cima esticava-se em riscas: essas faces ficam em
    # pedra. Com um limiar mais brando a malha de 2 m alternava faces e o muro
    # saía em dentes.
    p.material_index = 1 if corte else (2 if FOTO and p.normal.z < 0.3 else 0)
    p.use_smooth = not corte

# ------------------------------------------------------------ edificado -----


def edificio(b):
    """Paredes do chão ao beirado, cobertura do esqueleto, fundo plano.

    Fechado, para a serra saber o que é dentro e o que é fora. O fundo usa
    as mesmas faces do esqueleto, achatadas: são polígonos que já respeitam
    os pátios interiores, sem triangular à mão.
    """
    bm = bmesh.new()
    t = b['telhado']
    tv = [bm.verts.new(tuple(v)) for v in t['v']]
    telhado = []
    for f in t['f']:
        try:
            telhado.append(bm.faces.new([tv[i] for i in f]))
        except ValueError:
            pass
    fv = [bm.verts.new((v[0], v[1], b['base'])) for v in t['v']]
    for f in t['f']:
        try:
            bm.faces.new([fv[i] for i in reversed(f)])
        except ValueError:
            pass
    # Os vértices do esqueleto com tempo 0 são os do contorno, pela mesma
    # ordem; as paredes ligam cada um ao seu gémeo do fundo.
    idx = {(round(v[0], 2), round(v[1], 2)): i for i, v in enumerate(t['v']) if abs(v[2] - b['beirado']) < 0.02}
    for anel in b['aneis']:
        m = len(anel)
        for k in range(m):
            a = idx.get((round(anel[k][0], 2), round(anel[k][1], 2)))
            c = idx.get((round(anel[(k + 1) % m][0], 2), round(anel[(k + 1) % m][1], 2)))
            if a is None or c is None:
                continue
            try:
                bm.faces.new((fv[a], fv[c], tv[c], tv[a]))
            except ValueError:
                pass
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.01)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    for f in bm.faces:
        # Material 0 parede, 1 cobertura: é cobertura o que olha para cima
        # acima do beirado.
        f.material_index = 1 if (f.normal.z > 0.2 and f.calc_center_median().z > b['beirado'] - 0.05) else 0
    me = bpy.data.meshes.new('e')
    bm.to_mesh(me)
    bm.free()
    return me


def atravessa_a_borda(b):
    return any(math.hypot(x, y) > R - 0.5 for anel in b['aneis'] for (x, y) in anel)


def juntar(obs, nome):
    if not obs:
        return None
    bpy.ops.object.select_all(action='DESELECT')
    for o in obs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = obs[0]
    bpy.ops.object.join()
    obs[0].name = nome
    obs[0].data.name = nome
    return obs[0]


contexto = []
for b in CENA['buildings']:
    if b['k'] == 'sem-altura' or not b.get('telhado'):
        continue
    dentro = b['k'] == 'conjunto'
    mats = [M_PAREDE, M_TELHA] if dentro else [M_CONTEXTO, M_CONTEXTO_TELHADO]
    # Os do monumento ficam objectos à parte, com o id do OSM no nome: a
    # página acende um deles quando a visita aponta para lá.
    nome = 'Edif_conjunto_' + b['osm'].replace('/', '_') if dentro else 'Edif_contexto'
    if RICO and b['osm'] in rc.a_parte(ID):
        continue                     # a torre do Paço, a fonte da Manga: modeladas à parte, peça a peça
    ob = objecto(nome, edificio(b), mats)
    if RICO:
        rc.vestir(ob, b, CTX, MATS)
    if atravessa_a_borda(b) and not serrar(ob):
        b['_perdido'] = True
        print('serra: %s ficou vazio' % b['osm'])
    if not dentro:
        contexto.append(ob)
juntar(contexto, 'Edif_contexto')

# --------------------------------------------------------------- árvores ----
# Posição, altura e raio medidos; a forma é uma bola de cartão (ver maqueta.py).
ARVORES = CENA.get('arvores', [])
if ARVORES:
    M_TRONCO = material('tronco', srgb('8C8272'), 0.9)
    bm = bmesh.new()
    bt = bmesh.new()
    for a in ARVORES:
        x, y = a['p']
        h, r, z0 = a['h'], a['r'], a['z']
        rv = min(r, h * 0.45)
        zc = z0 + h - rv
        geo = bmesh.ops.create_icosphere(bm, subdivisions=2, radius=1.0)
        for v in geo['verts']:
            # Com a fotografia, a copa ganha irregularidade — um ruído fixo pela
            # posição, sempre o mesmo em cada geração. A altura e o raio
            # medidos continuam a ser o envelope.
            k = 1.0
            if FOTO:
                n = math.sin(v.co.x * 5.1 + x) * math.sin(v.co.y * 4.3 + y) * math.sin(v.co.z * 3.7 + x * 0.3)
                k = 0.86 + 0.14 * n
            v.co = Vector((x + v.co.x * r * k, y + v.co.y * r * k, zc + v.co.z * rv * k))
        tr = bmesh.ops.create_cone(bt, segments=6, radius1=0.3, radius2=0.22, depth=zc - z0 + 1.0, cap_ends=True)
        for v in tr['verts']:
            v.co = Vector((x + v.co.x, y + v.co.y, (zc + z0 - 1.0) / 2 + v.co.z))
    me = bpy.data.meshes.new('Arvores')
    bm.to_mesh(me)
    bm.free()
    ob = objecto('Arvores', me, [M_ARVORE])
    for p in me.polygons:
        p.use_smooth = True
    me = bpy.data.meshes.new('Troncos')
    bt.to_mesh(me)
    bt.free()
    objecto('Troncos', me, [M_TRONCO])
    print('árvores: %d' % len(ARVORES))

if RICO:
    rc.pormenores(CTX, MATS)

bpy.data.objects.remove(SERRA, do_unlink=True)

# Coordenadas de textura: a posição em planta, na caixa da fotografia. A
# mesma regra para chão, telhados e copas — é isso que faz a telha de cada
# telhado cair no telhado certo. Faz-se no fim, depois da serra, que cria
# faces novas.
if FOTO:
    fx0, fy0, fx1, fy1 = FOTO['x0'], FOTO['y0'], FOTO['x1'], FOTO['y1']
    for ob in bpy.data.objects:
        if ob.type != 'MESH' or not any(m and m.name.endswith('-foto') for m in ob.data.materials):
            continue
        me = ob.data
        uv = me.uv_layers.new(name='UV')
        M = ob.matrix_world
        for loop in me.loops:
            co = M @ me.vertices[loop.vertex_index].co
            uv.data[loop.index].uv = ((co.x - fx0) / (fx1 - fx0), (co.y - fy0) / (fy1 - fy0))

bpy.context.preferences.filepaths.save_version = 0
if RICO:
    # Paredes e telhados dos edifícios: textura à escala real, face a face.
    for ob in bpy.data.objects:
        if ob.type == 'MESH' and ob.name.startswith('Edif_') and not ob.get('acc'):
            rc.uv_planar(ob, MATS)

bpy.ops.wm.save_as_mainfile(filepath=os.path.join(AQUI, ID + SUF + '.blend'))

tris = 0
for ob in bpy.data.objects:
    if ob.type == 'MESH':
        ob.data.calc_loop_triangles()
        tris += len(ob.data.loop_triangles)
print('maqueta: %d triângulos' % tris)

os.makedirs(SAIDA, exist_ok=True)
if not CARTAO:
  bpy.ops.export_scene.gltf(
    filepath=os.path.join(SAIDA, ID + SUF + '.glb'), export_format='GLB', export_apply=True,
    export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6,
    # WebP na reconstituição: as grades precisam de transparência e são
    # uma dúzia de texturas; em PNG o modelo triplicava.
    export_image_format='WEBP' if RICO else 'JPEG', export_image_quality=86,
    export_yup=True)

if SO_MODELO:
    raise SystemExit(0)

# --------------------------------------------------------------- render -----
sc = bpy.context.scene
mundo = bpy.data.worlds.new('Ceu')
sc.world = mundo
mundo.use_nodes = True
fundo = mundo.node_tree.nodes['Background']
fundo.inputs[0].default_value = (0.86, 0.84, 0.79, 1.0)
fundo.inputs[1].default_value = 0.6
sc.render.film_transparent = True
sc.render.image_settings.color_mode = 'RGBA'

# Sol de fim de tarde, de poente: a fachada da Via Latina, virada a sul,
# fica iluminada de lado e o pátio ganha a sombra da ala da capela.
luz = bpy.data.lights.new('Sol', type='SUN')
luz.energy = 3.6
luz.angle = math.radians(1.5)
luz.color = (1.0, 0.95, 0.87)
sol = bpy.data.objects.new('Sol', luz)
sc.collection.objects.link(sol)
sol.rotation_euler = (math.radians(50), 0, math.radians(-118))

cam_dados = bpy.data.cameras.new('Camara')
cam = bpy.data.objects.new('Camara', cam_dados)
sc.collection.objects.link(cam)
sc.camera = cam
cam_dados.clip_start, cam_dados.clip_end = 1.0, 20000.0

# Na reconstituição não há contorno: é desenho de materiais, não de traço.
sc.render.use_freestyle = not RICO
camada = bpy.context.view_layer
camada.use_freestyle = True
fs = camada.freestyle_settings
fs.crease_angle = math.radians(140)
lineset = fs.linesets[0] if fs.linesets else fs.linesets.new('contorno')
lineset.select_silhouette = True
lineset.select_border = True
lineset.select_crease = True
# Terreno e árvores sem contorno: as arestas do terreno são malha, e as
# bolas das copas desenhadas a tinta liam-se como balões.
sem_linha = bpy.data.collections.new('SemContorno')
sc.collection.children.link(sem_linha)
for nome in ('Terreno', 'Arvores', 'Troncos'):
    ob = sc.objects.get(nome)
    if ob:
        for col in list(ob.users_collection):
            col.objects.unlink(ob)
        sem_linha.objects.link(ob)
lineset.select_by_collection = True
lineset.collection = sem_linha
lineset.collection_negation = 'EXCLUSIVE'
estilo = lineset.linestyle or bpy.data.linestyles.new('contorno')
lineset.linestyle = estilo
estilo.color = TINTA
estilo.thickness = 1.3
estilo.alpha = 0.75
if FOTO:
    # Sobre a fotografia a tinta só marca as arestas, não desenha.
    estilo.thickness = 1.0
    estilo.alpha = 0.3
    # A fotografia já traz o sol do dia em que foi tirada, com as sombras;
    # um sol forte por cima somava-se ao dela e o pátio estourava.
    luz.energy = 2.6
    luz.color = (1.0, 0.975, 0.93)
    sc.view_settings.exposure = -0.4
    fundo.inputs[1].default_value = 0.95


def pontos_da_placa():
    pts = []
    for ob in sc.objects:
        if ob.type != 'MESH':
            continue
        M = ob.matrix_world
        vs = ob.data.vertices
        for i in range(0, len(vs), 5):
            pts.append(M @ vs[i].co)
    return pts


def enquadrar(alvo, azimute, elevacao, lente, pts, folga=1.03):
    """Recua a câmara na direcção dada até todos os `pts` caberem no fotograma."""
    cam_dados.lens = lente
    cam_dados.shift_x = cam_dados.shift_y = 0.0
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
        Rr, U, F = q @ Vector((1, 0, 0)), q @ Vector((0, 1, 0)), q @ Vector((0, 0, -1))
        pior = 0.0
        for Pp in pts:
            v = Pp - C
            z = v.dot(F)
            if z <= 0.5:
                return 1e9
            pior = max(pior, abs(v.dot(Rr)) / (z * th), abs(v.dot(U)) / (z * tv))
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
    q = (T - C).to_track_quat('-Z', 'Y')
    cam.rotation_euler = q.to_euler()

    # Centrar o que se vê. A distância acima faz caber tudo, mas simétrico
    # em torno do alvo: a placa desce mais do que os telhados sobem, e
    # sobrava céu em cima. Desloca-se a objectiva (sem mexer na perspectiva)
    # e aperta-se a lente até a caixa projectada encher o fotograma.
    Rr, U, F = q @ Vector((1, 0, 0)), q @ Vector((0, 1, 0)), q @ Vector((0, 0, -1))
    us, vs = [], []
    for Pp in pts:
        v = Pp - C
        z = v.dot(F)
        us.append(v.dot(Rr) / (z * th))
        vs.append(v.dot(U) / (z * tv))
    cu, cv = (min(us) + max(us)) / 2, (min(vs) + max(vs)) / 2
    k = 1.0 / (max((max(us) - min(us)) / 2, (max(vs) - min(vs)) / 2) * folga)
    cam_dados.lens = lente * k
    cam_dados.shift_x = cu * k / 2
    cam_dados.shift_y = cv * k / 2 / proporcao
    return hi


# nome -> (alvo (x, y, z) ou None = a placa inteira, azimute, elevação, lente, resolução)
# O azimute é a direcção de onde a câmara olha, a partir de nascente, no
# sentido directo — os mesmos números entram no 3D da página.
VISTAS = {
    # Paço: de sul-sudoeste, a vista de quem sobe da Couraça: o pátio
    # aberto, a Via Latina em frente, a torre no canto.
    # Santa Cruz: de poente-sudoeste, da Praça 8 de Maio: a fachada de
    # frente, o mosteiro por trás e a Manga ao fundo.
    'conjunto': (None, {'paco-das-escolas': -112, 'santa-cruz': -160}.get(ID, -112), 30, 60, (2000, 1250)),
}

# Vistas de perto, para conferir pormenores. Só saem quando pedidas com
# --vista=<nome>; não vão para o site.
INSPECCAO = {
    'paco-das-escolas': {
        'torre': ((-34, 31, 118), -125, 12, 70, (1600, 1000)),
        'via-latina': ((-2, 36, 106), -95, 14, 60, (1600, 1000)),
        'porta-ferrea': ((40, 30, 104), 10, 10, 60, (1600, 1000)),
        'nordeste': ((95, 75, 105), -120, 30, 50, (1600, 1000)),
    },
    'santa-cruz': {
        'fachada': ((-64, -17, 31), -171, 17, 45, (1600, 1000)),
        'claustro': ((-14, 16, 23), -120, 42, 45, (1600, 1000)),
        'manga': ((32, 21, 27), 35, 28, 45, (1600, 1000)),
        'cafe': ((-58, -30, 26), -165, 8, 50, (1600, 1000)),
    },
}.get(ID, {})
for _v in SO_VISTAS:
    if _v in INSPECCAO:
        VISTAS[_v] = INSPECCAO[_v]

sc.render.engine = 'CYCLES'
# --rapido: ensaio de enquadramento, não para o site.
sc.cycles.samples = 24 if '--rapido' in ARGS else 128
sc.cycles.use_denoising = True
sc.cycles.device = 'CPU'
# Com a fotografia, 'Standard': o AgX comprime e dessatura, e a telha saía
# cor-de-rosa. A fotografia já traz as cores certas; o sol é que tem de
# ficar abaixo do ponto em que as paredes brancas estouram.
sc.view_settings.view_transform = 'Standard' if FOTO else 'AgX'
_looks = [i.identifier for i in sc.view_settings.bl_rna.properties['look'].enum_items]
for _preferido in (('AgX - Punchy', 'AgX - Medium High Contrast') if FOTO else ()) + ('AgX - Base Contrast', 'AgX - Medium Contrast', 'None'):
    if _preferido in _looks:
        sc.view_settings.look = _preferido
        break

TODOS = pontos_da_placa()
for nome, (alvo, azimute, elevacao, lente, res) in VISTAS.items():
    if SO_VISTAS and nome not in SO_VISTAS:
        continue
    sc.render.resolution_x, sc.render.resolution_y = res
    if alvo is None:
        zc = sum(p.z for p in TODOS) / len(TODOS)
        dist = enquadrar((0, 0, zc), azimute, elevacao, lente, TODOS)
    else:
        raio_perto = 22 if nome in INSPECCAO else 75
        perto = [p for p in TODOS if math.hypot(p.x - alvo[0], p.y - alvo[1]) < raio_perto]
        dist = enquadrar(alvo, azimute, elevacao, lente, perto)
    sc.render.filepath = os.path.join(SAIDA, '%s-%s%s.png' % (ID, nome, '-cartao' if CARTAO else SUF))
    print('vista %s: câmara a %.0f m' % (nome, dist))
    bpy.ops.render.render(write_still=True)
