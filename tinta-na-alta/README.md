# Operação Serenata

FPS desenhado a caneta, na Alta de Coimbra. Os Borrões raptaram o fadista e
fecharam-no no claustro da Sé Velha; entras pelo Arco de Almedina, sobes o
Quebra-Costas, soltas-o e trá-lo de volta antes da Serenata.

```bash
npm install
npm run dev        # http://localhost:5190/tinta-na-alta/
npm run build      # compila para ../public/tinta-na-alta (servido pelo site em /tinta-na-alta)
```

O compilado em `public/tinta-na-alta/` vai no repositório: o Vercel só corre o
build do Next. Depois de mexer no jogo, correr `npm run build` aqui antes do commit.

## De onde vem o mapa

`npm run build:nivel` gera `public/nivel.json` a partir do OpenStreetMap
(edifícios, ruas, escadas, muros) e do LiDAR de 2 m da DGT (chão e alturas),
reutilizando as folhas e o `scripts/lib/dgt.mjs` do CoimbraLens (a pasta de cima).
Fachadas, janelas, portas, merlões da Sé e a galeria do claustro são
desenhados a partir da planta; os interiores são inventados.

## Som

Tudo sintetizado em Web Audio (`src/audio.ts`): tiros com estalo, corpo e eco
de ruela por convolução, passos na calçada, zumbido de balas, sino da Sé e
guitarra de Coimbra por Karplus-Strong. As falas (`public/falas.json`) são a
voz pt-PT do Windows gravada com `npm run build:vozes` e disfarçadas no jogo
por personagem (grave e rouca nos Borrões, rádio na Central).

## Créditos

- Técnica de traço (faces de papel + LineSegments2 com desvio de caneta):
  [Operation Ink](https://github.com/byteab/operation-ink), de Ehsan Sarshar, MIT.
- Ruas e edifícios © contribuidores do OpenStreetMap, ODbL.
- Relevo e alturas: LiDAR da Direção-Geral do Território.
