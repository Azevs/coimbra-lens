# -*- coding: utf-8 -*-
"""
Reconstituição — a terceira versão da maqueta de um monumento.

    blender -b --factory-startup --python scripts/blender/monumento.py -- paco-das-escolas --rico

Importado pelo `monumento.py` quando corre com `--rico`. As outras duas
versões (cartão e fotografia) só mostram o que se mede: volume, cota,
fotografia de cima. Esta desenha o que se vê de pé no pátio e não se mede
de avião: a torre com a sineira e os relógios, a Via Latina com as colunas e
a escadaria, a Porta Férrea, as cornijas, os merlões, as cantarias e as
janelas. Tudo desenhado a partir de fotografias (Wikimedia Commons) e
pousado sobre a geometria medida — nunca o contrário: as alturas, os
contornos e o terreno continuam a ser os do LiDAR e do OSM.

É uma RECONSTITUIÇÃO, e a página di-lo. O número de janelas de uma fachada,
o ritmo das colunas, o perfil de uma cornija são desenho informado, não
levantamento. Nos edifícios à volta, as janelas seguem o pé-direito corrente
da Alta, e só nas paredes que dão para a rua (nunca nas meeiras).

AS TEXTURAS SÃO FEITAS AQUI

Nenhuma imagem de fora entra no modelo. Telha, zinco, cantaria, reboco,
janela, grade e relógio são gerados com numpy, a partir de ruído e de
geometria simples, e embalados no .glb. O material de cada água de telhado
(telha, zinco ou terraço) escolhe-se pela cor da ortofoto nesse ponto — é o
único sítio onde a fotografia decide alguma coisa nesta versão.
"""

import bpy
import bmesh
import math
import numpy as np
from mathutils import Vector

Z = Vector((0, 0, 1))

# ============================================================ texturas ======


def _ruido(n, celulas, rng):
    """Ruído de valor, tileável, em [0, 1]."""
    g = rng.random((celulas, celulas))
    x = np.arange(n) * celulas / n
    i0 = np.floor(x).astype(int)
    f = x - i0
    f = f * f * (3 - 2 * f)
    i1 = (i0 + 1) % celulas
    a, b = g[np.ix_(i0, i0)], g[np.ix_(i0, i1)]
    c, d = g[np.ix_(i1, i0)], g[np.ix_(i1, i1)]
    fy, fx = f[:, None], f[None, :]
    return (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy


def _fbm(n, rng, oitavas=((4, 0.5), (8, 0.25), (16, 0.15), (48, 0.1))):
    t = sum(p * _ruido(n, c, rng) for c, p in oitavas)
    return t / sum(p for _, p in oitavas)


def _hex(h):
    h = h.lstrip('#')
    return np.array([int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)])


def _normal(h, forca):
    """Mapa de normais (espaço tangente) a partir de uma altura tileável."""
    dx = (np.roll(h, -1, 1) - np.roll(h, 1, 1)) * forca
    dy = (np.roll(h, -1, 0) - np.roll(h, 1, 0)) * forca
    # Linha 0 é o topo da imagem; v cresce para cima, portanto dy troca de sinal.
    n = np.dstack([-dx, dy, np.ones_like(h)])
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    return n * 0.5 + 0.5


def _imagem(nome, rgb, alpha=None, dados=False):
    """rgb (h, w, 3) com a linha 0 em cima → imagem do Blender embalada."""
    h, w = rgb.shape[:2]
    a = np.ones((h, w)) if alpha is None else alpha
    px = np.dstack([np.clip(rgb, 0, 1), np.clip(a, 0, 1)])[::-1].astype(np.float32)
    # `is_data` à criação: mudar o espaço de cor depois de escrever os píxeis
    # reinicia a imagem, e os mapas de relevo saíam a zeros (telhados pretos).
    img = bpy.data.images.new(nome, w, h, alpha=alpha is not None, is_data=dados)
    img.pixels.foreach_set(px.ravel())
    img.file_format = 'PNG' if (alpha is not None or dados) else 'JPEG'
    img.pack()
    return img


