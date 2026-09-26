# -*- coding: utf-8 -*-
"""
O chão da reconstituição, pintado em vez de fotografado.

Importado pelo `monumento.py` com `--rico`, quando a cena traz `chao` (os
elementos do OSM que o `build-monumento.mjs` recolhe). Devolve uma imagem do
Blender com a mesma caixa da ortofoto, para as coordenadas de textura do
terreno continuarem a servir sem mudar nada.

O QUE DECIDE E O QUE DESENHA

O que cada sítio é vem dos dados, como nos telhados:
  - ruas, praças, passeios, escadas e passadeiras — do OSM, com o pavimento
    (`surface`) e a largura (`width`, `lanes`) quando o OSM os tem; sem
    largura, a do tipo de via;
  - jardins, relva e água — do OSM; e o verde que o OSM não desenha (quintais,
    taludes), do NDVI da ortofoto, a mesma regra das árvores;
  - lugares de estacionamento e muros — do OSM.
O aspecto é desenhado: calçada, paralelo, lajeado, asfalto, relva e água são
texturas feitas aqui com numpy, à escala real. O que o OSM não diz (o
desenho da calçada numa praça, as marcas das faixas) não se inventa: fica o
pavimento liso.

Onde nada se sabe, o chão é calçada: na Baixa e na Alta é o que há entre as
casas. Junto às paredes o chão escurece um pouco — é luz, não dado.
"""

import math
import os
import numpy as np
import bpy

from reconstituicao import _ruido, _fbm, _hex, _imagem

# ------------------------------------------------------------------ classes --
BASE, CALCADA, PARALELO, LAJEADO, ASFALTO, RELVA, SAIBRO, AGUA, LANCIL, MURO, DEGRAU, JUNTA, BRANCO, IMPLANTACAO = range(14)

CARRO = {'motorway', 'trunk', 'primary', 'secondary', 'tertiary', 'unclassified', 'residential',
         'service', 'busway', 'living_street', 'motorway_link', 'trunk_link', 'primary_link',
         'secondary_link', 'tertiary_link'}
LARGURA = {'primary': 9.0, 'secondary': 8.0, 'tertiary': 7.0, 'unclassified': 5.5, 'residential': 5.5,
           'living_street': 5.0, 'service': 3.5, 'busway': 3.5, 'pedestrian': 6.0, 'footway': 2.0,
           'path': 1.5, 'cycleway': 2.0, 'steps': 2.5, 'track': 3.0}


def _pavimento(surface, carro):
    """A classe de pavimento pela etiqueta `surface` do OSM."""
    s = (surface or '').lower()
    if s in ('asphalt', 'concrete', 'concrete:plates', 'chipseal'):
        return ASFALTO
    if s in ('sett', 'unhewn_cobblestone', 'granite'):
        return PARALELO
    if s in ('cobblestone', 'pebblestone'):
        # Em Portugal, quem cartografa escreve "cobblestone" para a calçada
        # de calcário miúdo; o paralelo de granito é "sett".
        return CALCADA
    if s in ('paving_stones', 'paving_stones:lanes', 'stone', 'tiles'):
        return LAJEADO
    if s in ('gravel', 'fine_gravel', 'compacted', 'ground', 'dirt', 'earth', 'sand', 'unpaved'):
        return SAIBRO
    if s in ('grass', 'grass_paver'):
        return RELVA
    return ASFALTO if carro else CALCADA


def _num(v):
    try:
        return float(str(v).replace(',', '.').split()[0])
    except (TypeError, ValueError, IndexError):
        return None


