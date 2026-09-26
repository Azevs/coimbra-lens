# Tinta na Alta

FPS desenhado a caneta, nas ruas de Coimbra, em missões que se jogam por
qualquer ordem:

- **Operação Serenata** (`serenata`): os Borrões fecharam o fadista no claustro
  da Sé Velha; entras pelo Arco de Almedina, sobes o Quebra-Costas, soltas-o e
  trá-lo de volta antes da Serenata.
- **A Cabra não toca** (`cabra`): os Borrões tomaram a Torre da Universidade e
  amarraram a Cabra; sobes a Rua Larga, entras pela Porta Férrea, sobes a torre
  e tocas o sino três vezes, a aguentar as vagas que ele chama.
- **Becos da Baixa** (`becos`): o Estafeta roubou as pastas com as fitas dos
  finalistas e foge da Praça 8 de Maio pelos becos até um barco no rio;
  apanha-o sem o matar, recupera as fitas e leva-as ao Largo da Portagem.

```bash
npm install
npm run dev        # http://localhost:5190/tinta-na-alta/
npm run build      # compila para ../public/tinta-na-alta (servido pelo site em /tinta-na-alta)
```

O compilado em `public/tinta-na-alta/` vai no repositório: o Vercel só corre o
build do Next. Depois de mexer no jogo, correr `npm run build` aqui antes do commit.

## Páginas

- `/tinta-na-alta/` — página de missões: mapa, um cartão por missão, carimbo
  "cumprida" nas que já se venceram neste browser (`localStorage`, sem ele a
  página funciona na mesma). Não descarrega o three.js, os níveis nem as vozes.
- `/tinta-na-alta/?m=<id>` — a missão: ecrã de início com o briefing, depois o jogo.
  No fim, "Outra vez" recarrega a mesma missão e "Missões" volta à página.

O título do conjunto está em `src/titulo.ts` (o `vite.config.ts` copia-o para o
`<title>` e a descrição do `index.html`).

## Estrutura

| Ficheiro | O que é |
|---|---|
| `src/menu.ts` | Entrada da página. Sem `m`, a página de missões; com `m`, o ecrã de início e `import('./main')`. |
| `src/main.ts` | O motor: jogador, arma, disparos, inimigos, pentes, HUD, fim de missão. |
| `src/mundo.ts` | O mundo a tinta a partir do nível: chão, prédios, fachadas, escadas, muros, portas da cerca, varandas, candeeiros, placas, percurso. |
| `src/protegido.ts` | Alguém que o jogador leva consigo: espera até ser solto e depois segue-o pelo rasto. |
| `src/missoes/registo.ts` | A lista de missões (a ficha de cada uma) e as cumpridas. |
| `src/missoes/tipos.ts` | `Missao`, `DefMundo`, `Ctx`: o contrato entre missão e motor. |
| `src/missoes/serenata.ts`, `serenata-mundo.ts` | A Operação Serenata: o exemplo de missão (com alguém para proteger). |
| `src/missoes/cabra.ts`, `cabra-mundo.ts` | A Cabra não toca: interiores com escadas e patamares, vagas, e o que se vê ao longe. |
| `src/missoes/becos.ts`, `becos-mundo.ts` | Becos da Baixa: uma perseguição, o rio e o barco, placas, roupa estendida. |
| `src/missoes/becos-grafo.ts`, `estafeta.ts` | As ruas como grafo (distâncias até à chegada, caminhos) e quem foge por elas. |
| `scripts/missoes/<id>.mjs` | A caixa do nível de cada missão, para o gerador. |
| `public/niveis/<id>.json` | Os níveis gerados. |
| `public/falas.json`, `public/vozes/` | As falas e a voz gravada. |
| `public/mapa.svg` | O mapa da página de missões. |

## Acrescentar uma missão