def tex_telha(rng, n=512):
    """Telha de canudo: 4 canais e 4 fiadas em 1,6 m. u ao longo do beirado, v a subir a água."""
    par, fiada = n // 4, n // 4
    u = np.arange(n) % par / par
    v = np.arange(n) % fiada / fiada
    perfil = 0.5 + 0.5 * np.cos(2 * np.pi * (u - 0.5))           # capa ao meio, canal nas pontas
    altura = perfil[None, :] * 0.8 + (1 - v[:, None]) * 0.25       # cada telha engrossa para baixo
    sombra = np.clip(v[:, None] / 0.08, 0, 1)                      # a telha de cima faz sombra
    # Cor por telha: cada meio-canal de cada fiada é uma peça.
    peca_u = (np.arange(n) // (par // 2))
    peca_v = (np.arange(n) // fiada)
    semente = rng.random((peca_v.max() + 1, peca_u.max() + 1))
    var = semente[np.ix_(peca_v, peca_u)]
    base = _hex('A8573A')
    escura = _hex('7E3A22')
    liquen = _hex('8E8A72')
    cor = base[None, None, :] * (0.82 + 0.3 * var[..., None])
    cor = np.where((var > 0.9)[..., None], escura * (0.9 + 0.2 * var[..., None]), cor)
    grao = _fbm(n, rng)[..., None]
    cor = cor * (0.85 + 0.3 * grao)
    musgo = np.clip((_ruido(n, 6, rng) - 0.72) * 4, 0, 1)[..., None] * 0.55
    cor = cor * (1 - musgo) + liquen * musgo
    cor = cor * (0.55 + 0.45 * perfil[None, :, None]) * (0.45 + 0.55 * sombra[..., None])
    return _imagem('telha', cor), _imagem('telha-relevo', _normal(altura, 3.0), dados=True)


def tex_zinco(rng, n=512):
    """Chapa de zinco com juntas agrafadas de 0,5 m (4 por textura de 2 m)."""
    u = np.arange(n) % (n // 4) / (n // 4)
    junta = np.exp(-((u - 0.5) / 0.012) ** 2)
    altura = np.tile(junta, (n, 1)) + 0.02 * _fbm(n, rng)
    base = _hex('8D979C')
    risco = _ruido(n, 64, rng)[:, :1] * 0.5 + _fbm(n, rng) * 0.5
    cor = base[None, None, :] * (0.88 + 0.2 * risco[..., None]) * (1 + 0.15 * junta[None, :, None])
    return _imagem('zinco', cor), _imagem('zinco-relevo', _normal(altura, 2.0), dados=True)


def tex_terraco(rng, n=512):
    """Terraço de betão e ladrilho de 0,5 m (8 por textura de 4 m)."""
    lado = n // 8
    junta = ((np.arange(n) % lado) < 2)
    j = junta[None, :] | junta[:, None]
    cor = _hex('C9C3B6')[None, None, :] * (0.9 + 0.18 * _fbm(n, rng)[..., None])
    cor = np.where(j[..., None], cor * 0.82, cor)
    return _imagem('terraco', cor)


def tex_reboco(rng, cor_hex, nome, n=512):
    """Reboco caiado: branco com as nódoas largas da cal e grão fino."""
    largo = _fbm(n, rng, ((3, 0.6), (6, 0.4)))
    fino = _ruido(n, 128, rng)
    cor = _hex(cor_hex)[None, None, :] * (0.93 + 0.08 * largo[..., None] + 0.025 * fino[..., None])
    altura = fino * 0.5 + largo * 0.5
    return _imagem(nome, cor), altura


def tex_cantaria(rng, n=512, base_hex='D8C7A0', nome='cantaria', sujidade=0.18, junta=0.7, variacao=0.16):
    """Cantaria de pedra de Ançã: fiadas de 0,5 m (4 em 2 m), juntas finas, pátina.

    `sujidade` é o escorrido escuro da chuva: a fachada de Santa Cruz, virada
    à praça, tem-no muito mais do que o pátio do Paço.
    """
    fiada = n // 4
    cor = np.zeros((n, n, 3))
    altura = np.ones((n, n))
    base = _hex(base_hex)
    comprimentos = (128, 160, 192, 256)       # 0,5 a 1 m de pedra
    for f in range(4):
        y0 = f * fiada
        x = int(rng.random() * n)             # cada fiada desencontrada da de baixo
        coberto = 0
        while coberto < n:
            L = min(comprimentos[int(rng.random() * 4)], n - coberto)
            tinta = 0.9 + variacao * rng.random()
            cols = np.arange(x, x + L) % n
            cor[y0:y0 + fiada, cols] = base * tinta
            altura[y0:y0 + fiada, cols[:2]] = 0.2   # junta vertical
            x += L
            coberto += L
        altura[y0:y0 + 2, :] = 0.2                  # junta horizontal
    patina = _fbm(n, rng)
    escorrido = np.repeat(_ruido(n, 40, rng)[:1, :], n, axis=0) * np.linspace(0.3, 1, n)[:, None]
    cor = cor * (0.82 + 0.25 * patina[..., None]) * (1 - sujidade * escorrido[..., None])
    cor = np.where((altura < 0.5)[..., None], cor * junta, cor)
    return _imagem(nome, cor), _imagem(nome + '-relevo', _normal(altura, 1.5), dados=True)


def tex_janela(rng, w=256, h=512):
    """Janela de guilhotina: caixilho branco, 2 × 4 vidros, reflexo do céu."""
    cor = np.zeros((h, w, 3))
    y = np.linspace(0, 1, h)[:, None]
    x = np.linspace(0, 1, w)[None, :]
    vidro = _hex('3D4A55') * (0.7 + 0.5 * (1 - y))[..., None] + 0.12 * np.clip(1 - np.abs(x + y - 0.9) * 6, 0, 1)[..., None]
    cor[:] = vidro
    moldura = 14
    barra = 6
    caix = np.zeros((h, w), bool)
    caix[:moldura, :] = caix[-moldura:, :] = True
    caix[:, :moldura] = caix[:, -moldura:] = True
    caix[h // 2 - 5:h // 2 + 5, :] = True          # encontro das duas folhas
    caix[:, w // 2 - barra // 2:w // 2 + barra // 2] = True
    for k in (1, 3, 5, 7):
        yy = int(k * h / 8)
        caix[yy - barra // 2:yy + barra // 2, :] = True
    cor[caix] = _hex('EEEAE2')
    return _imagem('janela', cor)


def tex_porta(rng, w=256, h=512):
    """Porta de madeira almofadada, cor de vinho."""
    cor = np.ones((h, w, 3)) * _hex('5A2A22')
    veio = _ruido(h, 64, rng)[:, :w] if w == h else np.tile(_ruido(w, 64, rng)[:1, :], (h, 1))
    cor *= (0.85 + 0.25 * veio[..., None])
    for (y0, y1) in ((0.06, 0.36), (0.42, 0.94)):
        for (x0, x1) in ((0.1, 0.45), (0.55, 0.9)):
            ys, ye, xs, xe = int(y0 * h), int(y1 * h), int(x0 * w), int(x1 * w)
            cor[ys:ye, xs:xe] *= 1.18
            cor[ys:ys + 4, xs:xe] *= 0.6
            cor[ys:ye, xs:xs + 4] *= 0.6
    return _imagem('porta', cor)


def tex_grade(rng, w=512, h=128):
    """Grade de ferro com transparência: corrimão, travessa e balaústres de 12 cm (2 m × 1 m)."""
    a = np.zeros((h, w))
    a[:10, :] = 1
    a[-8:, :] = 1
    a[int(h * 0.55):int(h * 0.55) + 4, :] = 1
    passo = w // 16
    for k in range(16):
        c = k * passo + passo // 2
        a[:, c - 2:c + 2] = 1
    cor = np.ones((h, w, 3)) * _hex('24211E')
    return _imagem('grade', cor, alpha=a)


def tex_relogio(rng, n=256):
    """Mostrador: branco, aro preto, doze marcas, ponteiros."""
    y, x = np.mgrid[-1:1:n * 1j, -1:1:n * 1j]
    r = np.hypot(x, y)
    ang = np.arctan2(x, -y)
    cor = np.ones((n, n, 3)) * _hex('F3F0E8')
    cor[(r > 0.86) & (r < 0.96)] = _hex('1E1E1E')
    marca = (np.abs(((ang / (2 * np.pi) * 12) + 0.5) % 1 - 0.5) < 0.06) & (r > 0.68) & (r < 0.84)
    cor[marca] = _hex('1E1E1E')
    for a0, L, e in ((0.3, 0.5, 0.05), (2.2, 0.72, 0.03)):
        dx, dy = math.sin(a0), -math.cos(a0)
        t = np.clip(x * dx + y * dy, 0, L)
        d = np.hypot(x - t * dx, y - t * dy)
        cor[d < e] = _hex('1E1E1E')
    cor[r > 0.96] = _hex('D8C7A0')
    return _imagem('relogio', cor)


def tex_grade_porta(rng, w=256, h=512):
    """A grade da Porta Férrea: losangos de ferro diante da passagem escura."""
    y, x = np.mgrid[0:h, 0:w]
    passo = 36
    l1 = (np.abs(((x + y) % passo) - passo / 2) > passo / 2 - 2.5)
    l2 = (np.abs(((x - y) % passo) - passo / 2) > passo / 2 - 2.5)
    fundo = _hex('4B4640') * (0.6 + 0.6 * (1 - y / h))[..., None]
    cor = np.where((l1 | l2)[..., None], _hex('1B1A18'), fundo)
    return _imagem('grade-porta', cor)


def tex_lavrado(rng, n=512, base_hex='C9B48C', nome='lavrado'):
    """Pedra lavrada: a massa de relevo do portal manuelino, vista de longe.

    Não copia nenhum motivo real — é um tecido de rosetas, cordas em
    diagonal e folhagem em ruído, com as covas escurecidas, que à escala da
    maqueta se lê como pedra muito trabalhada e gasta. 1 repetição = 1,5 m.
    """
    y, x = np.mgrid[0:n, 0:n] / n
    c = 8                                            # 8 × 8 células de ~19 cm
    fx, fy = (x * c) % 1 - 0.5, (y * c) % 1 - 0.5
    r = np.hypot(fx, fy)
    th = np.arctan2(fy, fx)
    roseta = np.clip(1 - r * 2.4, 0, 1) * (0.6 + 0.4 * np.cos(6 * th))
    corda = np.abs(np.sin((x + y) * np.pi * c)) ** 6 * 0.5 + np.abs(np.sin((x - y) * np.pi * c)) ** 6 * 0.5
    folha = _fbm(n, rng, ((16, 0.4), (32, 0.35), (64, 0.25)))
    h = np.clip(0.45 * roseta + 0.3 * corda + 0.5 * folha, 0, 1)
    base = _hex(base_hex)
    cor = base[None, None, :] * (0.55 + 0.6 * h[..., None])
    sujo = _fbm(n, rng, ((3, 0.6), (7, 0.4)))
    cor = cor * (0.8 + 0.3 * sujo[..., None])
    return _imagem(nome, cor), _imagem(nome + '-relevo', _normal(h, 4.0), dados=True)


def tex_platibanda(rng, w=256, h=256):
    """Platibanda de cruzes vazadas: 1,2 m × 1,2 m, uma cruz por módulo, com transparência."""
    y, x = np.mgrid[0:h, 0:w]
    u, v = x / w, 1 - y / h                          # v = 0 em baixo
    a = np.ones((h, w))
    cruz = ((np.abs(u - 0.5) < 0.075) & (v > 0.24) & (v < 0.84)) | \
           ((np.abs(u - 0.5) < 0.22) & (np.abs(v - 0.62) < 0.07))
    a[cruz] = 0
    cor = np.ones((h, w, 3)) * _hex('C4AE85') * (0.85 + 0.2 * _fbm(w, rng)[..., None])
    cor[(v < 0.2) | (v > 0.9)] *= 0.9
    return _imagem('platibanda', cor, alpha=a)


def tex_escamas(rng, n=512):
    """Cobertura de escamas vidradas (a cúpula da lanterna da Sé): 8 × 8 escamas por metro e meio."""
    c = 8
    y, x = np.mgrid[0:n, 0:n] / n
    fila = np.floor(y * c)
    xx = (x * c + 0.5 * (fila % 2)) % 1 - 0.5
    yy = (y * c) % 1
    d = np.hypot(xx, yy * 0.9)                       # cada escama é um arco virado para baixo
    borda = np.clip((d - 0.42) / 0.08, 0, 1)
    peca = rng.random((c, c + 1))
    var = peca[np.clip(fila.astype(int), 0, c - 1), np.clip(np.floor(x * c + 0.5 * (fila % 2)).astype(int), 0, c)]
    base = _hex('5E7384') * (0.8 + 0.35 * var[..., None])
    claro = _hex('D9DDD6')
    cor = np.where((var > 0.72)[..., None], claro * (0.85 + 0.2 * var[..., None]), base)
    cor = cor * (1 - 0.45 * borda[..., None]) * (0.9 + 0.15 * _fbm(n, rng)[..., None])
    altura = 1 - np.clip(d / 0.5, 0, 1)
    return _imagem('escamas', cor), _imagem('escamas-relevo', _normal(altura, 2.0), dados=True)


def tex_vitral(rng, w=256, h=512):
    """Vidraça de chumbo em losangos, escura por fora, com o reflexo do céu em cima."""
    y, x = np.mgrid[0:h, 0:w]
    passo = 28
    l1 = np.abs(((x + y * 0.6) % passo) - passo / 2) > passo / 2 - 1.6
    l2 = np.abs(((x - y * 0.6) % passo) - passo / 2) > passo / 2 - 1.6
    fundo = _hex('33414B') * (0.65 + 0.55 * (1 - y / h))[..., None]
    fundo = fundo * (0.85 + 0.3 * _ruido(w, 16, rng)[np.minimum(y, w - 1) % w, x][..., None])
    cor = np.where((l1 | l2)[..., None], _hex('1A1B1C'), fundo)
    return _imagem('vitral', cor)


# ============================================================ materiais =====


def _material(nome, cor=None, img=None, normal=None, forca_normal=0.6, aspereza=0.85, alpha=False):
    m = bpy.data.materials.new(nome)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    b.inputs['Roughness'].default_value = aspereza
    for chave in ('Specular IOR Level', 'Specular'):
        if chave in b.inputs:
            b.inputs[chave].default_value = 0.2
            break
    if img is not None:
        t = nt.nodes.new('ShaderNodeTexImage')
        t.image = img
        nt.links.new(t.outputs['Color'], b.inputs['Base Color'])
        if alpha:
            # O padrão que o exportador glTF reconhece como alphaMode MASK:
            # 1 − (alfa < corte).
            menor = nt.nodes.new('ShaderNodeMath')
            menor.operation = 'LESS_THAN'
            menor.inputs[1].default_value = 0.5
            um = nt.nodes.new('ShaderNodeMath')
            um.operation = 'SUBTRACT'
            um.inputs[0].default_value = 1.0
            nt.links.new(t.outputs['Alpha'], menor.inputs[0])
            nt.links.new(menor.outputs[0], um.inputs[1])
            nt.links.new(um.outputs[0], b.inputs['Alpha'])
    elif cor is not None:
        b.inputs['Base Color'].default_value = tuple(_hex(cor) ** 2.2) + (1.0,)
    if normal is not None:
        tn = nt.nodes.new('ShaderNodeTexImage')
        tn.image = normal
        nm = nt.nodes.new('ShaderNodeNormalMap')
        nm.inputs['Strength'].default_value = forca_normal
        nt.links.new(tn.outputs['Color'], nm.inputs['Color'])
        nt.links.new(nm.outputs['Normal'], b.inputs['Normal'])
    return m


class Materiais:
    """Os materiais da reconstituição e a escala (m por repetição) da textura de cada um."""

    def __init__(self):
        rng = np.random.default_rng(1290)   # ano da fundação: a mesma textura em cada geração
        telha, telha_n = tex_telha(rng)
        zinco, zinco_n = tex_zinco(rng)
        cant, cant_n = tex_cantaria(rng)
        reb, reb_h = tex_reboco(rng, 'EFEAE0', 'reboco')
        reb_n = _imagem('reboco-relevo', _normal(reb_h, 0.6), dados=True)
        self.m = {}
        self.escala = {}

        def reg(nome, mat, escala):
            self.m[nome] = mat
            self.escala[nome] = escala

        reg('telha', _material('telhado-telha', img=telha, normal=telha_n, forca_normal=0.9, aspereza=0.7), 1.6)
        reg('zinco', _material('telhado-zinco', img=zinco, normal=zinco_n, aspereza=0.45), 2.0)
        reg('terraco', _material('telhado-terraco', img=tex_terraco(rng), aspereza=0.9), 4.0)
        reg('cantaria', _material('cantaria', img=cant, normal=cant_n, forca_normal=0.8, aspereza=0.8), 2.0)
        # A torre é pedra à vista; 'parede' no nome para a página a poder acender.
        reg('cantaria-torre', _material('torre-parede', img=cant, normal=cant_n, forca_normal=0.8, aspereza=0.8), 2.0)
        # 'parede' no nome: é por aí que a página acende o edifício escolhido.
        reg('reboco-monumento', _material('monumento-parede', img=reb, normal=reb_n, forca_normal=0.4), 3.0)
        # Os prédios à volta: quatro tons de cal, do branco ao ocre claro.
        for i, c in enumerate(('EDE7DA', 'EAE0C9', 'E7D8B8', 'EFE9E1')):
            img, _h = tex_reboco(rng, c, 'reboco-%d' % i)
            reg('reboco-%d' % i, _material('contexto-parede-%d' % i, img=img, normal=reb_n, forca_normal=0.3), 3.0)
        reg('janela', _material('janela', img=tex_janela(rng), aspereza=0.25), None)
        reg('porta', _material('porta', img=tex_porta(rng), aspereza=0.6), None)
        reg('grade', _material('grade', img=tex_grade(rng), aspereza=0.5, alpha=True), 2.0)
        reg('relogio', _material('relogio', img=tex_relogio(rng), aspereza=0.4), None)
        reg('grade-porta', _material('grade-porta', img=tex_grade_porta(rng), aspereza=0.5), None)
        reg('escuro', _material('vao', cor='2A2724', aspereza=0.9), 2.0)
        reg('ferro', _material('ferro', cor='22201E', aspereza=0.5), 2.0)
        reg('bandeira-verde', _material('bandeira-verde', cor='0B6A2E', aspereza=0.8), 2.0)
        reg('bandeira-vermelha', _material('bandeira-vermelha', cor='C8102E', aspereza=0.8), 2.0)

        # --- Santa Cruz (depois dos do Paço: a mesma semente dá-lhes as mesmas texturas) ---
        # A pedra da fachada, mais dourada e mais suja do que a do Paço.
        dour, dour_n = tex_cantaria(rng, base_hex='C8B084', nome='cantaria-dourada', sujidade=0.4)
        reg('pedra-igreja', _material('igreja-parede', img=dour, normal=dour_n, forca_normal=0.8, aspereza=0.85), 2.0)
        lav, lav_n = tex_lavrado(rng)
        reg('lavrado', _material('lavrado', img=lav, normal=lav_n, forca_normal=1.0, aspereza=0.9), 1.5)
        reg('platibanda', _material('platibanda', img=tex_platibanda(rng), aspereza=0.85, alpha=True), 1.2)
        # A Manga: reboco amarelo e coberturas de pedra cinzenta. 'parede' no
        # nome, para a visita a poder acender.
        am, _h = tex_reboco(rng, 'D6BC5E', 'reboco-amarelo')
        reg('reboco-amarelo', _material('manga-parede', img=am, normal=reb_n, forca_normal=0.4), 3.0)
        cz, cz_n = tex_cantaria(rng, base_hex='A89E84', nome='cantaria-cinza', sujidade=0.35)
        reg('pedra-cinza', _material('manga-cobertura', img=cz, normal=cz_n, forca_normal=0.7), 2.0)
        reg('agua', _material('agua', cor='4C6660', aspereza=0.06), 2.0)

        # --- Sé Velha (depois dos de Santa Cruz, pela mesma razão) ---
        # O calcário da catedral, ocre acinzentado, com o escorrido de oito
        # séculos; 'parede' no nome, para a visita a acender.
        # Juntas mais claras e pedras mais desiguais do que no Paço: de perto,
        # a 0,7 a parede lia-se como azulejo.
        se, se_n = tex_cantaria(rng, base_hex='C8B690', nome='cantaria-se', sujidade=0.2, junta=0.86, variacao=0.22)
        reg('pedra-se', _material('se-parede', img=se, normal=se_n, forca_normal=0.85, aspereza=0.88), 2.0)
        # A Porta Especiosa, de calcário branco, muito lavrada.
        esp, esp_n = tex_lavrado(rng, base_hex='E6E0D0', nome='lavrado-branco')
        reg('especiosa', _material('especiosa', img=esp, normal=esp_n, forca_normal=0.9, aspereza=0.9), 1.5)
        esc, esc_n = tex_escamas(rng)
        reg('escamas', _material('cupula', img=esc, normal=esc_n, forca_normal=0.7, aspereza=0.35), 1.5)
        reg('vitral', _material('vitral', img=tex_vitral(rng), aspereza=0.25), None)


# ============================================================ geometria =====


class Acumulador:
    """Faces agrupadas por material, com coordenadas de textura planas à escala real."""

    def __init__(self, mats):
        self.mats = mats
        self.g = {}

    def face(self, mat, pts, fora=None, uvs=None):
        pts = [Vector(p) for p in pts]
        if len(pts) < 3:
            return
        # Normal de Newell; se houver direcção desejada, vira-se a face para lá.
        n = Vector((0, 0, 0))
        for i in range(len(pts)):
            a, b = pts[i], pts[(i + 1) % len(pts)]
            n.x += (a.y - b.y) * (a.z + b.z)
            n.y += (a.z - b.z) * (a.x + b.x)
            n.z += (a.x - b.x) * (a.y + b.y)
        if n.length < 1e-9:
            return
        n.normalize()
        if fora is not None and n.dot(Vector(fora)) < 0:
            pts = pts[::-1]
            n = -n
            if uvs is not None:
                uvs = uvs[::-1]
        if uvs is None:
            esc = self.mats.escala.get(mat) or 1.0
            if abs(n.z) > 0.97:
                t, b = Vector((1, 0, 0)), Vector((0, 1, 0))
            else:
                t = Z.cross(n).normalized()
                b = n.cross(t)
            uvs = [(p.dot(t) / esc, p.dot(b) / esc) for p in pts]
        V, F, U = self.g.setdefault(mat, ([], [], []))
        o = len(V)
        V.extend(pts)
        F.append(tuple(range(o, o + len(pts))))
        U.append(uvs)

    def caixa(self, mat, o, u, n, x0, x1, y0, y1, z0, z1, z1b=None, z0b=None, sem_fundo=True):
        """Caixa no referencial de uma parede: x ao longo de `u`, y para fora (`n`), z absoluto.

        `z1b`/`z0b` dão ao topo/fundo uma cota diferente na ponta x1 (socos em rampa).
        """
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        z1b = z1 if z1b is None else z1b
        z0b = z0 if z0b is None else z0b

        def p(x, y, z):
            return o + u * x + n * y + Z * z
        zt = lambda x: z1 if x == x0 else z1b
        zb = lambda x: z0 if x == x0 else z0b
        c = {(x, y, k): p(x, y, zt(x) if k else zb(x)) for x in (x0, x1) for y in (y0, y1) for k in (0, 1)}
        self.face(mat, [c[x0, y1, 0], c[x1, y1, 0], c[x1, y1, 1], c[x0, y1, 1]], n)
        self.face(mat, [c[x0, y0, 0], c[x1, y0, 0], c[x1, y0, 1], c[x0, y0, 1]], -n)
        self.face(mat, [c[x0, y0, 0], c[x0, y1, 0], c[x0, y1, 1], c[x0, y0, 1]], -u)
        self.face(mat, [c[x1, y0, 0], c[x1, y1, 0], c[x1, y1, 1], c[x1, y0, 1]], u)
        self.face(mat, [c[x0, y0, 1], c[x1, y0, 1], c[x1, y1, 1], c[x0, y1, 1]], Z)
        if not sem_fundo:
            self.face(mat, [c[x0, y0, 0], c[x1, y0, 0], c[x1, y1, 0], c[x0, y1, 0]], -Z)

    def cilindro(self, mat, c, r0, r1, z0, z1, seg=12, tampa=True):
        a = [2 * math.pi * k / seg for k in range(seg)]
        b0 = [Vector((c[0] + r0 * math.cos(t), c[1] + r0 * math.sin(t), z0)) for t in a]
        b1 = [Vector((c[0] + r1 * math.cos(t), c[1] + r1 * math.sin(t), z1)) for t in a]
        perim = 2 * math.pi * max(r0, r1)
        for k in range(seg):
            j = (k + 1) % seg
            fora = Vector((math.cos(a[k] + math.pi / seg), math.sin(a[k] + math.pi / seg), 0))
            uv = [(k / seg * perim, z0), (j / seg * perim if j else perim, z0), (j / seg * perim if j else perim, z1), (k / seg * perim, z1)]
            esc = self.mats.escala.get(mat) or 1.0
            self.face(mat, [b0[k], b0[j], b1[j], b1[k]], fora, [(x / esc, y / esc) for x, y in uv])
        if tampa and r1 > 0:
            self.face(mat, b1, Z)

    def esfera(self, mat, c, r, rz=None, seg=10):
        rz = r if rz is None else rz
        aneis = seg // 2
        pts = [[Vector((c[0] + r * math.sin(math.pi * i / aneis) * math.cos(2 * math.pi * k / seg),
                        c[1] + r * math.sin(math.pi * i / aneis) * math.sin(2 * math.pi * k / seg),
                        c[2] + rz * math.cos(math.pi * i / aneis))) for k in range(seg)] for i in range(aneis + 1)]
        C = Vector(c)
        for i in range(aneis):
            for k in range(seg):
                j = (k + 1) % seg
                q = [pts[i][k], pts[i + 1][k], pts[i + 1][j], pts[i][j]]
                centro = sum(q, Vector()) / 4
                self.face(mat, q, centro - C)

    def plano(self, mat, o, u, n, x0, x1, z0, z1, y, uvs=((0, 0), (1, 0), (1, 1), (0, 1))):
        """Quadrilátero vertical virado para `n`, com coordenadas de textura dadas (janelas, portas)."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        p = lambda x, z: o + u * x + n * y + Z * z
        self.face(mat, [p(x0, z0), p(x1, z0), p(x1, z1), p(x0, z1)], n, list(uvs))

    def arco(self, mat, o, u, n, xc, largura, z0, z1, y, seg=10):
        """Vão de arco de volta perfeita: rectângulo com meio círculo em cima, virado para `n`."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        r = largura / 2
        zc = z1 - r
        p = lambda x, z: o + u * x + n * y + Z * z
        pts = [p(xc - r, z0), p(xc + r, z0)]
        for k in range(seg + 1):
            t = math.pi * k / seg
            pts.append(p(xc + r * math.cos(t), zc + r * math.sin(t)))
        self.face(mat, pts, n)

    def frontao(self, mat, o, u, n, xc, largura, z0, altura, y0, y1):
        """Frontão triangular (prisma)."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        p = lambda x, y, z: o + u * x + n * y + Z * z
        h = largura / 2
        for y, d in ((y1, n), (y0, -n)):
            self.face(mat, [p(xc - h, y, z0), p(xc + h, y, z0), p(xc, y, z0 + altura)], d)
        for (xa, za), (xb, zb) in (((xc - h, z0), (xc, z0 + altura)), ((xc, z0 + altura), (xc + h, z0))):
            meio = (Vector((xa - xc, 0, za - z0 - altura / 3)))
            dirf = u * meio.x + Z * meio.z
            self.face(mat, [p(xa, y0, za), p(xb, y0, zb), p(xb, y1, zb), p(xa, y1, za)], dirf)

    def arco_anel(self, mat, o, u, n, xc, r0, r1, zc, y0, y1, seg=12):
        """Arco de aduelas de volta perfeita (a moldura de um vão), de y0 a y1 para fora."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        p = lambda x, y, z: o + u * x + n * y + Z * z
        for k in range(seg):
            t0, t1 = math.pi * k / seg, math.pi * (k + 1) / seg
            c0, s0, c1, s1 = math.cos(t0), math.sin(t0), math.cos(t1), math.sin(t1)
            q = lambda r, c, s, y: p(xc + r * c, y, zc + r * s)
            rad = u * math.cos((t0 + t1) / 2) + Z * math.sin((t0 + t1) / 2)
            self.face(mat, [q(r0, c0, s0, y1), q(r1, c0, s0, y1), q(r1, c1, s1, y1), q(r0, c1, s1, y1)], n)
            self.face(mat, [q(r0, c0, s0, y0), q(r1, c0, s0, y0), q(r1, c1, s1, y0), q(r0, c1, s1, y0)], -n)
            self.face(mat, [q(r1, c0, s0, y0), q(r1, c1, s1, y0), q(r1, c1, s1, y1), q(r1, c0, s0, y1)], rad)
            self.face(mat, [q(r0, c0, s0, y0), q(r0, c1, s1, y0), q(r0, c1, s1, y1), q(r0, c0, s0, y1)], -rad)

    def cupula(self, mat, c, r, rz, seg=16, aneis=6):
        """Meia esfera (achatada por `rz`) assente em `c`, virada para cima."""
        C = Vector(c)
        pts = []
        for i in range(aneis + 1):
            f = (math.pi / 2) * i / aneis
            rr, z = r * math.cos(f), C.z + rz * math.sin(f)
            pts.append([Vector((C.x + rr * math.cos(2 * math.pi * k / seg), C.y + rr * math.sin(2 * math.pi * k / seg), z))
                        for k in range(seg)])
        for i in range(aneis):
            for k in range(seg):
                j = (k + 1) % seg
                q = [pts[i][k], pts[i][j], pts[i + 1][j], pts[i + 1][k]] if i < aneis - 1 else [pts[i][k], pts[i][j], pts[i + 1][k]]
                centro = sum(q, Vector()) / len(q)
                self.face(mat, q, centro - Vector((C.x, C.y, C.z - rz * 0.3)))

    @staticmethod
    def _ogival(xc, r, zs, seg):
        """Intradorso de um arco quebrado equilátero de meia-largura `r`: da
        nascença direita ao fecho e do fecho à nascença esquerda."""
        R = 2 * r
        dir_ = [(xc - r + R * math.cos(t), zs + R * math.sin(t)) for t in [math.pi / 3 * k / seg for k in range(seg + 1)]]
        esq = [(xc + r + R * math.cos(t), zs + R * math.sin(t))
               for t in [math.pi * 2 / 3 + math.pi / 3 * k / seg for k in range(1, seg + 1)]]
        return dir_ + esq

    def ogiva(self, mat, o, u, n, xc, largura, z0, zs, y, seg=6):
        """Vão de arco quebrado (gótico): rectângulo até `zs` e ogiva por cima, virado para `n`."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        p = lambda x, z: o + u * x + n * y + Z * z
        r = largura / 2
        pts = [p(xc - r, z0), p(xc + r, z0)] + [p(x, z) for x, z in self._ogival(xc, r, zs, seg)]
        self.face(mat, pts, n)

    def ogiva_anel(self, mat, o, u, n, xc, largura, espessura, zs, y0, y1, seg=6):
        """Moldura de um arco quebrado, de `y0` a `y1` para fora."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        p = lambda x, y, z: o + u * x + n * y + Z * z
        r = largura / 2
        a = self._ogival(xc, r, zs, seg)
        b = self._ogival(xc, r + espessura, zs, seg)
        for k in range(len(a) - 1):
            (ax0, az0), (ax1, az1), (bx0, bz0), (bx1, bz1) = a[k], a[k + 1], b[k], b[k + 1]
            self.face(mat, [p(ax0, y1, az0), p(bx0, y1, bz0), p(bx1, y1, bz1), p(ax1, y1, az1)], n)
            rad = u * ((ax0 + ax1) / 2 - xc) + Z * ((az0 + az1) / 2 - zs)
            self.face(mat, [p(bx0, y0, bz0), p(bx1, y0, bz1), p(bx1, y1, bz1), p(bx0, y1, bz0)], rad)
            self.face(mat, [p(ax0, y0, az0), p(ax1, y0, az1), p(ax1, y1, az1), p(ax0, y1, az0)], -rad)

    def oculo(self, mat, o, u, n, xc, zc, r0, r1, y0, y1, seg=14):
        """Anel de pedra de um óculo (rosácea), de `y0` a `y1` para fora."""
        o, u, n = Vector((o[0], o[1], 0)), Vector((u[0], u[1], 0)), Vector((n[0], n[1], 0))
        p = lambda x, y, z: o + u * x + n * y + Z * z
        for k in range(seg):
            t0, t1 = 2 * math.pi * k / seg, 2 * math.pi * (k + 1) / seg
            q = lambda r, t, y: p(xc + r * math.cos(t), y, zc + r * math.sin(t))
            self.face(mat, [q(r0, t0, y1), q(r1, t0, y1), q(r1, t1, y1), q(r0, t1, y1)], n)
            rad = u * math.cos((t0 + t1) / 2) + Z * math.sin((t0 + t1) / 2)
            self.face(mat, [q(r0, t0, y0), q(r0, t1, y0), q(r0, t1, y1), q(r0, t0, y1)], -rad)

    def prisma(self, mat, anel, z0, z1, topo=None, saltar=()):
        """Paredes verticais de um anel (anti-horário) de z0 a z1 e, se `topo`, a tampa com esse material.

        `saltar` são os índices das arestas que não levam parede (as que encostam a outra peça).
        """
        m = len(anel)
        for i in range(m):
            if i in saltar:
                continue
            a, b = Vector(anel[i]), Vector(anel[(i + 1) % m])
            d = b - a
            if d.length < 1e-6:
                continue
            fora = Vector((d.y, -d.x, 0))
            self.face(mat, [(a.x, a.y, z0), (b.x, b.y, z0), (b.x, b.y, z1), (a.x, a.y, z1)], fora)
        if topo:
            self.face(topo, [(p[0], p[1], z1) for p in anel], Z)

    def criar(self, prefixo):
        obs = []
        for mat, (V, F, U) in self.g.items():
            me = bpy.data.meshes.new(prefixo + mat)
            me.from_pydata([tuple(v) for v in V], [], F)
            uv = me.uv_layers.new(name='UV')
            k = 0
            for poly, uvs in zip(me.polygons, U):
                for li, (s, t) in zip(poly.loop_indices, uvs):
                    uv.data[li].uv = (s, t)
            me.validate()
            ob = bpy.data.objects.new(prefixo + mat, me)
            # As coordenadas de textura já vêm certas daqui: o `uv_planar` do
            # monumento.py não lhes toca (janelas e portas perdiam o desenho).
            ob['acc'] = 1
            ob.data.materials.append(self.mats.m[mat])
            bpy.context.collection.objects.link(ob)
            obs.append(ob)
        return obs


# ============================================================ utilidades ====


def dentro(x, y, pol):
    d = False
    for i in range(len(pol)):
        xi, yi = pol[i]
        xj, yj = pol[i - 1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            d = not d
    return d


def dist_borda(recorte, pts):
    """Distância de cada ponto (N × 2) à borda do polígono `recorte` = (A, B), arestas A[i]→B[i]."""
    A, B = recorte
    D = B - A
    L2 = np.maximum((D * D).sum(1), 1e-12)
    out = np.empty(len(pts))
    # Aos blocos, para não fazer uma matriz de milhões de pares de uma vez.
    for i in range(0, len(pts), 4096):
        P = pts[i:i + 4096, None, :]
        t = np.clip(((P - A) * D).sum(2) / L2, 0, 1)
        Q = A + t[..., None] * D
        out[i:i + 4096] = np.sqrt(((P - Q) ** 2).sum(2)).min(1)
    return out


def dentro_do_recorte(recorte, pts, folga=0.0):
    """Os pontos (N × 2) dentro do polígono e a mais de `folga` da borda (par-ímpar)."""
    A, B = recorte
    x, y = pts[:, 0:1], pts[:, 1:2]
    ax, ay, bx, by = A[:, 0], A[:, 1], B[:, 0], B[:, 1]
    with np.errstate(divide='ignore', invalid='ignore'):
        cruza = ((ay > y) != (by > y)) & (x < (bx - ax) * (y - ay) / (by - ay) + ax)
    dentro = (cruza.sum(1) % 2) == 1
    if folga > 0 and dentro.any():
        dentro[dentro] = dist_borda(recorte, pts[dentro]) > folga
    return dentro


class Contexto:
    """O que os pormenores precisam de saber da cena: terreno, edifícios, disco, fotografia."""

    def __init__(self, cena, raio, imagem_foto=None):
        self.cena = cena
        self.R = raio
        d = cena['dem']
        self.d = d
        self.edificios = [b for b in cena['buildings']]
        # Caixa de cada contorno, para `ocupado` não testar mil polígonos por
        # parede numa zona inteira.
        self._caixas = [(min(p[0] for p in b['aneis'][0]), max(p[0] for p in b['aneis'][0]),
                         min(p[1] for p in b['aneis'][0]), max(p[1] for p in b['aneis'][0]))
                        for b in self.edificios]
        # Numa zona, o recorte é o corredor (um polígono) e não o disco.
        self.recorte = None
        if cena.get('recorte'):
            A = np.array(cena['recorte'], dtype=np.float64)
            self.recorte = (A, np.roll(A, -1, axis=0))
        self.foto = cena.get('foto')
        self.px = None
        if imagem_foto is not None:
            w, h = imagem_foto.size
            a = np.empty(w * h * 4, dtype=np.float32)
            imagem_foto.pixels.foreach_get(a)
            self.px = a.reshape(h, w, 4)   # linha 0 = sul (em baixo)

    def cota(self, x, y):
        d = self.d
        fc = (x - d['x0']) / d['passo']
        fr = (y - d['y0']) / d['passo']
        c = max(0, min(d['nCol'] - 2, int(math.floor(fc))))
        r = max(0, min(d['nRow'] - 2, int(math.floor(fr))))
        tc, tr = min(1, max(0, fc - c)), min(1, max(0, fr - r))
        e = d['elev']
        N = d['nCol']
        return (e[r * N + c] * (1 - tc) * (1 - tr) + e[r * N + c + 1] * tc * (1 - tr) +
                e[(r + 1) * N + c] * (1 - tc) * tr + e[(r + 1) * N + c + 1] * tc * tr)

    def ocupado(self, x, y, excepto=None):
        """O ponto cai dentro de outro edifício? (é assim que se reconhece uma meeira)"""
        for b, (x0, x1, y0, y1) in zip(self.edificios, self._caixas):
            if b is excepto or x < x0 or x > x1 or y < y0 or y > y1:
                continue
            ext = b['aneis'][0]
            if dentro(x, y, ext) and not any(dentro(x, y, f) for f in b['aneis'][1:]):
                return True
        return False

    def no_disco(self, x, y, folga=0.6):
        """Dentro do recorte (o disco, ou o corredor de uma zona), a mais de `folga` da borda."""
        if self.recorte is None:
            return math.hypot(x, y) < self.R - folga
        return bool(dentro_do_recorte(self.recorte, np.array([[x, y]]), folga)[0])

    def troco(self, a, u, L, folga):
        """O troço [s0, s1] de a + u·s (0 ≤ s ≤ L) dentro do recorte, a mais de `folga` da borda, ou None."""
        if self.recorte is None:
            return _dentro_do_disco(a, u, L, self.R - folga)
        n = max(2, int(L / 0.25) + 1)
        s = np.linspace(0.0, L, n)
        pts = np.stack([a.x + u.x * s, a.y + u.y * s], axis=1)
        ok = dentro_do_recorte(self.recorte, pts, folga)
        if not ok.any():
            return None
        # O maior troço seguido dentro.
        melhor, ini = None, None
        for i, v in enumerate(list(ok) + [False]):
            if v and ini is None:
                ini = i
            elif not v and ini is not None:
                if melhor is None or i - ini > melhor[1] - melhor[0]:
                    melhor = (ini, i)
                ini = None
        s0, s1 = s[melhor[0]], s[melhor[1] - 1]
        return (s0, s1) if s1 - s0 > 0.5 else None

    def cor_foto(self, x, y):
        f = self.foto
        if self.px is None or not f:
            return None
        h, w = self.px.shape[:2]
        s = (x - f['x0']) / (f['x1'] - f['x0']) * w
        t = (y - f['y0']) / (f['y1'] - f['y0']) * h
        i0, j0 = int(min(w - 3, max(2, s))), int(min(h - 3, max(2, t)))
        return self.px[j0 - 2:j0 + 3, i0 - 2:i0 + 3, :3].reshape(-1, 3).mean(axis=0)


def classe_telhado(rgb, plana=False):
    """Telha, zinco ou terraço, pela cor da ortofoto nesse ponto.

    Pelo tom e não pela saturação: uma água virada a norte está em sombra na
    fotografia e perde saturação, mas a telha continua mais vermelha do que
    azul. O que não é telha é terraço se a cobertura for plana, zinco se tiver
    inclinação.
    """
    if rgb is None:
        return 'telha'
    r, g, b = rgb
    if r > g and r > b * 1.12:
        return 'telha'
    return 'terraco' if plana else 'zinco'


def arestas(anel):
    """(a, b, u, n, comprimento) de cada aresta; n aponta para fora do edifício."""
    out = []
    for i in range(len(anel)):
        a, b = Vector(anel[i]), Vector(anel[(i + 1) % len(anel)])
        d = b - a
        L = d.length
        if L < 1e-6:
            continue
        u = d / L
        out.append((a, b, u, Vector((u.y, -u.x)), L, i))
    return out


# ============================================================ edifícios =====

TORRE = 'way/115574903'
NORTE = 'relation/2708767'
REITORIA = 'way/201989127'
CAPELA = 'way/1315902875'
JOANINA = 'way/51293313'

IGREJA = 'way/204192080'        # Igreja de Santa Cruz
MOSTEIRO = 'relation/2962560'   # o mosteiro, com o Claustro do Silêncio por dentro
CAFE = 'way/223328749'          # Café Santa Cruz, a antiga igreja de São João
MANGA = 'way/873267259'         # a fonte do Claustro da Manga

# Os que são pedra à vista e não reboco caiado.
SE = 'way/41222810'              # a Sé Velha
CLAUSTRO_SE = 'relation/3475986'  # o claustro, com o pátio por dentro

# Os que são pedra à vista e não reboco caiado, e com que pedra.
PEDRA = {IGREJA: 'pedra-igreja', CAFE: 'pedra-igreja', CLAUSTRO_SE: 'pedra-se'}


def a_parte(id_):
    """Os edifícios que a reconstituição modela peça a peça, em vez do volume do gerador."""
    return {'paco-das-escolas': {TORRE}, 'santa-cruz': {MANGA}, 'se-velha': {SE}}.get(id_, set())


def volume(id_, b):
    """Acertos ao volume do gerador antes de o `monumento.py` o construir; muda `b` no sítio.

    O claustro da Sé é um terraço: o laser mede-o plano, a um metro e meio
    do que o esqueleto recto faria de cumeeira. Fica plano, à cota mediana
    que o laser mediu sobre as galerias (sem o pátio).
    """
    if id_ == 'se-velha' and b['osm'] == CLAUSTRO_SE and b.get('telhado') and b.get('lidar'):
        ext, furos = b['aneis'][0], b['aneis'][1:]
        v = _amostras(b, lambda x, y: dentro(x, y, ext) and not any(dentro(x, y, f) for f in furos))
        z = _pct(v, 0.5)
        b['beirado'] = b['cumeeira'] = round(z, 2)
        b['telhado']['v'] = [[x, y, round(z, 2)] for x, y, _ in b['telhado']['v']]
    return b


def reboco_de(b):
    """O tom de cal de cada edifício: fixo pelo id, para não mudar a cada geração."""
    if b['osm'] in PEDRA:
        return PEDRA[b['osm']]
    if b['k'] == 'conjunto':
        return 'reboco-monumento'
    return 'reboco-%d' % (sum(ord(c) for c in b['osm']) % 4)


def vestir(ob, b, ctx, mats):
    """Materiais da reconstituição num edifício feito pelo `monumento.py`.

    Entra com dois materiais (0 parede, 1 telhado) e sai com quatro: o reboco
    e as três coberturas. Cada água escolhe a sua pela cor da ortofoto no
    centro dela — assim a ala noroeste do Paço fica em zinco e o resto em
    telha, como são.
    """
    me = ob.data
    orig = [p.material_index for p in me.polygons]
    me.materials.clear()
    for k in (reboco_de(b), 'telha', 'zinco', 'terraco'):
        me.materials.append(mats.m[k])
    idx = {'telha': 1, 'zinco': 2, 'terraco': 3}
    telha_do_edificio = None
    if ctx.cena.get('zona'):
        # Numa zona inteira, a fotografia decide por edifício e não por água.
        # A ortofoto não é verdadeira: longe do nadir, um prédio de 20 m
        # aparece deitado alguns metros, e o centro de uma água estreita caía
        # no telhado do vizinho ou na rua. A maioria, pesada pela área das
        # águas, aguenta esse desvio; a inclinação continua a ser do laser.
        votos = {}
        for p, o in zip(me.polygons, orig):
            if o:
                c = p.center
                k = classe_telhado(ctx.cor_foto(c.x, c.y), plana=p.normal.z > 0.97) == 'telha'
                votos[k] = votos.get(k, 0) + p.area
        telha_do_edificio = votos.get(True, 0) >= votos.get(False, 0)
    for p, o in zip(me.polygons, orig):
        if o == 0:
            p.material_index = 0
        elif telha_do_edificio is not None:
            p.material_index = idx['telha' if telha_do_edificio else ('terraco' if p.normal.z > 0.97 else 'zinco')]
        else:
            c = p.center
            p.material_index = idx[classe_telhado(ctx.cor_foto(c.x, c.y), plana=p.normal.z > 0.97)]


def uv_planar(ob, mats):
    """Coordenadas de textura planas por face, à escala de cada material (metros reais)."""
    me = ob.data
    uv = me.uv_layers.get('UV') or me.uv_layers.new(name='UV')
    me.uv_layers.active = uv
    escala = {mats.m[k].name: e for k, e in mats.escala.items() if e}
    for p in me.polygons:
        mat = me.materials[p.material_index] if me.materials else None
        esc = escala.get(mat.name if mat else '', 3.0)
        n = p.normal
        if abs(n.z) > 0.97:
            t, bb = Vector((1, 0, 0)), Vector((0, 1, 0))
        else:
            t = Z.cross(n).normalized()
            bb = n.cross(t)
        for li in p.loop_indices:
            co = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = (co.dot(t) / esc, co.dot(bb) / esc)


# ============================================================ pormenores ====


def _convexos(anel):
    """Para cada vértice, se o canto é saliente (vira para o lado do edifício)."""
    out = []
    n = len(anel)
    for i in range(n):
        a, b, c = anel[i - 1], anel[i], anel[(i + 1) % n]
        cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])
        out.append(cr > 0)
    return out


def _dentro_do_disco(a, u, L, R):
    """O troço [s0, s1] de a + u·s (0 ≤ s ≤ L) que fica a menos de R do centro, ou None."""
    # |a + u s|² = R²  →  s² + 2 (a·u) s + |a|² − R² = 0
    b = a.dot(u)
    c = a.dot(a) - R * R
    disc = b * b - c
    if disc <= 0:
        return None
    r = math.sqrt(disc)
    s0, s1 = max(0.0, -b - r), min(L, -b + r)
    return (s0, s1) if s1 - s0 > 0.5 else None


def _janelas(acc, ctx, a, u, n, L, hf, beirado, mon, evitar=(), moldura_plana=False):
    esp = 3.5 if mon else 3.4
    w, h = (1.3, 2.5) if mon else (1.0, 1.6)
    margem = 1.5 if mon else 1.0
    if L < 2 * margem + w:
        return 0
    k = int((L - 2 * margem) // esp) + 1
    xs = [L / 2] if k == 1 else [margem + i * (L - 2 * margem) / (k - 1) for i in range(k)]
    feitas = 0
    for x in xs:
        p = a + u * x
        if not ctx.no_disco(p.x, p.y, 1.2) or any((p - Vector(e)).length < 5 for e in evitar):
            continue
        g = max(ctx.cota(*(p - u * (w / 2) + n * 0.6)), ctx.cota(*(p + u * (w / 2) + n * 0.6)))
        piso = 0
        while True:
            z0 = g + piso * hf + (1.1 if mon else 0.95)
            z1 = z0 + h
            if z1 > beirado - (1.0 if mon else 0.55):
                break
            if moldura_plana:
                # Numa zona inteira a espessura da moldura não se vê, e a
                # caixa (20 vértices) pesava cinco vezes o plano.
                acc.plano('cantaria', a, u, n, x - w / 2 - 0.17, x + w / 2 + 0.17, z0 - 0.2, z1 + 0.17, 0.04)
                acc.plano('janela', a, u, n, x - w / 2, x + w / 2, z0, z1, 0.05)
            else:
                acc.caixa('cantaria', a, u, n, x - w / 2 - 0.17, x + w / 2 + 0.17, 0, 0.09, z0 - 0.2, z1 + 0.17)
                acc.plano('janela', a, u, n, x - w / 2, x + w / 2, z0, z1, 0.095)
            piso += 1
            feitas += 1
    return feitas


def _estatua(acc, x, y, z, altura=1.8, mat='cantaria'):
    acc.cilindro(mat, (x, y), 0.3 * altura / 1.8, 0.17 * altura / 1.8, z, z + altura * 0.86, seg=10)
    acc.esfera(mat, (x, y, z + altura * 0.93), 0.1 * altura, seg=8)


def _via_latina(acc, ctx, b, ponto):
    """A Via Latina: galeria de três andares à frente da ala norte, e o pórtico com a escadaria."""
    P = Vector(ponto[:2])
    melhor = None
    for (a, bb, u, n, L, i) in arestas(b['aneis'][0]):
        s = max(0, min(L, (P - a).dot(u)))
        d = (a + u * s - P).length
        if (P - a).dot(n) > 0 and (melhor is None or d < melhor[0]):
            melhor = (d, a, u, n, L, i, s)
    _, A, u, n, L, idx, sc = melhor
    g = ctx.cota(*(A + u * (L / 2) + n * 6))
    beirado = b['beirado']
    z1, z2, zt = g + 4.6, g + 9.0, beirado - 0.75
    s0, s1, D = 6.4, L - 2.5, 3.3          # a torre ocupa o canto poente
    Wp, Pp = 13.0, 4.6

    # lajes dos dois pisos da galeria, e o entablamento com os merlões por cima
    for z in (z1, z2):
        acc.caixa('cantaria', A, u, n, s0, s1, 0, D, z - 0.3, z)
    acc.caixa('cantaria', A, u, n, s0 - 0.1, s1 + 0.1, 0, D + 0.35, zt, beirado + 0.06)
    x = s0 + 0.6
    while x < s1 - 0.4:
        acc.caixa('reboco-monumento', A, u, n, x - 0.22, x + 0.22, D - 0.1, D + 0.32, beirado + 0.06, beirado + 0.68)
        x += 1.15
    # colunas: três andares
    k = int((s1 - s0 - 0.8) // 3.3)
    for j in range(k + 1):
        xc = s0 + 0.4 + j * (s1 - s0 - 0.8) / k
        if abs(xc - sc) < Wp / 2 + 0.3:
            continue
        c = A + u * xc + n * (D - 0.35)
        acc.caixa('cantaria', c, u, n, -0.36, 0.36, -0.36, 0.36, g - 0.3, g + 0.45)
        for (za, zb) in ((g + 0.45, z1 - 0.3), (z1, z2 - 0.3), (z2, zt)):
            acc.cilindro('cantaria', (c.x, c.y), 0.25, 0.22, za, zb, seg=12)
            acc.caixa('cantaria', c, u, n, -0.32, 0.32, -0.32, 0.32, zb - 0.22, zb)
    # grades de ferro dos dois pisos, fora do pórtico
    for z in (z1, z2):
        for (xa, xb) in ((s0, sc - Wp / 2), (sc + Wp / 2, s1)):
            if xb - xa > 0.5:
                acc.plano('grade', A, u, n, xa, xb, z, z + 1.0, D - 0.04,
                          uvs=((xa / 2, 0), (xb / 2, 0), (xb / 2, 1), (xa / 2, 1)))

    # --- o pórtico ---
    acc.caixa('cantaria', A, u, n, sc - Wp / 2, sc + Wp / 2, 0, Pp, g - 0.3, z1)
    for lado in (-1, 1):
        x0 = sc + lado * Wp / 2
        acc.caixa('cantaria', A, u, n, min(x0, x0 - lado * 0.7), max(x0, x0 - lado * 0.7), 0, Pp, z1, g + 13.5)
    acc.caixa('cantaria', A, u, n, sc - Wp / 2, sc + Wp / 2, Pp - 0.7, Pp, z1, g + 13.5)
    for xa in (-4.2, 0, 4.2):
        acc.arco('escuro', A, u, n, sc + xa, 3.0, z1 + 0.25, g + 12.2, Pp + 0.01)
        if xa:
            acc.plano('porta', A, u, n, sc + xa - 1.0, sc + xa + 1.0, z1 + 0.25, z1 + 3.6, Pp + 0.02)
    for xp in (-6.1, -2.1, 2.1, 6.1):
        acc.caixa('cantaria', A, u, n, sc + xp - 0.4, sc + xp + 0.4, Pp, Pp + 0.25, z1, g + 13.5)
    c = A + u * sc + n * (Pp + 0.35)
    _estatua(acc, c.x, c.y, z1 + 1.2, 2.6)                                # a Sapiência, no arco do meio
    acc.caixa('cantaria', A, u, n, sc - Wp / 2 - 0.3, sc + Wp / 2 + 0.3, Pp - 0.8, Pp + 0.4, g + 13.5, g + 14.3)
    acc.frontao('cantaria', A, u, n, sc, Wp + 0.4, g + 14.3, 3.4, Pp - 0.9, Pp + 0.3)
    acc.caixa('cantaria', A, u, n, sc - 0.9, sc + 0.9, Pp + 0.3, Pp + 0.55, g + 14.7, g + 16.6)   # armas reais
    c = A + u * sc + n * (Pp - 0.3)
    acc.caixa('cantaria', c, u, n, -0.4, 0.4, -0.4, 0.4, g + 17.5, g + 18.1)
    _estatua(acc, c.x, c.y, g + 18.1, 1.9)
    for xa in (-Wp / 2, Wp / 2):                                          # urnas nos cantos do frontão
        c = A + u * (sc + xa) + n * (Pp - 0.3)
        zb = g + 14.3
        acc.cilindro('cantaria', (c.x, c.y), 0.22, 0.3, zb, zb + 0.5, seg=10)
        acc.esfera('cantaria', (c.x, c.y, zb + 0.75), 0.32, seg=10)
        acc.cilindro('cantaria', (c.x, c.y), 0.12, 0.0, zb + 1.0, zb + 1.45, seg=8, tampa=False)

    # --- a escadaria, do pátio ao primeiro piso ---
    Ls, Ws, N = 8.4, 10.5, 20
    sobe = (z1 - g) / N
    for i in range(N):
        acc.caixa('cantaria', A, u, n, sc - Ws / 2, sc + Ws / 2, Pp + i * Ls / N, Pp + (i + 1) * Ls / N, g - 0.6, z1 - i * sobe)
    for lado in (-1, 1):
        o = A + u * (sc + lado * (Ws / 2 + 0.25))
        acc.caixa('cantaria', o, n, u, Pp, Pp + Ls, -0.25, 0.25, g - 0.6, z1 + 0.9, z1b=g + 0.9)
    return idx


def _torre(ctx, b, mats):
    """A torre de Canevari: fuste de cantaria, sineira, relógios e o varandim do topo."""
    acc_t = Acumulador(mats)        # o corpo — é o que acende quando a visita chega à torre
    acc = Acumulador(mats)          # vãos, relógios, grades, bandeira
    anel = b['aneis'][0]
    C = sum((Vector(p) for p in anel), Vector((0, 0))) / len(anel)
    u = (Vector(anel[1]) - Vector(anel[0])).normalized()
    v = Vector((-u.y, u.x))
    lado = ((Vector(anel[1]) - Vector(anel[0])).length + (Vector(anel[2]) - Vector(anel[1])).length) / 2
    h = lado / 2
    g = ctx.cota(C.x, C.y)
    H = b['cumeeira'] - g - 0.4
    f = H / 34.0
    K = 'cantaria-torre'

    def corpo(meia, z0, z1):
        acc_t.caixa(K, C, u, v, -meia, meia, -meia, meia, z0, z1)

    corpo(h + 0.25, g - 1.5, g + 1.4 * f)
    corpo(h, g + 1.4 * f, g + 20.5 * f)
    corpo(h + 0.35, g + 20.5 * f, g + 21.1 * f)
    corpo(h + 0.18, g + 21.1 * f, g + 21.6 * f)
    corpo(h - 0.35, g + 21.6 * f, g + 27.2 * f)
    corpo(h - 0.05, g + 27.2 * f, g + 27.9 * f)
    corpo(h - 0.75, g + 27.9 * f, g + 31.6 * f)
    corpo(h - 0.45, g + 31.6 * f, g + 32.4 * f)
    for d in (u, v, -u, -v):
        al = Vector((-d.y, d.x))
        # cunhais do fuste e da sineira
        for s in (-1, 1):
            acc_t.caixa(K, C, al, d, s * (h - 0.3) - 0.3, s * (h - 0.3) + 0.3, h, h + 0.12, g + 1.4 * f, g + 20.5 * f)
            acc_t.caixa(K, C, al, d, s * (h - 0.6) - 0.25, s * (h - 0.6) + 0.25, h - 0.35, h - 0.2, g + 21.6 * f, g + 27.2 * f)
        # janelas estreitas do fuste e o óculo
        for zc in (6.0, 10.5, 15.0):
            z0 = g + zc * f
            acc_t.caixa(K, C, al, d, -0.5, 0.5, h, h + 0.08, z0 - 0.15, z0 + 1.45)
            acc.plano('janela', C, al, d, -0.35, 0.35, z0, z0 + 1.3, h + 0.085)
        zo = g + 18.6 * f
        base = Vector((C.x, C.y, 0)) + Vector((d.x, d.y, 0)) * (h + 0.02)
        al3 = Vector((al.x, al.y, 0))
        pts = [base + al3 * (0.55 * math.cos(t)) + Z * (zo + 0.55 * math.sin(t))
               for t in [2 * math.pi * k / 16 for k in range(16)]]
        acc.face('escuro', pts, Vector((d.x, d.y, 0)))
        # sineira: um arco por face
        acc.arco('escuro', C, al, d, 0, 1.7, g + 22.3 * f, g + 26.5 * f, h - 0.34)
        # relógio
        zr = g + 29.75 * f
        acc.plano('relogio', C, al, d, -0.95, 0.95, zr - 0.95, zr + 0.95, h - 0.73)
        # varandim do topo
        acc.plano('grade', C, al, d, -(h - 0.5), h - 0.5, g + 32.4 * f, g + 33.4 * f, h - 0.5,
                  uvs=((0, 0), ((2 * h - 1) / 2, 0), ((2 * h - 1) / 2, 1), (0, 1)))
    # mastro e bandeira
    zt = g + 32.4 * f
    acc.cilindro('ferro', (C.x, C.y), 0.05, 0.04, zt, zt + 6.0, seg=6)
    o = C + v * 0.05
    acc.plano('bandeira-verde', o, u, v, 0.05, 0.7, zt + 4.9, zt + 5.95, 0)
    acc.plano('bandeira-vermelha', o, u, v, 0.7, 1.65, zt + 4.9, zt + 5.95, 0)
    obs = acc_t.criar('Edif_conjunto_' + TORRE.replace('/', '_') + '_')
    return obs, acc


def _porta_ferrea(acc, ctx, reitoria, ponto):
    P = Vector(ponto[:2])
    faces = []
    for (a, bb, u, n, L, i) in arestas(reitoria['aneis'][0]):
        if L < 2.5:
            continue            # os recantos de meio metro do contorno não são fachada
        s = max(0, min(L, (P - a).dot(u)))
        q = a + u * s
        faces.append(((q - P).length, q, u, n))
    fora = min((f for f in faces if f[3].x > 0.5), key=lambda f: f[0])     # para o largo, a nascente
    dentro_ = min((f for f in faces if f[3].x < -0.5), key=lambda f: f[0])  # para o pátio
    # A face exterior não é recta ali (três arestas curtas): o portal alinha-se
    # pela passagem, perpendicular à direcção pátio → largo.
    q, q2 = fora[1], dentro_[1]
    n = (q - q2).normalized()
    u = Vector((-n.y, n.x))
    o = q - n * 0.3
    g = ctx.cota(*(q + n * 1.2))
    acc.caixa('cantaria', o, u, n, -4.3, 4.3, -0.2, 0.5, g - 0.5, g + 11.8)
    acc.caixa('cantaria', o, u, n, -1.85, 1.85, 0.5, 0.62, g - 0.3, g + 6.2)
    acc.plano('grade-porta', o, u, n, -1.5, 1.5, g + 0.05, g + 5.8, 0.64)
    for x in (-3.7, -2.3, 2.3, 3.7):
        acc.caixa('cantaria', o, u, n, x - 0.4, x + 0.4, 0.5, 1.0, g - 0.3, g + 1.4)
        c = o + u * x + n * 0.78
        acc.cilindro('cantaria', (c.x, c.y), 0.26, 0.24, g + 1.4, g + 6.6, seg=12)
    for x in (-3.0, 3.0):
        acc.arco('escuro', o, u, n, x, 0.9, g + 1.9, g + 4.6, 0.52)
        c = o + u * x + n * 0.75
        _estatua(acc, c.x, c.y, g + 2.0, 1.9)
    acc.caixa('cantaria', o, u, n, -4.5, 4.5, 0.3, 1.1, g + 6.6, g + 7.5)
    acc.caixa('cantaria', o, u, n, -2.4, 2.4, 0.2, 0.7, g + 7.5, g + 11.0)
    for x in (-1.35, 1.35):
        acc.caixa('cantaria', o, u, n, x - 0.5, x + 0.5, 0.7, 0.78, g + 8.0, g + 10.4)
        acc.plano('janela', o, u, n, x - 0.36, x + 0.36, g + 8.2, g + 10.2, 0.79)
    acc.arco('escuro', o, u, n, 0, 0.9, g + 8.0, g + 10.6, 0.72)
    c = o + n * 0.9
    _estatua(acc, c.x, c.y, g + 8.1, 1.9)
    acc.caixa('cantaria', o, u, n, -3.9, -2.4, 0.2, 0.6, g + 7.5, g + 8.1, z1b=g + 9.7)
    acc.caixa('cantaria', o, u, n, 2.4, 3.9, 0.2, 0.6, g + 7.5, g + 9.7, z1b=g + 8.1)
    for x in (-3.7, 3.7):
        c = o + u * x + n * 0.75
        acc.cilindro('cantaria', (c.x, c.y), 0.22, 0.0, g + 7.5, g + 9.3, seg=8, tampa=False)
    acc.frontao('cantaria', o, u, n, 0, 5.2, g + 11.0, 1.4, 0.1, 0.75)
    acc.caixa('cantaria', o, u, n, -0.35, 0.35, 0.25, 0.65, g + 12.2, g + 12.7)
    c = o + n * 0.45
    _estatua(acc, c.x, c.y, g + 12.7, 1.8)

    # a face do pátio: arco, pilastras, frontão
    n2, u2 = -n, -u
    o2 = q2 - n2 * 0.3
    g2 = ctx.cota(*(q2 + n2 * 1.2))
    acc.caixa('cantaria', o2, u2, n2, -3.6, 3.6, -0.2, 0.45, g2 - 0.5, g2 + 8.8)
    acc.arco('escuro', o2, u2, n2, 0, 3.2, g2 + 0.05, g2 + 5.8, 0.47)
    for x in (-2.2, 2.2):
        acc.caixa('cantaria', o2, u2, n2, x - 0.35, x + 0.35, 0.45, 0.65, g2 - 0.3, g2 + 7.2)
    acc.caixa('cantaria', o2, u2, n2, -3.9, 3.9, 0.2, 0.8, g2 + 7.2, g2 + 8.0)
    acc.frontao('cantaria', o2, u2, n2, 0, 6.6, g2 + 8.0, 1.6, 0.1, 0.7)
    c = o2 + n2 * 0.4
    _estatua(acc, c.x, c.y, g2 + 9.6, 1.8)
    return [q, q2]


def _face_para(b, direccao):
    """A aresta mais comprida do anel exterior virada para `direccao`."""
    melhor = None
    for (a, bb, u, n, L, i) in arestas(b['aneis'][0]):
        if n.dot(direccao) > 0.8 and (melhor is None or L > melhor[4]):
            melhor = (a, bb, u, n, L, i)
    return melhor


def _portal_capela(acc, ctx, b):
    a, bb, u, n, L, idx = _face_para(b, Vector((1, 0)))
    o = a + u * (L / 2)
    g = ctx.cota(*(o + n * 1.0))
    acc.caixa('cantaria', o, u, n, -1.9, 1.9, 0, 0.35, g - 0.3, g + 6.8)
    acc.plano('porta', o, u, n, -1.1, 1.1, g, g + 3.5, 0.37)
    acc.arco('escuro', o, u, n, 0, 2.2, g + 3.45, g + 4.55, 0.36)
    for x in (-1.55, 1.55):
        c = o + u * x + n * 0.5
        acc.cilindro('cantaria', (c.x, c.y), 0.16, 0.14, g, g + 5.2, seg=10)
        acc.cilindro('cantaria', (c.x, c.y), 0.2, 0.0, g + 5.2, g + 6.6, seg=8, tampa=False)
    acc.frontao('cantaria', o, u, n, 0, 3.8, g + 6.8, 1.2, 0, 0.45)
    acc.caixa('cantaria', o, u, n, -0.07, 0.07, 0.15, 0.3, g + 8.0, g + 9.1)
    acc.caixa('cantaria', o, u, n, -0.35, 0.35, 0.15, 0.3, g + 8.6, g + 8.75)
    for t in (0.18, 0.82):
        x = L * (t - 0.5)
        acc.caixa('cantaria', o, u, n, x - 0.78, x + 0.78, 0, 0.12, g + 5.0, g + 9.3)
        acc.arco('escuro', o, u, n, x, 1.2, g + 5.2, g + 9.0, 0.13)
    return idx


def _portal_joanina(acc, ctx, b):
    a, bb, u, n, L, idx = _face_para(b, Vector((1, 0)))
    o = a + u * (L / 2)
    g = ctx.cota(*(o + n * 1.0))
    acc.caixa('cantaria', o, u, n, -3.4, 3.4, 0, 0.45, g - 0.3, g + 10.5)
    for x in (-2.9, -1.9, 1.9, 2.9):
        acc.caixa('cantaria', o, u, n, x - 0.4, x + 0.4, 0.45, 1.0, g - 0.3, g + 0.8)
        c = o + u * x + n * 0.72
        acc.cilindro('cantaria', (c.x, c.y), 0.3, 0.27, g + 0.8, g + 7.2, seg=12)
    acc.plano('porta', o, u, n, -1.2, 1.2, g, g + 4.4, 0.47)
    acc.arco('escuro', o, u, n, 0, 2.4, g + 4.35, g + 5.6, 0.46)
    acc.caixa('cantaria', o, u, n, -3.6, 3.6, 0.3, 1.15, g + 7.2, g + 8.0)
    acc.frontao('cantaria', o, u, n, 0, 7.2, g + 8.0, 1.8, 0.1, 0.8)
    acc.caixa('cantaria', o, u, n, -1.2, 1.2, 0.8, 1.1, g + 8.1, g + 10.1)       # as armas de D. João V
    c = o + n * 0.95
    acc.cilindro('cantaria', (c.x, c.y), 0.5, 0.32, g + 10.1, g + 10.6, seg=12)
    acc.esfera('cantaria', (c.x, c.y, g + 10.85), 0.28, seg=10)
    return idx


def _d_joao_iii(acc, ctx, ponto):
    x, y = ponto[0], ponto[1]
    g = ctx.cota(x, y)
    o, u, n = Vector((x, y)), Vector((1, 0)), Vector((0, 1))
    acc.caixa('cantaria', o, u, n, -1.5, 1.5, -1.5, 1.5, g - 0.4, g + 0.35)
    acc.caixa('cantaria', o, u, n, -0.95, 0.95, -0.95, 0.95, g + 0.35, g + 3.6)
    acc.caixa('cantaria', o, u, n, -1.1, 1.1, -1.1, 1.1, g + 3.6, g + 3.85)
    acc.cilindro('cantaria', (x, y), 0.62, 0.42, g + 3.85, g + 5.55, seg=14)
    acc.esfera('cantaria', (x, y, g + 5.6), 0.5, rz=0.3, seg=12)
    acc.esfera('cantaria', (x, y, g + 6.05), 0.22, seg=10)


def _fachadas(acc, ctx, saltar=(), sem_cornija=(), sem_janelas=(), PE=None, MERLOES=(), evitar=None, pe_contexto=3.1,
              moldura_plana=False):
    """Soco, cunhais, cornija, merlões e janelas em todas as fachadas livres.

    `sem_cornija` e `sem_janelas` levam (osm, anel, aresta) ou (osm, anel), o
    anel inteiro; `PE` é o pé-direito de cada edifício do monumento (None =
    sem janelas); `evitar` dá, por edifício, os pontos a não tapar;
    `pe_contexto`, o pé-direito dos prédios à volta.
    """
    PE = PE or {}
    evitar = evitar or {}
    janelas = 0
    for b in ctx.edificios:
        if b['k'] == 'sem-altura' or 'beirado' not in b or b['osm'] in saltar or b.get('_perdido'):
            continue
        mon = b['k'] == 'conjunto'
        beirado = b['beirado']
        hf = PE.get(b['osm'], 4.2) if mon else pe_contexto
        for ri, anel in enumerate(b['aneis']):
            convexo = _convexos(anel)
            for (a, bb, u, n, L, i) in arestas(anel):
                # Uma fachada que a borda do disco corta é decorada até à borda,
                # não saltada inteira: senão os prédios da orla ficavam lisos.
                t = ctx.troco(a, u, L, 0.8)
                if t is None:
                    continue
                corta_ini, corta_fim = t[0] > 0.01, t[1] < L - 0.01
                a, L = a + u * t[0], t[1] - t[0]
                bb = a + u * L
                if L < 1.0:
                    continue
                m = (a + bb) / 2
                if ctx.ocupado(m.x + n.x * 0.7, m.y + n.y * 0.7, excepto=b):
                    continue            # meeira: encostada a outro edifício
                ga, gb = ctx.cota(*(a + n * 0.6)), ctx.cota(*(bb + n * 0.6))
                if beirado - max(ga, gb) < 2.5:
                    continue            # parede enterrada na encosta, ou anexo
                # soco de cantaria, a acompanhar o chão
                acc.caixa('cantaria', a, u, n, 0, L, -0.02, 0.08 if mon else 0.05, b['base'], ga + 0.8, z1b=gb + 0.8)
                # cunhais nos cantos salientes
                larg = 0.9 if mon else 0.6
                for (sal, x0) in ((convexo[i] and not corta_ini, 0),
                                  (convexo[(i + 1) % len(anel)] and not corta_fim, L - larg)):
                    if sal and L > 2 * larg:
                        acc.caixa('cantaria', a, u, n, x0, x0 + larg, 0, 0.1 if mon else 0.06,
                                  max(ga, gb) + 0.8, beirado - (0.75 if mon else 0.35))
                chave = (b['osm'], ri, i)
                if chave not in sem_cornija and (b['osm'], ri) not in sem_cornija:
                    if mon:
                        acc.caixa('cantaria', a, u, n, -0.1, L + 0.1, 0, 0.14, beirado - 0.75, beirado - 0.5)
                        acc.caixa('cantaria', a, u, n, -0.25, L + 0.25, 0, 0.32, beirado - 0.5, beirado - 0.28)
                        acc.caixa('cantaria', a, u, n, -0.45, L + 0.45, 0, 0.5, beirado - 0.28, beirado + 0.06)
                    else:
                        acc.caixa('cantaria', a, u, n, -0.2, L + 0.2, 0, 0.26, beirado - 0.35, beirado + 0.05)
                    if b['osm'] in MERLOES and L > 1.6:
                        x = 0.6
                        while x < L - 0.4:
                            acc.caixa('reboco-monumento', a, u, n, x - 0.22, x + 0.22, 0.06, 0.5,
                                      beirado + 0.06, beirado + 0.68)
                            x += 1.15
                if hf and chave not in sem_janelas and (b['osm'], ri) not in sem_janelas:
                    janelas += _janelas(acc, ctx, a, u, n, L, hf, beirado, mon, evitar=evitar.get(b['osm'], ()),
                                        moldura_plana=moldura_plana)
    return janelas


# ============================================================ Paço ===========


def _pormenores_paco(ctx, mats):
    acc = Acumulador(mats)
    pontos = {p['id']: p['p'] for p in ctx.cena['pontos']}
    por_osm = {b['osm']: b for b in ctx.edificios}
    obs = []

    vl_aresta = _via_latina(acc, ctx, por_osm[NORTE], pontos['via-latina'])
    corpo_torre, acc_torre = _torre(ctx, por_osm[TORRE], mats)
    obs += corpo_torre
    pf = _porta_ferrea(acc, ctx, por_osm[REITORIA], pontos['porta-ferrea'])
    cap_aresta = _portal_capela(acc, ctx, por_osm[CAPELA])
    joa_aresta = _portal_joanina(acc, ctx, por_osm[JOANINA])
    _d_joao_iii(acc, ctx, pontos['d-joao-iii'])

    janelas = _fachadas(
        acc, ctx,
        saltar={TORRE},
        sem_cornija={(NORTE, 0, vl_aresta)},
        sem_janelas={(JOANINA, 0, joa_aresta), (CAPELA, 0, cap_aresta)},
        PE={NORTE: 4.6, REITORIA: 3.8, JOANINA: 4.4, CAPELA: None},
        MERLOES={NORTE, CAPELA},
        evitar={REITORIA: pf},
    )
    obs += acc.criar('Rico_')
    obs += acc_torre.criar('Rico_torre_')
    print('reconstituição: %d janelas' % janelas)
    return obs


# ====================================================== Santa Cruz ===========
#
# Desenhado a partir de fotografias da Wikimedia Commons (a fachada de frente,
# a fonte da Manga de três lados) e das descrições do guia de Pedro Dias
# (Coimbra, 2002) reproduzidas no roteiro da Presidência da República: a
# fachada de 1507–1513 com as duas torres, o portal de 1522–1526, as três
# figuras sobre a porta, o arco do início do século XIX à frente; o claustro
# de cinco tramos por lado e dois pisos, com o tanque ao centro; a fonte da
# Manga com o templete e os quatro cubelos. A altura da fachada é a do LiDAR
# (`altura` do ponto 'fachada'); as proporções entre as partes, das fotografias.


def _cruz(acc, mat, c, u, n, z0, h):
    """Cruz de pedra: haste e braço, de frente para `n`."""
    acc.caixa(mat, c, u, n, -0.08, 0.08, -0.08, 0.08, z0, z0 + h)
    acc.caixa(mat, c, u, n, -h * 0.28, h * 0.28, -0.08, 0.08, z0 + h * 0.62, z0 + h * 0.74)


def _fachada_igreja(acc_ig, acc, ctx, b, H):
    """A frontaria: duas torres com coruchéus, a platibanda de cruzes, o janelão, o portal e o arco."""
    a, bb, u, n, L, idx = _face_para(b, Vector((-1, 0)))
    g = ctx.cota(*(a + u * (L / 2) + n * 3.0))
    k = L / 18.3                    # as proporções das fotografias, à largura medida
    T = 4.2 * k                     # largura de cada torre
    P, K = 'pedra-igreja', 'lavrado'
    Ht = g + H                      # topo das torres: o medido
    Hc = g + 0.69 * H               # o cordão a meio das torres
    xc = L / 2

    # --- as torres ---
    for (x0, x1) in ((0, T), (L - T, L)):
        xt = (x0 + x1) / 2
        acc_ig.caixa(P, a, u, n, x0 - 0.15, x1 + 0.15, -3.6, 0.75, g - 1.5, g + 1.2)
        acc_ig.caixa(P, a, u, n, x0, x1, -3.5, 0.6, g + 1.2, Hc)
        acc_ig.caixa(P, a, u, n, x0 - 0.12, x1 + 0.12, -3.62, 0.74, Hc, Hc + 0.45)
        acc_ig.caixa(P, a, u, n, x0 + 0.2, x1 - 0.2, -3.3, 0.4, Hc + 0.45, Ht - 0.6)
        acc_ig.caixa(P, a, u, n, x0 - 0.05, x1 + 0.05, -3.7, 0.62, Ht - 0.6, Ht)
        c = a + u * xt + n * (-1.45)
        acc_ig.cilindro(P, (c.x, c.y), T / 2 - 0.35, 0.0, Ht, Ht + 4.0, seg=8, tampa=False)
        for sx in (-1, 1):
            for sy in (-1, 1):
                p = c + u * (sx * (T / 2 - 0.3)) + n * (sy * 1.75)
                acc.cilindro(K, (p.x, p.y), 0.2, 0.0, Ht, Ht + 1.5, seg=6, tampa=False)
        _cruz(acc, P, c, u, n, Ht + 3.9, 0.9)
        # uma fresta por andar, na frente
        for z0 in (g + 0.45 * H, Hc + 1.6):
            acc.caixa(K, a, u, n, xt - 0.45, xt + 0.45, 0.6, 0.7, z0 - 0.2, z0 + 1.9)
            acc.plano('escuro', a, u, n, xt - 0.28, xt + 0.28, z0, z0 + 1.7, 0.71)

    # --- o pano do meio, mais alto do que a nave ---
    acc_ig.caixa(P, a, u, n, T, L - T, -0.9, 0.2, g - 1.5, g + 20.8 * k)
    zp = g + 20.8 * k
    acc.plano('platibanda', a, u, n, T, L - T, zp, zp + 1.2, 0.0,
              uvs=((0, 0), ((L - 2 * T) / 1.2, 0), ((L - 2 * T) / 1.2, 1), (0, 1)))
    acc.caixa(P, a, u, n, T, L - T, -0.25, 0.25, zp + 1.2, zp + 1.35)
    # o corpo central, ainda mais alto, com a cruz grande
    m = 3.2 * k
    acc_ig.caixa(P, a, u, n, xc - m, xc + m, -0.9, 0.2, zp, zp + 1.6)
    acc.plano('platibanda', a, u, n, xc - m, xc + m, zp + 1.6, zp + 2.6, 0.0,
              uvs=((0, 0), (2 * m / 1.2, 0), (2 * m / 1.2, 0.83), (0, 0.83)))
    acc.caixa(P, a, u, n, xc - m - 0.1, xc + m + 0.1, -0.3, 0.3, zp + 2.6, zp + 2.8)
    c = a + u * xc + n * (-0.1)
    _cruz(acc, P, c, u, n, zp + 2.8, 3.2)
    for s in (-1, 1):
        p = a + u * (xc + s * m) + n * (-0.1)
        acc.cilindro(K, (p.x, p.y), 0.28, 0.0, zp + 2.8, zp + 4.6, seg=6, tampa=False)
        _cruz(acc, P, p, u, n, zp + 4.5, 0.6)

    # --- o janelão, na sua moldura lavrada ---
    zj = g + 12.2 * k
    acc.caixa(K, a, u, n, xc - 1.9, xc + 1.9, 0.2, 0.55, zj - 1.0, zj + 5.9)
    acc.frontao(K, a, u, n, xc, 4.0, zj + 5.9, 1.9, 0.2, 0.55)
    p = a + u * xc + n * 0.4
    acc.cilindro(K, (p.x, p.y), 0.22, 0.0, zj + 7.7, zj + 8.8, seg=6, tampa=False)
    acc.arco('escuro', a, u, n, xc, 2.1, zj, zj + 4.7, 0.56)
    acc.arco('grade-porta', a, u, n, xc, 2.0, zj, zj + 4.6, 0.57)

    # --- o portal: o retábulo de pedra, entre dois pilares com pináculos ---
    for s in (-1, 1):
        x0 = xc + s * (xc - T + 0.45)            # à face de dentro das torres
        xa, xb = min(x0, x0 - s * 1.8), max(x0, x0 - s * 1.8)
        acc.caixa(K, a, u, n, xa, xb, 0, 1.3, g - 0.5, g + 15.6 * k)
        p = a + u * ((xa + xb) / 2) + n * 0.65
        acc.cilindro(K, (p.x, p.y), 0.7, 0.0, g + 15.6 * k, g + 18.6 * k, seg=8, tampa=False)
        _estatua(acc, p.x + n.x * 0.75, p.y + n.y * 0.75, g + 9.8 * k, 1.7, mat=K)
    acc.caixa(K, a, u, n, T + 1.3, L - T - 1.3, 0, 0.5, g - 0.3, g + 11.2 * k)
    acc.caixa(K, a, u, n, T + 1.3, L - T - 1.3, 0, 1.1, g + 11.2 * k, g + 11.7 * k)
    # as três figuras sobre a porta
    for dx in (-2.1, 0, 2.1):
        acc.arco('escuro', a, u, n, xc + dx, 1.0, g + 9.2 * k, g + 11.1 * k, 0.51)
        p = a + u * (xc + dx) + n * 0.8
        _estatua(acc, p.x, p.y, g + 9.2 * k, 1.75, mat=K)

    # --- o arco do início do século XIX, à frente da porta ---
    ys = (0.5, 2.3)
    for s in (-1, 1):
        acc.caixa(P, a, u, n, xc + min(s * 1.8, s * 3.0), xc + max(s * 1.8, s * 3.0), *ys, g - 0.4, g + 5.9)
        p = a + u * (xc + s * 2.4) + n * (ys[1] + 0.25)
        acc.cilindro(K, (p.x, p.y), 0.26, 0.24, g + 0.6, g + 5.9, seg=10)
    acc.arco_anel(P, a, u, n, xc, 1.8, 3.0, g + 5.9, *ys)
    acc.caixa(P, a, u, n, xc - 3.3, xc + 3.3, ys[0], ys[1] + 0.3, g + 8.9, g + 9.4)
    # a porta, no fundo do arco
    acc.arco('escuro', a, u, n, xc, 3.6, g, g + 7.7, 0.51)
    acc.plano('porta', a, u, n, xc - 1.3, xc + 1.3, g, g + 5.0, 0.53)
    return idx


def _fachada_cafe(acc, ctx, b):
    """A antiga igreja de São João: o arco grande envidraçado e as janelas por cima."""
    a, bb, u, n, L, idx = _face_para(b, Vector((-1, 0)))
    g = ctx.cota(*(a + u * (L / 2) + n * 2.0))
    xc = L / 2
    K = 'lavrado'
    acc.arco('janela', a, u, n, xc, 6.0, g, g + 8.0, 0.02)
    acc.arco_anel(K, a, u, n, xc, 3.0, 3.55, g + 5.0, 0, 0.35)
    for s in (-1, 1):
        acc.caixa(K, a, u, n, xc + s * 3.0, xc + s * 3.55, 0, 0.35, g - 0.3, g + 5.0)
    acc.caixa('pedra-igreja', a, u, n, 0, L, 0, 0.3, g + 8.7, g + 9.1)
    for dx in (-3.2, -1.9, 2.6):
        acc.caixa(K, a, u, n, xc + dx - 0.75, xc + dx + 0.75, 0, 0.12, g + 9.5, g + 12.5)
        acc.arco('janela', a, u, n, xc + dx, 1.1, g + 9.8, g + 12.2, 0.13)
    return idx


def _claustro(acc, ctx, b, centro):
    """O Claustro do Silêncio: cinco tramos por lado, dois pisos, contrafortes, e o tanque ao centro."""
    g = ctx.cota(*centro[:2])
    for (a, bb, u, n, L, i) in arestas(b['aneis'][1]):
        N = 5
        v = L / N
        for k in range(N):
            x = (k + 0.5) * v
            r = 0.33 * v
            acc.arco('escuro', a, u, n, x, 2 * r, g, g + 4.4, 0.03)
            acc.arco_anel('cantaria', a, u, n, x, r, r + 0.22, g + 4.4 - r, 0, 0.14)
            for s in (-1, 1):       # ombreiras
                acc.caixa('cantaria', a, u, n, x + s * r - 0.11, x + s * r + 0.11, 0, 0.14, g, g + 4.4 - r)
            c = a + u * x + n * 0.1
            acc.cilindro('cantaria', (c.x, c.y), 0.1, 0.1, g, g + 3.3, seg=8)       # mainel
            for s in (-0.22, 0.22):
                acc.arco('escuro', a, u, n, x + s * v, 0.28 * v, g + 6.0, g + 8.3, 0.03)
                acc.arco_anel('cantaria', a, u, n, x + s * v, 0.14 * v, 0.14 * v + 0.15, g + 8.3 - 0.14 * v, 0, 0.1)
        for k in range(N + 1):
            x = k * v
            acc.caixa('cantaria', a, u, n, x - 0.32, x + 0.32, 0, 0.95, g - 0.2, g + 4.9)
            acc.caixa('cantaria', a, u, n, x - 0.26, x + 0.26, 0, 0.55, g + 4.9, g + 5.6)
        acc.caixa('cantaria', a, u, n, 0, L, 0, 0.28, g + 5.2, g + 5.5)
    # o tanque com o chafariz, de 1639
    x, y = centro[0], centro[1]
    acc.cilindro('cantaria', (x, y), 2.2, 2.2, g - 0.3, g + 0.55, seg=8)
    acc.cilindro('agua', (x, y), 1.95, 1.95, g + 0.5, g + 0.57, seg=8)
    acc.cilindro('cantaria', (x, y), 0.35, 0.3, g + 0.5, g + 1.7, seg=8)
    acc.cilindro('cantaria', (x, y), 0.3, 0.95, g + 1.7, g + 2.0, seg=10)
    acc.cilindro('cantaria', (x, y), 0.14, 0.12, g + 2.0, g + 2.7, seg=8)
    acc.esfera('cantaria', (x, y, g + 2.85), 0.2, seg=8)


def _manga(acc_m, acc, ctx, b):
    """A fonte da Manga: o templete de oito colunas, os quatro cubelos na água, os arcos que os ligam.

    As posições e os raios dos cubelos e do templete saem do contorno do OSM
    (cinco círculos ligados); as alturas, das fotografias, escaladas ao
    diâmetro dos cubelos.
    """
    anel = [Vector(p) for p in b['aneis'][0]]
    C = sum(anel, Vector((0, 0))) / len(anel)
    d = [(p - C).length for p in anel]
    rc = sorted(x for x in d if x < 3.4)[len([x for x in d if x < 3.4]) // 2]     # o templete
    grupos = {}
    for p, dist in zip(anel, d):
        if dist > 4.2:
            grupos.setdefault(((p - C).x > 0, (p - C).y > 0), []).append(p)
    cubelos = []
    for pts in grupos.values():
        xs, ys = [p.x for p in pts], [p.y for p in pts]
        c = Vector(((min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2))
        r = max((max(xs) - min(xs)), (max(ys) - min(ys))) / 2
        cubelos.append((c, min(max(r, 1.4), 2.0)))
    # Os eixos das escadas são as bissectrizes entre cubelos.
    # Média circular de 4θ: os quatro ângulos são o mesmo a menos de 90°.
    ang = [math.atan2((c - C).y, (c - C).x) - math.pi / 4 for c, _ in cubelos]
    eixo = math.atan2(sum(math.sin(4 * x) for x in ang), sum(math.cos(4 * x) for x in ang)) / 4
    E = [Vector((math.cos(eixo + q * math.pi / 2), math.sin(eixo + q * math.pi / 2))) for q in range(4)]

    g = ctx.cota(C.x, C.y)              # o chão do jardim
    Y, W = 'reboco-amarelo', 'pedra-cinza'
    # A água não se modela aqui: são os canais que o OSM desenha, pintados
    # no chão (ver `chao.py`). Ficam os passadiços dos eixos, com guardas
    # baixas, e as escadas até ao estrado do templete.
    meio = max((c - C).length for c, _ in cubelos) * 0.72 + 2.6
    fundo = g - 1.1
    for q in range(4):
        e, l = E[q], E[(q + 1) % 4]
        acc.caixa('cantaria', C, e, l, rc, meio, -1.2, 1.2, fundo, g + 0.05)
        for s in (-1, 1):
            acc.caixa('cantaria', C, e, l, rc + 1.8, meio, s * 1.2 - 0.15, s * 1.2 + 0.15, g, g + 0.45)
        for k in range(6):
            acc.caixa('cantaria', C, e, l, rc + 1.8 - (k + 1) * 0.3, rc + 1.8 - k * 0.3, -0.9, 0.9, g - 0.2, g + (k + 1) * 0.2)

    # --- o templete ---
    acc_m.cilindro('pedra-cinza', (C.x, C.y), rc, rc, fundo, g + 1.2, seg=24)
    ri = rc - 0.4
    for k in range(8):
        t = eixo + math.pi / 8 + k * math.pi / 4
        p = C + Vector((math.cos(t), math.sin(t))) * ri
        acc.cilindro('cantaria', (p.x, p.y), 0.2, 0.2, g + 1.2, g + 1.45, seg=8)
        acc.cilindro('cantaria', (p.x, p.y), 0.16, 0.14, g + 1.45, g + 4.3, seg=10)
        acc.cilindro('cantaria', (p.x, p.y), 0.2, 0.22, g + 4.3, g + 4.5, seg=8)
    acc_m.cilindro('cantaria', (C.x, C.y), rc, rc, g + 4.5, g + 5.1, seg=24)
    acc_m.cupula(W, (C.x, C.y, g + 5.1), rc - 0.15, 1.9, seg=20)
    acc_m.cilindro(Y, (C.x, C.y), 0.6, 0.6, g + 6.9, g + 8.0, seg=12)
    acc_m.cilindro('cantaria', (C.x, C.y), 0.72, 0.72, g + 8.0, g + 8.15, seg=12)
    acc_m.cilindro(W, (C.x, C.y), 0.7, 0.0, g + 8.15, g + 9.0, seg=12, tampa=False)
    acc.esfera('cantaria', (C.x, C.y, g + 9.1), 0.12, seg=8)

    # --- os cubelos ---
    for c, r in cubelos:
        topo = g + 5.2 * r / 1.7
        acc_m.cilindro(Y, (c.x, c.y), r, r, fundo, topo, seg=20)
        acc_m.cilindro('cantaria', (c.x, c.y), r + 0.18, r + 0.18, topo, topo + 0.3, seg=20)
        acc_m.cilindro(W, (c.x, c.y), r + 0.12, 0.72, topo + 0.3, topo + 1.8, seg=20, tampa=False)
        acc_m.cilindro(Y, (c.x, c.y), 0.62, 0.62, topo + 1.7, topo + 2.9, seg=12)
        acc_m.cilindro('cantaria', (c.x, c.y), 0.78, 0.78, topo + 2.9, topo + 3.05, seg=12)
        acc_m.cilindro(W, (c.x, c.y), 0.72, 0.0, topo + 3.05, topo + 3.9, seg=12, tampa=False)
        acc.esfera('cantaria', (c.x, c.y, topo + 3.98), 0.1, seg=8)
        # a fresta, virada para fora
        f = (c - C).normalized()
        t = Vector((-f.y, f.x))
        acc.caixa('cantaria', c + f * (r - 0.05), t, f, -0.42, 0.42, 0, 0.14, g + 1.6, g + 3.9)
        acc.plano('escuro', c + f * (r - 0.05), t, f, -0.22, 0.22, g + 1.8, g + 3.7, 0.15)
        # o arco que sobe do cubelo ao templete
        ini = c - f * r
        fim = C + f * rc
        comp = (fim - ini).length
        z0, z1 = topo - 0.3, g + 5.0
        seg = 8
        for s in range(seg):
            t0, t1 = s / seg, (s + 1) / seg
            za = z0 + (z1 - z0) * t0 + 1.1 * math.sin(math.pi * t0)
            zb = z0 + (z1 - z0) * t1 + 1.1 * math.sin(math.pi * t1)
            acc.caixa('cantaria', ini, -f, t, comp * t0, comp * t1, -0.18, 0.18, za - 0.35, za, z1b=zb, z0b=zb - 0.35)


def _pormenores_santa_cruz(ctx, mats):
    acc = Acumulador(mats)
    pontos = {p['id']: p for p in ctx.cena['pontos']}
    por_osm = {b['osm']: b for b in ctx.edificios}
    obs = []

    # O que acende com a igreja (as torres, o pano da fachada) e com a Manga.
    acc_ig = Acumulador(mats)
    acc_m = Acumulador(mats)
    fa = _fachada_igreja(acc_ig, acc, ctx, por_osm[IGREJA], pontos['fachada']['altura'])
    ca = _fachada_cafe(acc, ctx, por_osm[CAFE])
    _claustro(acc, ctx, por_osm[MOSTEIRO], pontos['claustro']['p'])
    _manga(acc_m, acc, ctx, por_osm[MANGA])

    janelas = _fachadas(
        acc, ctx,
        saltar={MANGA},
        sem_cornija={(IGREJA, 0, fa), (MOSTEIRO, 1)},
        sem_janelas={(MOSTEIRO, 1)},
        PE={MOSTEIRO: 4.5, IGREJA: None, CAFE: None},
    )
    obs += acc.criar('Rico_')
    obs += acc_ig.criar('Edif_conjunto_' + IGREJA.replace('/', '_') + '_')
    obs += acc_m.criar('Edif_conjunto_' + MANGA.replace('/', '_') + '_')
    print('reconstituição: %d janelas' % janelas)
    return obs


# ======================================================= Sé Velha ===========
#
# Desenhada a partir de fotografias da Wikimedia Commons (a fachada poente de
# frente, a fachada norte com a Porta Especiosa, a cabeceira e a lanterna de
# nascente) e da descrição da Universidade de Coimbra (UniverCidade, a partir
# de M. L. Craveiro, 2011, e do SIPA): três naves de cinco tramos e um
# transepto curto; a torre-lanterna quadrangular sobre o cruzeiro; a porta
# principal e o janelão por cima dela, com as arquivoltas em concha; a Porta
# Especiosa em três registos sobrepostos, com a loggia; o claustro gótico de
# um só piso, cinco tramos de ogiva por lanço, os tímpanos com rosáceas.
#
# As cotas são as do LiDAR (o `lidar` que o gerador guarda da catedral e do
# claustro, e as alturas dos pontos): o topo das ameias da fachada, o telhado
# da nave, o terraço e o pico da lanterna, o beirado da ábside. O que o laser
# não vê — o número de merlões, as colunelos de uma janela, os registos da
# Especiosa — é desenho informado pelas fotografias, à escala do medido.


def _amostras(b, pred, xy=False):
    """Os valores do MDS guardados pelo gerador que caem onde `pred(x, y)`."""
    L = b['lidar']
    out = []
    for r in range(L['nRow']):
        for c in range(L['nCol']):
            x, y = L['x0'] + c * L['passo'], L['y0'] + r * L['passo']
            v = L['mds'][r * L['nCol'] + c]
            if v and pred(x, y):
                out.append((v, x, y) if xy else v)
    return out


def _pct(v, p):
    s = sorted(v)
    return s[min(len(s) - 1, max(0, int(round(p * (len(s) - 1)))))]


def _cortar(anel, a, b, c):
    """O anel cortado pelo semiplano a·x + b·y ≤ c (Sutherland–Hodgman), sem vértices repetidos."""
    out = []
    n = len(anel)
    for i in range(n):
        P, Q = anel[i], anel[(i + 1) % n]
        fp, fq = a * P[0] + b * P[1] - c, a * Q[0] + b * Q[1] - c
        if fp <= 0:
            out.append((P[0], P[1]))
        if (fp < 0 < fq) or (fq < 0 < fp):
            t = fp / (fp - fq)
            out.append((P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])))
    lim = []
    for p in out:
        if not lim or math.hypot(p[0] - lim[-1][0], p[1] - lim[-1][1]) > 0.02:
            lim.append(p)
    if len(lim) > 1 and math.hypot(lim[0][0] - lim[-1][0], lim[0][1] - lim[-1][1]) < 0.02:
        lim.pop()
    return lim


class _Eixo:
    """O referencial da igreja: `s` ao longo da nave, para nascente; `t` para norte."""

    def __init__(self, anel):
        maior = max(arestas(anel), key=lambda e: e[4])
        u = maior[2] if maior[2].x > 0 else -maior[2]
        self.u = Vector((u.x, u.y))
        self.v = Vector((-u.y, u.x))

    def st(self, p):
        P = Vector((p[0], p[1]))
        return (P.dot(self.u), P.dot(self.v))

    def xy(self, s, t):
        return self.u * s + self.v * t

    def anel_st(self, anel):
        return [self.st(p) for p in anel]

    def anel_xy(self, anel):
        return [tuple(self.xy(s, t)) for s, t in anel]

    def caixa_st(self, s0, s1, t0, t1):
        """Rectângulo em (s, t), anti-horário, em coordenadas da maqueta."""
        return [tuple(self.xy(s, t)) for s, t in ((s0, t0), (s1, t0), (s1, t1), (s0, t1))]


def _arco_da_abside(anel):
    """Os índices do arco da ábside: a maior sequência de arestas curtas a virar para fora (como o gerador)."""
    N = len(anel)
    convexo = _convexos(anel)
    curta = lambda i: math.hypot(anel[(i + 1) % N][0] - anel[i][0], anel[(i + 1) % N][1] - anel[i][1]) < 3
    melhor = []
    for i0 in range(N):
        run = []
        k = 0
        while k < N and curta((i0 + k) % N) and convexo[(i0 + k + 1) % N]:
            run.append((i0 + k + 1) % N)
            k += 1
        if len(run) > len(melhor):
            melhor = run
    return melhor


def _ameias(acc, mat, a, u, n, L, z0, z1, esp=0.6, larg=0.95, vao=0.7, ponta=0.0):
    """Merlões ao longo de uma aresta (de `a`, na direcção `u`), assentes em z0 até z1, para dentro de `n`."""
    if L < larg:
        return
    k = max(1, int((L - larg + vao) // (larg + vao)) + 1)
    passo = (L - larg) / (k - 1) if k > 1 else 0
    for i in range(k):
        x = (L - larg) / 2 if k == 1 else i * passo
        acc.caixa(mat, a, u, n, x, x + larg, -esp, 0.02 + ponta, z0, z1)


def _janela_romanica(acc, o, u, n, xc, largura, z0, z1, y, aneis=1, colunelos=True, vidro='vitral', mat='pedra-se', passo=0.24):
    """Janela de volta perfeita, com arquivoltas e colunelos, rasgada numa face."""
    r = largura / 2
    zs = z1 - r
    acc.arco(vidro, o, u, n, xc, largura, z0, z1, y + 0.01)
    for k in range(aneis):
        r0 = r + 0.05 + passo * k
        acc.arco_anel(mat, o, u, n, xc, r0, r0 + passo - 0.04, zs, y, y + 0.1 + 0.06 * k)
        if colunelos:
            for s in (-1, 1):
                c = Vector((o[0], o[1])) + Vector((u[0], u[1])) * (xc + s * (r0 + 0.1)) + Vector((n[0], n[1])) * (y + 0.1)
                acc.cilindro(mat, (c.x, c.y), 0.075, 0.075, z0, zs, seg=8)
                acc.caixa(mat, o, u, n, xc + s * (r0 + 0.1) - 0.13, xc + s * (r0 + 0.1) + 0.13, y, y + 0.24, zs - 0.18, zs)
    acc.caixa(mat, o, u, n, xc - r - 0.3 - passo * (aneis - 1), xc + r + 0.3 + passo * (aneis - 1), y, y + 0.16, z0 - 0.2, z0)


def _fachada_se(acc, ctx, o, u, n, L, g, H):
    """A fachada poente, no corpo saliente: a porta principal, a arcaria de arquinhos, o janelão.

    A porta e o janelão têm as arquivoltas em sequência, 'como uma concha'
    (UniverCidade); as proporções, das fotografias de frente, à altura medida.
    """
    K = 'pedra-se'
    xc = L / 2
    # o avant-corps da porta, a sair da parede
    acc.caixa(K, o, u, n, xc - 2.9, xc + 2.9, 0, 0.6, g - 0.5, g + 0.47 * H)
    zs = g + 0.36 * H - 1.15                        # nascença do arco da porta
    acc.arco('escuro', o, u, n, xc, 2.3, g, g + 0.36 * H, 0.61)
    acc.plano('porta', o, u, n, xc - 1.05, xc + 1.05, g, zs, 0.62)
    for k in range(4):
        r0 = 1.18 + 0.33 * k
        acc.arco_anel(K, o, u, n, xc, r0, r0 + 0.3, zs, 0.6, 0.68 + 0.07 * k)
        for s in (-1, 1):
            c = Vector((o[0], o[1])) + Vector((u[0], u[1])) * (xc + s * (r0 + 0.15)) + Vector((n[0], n[1])) * 0.72
            acc.cilindro(K, (c.x, c.y), 0.13, 0.13, g + 0.35, zs - 0.25, seg=10)
            acc.caixa(K, o, u, n, xc + s * (r0 + 0.15) - 0.2, xc + s * (r0 + 0.15) + 0.2, 0.6, 0.92, zs - 0.28, zs)
            acc.caixa(K, o, u, n, xc + s * (r0 + 0.15) - 0.2, xc + s * (r0 + 0.15) + 0.2, 0.6, 0.92, g - 0.2, g + 0.35)
    # a arcaria de arquinhos sobre mísulas, que serve de peitoril ao janelão
    zb0, zb1 = g + 0.47 * H, g + 0.53 * H
    acc.caixa(K, o, u, n, xc - 3.1, xc + 3.1, 0, 0.75, zb1 - 0.3, zb1)
    k = 9
    for i in range(k):
        x = xc - 2.8 + (i + 0.5) * 5.6 / k
        acc.arco('escuro', o, u, n, x, 0.42, zb0 + 0.2, zb1 - 0.32, 0.61)
        acc.arco_anel(K, o, u, n, x, 0.21, 0.3, zb1 - 0.53, 0.6, 0.72)
    for i in range(k + 1):
        x = xc - 2.8 + i * 5.6 / k
        acc.caixa(K, o, u, n, x - 0.1, x + 0.1, 0.6, 0.78, zb0, zb1 - 0.3)
    # o janelão
    z0, z1 = g + 0.56 * H, g + 0.76 * H
    acc.caixa(K, o, u, n, xc - 2.7, xc + 2.7, 0, 0.35, zb1, g + 0.88 * H)
    _janela_romanica(acc, o, u, n, xc, 1.7, z0, z1, 0.35, aneis=3, passo=0.36)


def _janela_geminada(acc, o, u, n, xc, z0, z1, y):
    """As janelas geminadas dos panos da fachada: dois vãos de volta perfeita e três colunelos."""
    K = 'pedra-se'
    for dx in (-0.46, 0.46):
        acc.arco('vitral', o, u, n, xc + dx, 0.56, z0, z1, y + 0.01)
        acc.arco_anel(K, o, u, n, xc + dx, 0.3, 0.44, z1 - 0.28, y, y + 0.12)
    for dx in (-0.8, 0, 0.8):
        c = Vector((o[0], o[1])) + Vector((u[0], u[1])) * (xc + dx) + Vector((n[0], n[1])) * (y + 0.1)
        acc.cilindro(K, (c.x, c.y), 0.08, 0.08, z0, z1 - 0.28, seg=8)
    acc.arco_anel(K, o, u, n, xc, 0.95, 1.15, z1 - 0.28, y, y + 0.08)
    acc.caixa(K, o, u, n, xc - 1.3, xc + 1.3, y, y + 0.18, z0 - 0.22, z0)


def _especiosa(acc, ctx, o, u, n, L, g, topo):
    """A Porta Especiosa: calcário branco em três registos — o portal, a loggia, o ático — e o remate.

    Proporções da fotografia de frente, na largura da saliência que o OSM
    desenha e do chão da rua ao alto das ameias vizinhas.
    """
    E, K = 'especiosa', 'pedra-se'
    Hs = topo - g
    xc = L / 2
    zD = g + 0.11 * Hs                                 # soleira, no alto da escadaria
    z1, z2, z3 = g + 0.47 * Hs, g + 0.66 * Hs, g + 0.86 * Hs
    V, U = Vector((n[0], n[1])), Vector((u[0], u[1]))
    O = Vector((o[0], o[1]))
    # a escadaria, a sair para a rua
    N = 8
    for i in range(N):
        acc.caixa(K, o, u, n, 0.5, L - 0.5, 0.4, 0.4 + (N - i) * 0.36, g - 0.6, g + (i + 1) * (zD - g) / N)
    # --- 1.º registo: o portal ---
    acc.caixa(E, o, u, n, 0.05, L - 0.05, 0, 0.4, g - 0.3, z1)
    for x in (0.4, L - 0.4):
        acc.caixa(E, o, u, n, x - 0.38, x + 0.38, 0.4, 0.8, zD, z1 - 0.55)
        acc.caixa(E, o, u, n, x - 0.45, x + 0.45, 0.4, 0.88, zD, zD + 0.6)
    zs = zD + 0.25 * Hs
    acc.arco('escuro', o, u, n, xc, 2.7, zD, zs + 1.35, 0.41)
    acc.plano('porta', o, u, n, xc - 1.1, xc + 1.1, zD, zs, 0.42)
    acc.arco_anel(E, o, u, n, xc, 1.35, 1.75, zs, 0.4, 0.62)
    acc.oculo(E, o, u, n, xc, zs + 0.72, 0.28, 0.42, 0.41, 0.5)
    for s in (-1, 1):
        acc.caixa(E, o, u, n, xc + s * 1.75 - 0.2, xc + s * 1.75 + 0.2, 0.4, 0.66, zD, zs)
        x = xc + s * 2.28                              # os nichos com as estátuas
        acc.arco('escuro', o, u, n, x, 0.78, zD + 1.5, zD + 3.9, 0.41)
        acc.arco_anel(E, o, u, n, x, 0.39, 0.52, zD + 3.51, 0.4, 0.55)
        c = O + U * x + V * 0.62
        acc.caixa(E, o, u, n, x - 0.3, x + 0.3, 0.4, 0.8, zD + 1.3, zD + 1.5)
        _estatua(acc, c.x, c.y, zD + 1.5, 1.8, mat=E)
    acc.caixa(E, o, u, n, -0.15, L + 0.15, 0, 0.95, z1 - 0.55, z1)
    # --- 2.º registo: a loggia ---
    acc.plano('escuro', o, u, n, 0.9, L - 0.9, z1, z2 - 0.6, 0.41)
    acc.caixa(E, o, u, n, 0.15, 0.9, 0, 0.85, z1, z2)
    acc.caixa(E, o, u, n, L - 0.9, L - 0.15, 0, 0.85, z1, z2)
    for k in range(4):
        x = 0.9 + 0.35 + k * (L - 2.5) / 3
        c = O + U * x + V * 0.7
        acc.cilindro(E, (c.x, c.y), 0.2, 0.2, z1, z1 + 0.25, seg=10)
        acc.cilindro(E, (c.x, c.y), 0.16, 0.14, z1 + 0.25, z2 - 0.85, seg=10)
        acc.caixa(E, o, u, n, x - 0.24, x + 0.24, 0.46, 0.94, z2 - 0.85, z2 - 0.6)
    # a balaustrada
    x = 0.95
    while x < L - 0.95:
        c = O + U * x + V * 0.75
        acc.cilindro(E, (c.x, c.y), 0.05, 0.08, z1 + 0.1, z1 + 0.9, seg=6)
        x += 0.24
    acc.caixa(E, o, u, n, 0.9, L - 0.9, 0.6, 0.9, z1 + 0.9, z1 + 1.05)
    acc.caixa(E, o, u, n, -0.1, L + 0.1, 0, 0.85, z2 - 0.6, z2)
    # --- 3.º registo: o ático, com três nichos ---
    acc.caixa(E, o, u, n, 1.0, L - 1.0, 0, 0.45, z2, z3)
    for dx in (-1.2, 0, 1.2):
        acc.arco('escuro', o, u, n, xc + dx, 0.72, z2 + 0.45, z3 - 0.55, 0.46)
        acc.arco_anel(E, o, u, n, xc + dx, 0.36, 0.5, z3 - 0.91, 0.45, 0.58)
        c = O + U * (xc + dx) + V * 0.55
        _estatua(acc, c.x, c.y, z2 + 0.5, 1.2, mat=E)
    for dx in (-1.8, -0.6, 0.6, 1.8):
        acc.caixa(E, o, u, n, xc + dx - 0.12, xc + dx + 0.12, 0.45, 0.6, z2, z3 - 0.35)
    acc.caixa(E, o, u, n, 0.85, L - 0.85, 0, 0.7, z3 - 0.35, z3)
    # --- o remate: o arco triunfal, com um nicho, e os pináculos ---
    zr = z3 + 0.05
    acc.caixa(E, o, u, n, xc - 1.25, xc + 1.25, 0.05, 0.45, z3, zr + 0.6)
    acc.arco_anel(E, o, u, n, xc, 0.8, 1.2, zr + 0.6, 0.05, 0.45)
    acc.arco('escuro', o, u, n, xc, 1.3, zr + 0.05, zr + 1.2, 0.46)
    for x in (1.1, L - 1.1, xc):
        c = O + U * x + V * 0.35
        zb = z3 if x != xc else zr + 1.8
        acc.cilindro(E, (c.x, c.y), 0.16, 0.2, zb, zb + 0.45, seg=8)
        acc.esfera(E, (c.x, c.y, zb + 0.62), 0.2, seg=8)
    # o torreão redondo ao lado da loggia
    c = O + U * (L + 0.25) + V * 0.3
    acc.cilindro(E, (c.x, c.y), 0.5, 0.5, z1 - 0.6, z2 + 0.2, seg=12)
    acc.cilindro(E, (c.x, c.y), 0.58, 0.58, z2 + 0.2, z2 + 0.35, seg=12)
    acc.cupula(E, (c.x, c.y, z2 + 0.35), 0.5, 0.55, seg=12, aneis=4)
    acc.esfera(E, (c.x, c.y, z2 + 1.0), 0.12, seg=8)


def _lanterna(acc, C, u, v, S, z0, zA, Tt, T):
    """A torre-lanterna do cruzeiro: arcaria em baixo, dois janelões por face, varandim, pináculos e cúpula."""
    K = 'pedra-se'
    h = S / 2
    acc.caixa(K, C, u, v, -h, h, -h, h, z0, Tt)
    acc.caixa(K, C, u, v, -h - 0.15, h + 0.15, -h - 0.15, h + 0.15, zA - 0.25, zA)
    zw0, zw1 = zA + 0.7, Tt - 1.35
    for d in (u, v, -u, -v):
        al = Vector((-d.y, d.x))
        # lesenas nos cunhais
        for s in (-1, 1):
            acc.caixa(K, C, al, d, s * (h - 0.35) - 0.35, s * (h - 0.35) + 0.35, h, h + 0.12, z0, Tt - 0.6)
        # a arcaria baixa, por cima dos telhados
        k = 5
        for i in range(k):
            x = -h + 0.9 + (i + 0.5) * (2 * h - 1.8) / k
            acc.arco('escuro', C, al, d, x, 0.62, zA - 2.1, zA - 0.45, h + 0.01)
            acc.arco_anel(K, C, al, d, x, 0.31, 0.43, zA - 0.76, h, h + 0.1)
        # dois janelões por face
        for x in (-h / 2, h / 2):
            acc.caixa(K, C, al, d, x - 1.05, x + 1.05, h, h + 0.1, zw0 - 0.3, zw1 + 0.35)
            _janela_romanica(acc, C, al, d, x, 1.15, zw0, zw1, h + 0.1, aneis=2)
        # a cornija sobre mísulas
        acc.caixa(K, C, al, d, -h - 0.35, h + 0.35, h - 0.2, h + 0.38, Tt - 0.55, Tt)
        x = -h + 0.3
        while x < h - 0.2:
            acc.caixa(K, C, al, d, x - 0.08, x + 0.08, h, h + 0.3, Tt - 0.85, Tt - 0.55)
            x += 0.62
        # o varandim de ferro
        acc.plano('grade', C, al, d, -(h - 0.95), h - 0.95, Tt, Tt + 0.95, h - 0.15,
                  uvs=((0, 0), ((2 * h - 1.9) / 2, 0), ((2 * h - 1.9) / 2, 1), (0, 1)))
    # os pináculos dos cantos
    for su in (-1, 1):
        for sv in (-1, 1):
            c = Vector((C[0], C[1])) + u * (su * (h - 0.45)) + v * (sv * (h - 0.45))
            acc.caixa(K, c, u, v, -0.42, 0.42, -0.42, 0.42, Tt, Tt + 0.95)
            acc.cilindro(K, (c.x, c.y), 0.34, 0.0, Tt + 0.95, Tt + 3.1, seg=4, tampa=False)
            acc.esfera(K, (c.x, c.y, Tt + 3.18), 0.12, seg=8)
    # a cúpula de escamas, o tambor e a cupulazinha, até ao pico medido
    acc.cupula('escamas', (C[0], C[1], Tt), h - 1.05, 1.55, seg=24, aneis=7)
    acc.cilindro(K, (C[0], C[1]), 0.95, 0.95, Tt + 1.2, Tt + 2.85, seg=16)
    for i in range(6):
        t = 2 * math.pi * i / 6
        d = Vector((math.cos(t), math.sin(t)))
        acc.plano('escuro', Vector((C[0], C[1])) + d * 0.955, Vector((-d.y, d.x)), d, -0.13, 0.13, Tt + 1.65, Tt + 2.45, 0)
    acc.cilindro(K, (C[0], C[1]), 1.1, 1.1, Tt + 2.85, Tt + 3.0, seg=16)
    acc.cupula('escamas', (C[0], C[1], Tt + 3.0), 1.0, 0.75, seg=16, aneis=5)
    acc.cilindro(K, (C[0], C[1]), 0.13, 0.09, Tt + 3.7, Tt + 4.15, seg=8)
    acc.esfera(K, (C[0], C[1], Tt + 4.25), 0.15, seg=8)
    acc.cilindro('ferro', (C[0], C[1]), 0.03, 0.03, Tt + 4.35, max(T + 0.3, Tt + 5.0), seg=6)
    _cruz(acc, 'ferro', Vector((C[0], C[1])), u, v, max(T + 0.3, Tt + 5.0) - 0.9, 0.7)


def _telhado_quatro(acc, E, s0, s1, t0, t1, ze, zr, ao_longo='s', quadril=(True, False)):
    """Telhado de duas águas com a cumeeira ao longo de `s` (ou de `t`) e tacaniça numa ou nas duas pontas.

    `quadril` diz em que pontas há tacaniça (início, fim); onde não há, fecha
    uma empena de pedra (a que encosta à lanterna).
    """
    T, K = 'telha', 'pedra-se'
    if ao_longo == 's':
        P = lambda a, b, z: tuple(E.xy(a, b)) + (z,)
        a0, a1, b0, b1 = s0, s1, t0, t1
        ax, bx = E.u, E.v
    else:
        P = lambda a, b, z: tuple(E.xy(b, a)) + (z,)
        a0, a1, b0, b1 = t0, t1, s0, s1
        ax, bx = E.v, E.u
    bm = (b0 + b1) / 2
    meia = (b1 - b0) / 2
    r0 = a0 + (meia if quadril[0] else 0)
    r1 = a1 - (meia if quadril[1] else 0)
    if r1 < r0:
        r0 = r1 = (a0 + a1) / 2
    cima = Vector((0, 0, 1))
    b3, a3 = Vector((bx.x, bx.y, 0)), Vector((ax.x, ax.y, 0))
    acc.face(T, [P(a0, b0, ze), P(a1, b0, ze), P(r1, bm, zr), P(r0, bm, zr)], cima - b3)
    acc.face(T, [P(a1, b1, ze), P(a0, b1, ze), P(r0, bm, zr), P(r1, bm, zr)], cima + b3)
    for (a, r, sinal, q) in ((a0, r0, -1, quadril[0]), (a1, r1, 1, quadril[1])):
        pts = [P(a, b0, ze), P(a, b1, ze), P(r, bm, zr)]
        acc.face(T if q else K, pts, (cima if q else Vector()) + a3 * sinal)


def _abside(acc, ctx, anel, se, ze, zc, apice, arco, janelas=True):
    """Uma parte da cabeceira: paredes, cornija sobre cachorros, meias-colunas no arco, janelas e o telhado em leque."""
    K = 'pedra-se'
    base = min(ctx.cota(*p) for p in anel) - 1.5
    acc.prisma(K, anel, base, ze)
    # o telhado: cada aresta do anel sobe ao ápice (meio cone sobre o arco)
    A = (apice[0], apice[1], zc)
    for i in range(len(anel)):
        a, b = anel[i], anel[(i + 1) % len(anel)]
        d = Vector((b[0] - a[0], b[1] - a[1]))
        if d.length < 0.05:
            continue
        fora = Vector((d.y, -d.x, 0)).normalized() + Vector((0, 0, 1))
        acc.face('telha', [(a[0], a[1], ze), (b[0], b[1], ze), A], fora)
    for (a, bb, u, n, L, i) in arestas(anel):
        m = (a + bb) / 2
        if ctx.ocupado(m.x + n.x * 0.7, m.y + n.y * 0.7, excepto=se) or L < 0.8:
            continue
        if (m - Vector(apice[:2])).length < 0.3 or abs((m - Vector(apice[:2])).dot(n)) < 0.2:
            continue            # a aresta que encosta à nave (o ápice está nela)
        g = min(ctx.cota(*(a + n * 0.6)), ctx.cota(*(bb + n * 0.6)))
        # cornija sobre cachorros
        acc.caixa(K, a, u, n, -0.1, L + 0.1, 0, 0.42, ze - 0.28, ze + 0.02)
        x = 0.3
        while x < L - 0.2:
            acc.caixa(K, a, u, n, x - 0.09, x + 0.09, 0, 0.32, ze - 0.62, ze - 0.28)
            x += 0.62
        # friso e janela
        acc.caixa(K, a, u, n, 0, L, 0, 0.12, ze - 3.9, ze - 3.72)
        if janelas and L >= 1.7:
            _janela_romanica(acc, a, u, n, L / 2, 0.62, ze - 3.6, ze - 1.3, 0.01, aneis=1)
        acc.caixa(K, a, u, n, 0, L, -0.02, 0.1, base, g + 0.9)
    # meias-colunas nos vértices do arco
    for j in arco:
        p = anel[j]
        g = ctx.cota(*p)
        acc.cilindro(K, (p[0], p[1]), 0.26, 0.26, g + 0.8, ze - 0.62, seg=12)
        acc.caixa(K, Vector((p[0], p[1])), Vector((1, 0)), Vector((0, 1)), -0.32, 0.32, -0.32, 0.32, ze - 0.95, ze - 0.62)


def _claustro_se(acc, ctx, b, fonte):
    """O claustro: cinco tramos de ogiva por lanço, cada um com dois arquinhos, o mainel e a rosácea no tímpano."""
    K = 'pedra-se'
    Rc = b['beirado']
    g = ctx.cota(*fonte[:2])
    for (a, bb, u, n, L, i) in arestas(b['aneis'][1]):
        N = 5
        v = L / N
        w = 0.74 * v
        zs = g + 2.5
        for k in range(N):
            x = (k + 0.5) * v
            acc.ogiva('escuro', a, u, n, x, w, g + 0.75, zs, 0.02)
            acc.ogiva_anel(K, a, u, n, x, w, 0.24, zs, 0, 0.2)
            acc.caixa(K, a, u, n, x - w / 2, x + w / 2, 0, 0.3, g - 0.2, g + 0.75)     # o peitoril
            c = a + u * x + n * 0.1
            acc.cilindro(K, (c.x, c.y), 0.1, 0.1, g + 0.75, zs + 0.2, seg=8)           # mainel
            for s in (-1, 1):
                acc.ogiva_anel(K, a, u, n, x + s * w / 4, w / 2 - 0.22, 0.1, zs, 0.02, 0.16)
            acc.oculo(K, a, u, n, x, zs + 0.866 * w * 0.64, 0.15 * w, 0.15 * w + 0.12, 0.02, 0.16)
        for k in range(N + 1):
            x = k * v
            acc.caixa(K, a, u, n, x - 0.34, x + 0.34, 0, 0.8, g - 0.2, zs + 1.7)
            acc.caixa(K, a, u, n, x - 0.28, x + 0.28, 0, 0.5, zs + 1.7, zs + 2.3)
        acc.caixa(K, a, u, n, -0.2, L + 0.2, 0, 0.32, Rc - 0.45, Rc - 0.12)
        acc.caixa(K, a, u, n, 0, L, -0.45, 0.02, Rc - 0.05, Rc + 0.8)                  # a guarda do terraço
    # o fontanário
    x, y = fonte[0], fonte[1]
    o, uu, nn = Vector((x, y)), Vector((1, 0)), Vector((0, 1))
    acc.caixa('especiosa', o, uu, nn, -0.95, 0.95, -0.95, 0.95, g - 0.2, g + 0.55)
    acc.face('agua', [(x - 0.8, y - 0.8, g + 0.5), (x + 0.8, y - 0.8, g + 0.5), (x + 0.8, y + 0.8, g + 0.5), (x - 0.8, y + 0.8, g + 0.5)], Z)
    acc.cilindro('especiosa', (x, y), 0.18, 0.15, g + 0.5, g + 1.35, seg=10)
    acc.cilindro('especiosa', (x, y), 0.2, 0.55, g + 1.35, g + 1.55, seg=12)
    acc.esfera('especiosa', (x, y, g + 1.72), 0.15, seg=8)


def _pormenores_se_velha(ctx, mats):
    por_osm = {b['osm']: b for b in ctx.edificios}
    se, cl = por_osm[SE], por_osm[CLAUSTRO_SE]
    pontos = {p['id']: p for p in ctx.cena['pontos']}
    acc = Acumulador(mats)          # o que não acende: os pormenores da cidade à volta
    acc_se = Acumulador(mats)       # a catedral
    acc_cl = Acumulador(mats)       # as arcarias do claustro
    K = 'pedra-se'
    anel = se['aneis'][0]
    E = _Eixo(anel)
    u3, v3 = E.u, E.v
    dentro_se = lambda x, y: dentro(x, y, anel)

    # --- as faces do contorno, no referencial da igreja ---
    faces = []
    for (a, bb, u, n, L, i) in arestas(anel):
        sa, ta = E.st(a)
        sb, tb = E.st(bb)
        faces.append({'a': a, 'b': bb, 'u': u, 'n': n, 'L': L, 's': (min(sa, sb), max(sa, sb)),
                      't': (min(ta, tb), max(ta, tb)), 'nv': n.dot(E.v), 'nu': n.dot(E.u)})
    meio = lambda f, k: sum(f[k]) / 2
    norte = [f for f in faces if f['nv'] > 0.8 and f['L'] > 2]
    sul = [f for f in faces if f['nv'] < -0.8 and f['L'] > 2]
    poente = sorted([f for f in faces if f['nu'] < -0.8 and f['L'] > 2], key=lambda f: meio(f, 's'))
    parede_sul = max(faces, key=lambda f: f['L'])       # a parede sul da nave, a aresta mais comprida
    tS = meio(parede_sul, 't')
    transN = max(norte, key=lambda f: meio(f, 't'))     # a face norte do braço do transepto, a mais a norte
    tTN, (sT0, sT1) = meio(transN, 't'), transN['s']
    transS = min(sul, key=lambda f: meio(f, 't'))       # a face sul do outro braço
    tTS, (sTS0, sTS1) = meio(transS, 't'), transS['s']
    bloco = poente[0]                                   # o corpo saliente da fachada, o mais a poente
    sB, (tB0, tB1) = meio(bloco, 's'), bloco['t']
    panos = [f for f in poente[1:] if meio(f, 's') < sB + 6]
    sW = sum(meio(f, 's') for f in panos) / len(panos)
    sX = sT1 + 0.2                                      # daqui para nascente, a cabeceira
    esp = pontos['porta-especiosa']['p']
    fE = min(norte, key=lambda f: ((f['a'] + f['b']) / 2 - Vector(esp[:2])).length)
    parede_norte = [f for f in norte if f is not fE and f is not transN and f['s'][0] > sW - 0.5 and f['s'][1] < sT0 + 0.5]
    tN = meio(max(parede_norte, key=lambda f: f['L']), 't')   # a parede norte da nave
    tNmin = min(meio(f, 't') for f in parede_norte)

    # --- as cotas medidas ---
    gF = pontos['fachada']['p'][2]
    M_alto = gF + pontos['fachada']['altura']          # topo das ameias do corpo da porta e das torres
    M_lado = M_alto - 1.0                               # as dos panos e das paredes da nave
    Pw = M_lado - 1.6                                   # o adarve
    T = pontos['lanterna']['p'][2]                      # o pico da lanterna
    naveV = _amostras(se, lambda x, y: dentro_se(x, y) and sW + 2 < E.st((x, y))[0] < sT0 - 2
                      and tS + 2 < E.st((x, y))[1] < tN - 2)
    ze_tel = Pw + 0.35                                  # o beirado, escondido atrás do parapeito
    zr_nave = min(max(_pct(naveV, 0.95), ze_tel + 1.5), ze_tel + 4.0)
    lant = _amostras(se, lambda x, y: dentro_se(x, y), xy=True)
    lant = [(v, x, y) for v, x, y in lant if v >= T - 6.0]
    C = Vector((sum(x for _, x, _ in lant) / len(lant), sum(y for _, _, y in lant) / len(lant)))
    S = min(9.5, max(7.5, 2 * math.sqrt(len(lant)) + 0.5))
    sC, tC = E.st(C)
    Tt = T - 4.5

    # --- o corpo, a poente da cabeceira, até ao adarve ---
    ast = E.anel_st(anel)
    oeste = E.anel_xy(_cortar(ast, 1, 0, sX))
    base = min(ctx.cota(*p) for p in anel) - 1.5
    acc_se.prisma(K, oeste, base, Pw, topo='pedra-cinza')
    for (a, bb, u, n, L, i) in arestas(oeste):
        if L < 0.4:
            continue
        acc_se.caixa(K, a, u, n, -0.05, L + 0.05, -0.6, 0.02, Pw, Pw + 0.5)
        _ameias(acc_se, K, a, u, n, L, Pw + 0.5, M_lado)
        g = min(ctx.cota(*(a + n * 0.6)), ctx.cota(*(bb + n * 0.6)))
        m = (a + bb) / 2
        if not ctx.ocupado(m.x + n.x * 0.7, m.y + n.y * 0.7, excepto=se):
            acc_se.caixa(K, a, u, n, 0, L, -0.02, 0.12, base, g + 0.9)          # o soco

    # --- torres de canto e corpo da porta, mais altos ---
    for (s0, s1, t0, t1) in ((sB, sW + 0.6, tB0, tB1),
                             (sW - 0.7, sW + 2.4, tN - 2.4, tN + 0.7),
                             (sW - 0.7, sW + 2.4, tS - 0.7, tS + 2.4)):
        q = E.caixa_st(s0, s1, t0, t1)
        acc_se.prisma(K, q, base, M_alto - 1.6, topo='pedra-cinza')
        for (a, bb, u, n, L, i) in arestas(q):
            acc_se.caixa(K, a, u, n, -0.05, L + 0.05, -0.6, 0.02, M_alto - 1.6, M_alto - 1.1)
            _ameias(acc_se, K, a, u, n, L, M_alto - 1.1, M_alto)
            g = min(ctx.cota(*(a + n * 0.6)), ctx.cota(*(bb + n * 0.6)))
            acc_se.caixa(K, a, u, n, 0, L, -0.02, 0.14, base, g + 1.0)

    # --- a fachada poente ---
    f = bloco
    g = ctx.cota(*((f['a'] + f['b']) / 2 + f['n'] * 1.0))
    _fachada_se(acc_se, ctx, f['a'], f['u'], f['n'], f['L'], g, M_alto - g)
    for f in panos:
        a, u, n, L = f['a'], f['u'], f['n'], f['L']
        # a parte do pano que a torre de canto não tapa
        livre = [x for x in (i * 0.25 for i in range(int(L / 0.25) + 1))
                 if min(abs(E.st(a + u * x)[1] - tN), abs(E.st(a + u * x)[1] - tS)) > 2.8
                 and not (tB0 - 0.3 < E.st(a + u * x)[1] < tB1 + 0.3)]
        if len(livre) < 4:
            continue
        xc = (min(livre) + max(livre)) / 2
        gp = ctx.cota(*(a + u * xc + n))
        H = M_alto - gp
        _janela_geminada(acc_se, a, u, n, xc, gp + 0.56 * H, gp + 0.68 * H, 0.0)
        acc_se.arco('escuro', a, u, n, xc, 0.26, gp + 0.2 * H, gp + 0.32 * H, 0.01)
        acc_se.caixa(K, a, u, n, xc - 0.45, xc + 0.45, 0, 0.1, gp + 0.19 * H, gp + 0.33 * H)

    # --- as paredes da nave: gigantes e janelas por tramo ---
    tramos = [sW + k * (sT0 - sW) / 5 for k in range(6)]
    for f in faces:
        if abs(f['nv']) < 0.8 or f['L'] < 2 or f is fE or f['s'][0] > sT0 + 0.5:
            continue
        a, u, n, L = f['a'], f['u'], f['n'], f['L']
        for k in range(1, 5):
            x = (tramos[k] - E.st(a)[0]) / u.dot(E.u)
            if 0.8 < x < L - 0.8:
                p = a + u * x
                if ctx.ocupado(p.x + n.x * 0.7, p.y + n.y * 0.7, excepto=se):
                    continue
                gp = ctx.cota(*(p + n))
                acc_se.caixa(K, a, u, n, x - 0.7, x + 0.7, 0, 0.45, base, Pw - 0.5)
                acc_se.caixa(K, a, u, n, x - 0.6, x + 0.6, 0, 0.3, Pw - 0.5, Pw - 0.1)
        for k in range(5):
            x = ((tramos[k] + tramos[k + 1]) / 2 - E.st(a)[0]) / u.dot(E.u)
            if not (1.0 < x < L - 1.0):
                continue
            p = a + u * x
            if ctx.ocupado(p.x + n.x * 0.7, p.y + n.y * 0.7, excepto=se):
                continue
            if (p - Vector(esp[:2])).length < 5.5:
                continue
            gp = ctx.cota(*(p + n))
            _janela_romanica(acc_se, a, u, n, x, 0.72, Pw - 5.4, Pw - 2.7, 0.0, aneis=1)
            acc_se.arco('escuro', a, u, n, x, 0.24, gp + 4.0, gp + 5.8, 0.01)
            acc_se.caixa(K, a, u, n, x - 0.4, x + 0.4, 0, 0.1, gp + 3.9, gp + 5.95)
    # a face norte do braço do transepto: um janelão
    a, u, n, L = transN['a'], transN['u'], transN['n'], transN['L']
    _janela_romanica(acc_se, a, u, n, L / 2, 1.1, Pw - 6.2, Pw - 2.4, 0.0, aneis=2)

    # --- a Porta Especiosa ---
    gE = ctx.cota(*((fE['a'] + fE['b']) / 2 + fE['n'] * 3.5))
    _especiosa(acc_se, ctx, fE['a'], fE['u'], fE['n'], fE['L'], gE, M_lado - 0.3)

    # --- os telhados ---
    _telhado_quatro(acc_se, E, sW + 0.9, sC - S / 2, tS + 0.9, tNmin - 0.9, ze_tel, zr_nave, 's', (True, False))
    for (t0, t1, quad) in ((tC + S / 2, tTN - 0.9, (False, True)), (tTS + 0.9, tC - S / 2, (True, False))):
        s0, s1 = (sT0 + 0.9, sT1 - 0.9) if t0 > tC else (sTS0 + 0.9, sTS1 - 0.9)
        v = _amostras(se, lambda x, y: dentro_se(x, y) and s0 < E.st((x, y))[0] < s1 and t0 < E.st((x, y))[1] < t1)
        zr = min(max(_pct(v, 0.95) if v else ze_tel + 1.5, ze_tel + 1.2), ze_tel + 3.5)
        _telhado_quatro(acc_se, E, s0, s1, t0, t1, ze_tel, zr, 't', quad)

    # --- a lanterna ---
    _lanterna(acc_se, C, u3, v3, S, Pw - 1.0, Pw + 2.6, Tt, T)

    # --- a cabeceira: a ábside ao meio, uma absidíola a norte, o corpo a sul ---
    cab = _cortar(ast, -1, 0, -sX)
    arco = _arco_da_abside(anel)
    tA = sorted(E.st(anel[j])[1] for j in arco)
    tA0, tA1 = tA[0], tA[-1]
    partes = (
        (_cortar(cab, 0, -1, -tA1), False),                      # a absidíola norte (t ≥ tA1)
        (_cortar(cab, 0, 1, tA0), False),                        # o corpo sul (t ≤ tA0)
        (_cortar(_cortar(cab, 0, 1, tA1), 0, -1, -tA0), True),   # a ábside
    )
    for parte, janelas in partes:
        if len(parte) < 3:
            continue
        pxy = E.anel_xy(parte)
        tt = [t for _, t in parte]
        apice = tuple(E.xy(sX, (min(tt) + max(tt)) / 2))
        v = _amostras(se, lambda x, y: dentro(x, y, pxy))
        if not v:
            continue
        # O meio cone não passa dos 22°: o p95 apanha a parede da nave por trás.
        R = max(math.hypot(p[0] - apice[0], p[1] - apice[1]) for p in pxy)
        ze = min(_pct(v, 0.25), Pw - 2.0)
        zc = min(_pct(v, 0.95), Pw - 1.5, ze + 0.4 * R)
        ze = min(ze, zc - 1.0)
        arco_parte = [i for i, p in enumerate(pxy)
                      if any(math.hypot(p[0] - anel[j][0], p[1] - anel[j][1]) < 0.05 for j in arco)]
        _abside(acc_se, ctx, pxy, se, ze, zc, apice, arco_parte, janelas=janelas)

    # --- o claustro ---
    _claustro_se(acc_cl, ctx, cl, pontos['claustro']['p'])

    janelas = _fachadas(
        acc, ctx,
        saltar={SE},
        sem_cornija={(CLAUSTRO_SE, 1)},
        sem_janelas={(CLAUSTRO_SE, 1)},
        PE={CLAUSTRO_SE: None},
    )
    obs = acc.criar('Rico_')
    obs += acc_se.criar('Edif_conjunto_' + SE.replace('/', '_') + '_')
    obs += acc_cl.criar('Edif_conjunto_' + CLAUSTRO_SE.replace('/', '_') + '_')
    print('reconstituição: %d janelas; lanterna %.1f m de lado, pico %.1f; adarve %.1f, ameias %.1f/%.1f; nave %.1f→%.1f'
          % (janelas, S, T, Pw, M_lado, M_alto, ze_tel, zr_nave))
    return obs


def _pormenores_zona(ctx, mats):
    """Uma zona urbana: só o que é comum a todos os prédios — soco, cunhais,
    cornija e janelas nas fachadas livres. Nenhum edifício é desenhado peça a
    peça; os monumentos que caem no corredor têm a sua maqueta no /visitar.

    Pé-direito de 3,4 m: o das casas antigas da Baixa (o laser mede 25 m nos
    prédios de sete pisos)."""
    acc = Acumulador(mats)
    janelas = _fachadas(acc, ctx, pe_contexto=3.4, moldura_plana=True)
    print('reconstituição: %d janelas' % janelas)
    return acc.criar('Rico_')


def pormenores(ctx, mats):
    """Tudo o que se desenha por cima dos volumes, conforme o monumento. Devolve os objectos criados."""
    if ctx.cena.get('zona'):
        return _pormenores_zona(ctx, mats)
    return {'paco-das-escolas': _pormenores_paco, 'santa-cruz': _pormenores_santa_cruz,
            'se-velha': _pormenores_se_velha}[ctx.cena['id']](ctx, mats)