# ------------------------------------------------------------------ texturas --
def _texturas(T, px, rng):
    """Um mosaico T × T por classe, com `px` m por píxel. Linha 0 = norte."""
    tex = {}

    def pedras(lado_m, base_hex, var, junta):
        """Pedras quadradas de `lado_m`, cada uma com o seu tom, juntas escuras."""
        k = max(1, int(round(lado_m / px)))
        n = T // k + 1
        # Pedras mais pequenas do que 2 píxeis não se desenham uma a uma: fica o tom.
        if k < 2:
            var = 0.0
        tom = 1 + var * (rng.random((n, n)) - 0.5) * 2
        # Fiadas desencontradas: cada linha de pedras desliza meia pedra.
        idx = np.arange(T)
        linha = idx // k
        cor = np.empty((T, T))
        for j in range(T):
            desl = (linha[j] % 2) * (k // 2)
            cor[j] = tom[linha[j] % n, ((idx + desl) // k) % n]
        c = _hex(base_hex)[None, None, :] * cor[..., None]
        if junta and k >= 3:
            jj = (np.arange(T) % k == 0)
            c[jj, :, :] *= junta
            for j in range(T):
                desl = (linha[j] % 2) * (k // 2)
                c[j, ((idx + desl) % k) == 0, :] *= junta
        return c

    sujo = lambda f: (1 + f * (_fbm(T, rng, ((4, 0.5), (12, 0.3), (40, 0.2))) - 0.5))[..., None]
    # Grão fino: ruído liso a 3–4 píxeis e não píxel a píxel. Ao píxel não se
    # via de longe, e era ele que fazia a textura pesar três vezes mais.
    grao = lambda f: (1 + f * (_ruido(T, T // 4, rng) - 0.5))[..., None]

    # Calçada de calcário: cubos de ~9 cm, brancos, gastos.
    tex[CALCADA] = pedras(0.09, 'E2DCCE', 0.07, 0.9) * sujo(0.12) * grao(0.06)
    tex[BASE] = tex[CALCADA]
    # Paralelo de granito: cubos de ~11 cm, cinzentos, juntas marcadas.
    tex[PARALELO] = pedras(0.11, '8F8B82', 0.14, 0.72) * sujo(0.14) * grao(0.08)
    # Lajeado: lajes de ~40 cm.
    tex[LAJEADO] = pedras(0.4, 'CFC8B9', 0.06, 0.8) * sujo(0.1) * grao(0.04)
    tex[ASFALTO] = _hex('55585B')[None, None, :] * sujo(0.16) * grao(0.12)
    relva = _fbm(T, rng, ((6, 0.5), (24, 0.3), (80, 0.2)))
    tex[RELVA] = (_hex('6C8746')[None, None, :] * (0.82 + 0.36 * relva[..., None])) * grao(0.18)
    tex[SAIBRO] = _hex('C8B898')[None, None, :] * sujo(0.12) * grao(0.14)
    tex[AGUA] = _hex('4C6964')[None, None, :] * sujo(0.08)
    tex[LANCIL] = _hex('D6D0C2')[None, None, :] * grao(0.05)
    tex[MURO] = pedras(0.5, 'BDB2A0', 0.08, 0.8) * sujo(0.1)
    tex[DEGRAU] = _hex('CBC4B3')[None, None, :] * sujo(0.08) * grao(0.05)
    tex[JUNTA] = tex[DEGRAU] * 0.62
    tex[BRANCO] = _hex('EEECE5')[None, None, :] * grao(0.05)
    tex[IMPLANTACAO] = _hex('D9D1BF')[None, None, :] * sujo(0.06)
    return tex


# ----------------------------------------------------------------- desenho --
class Tela:
    """A grelha de classes sobre a caixa da ortofoto, e as primitivas para a pintar."""

    def __init__(self, foto, N):
        # N píxeis no lado maior; o outro na mesma proporção (a caixa de um
        # monumento é quadrada, a de uma zona não).
        self.x0, self.y0, self.x1, self.y1 = foto['x0'], foto['y0'], foto['x1'], foto['y1']
        lx, ly = self.x1 - self.x0, self.y1 - self.y0
        self.px = max(lx, ly) / N
        self.NX = max(1, int(round(lx / self.px)))
        self.NY = max(1, int(round(ly / self.px)))
        self.N = N
        self.cls = np.full((self.NY, self.NX), BASE, np.uint8)

    def _janela(self, xs, ys, folga):
        """Os píxeis (colunas i0..i1, linhas j0..j1) que cobrem a caixa, e as coordenadas deles."""
        i0 = max(0, int((min(xs) - folga - self.x0) / self.px))
        i1 = min(self.NX, int((max(xs) + folga - self.x0) / self.px) + 2)
        j0 = max(0, int((self.y1 - max(ys) - folga) / self.px))
        j1 = min(self.NY, int((self.y1 - min(ys) + folga) / self.px) + 2)
        if i1 <= i0 or j1 <= j0:
            return None
        X = self.x0 + (np.arange(i0, i1) + 0.5) * self.px
        Y = self.y1 - (np.arange(j0, j1) + 0.5) * self.px
        return i0, i1, j0, j1, X[None, :], Y[:, None]

    def poligono(self, pts, classe, so_onde=None):
        if len(pts) < 3:
            return
        w = self._janela([p[0] for p in pts], [p[1] for p in pts], 0)
        if w is None:
            return
        i0, i1, j0, j1, X, Y = w
        dentro = np.zeros((j1 - j0, i1 - i0), bool)
        with np.errstate(divide='ignore', invalid='ignore'):
            for k in range(len(pts)):
                (xi, yi), (xj, yj) = pts[k], pts[k - 1]
                if yi == yj:
                    continue
                dentro ^= ((yi > Y) != (yj > Y)) & (X < (xj - xi) * (Y - yi) / (yj - yi) + xi)
        if so_onde is not None:
            dentro &= so_onde[j0:j1, i0:i1]
        self.cls[j0:j1, i0:i1][dentro] = classe

    def linha(self, pts, largura, classe, riscas=None):
        """Faixa de `largura` ao longo da linha. `riscas` = (passo, fracção, classe): listras
        transversais (degraus, zebras), medidas ao longo de cada troço."""
        for a, b in zip(pts, pts[1:]):
            ax, ay = a
            dx, dy = b[0] - ax, b[1] - ay
            L2 = dx * dx + dy * dy
            if L2 < 1e-6:
                continue
            w = self._janela([a[0], b[0]], [a[1], b[1]], largura / 2 + self.px)
            if w is None:
                continue
            i0, i1, j0, j1, X, Y = w
            t = np.clip(((X - ax) * dx + (Y - ay) * dy) / L2, 0, 1)
            d = np.hypot(X - ax - t * dx, Y - ay - t * dy)
            m = d <= largura / 2
            vista = self.cls[j0:j1, i0:i1]
            vista[m] = classe
            if riscas:
                passo, frac, c2 = riscas
                s = t * math.sqrt(L2)
                vista[m & ((s % passo) < passo * frac)] = c2


def _dentro(p, anel):
    x, y = p
    d = False
    for k in range(len(anel)):
        (xi, yi), (xj, yj) = anel[k], anel[k - 1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            d = not d
    return d


def _caixa_blur(a, r):
    """Média numa janela (2r+1)², por somas acumuladas."""
    if r < 1:
        return a
    p = np.pad(a, r + 1, mode='edge').cumsum(0).cumsum(1)
    k = 2 * r + 1
    s = p[k:, k:] - p[:-k, k:] - p[k:, :-k] + p[:-k, :-k]
    return s[:a.shape[0], :a.shape[1]] / (k * k)


def desenhar(cena, aqui, N=3072):
    """Pinta o chão e devolve (imagem do Blender, contagem por classe)."""
    foto = cena['foto']
    tela = Tela(foto, N)
    rng = np.random.default_rng(1131)          # ano da fundação de Santa Cruz: o mesmo chão a cada geração
    el = cena.get('chao', [])
    # Uma via fechada é um anel (uma rotunda) a menos que diga que é área.
    eh_area = lambda e: e['t'].get('area') == 'yes' or 'area:highway' in e['t'] or 'highway' not in e['t']
    fechada = lambda e: len(e['g']) >= 4 and e['g'][0] == e['g'][-1]
    areas = [e for e in el if e['k'] == 'w' and fechada(e) and eh_area(e)]
    linhas = [e for e in el if e['k'] == 'w' and not (fechada(e) and eh_area(e))]
    nos = [e for e in el if e['k'] == 'n']

    # 1. o verde: NDVI da ortofoto (a 25 cm), por cima da calçada de fundo
    if foto.get('ndvi') and os.path.exists(os.path.join(aqui, foto['ndvi'])):
        im = bpy.data.images.load(os.path.join(aqui, foto['ndvi']))
        w, h = im.size
        a = np.empty(w * h * 4, np.float32)
        im.pixels.foreach_get(a)
        ndvi = a.reshape(h, w, 4)[::-1, :, 0] * 2 - 1       # linha 0 = norte
        bpy.data.images.remove(im)
        jj = (np.arange(tela.NY) * h // tela.NY)
        ii = (np.arange(tela.NX) * w // tela.NX)
        v = _caixa_blur(ndvi, 1)[np.ix_(jj, ii)]
        tela.cls[v > 0.28] = RELVA
        verde_fraco = v > 0.12
    else:
        verde_fraco = np.zeros((tela.NY, tela.NX), bool)

    # 2. áreas pavimentadas: praças, estacionamentos, zonas pedonais. As
    # grandes primeiro: o pátio inteiro não pode tapar os canteiros de saibro
    # que o OSM desenha dentro dele.
    def area_de(e):
        g = e['g']
        return abs(sum(g[k][0] * g[k - 1][1] - g[k - 1][0] * g[k][1] for k in range(len(g)))) / 2
    for e in sorted(areas, key=area_de, reverse=True):
        t = e['t']
        if t.get('place') == 'square' or t.get('amenity') == 'parking' or 'highway' in t or 'area:highway' in t:
            carro = t.get('amenity') == 'parking' or t.get('highway') in CARRO or t.get('area:highway') in CARRO
            tela.poligono(e['g'], _pavimento(t.get('surface'), carro))
    # e o verde que o OSM desenha, por cima (um canteiro numa praça é canteiro).
    # Relva desenhada é relva; um jardim inteiro tem caminhos por dentro, e aí
    # só é verde o que a fotografia também vê verde.
    for e in areas:
        t = e['t']
        if t.get('landuse') in ('grass', 'flowerbed', 'village_green', 'greenfield') or t.get('natural') in (
                'heath', 'grassland', 'scrub'):
            tela.poligono(e['g'], RELVA)
        elif t.get('leisure') in ('garden', 'park', 'playground', 'village_green'):
            tela.poligono(e['g'], RELVA, so_onde=verde_fraco)

    # 3. vias a pé (as ruas da Baixa são quase todas assim): largura do OSM ou do tipo
    for e in linhas:
        t = e['t']
        hw = t.get('highway')
        if not hw or hw in CARRO or hw == 'steps' or t.get('tunnel') in ('yes', 'building_passage') or t.get('crossing'):
            continue
        larg = _num(t.get('width')) or LARGURA.get(hw)
        if larg:
            tela.linha(e['g'], larg, _pavimento(t.get('surface'), False))

    # 4. vias de carro: o lancil primeiro, a via por cima
    vias_carro = []
    for e in linhas:
        t = e['t']
        hw = t.get('highway')
        if hw not in CARRO or t.get('tunnel') in ('yes', 'building_passage'):
            continue
        faixas = _num(t.get('lanes'))
        larg = _num(t.get('width')) or (faixas * 3.2 if faixas else LARGURA.get(hw, 5.0))
        vias_carro.append((e, larg))
        tela.linha(e['g'], larg + 0.35, LANCIL)
    for e, larg in vias_carro:
        tela.linha(e['g'], larg, _pavimento(e['t'].get('surface'), True))

    # 5. escadas: degraus de 30 cm, com a junta de cada um
    for e in linhas:
        t = e['t']
        if t.get('highway') == 'steps' and t.get('tunnel') != 'yes':
            tela.linha(e['g'], _num(t.get('width')) or LARGURA['steps'], DEGRAU, riscas=(0.3, 0.2, JUNTA))

    # 6. passadeiras: as vias de peão que o OSM marca como atravessamento, e os
    # nós de passadeira sobre uma via de carro (atravessados de lado a lado)
    for e in linhas:
        t = e['t']
        if t.get('crossing') and t.get('crossing') != 'unmarked' and t.get('highway') in ('footway', 'path', 'cycleway'):
            tela.linha(e['g'], 3.5, ASFALTO, riscas=(1.0, 0.5, BRANCO))
    for e in nos:
        t = e['t']
        if t.get('highway') != 'crossing' or t.get('crossing') in ('unmarked', 'no'):
            continue
        P = e['g'][0]
        melhor = None
        for via, larg in vias_carro:
            g = via['g']
            for a, b in zip(g, g[1:]):
                dx, dy = b[0] - a[0], b[1] - a[1]
                L2 = dx * dx + dy * dy
                if L2 < 1e-6:
                    continue
                tt = max(0, min(1, ((P[0] - a[0]) * dx + (P[1] - a[1]) * dy) / L2))
                d = math.hypot(P[0] - a[0] - tt * dx, P[1] - a[1] - tt * dy)
                if d < 2.0 and (melhor is None or d < melhor[0]):
                    melhor = (d, dx / math.sqrt(L2), dy / math.sqrt(L2), larg)
        if melhor:
            _, ux, uy, larg = melhor
            h = larg / 2
            tela.linha([(P[0] - uy * h, P[1] + ux * h), (P[0] + uy * h, P[1] - ux * h)], 3.5, ASFALTO,
                       riscas=(1.0, 0.5, BRANCO))

    # 7. lugares de estacionamento: o contorno pintado
    for e in areas:
        if e['t'].get('amenity') == 'parking_space':
            tela.linha(e['g'], 0.12, BRANCO)

    # 8. água e muros
    for e in areas:
        t = e['t']
        if t.get('natural') == 'water' or t.get('amenity') == 'fountain':
            tela.poligono(e['g'], AGUA)
            tela.linha(e['g'], 0.35, LANCIL)          # o bordo de pedra do tanque
    for e in el:
        if e['k'] == 'w' and e['t'].get('barrier') in ('wall', 'retaining_wall', 'city_wall'):
            tela.linha(e['g'], 0.5 if e['t']['barrier'] != 'city_wall' else 1.5, MURO)
        elif e['k'] == 'w' and e['t'].get('barrier') == 'kerb':
            tela.linha(e['g'], 0.2, LANCIL)

    # 9. os edifícios sem altura medida nem publicada: não ganham volume, fica
    # a implantação no chão, com a orla marcada (a mesma regra das maquetas
    # de cartão, noutra linguagem).
    for b in cena['buildings']:
        if b['k'] == 'sem-altura':
            tela.poligono(b['aneis'][0], IMPLANTACAO)
            tela.linha(b['aneis'][0] + b['aneis'][0][:1], 0.3, LANCIL)

    # --- as texturas, e o escuro junto às paredes ---
    T = 768
    tex = _texturas(T, tela.px, rng)
    jr = np.arange(tela.NY) % T
    jc = np.arange(tela.NX) % T
    cor = np.empty((tela.NY, tela.NX, 3), np.float32)
    for c, t in tex.items():
        m = tela.cls == c
        if m.any():
            r, k = np.nonzero(m)
            cor[r, k] = t[jr[r], jc[k]]
    # Os edifícios, para o escuro junto às paredes (e para não gastar tinta por baixo deles).
    marca = Tela(foto, N)
    for b in cena['buildings']:
        if b['k'] != 'sem-altura':
            marca.poligono(b['aneis'][0], 1)
    casas = (marca.cls == 1).astype(np.float32)
    r = max(1, int(round(0.9 / tela.px)))
    sombra = _caixa_blur(_caixa_blur(casas, r), r)
    cor *= (1 - 0.32 * np.clip(sombra * 2, 0, 1) * (1 - casas))[..., None]

    contagem = {n: round(100 * float(np.isin(tela.cls, cs).mean()), 1) for n, cs in
                (('calçada', (BASE, CALCADA)), ('paralelo', (PARALELO,)), ('lajeado', (LAJEADO,)),
                 ('asfalto', (ASFALTO,)), ('relva', (RELVA,)), ('água', (AGUA,)), ('degraus', (DEGRAU, JUNTA)))}
    return _imagem('chao-desenhado', cor), contagem