1. **Nível.** Cria `scripts/missoes/<id>.mjs`:

   ```js
   export const CENTRO = { lat: 40.2078, lon: -8.4265 } // centro do nível
   export const MEIO = [200, 110]                       // meia largura e meia altura, em metros
   export const NOMES = 'Porta Férrea|Via Latina'       // nomes do OSM a pedir e a listar no fim
   export const EXTRA = ['nwr["barrier"="gate"]({bb});'] // linhas a mais na query Overpass
   export const LONGE = { raio: 950 }                   // opcional: o que se vê ao longe
   export const AGUA = true                             // opcional: o rio dentro do nível
   export const RECORTES = { largura: 1.8, excepto: [] } // opcional: abrir os becos
   ```

   `npm run build:nivel -- <id>` gera `public/niveis/<id>.json` a partir do OSM
   (edifícios, ruas, escadas, muros) e do LiDAR de 2 m da DGT (chão e alturas),
   com as folhas e o `scripts/lib/dgt.mjs` do CoimbraLens. As folhas cobrem
   X −26000…−22000, Y 58000…61000 em PT-TM06. Um nível que já existe não se
   regenera sem `--refazer`: a missão foi afinada em cima daquele OSM.
   Os nós soltos com etiquetas (portões, estátuas) vêm em `nos`.

   Com `LONGE`, o nível leva também o que se vê ao longe até esse raio: relevo
   grosso do MDT (12 m), os edifícios do OSM à volta (altura do MDS) e o rio. O
   motor desenha-o com o traço `horizonte`, sem colisão, e afasta o fundo da
   câmara. `npm run build:nivel -- <id> --longe` acrescenta-o a um nível que já
   existe sem mexer no resto.

   Com `RECORTES`, onde a faixa de um beco com nome (a largura da via, ou
   `largura` por omissão) entra na pegada de um edifício, ou uma via com nome
   a atravessa, tira-se essa faixa à pegada (no OSM da Baixa os contornos
   apertam os becos até menos de 1 m); o gerador lista os recortes. Numa
   passagem coberta a faixa sai em `pontes` (o andar de cima, que a missão
   desenha). Com `AGUA`, a água dentro da caixa sai em `agua`. As vias trazem
   `acesso` quando o OSM o diz (as privadas ficam fechadas).

   O nível vem em metros locais à volta do centro: x para nascente, y para
   norte, z a cota. No three.js fica (x, cota, −y); `v3(x, y, z)` e
   `mundo.noChao(x, y)` fazem a conversão.

2. **Ficha.** Acrescenta a missão a `MISSOES` em `src/missoes/registo.ts`: nome,
   subtítulo, lugar, resumo de duas linhas, briefing, `nivel`, `marca` (lat/lon
   no sítio real, para o mapa) e `carregar: () => import('./<id>')`.
   Só aparece na página o que estiver neste registo.

3. **Missão.** `src/missoes/<id>.ts` com `export default` do tipo `Missao`
   (ver `tipos.ts` e a Serenata):
   - `mundo: DefMundo` — o que é da missão no desenho: `portas` (portas da cerca
     com a via que as atravessa), `especiais` (construtores para ids do OSM),
     `ajustar` (mexer no chão ou nos edifícios antes de construir), `percurso`
     (pontos soltos antes, vias do OSM pela ordem, pontos soltos, e pontos
     nomeados no fim), `pontos` (tem de ter `inicio` e `olharInicio`),
     `placas`, `varandas`, `semParedes`, `semDegraus` (escadas que a missão
     desenha ela própria), `construir` (o que não é edifício do OSM: estátuas,
     portões, escadarias; corre antes do percurso, por isso pode calculá-lo),
     `pormenor` (onde as fachadas levam janelas e portas; nas outras só a
     cornija, para poupar traço) e `torreUniversidade: false` (se a missão
     desenhar a torre).
   - `povoar(ctx)` — inimigos (`ctx.criar`, `ctx.naRota`, `ctx.telhadoPerto`),
     personagens e adereços. Se houver alguém para proteger, põe-no em
     `missao.protegido` (`quem`, `rotulo`, `ferido`, `caiu`): o motor mostra a
     barra de vida, deixa os Borrões atirar-lhe e fá-lo seguir o jogador.
   - `comecar(ctx)` — o primeiro objectivo; `inicio(ctx)` — falas e sons do arranque.
   - `actualizar(ctx, dt)` — as fases, a cada fotograma; acaba com
     `ctx.terminar(vitoria, motivo)`.
   - `alvo(ctx)` — para onde aponta o marcador do HUD (`null` esconde-o).
     `ctx.hud.relogio(texto)` mostra um relógio discreto no canto.
   - `textos` — títulos do ecrã de fim e o motivo quando o jogador cai.
   - `fase(ctx)` e `dbg(ctx)` — para testes.

   O estado da missão pode viver no módulo: cada página corre uma missão só.

   Colisão: tudo o que vai para `mundo.colisao` pára o corpo e as balas; com
   `userData.soFisica` só pára o corpo (corrimãos, a guarda invisível por cima
   de um peitoril). O chão das ruas é a função de altura do LiDAR, que só serve
   de piso mínimo: soalhos e patamares por cima dele são malhas normais. As
   rampas (escadas) são `mundo.rampa(a, b, largura, zA, zB)`: para quem anda são
   chão, como o LiDAR, e não entram na octree da física. Numa rampa da octree,
   roçar um corrimão somava as duas normais, parecia parede e travava o passo.
   Para as balas pararem nela, junta um plano com `userData.soTiros`.
   Um plano sem espessura empurra sempre para o lado da sua normal: vira-o para
   o lado de onde vem quem lhe toca (ver `planoColisao` em `cabra-mundo.ts`),
   senão atravessa-se.

   Inimigos: `ctx.criar(pos, olhar, { telhado, patrulha, alerta })`. Com
   `telhado` ficam onde se põem (bom para janelas, galerias e patamares). Para
   irem por um caminho certo (uma escada, um túnel), dá-lhes `rota` e
   `seguirRota = true`: seguem-na até ao fim, mesmo a combater. `pressa` põe-nos
   a correr. Os gritos estão em `gritos` (`inimigos.ts`), por situação; a
   missão junta os seus com o prefixo dela.
   O motor exporta para as missões o que é de uso geral: `Mundo.edificio`,
   `paredes`, `tampa`, `telhado`, `fachadas` (com um desenho próprio por
   fachada), `ameias`, `portaDaCidade`, `paredesComAberturas`, `varanda`,
   `paredePerto`, `noPercurso`, `sDe`, e `placa` em `mundo.ts`.

4. **Falas.** Em `public/falas.json`, com o prefixo da missão (`<id>_radio_inicio`,
   …). As que não têm prefixo são de todas: os gritos dos Borrões, `radio_ferido`,
   `radio_morreste`. O jogo só descarrega as genéricas e as da missão.
   `npm run build:vozes` grava só as que ainda não têm `.wav` (voz Helia pt-PT do Windows).

5. **Mapa.** `npm run build:mapa` desenha `public/mapa.svg` (rio, cerca, ruas e a
   zona de cada `scripts/missoes/*.mjs`). A resposta do Overpass fica em
   `scripts/.cache/`; `--refazer` pede-a de novo. Se a missão sair da caixa do
   mapa, alarga `CAIXA` no script.

## Testar

- `?m=<id>&auto` corre o jogo sem bloquear o rato; `&em=<ponto>&olhar=<ponto>`
  põe o jogador num ponto nomeado (por omissão a olhar para `olharInicio`).
- `window.dbg`: `comecar()`, `fase()`, `vencer()`, `ferir(d)`, `disparar()`, o
  `mundo`, os `P`, os `inimigos`, a `missao` e o `ctx`, mais o que a missão juntar
  (na Serenata: `fadista`, `soltar()`; na Cabra: `tocar()`, `toques()` e a
  `subida`, os pontos da escada da torre; nos Becos: `estafeta()`, `grafo()`,
  `derrubar()`, `recuperar()`, `embarcar()` e `fuga({ jogador })`, uma fuga
  inteira sem desenhar, com o jogador parado num ponto, que diz quanto tempo
  levou, por onde foi e se encalhou).
- Capturas: o painel de browser da app estrangula o WebGL. Usa Chrome headless
  com GPU: `GPU=1 node scripts/captura.mjs <url> <png> <ms> <js>` e
  `node scripts/vistas.mjs <pasta> '<json>' [url]`.

## Som

Tudo sintetizado em Web Audio (`src/audio.ts`): tiros com estalo, corpo e eco
de ruela por convolução, passos na calçada, zumbido de balas, sinos (o da Sé
e o grande da Cabra, que se ouve em todo o nível), quem ofega sem fôlego, e
guitarra de Coimbra por Karplus-Strong. As falas são a voz pt-PT do Windows,
disfarçada no jogo por personagem (grave e rouca nos Borrões, rádio na Central).

## Créditos

- Técnica de traço (faces de papel + LineSegments2 com desvio de caneta):
  [Operation Ink](https://github.com/byteab/operation-ink), de Ehsan Sarshar, MIT.
- Ruas, edifícios, rio e cerca © contribuidores do OpenStreetMap, ODbL.
- Relevo e alturas: LiDAR da Direção-Geral do Território.
