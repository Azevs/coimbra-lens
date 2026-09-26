# Plano 0 — Do jogo às missões (motor partilhado + página de missões)

Para executar por um agente sem contexto. Lê tudo antes de mexer em código.
É a base dos planos 1, 2 e 3: **nenhum deles começa antes deste estar feito e
aprovado pelo utilizador.**

## Objectivo

Hoje o jogo tem uma só missão, **Operação Serenata**, e tudo o que é dela está preso ao
motor. No fim deste plano:
- o motor é partilhado e cada missão é um módulo com o seu nível;
- há uma página de missões em `/tinta-na-alta/` de onde se escolhe qualquer missão, por
  qualquer ordem;
- a Serenata joga-se **exactamente como antes**.

Este plano não acrescenta missões novas. É só a mudança de estrutura, mais a página.

## Contexto

O jogo vive em `coimbra-lens/tinta-na-alta/` (Vite + three.js, TypeScript). Lê
primeiro o `README.md` da pasta.

- Dev: `npm run dev` → http://localhost:5190/tinta-na-alta/
- Build: `npm run build` → `../public/tinta-na-alta/` (vai no git; o Vercel só corre o
  build do Next). O site serve-o em `/tinta-na-alta` por uma reescrita no
  `coimbra-lens/next.config.ts`, que manda `/tinta-na-alta` e `/tinta-na-alta/` para
  o `index.html`. A query string passa.
- Nível: `npm run build:nivel` → `public/nivel.json` (OSM por Overpass + LiDAR DGT de
  2 m das folhas em `coimbra-lens/scripts/blender/dem`, lidas com
  `coimbra-lens/scripts/lib/dgt.mjs`). As folhas cobrem X −26000…−22000,
  Y 58000…61000 em PT-TM06: a Alta Universitária e a Baixa estão cobertas.
- Falas: `public/falas.json` + `npm run build:vozes` (voz Helia pt-PT do Windows, só
  grava as que faltam) → `public/vozes/<id>.wav`.
- Verificar: Chrome headless com GPU: `GPU=1 node scripts/captura.mjs <url> <png> <ms> <js>`
  e `node scripts/vistas.mjs <pasta> '<json>'` (várias capturas numa sessão). O painel
  de browser da app estrangula o WebGL, por isso não serve para ver o resultado.
  `window.dbg` expõe o estado (ver fim de `src/main.ts`), `?auto&em=<ponto>&olhar=<ponto>`
  põe o jogador num ponto nomeado.
- Desempenho: ~160k segmentos de traço na Serenata, 60 fps numa RTX 3060 Ti. O
  Swiftshader corre a ~1 fps, por isso as capturas usam sempre `GPU=1`.

## Regras do projecto (valem para os planos 0–3)

- **Nada inventado a passar por real.** Ruas e edifícios vêm do OSM, e o chão e as
  alturas vêm do LiDAR. O que for desenhado à mão (interiores, pormenor de portais) é
  inventado e o jogo já o diz no rodapé ("Tudo o resto é inventado"). Não se escrevem
  factos históricos que não estejam confirmados.
- Não usar nomes de negócios reais (cafés, restaurantes, hotéis) no jogo.
- O jogo **não entra na navegação do site** (menus do CoimbraLens) sem o utilizador pedir.
- Nada de texto "como foi feito" / making-of visível, nem gabar as fontes. Os créditos
  ficam no rodapé.
- Escrever em português europeu. Os comentários do código seguem o estilo do código
  que já existe: frases curtas, em pt-PT, a explicar o porquê.
- Não fazer commit, push nem publicar sem o utilizador pedir.

## O que é da Serenata hoje

Levantamento feito a 25/09/2026 (confirma, o código pode ter mudado):

`scripts/build-nivel.mjs`
- `CENTRO`, `MEIO_X/MEIO_Y`, o filtro de nomes `Almedina|Sé Velha|Quebra-Costas|Claustro`
  (na query e no `nomes{}`), a saída fixa `public/nivel.json`.

`src/mundo.ts`
- `PORTAS` (Torre de Almedina, Barbacã → a via que passa por cada uma), `ID_SE`,
  `ID_CLAUSTRO`.
- `nivelarClaustro()` (chamado no construtor), o ramo `claustro()` em `construir()`,
  `ameias`, `contrafortes`, o portal da Sé, as exclusões de `ID_SE/ID_CLAUSTRO` em
  `paredePerto`.
- `marcarPontos()`: a lista de vias do percurso, os pontos extra `[24,18]…[41,−9]`, e
  os pontos nomeados (`inicio`, `arco`, `largoArco`, `escadasBase/Meio/Topo`, `largo`,
  `portaClaustro`, `dentroClaustro`, `patio`, `portalSe`).
- Em `mobiliario()`: os locais das varandas (em função dos pontos da Serenata) e as
  placas (`Rua Ferreira Borges`, `Arco de Almedina`, …).

`src/main.ts`
- `rota`, `povoar`, `guardasDoFadista`, `reforcos`, `desceDaSe`/`guedes`, o `Fadista`
  e o `alvoFadista`, `Fase`, `OBJ`, `alvoFase`, `avancar`, `GUITARRA`, os textos de
  `terminar()` e `ferirJogador()`, o bloco "Missão" no ciclo, o sino no arranque.

`index.html`
- O ecrã `#inicio` (título, briefing, teclas, rodapé), o `<title>` e a descrição, o
  `#fadista-vida`.

## Passos

1. **Fotografia de antes.** Antes de mudar código, tira capturas da Serenata com
   `vistas.mjs`: início, Arco, Quebra-Costas (3 pontos), Largo, portal da Sé, claustro,
   pátio com o fadista. Guarda-as fora do repo (pasta temporária). Anota também os
   segmentos de traço, o número de inimigos depois de `povoar()` e as posições dos
   pontos `P`.
2. **Gerador por missão.** `build-nivel.mjs <id>` lê `scripts/missoes/<id>.mjs`
   (CENTRO, MEIO, filtro de nomes, e extras na query Overpass se a missão precisar) e
   escreve `public/niveis/<id>.json`. Cria `scripts/missoes/serenata.mjs`. **Não
   regeneres a Serenata**: move o `public/nivel.json` actual para
   `public/niveis/serenata.json`. O OSM pode ter mudado e o nível afinado não deve
   mexer. Actualiza o script `build:nivel` no `package.json` para aceitar o id.
3. **Interface de missão.** Em `src/missoes/tipos.ts`, define:
   - `DefMundo`: ids especiais → construtores (claustro, portas da cerca com a via),
     ajustes ao chão (tipo `nivelarClaustro`), `percurso: { vias: string[]; extra: [x, y][] }`,
     `pontos(mundo)` → pontos nomeados, `placas`, `varandas(mundo)`, exclusões de
     `paredePerto`.
   - `Missao`: `id`, `nome`, `subtitulo`, `briefingHtml`, `nivel` (id do json),
     `mundo: DefMundo`, `povoar(ctx)`, `actualizar(ctx, dt)`, `alvo(ctx)`,
     `inicio(ctx)` (falas e sons do arranque), `protegido?` (barra no HUD com rótulo:
     é o fadista na Serenata), textos de vitória/derrota.
   - `ctx`: o que as missões usam do motor: `cena`, `mundo`, `nivel`, `P`, `jog`,
     `som`, `hud`, `efeitos`, `inimigos`, `criar`, `naRota`, `telhadoPerto`,
     `largarPente`, `terminar`, `ferirJogador`, `tempo()`, `olharPara`.
4. **Mover a Serenata** para `src/missoes/serenata.ts` (+ `serenata-mundo.ts` se ficar
   grande): tudo o que está no levantamento. O motor (`mundo.ts`, `main.ts`) fica sem
   uma única referência à Sé, ao claustro ou ao fadista. `portaDaCidade`, `varanda`,
   `placa`, `paredePerto`, `noPercurso`, `sDe`, `telhado`, `fachadas` ficam no motor:
   são o que as outras missões vão usar.
   O `Fadista` passa para `src/missoes/` ou fica como `src/protegido.ts` genérico
   (alguém que segue o jogador pelo rasto). Escolhe e explica a escolha.
   Os tiros dos inimigos ao fadista (`tiroInimigo`) passam a ser ao "protegido" da
   missão, se existir.
5. **Falas.** Prefixa as falas da Serenata (`serenata_radio_inicio`, …) e renomeia os
   `.wav` em vez de os regravar. As genéricas (gritos dos Borrões, `radio_ferido`,
   `radio_morreste`) ficam sem prefixo. Confirma que `vozes.ps1` continua a só gravar
   as que faltam.
6. **Arranque por URL.** `?m=<id>` carrega a missão, e sem `m` mostra-se a página de
   missões. `main.ts` passa a ser importado dinamicamente (`import()`) só quando há
   missão, para o menu não descarregar three.js nem o nível. O `?auto&em=&olhar=` e o
   `dbg` continuam a funcionar dentro da missão. O `dbg.fase()` passa a pedir à missão.
7. **Página de missões** (no `index.html` do jogo, sem framework):
   - Folha de papel no estilo do ecrã de início actual (`src/estilo.css`, letras
     Caveat/Patrick Hand).
   - **Mapa desenhado de Coimbra**: um SVG a traço de caneta com o Mondego, o contorno
     da Alta e as zonas das missões. As formas vêm do OSM (rio, cerca, ruas principais,
     simplificadas), geradas por script para `public/mapa.svg`, não desenhadas a olho.
     Uma marca por missão, no sítio real.
   - Cartão por missão: nome, lugar, briefing de duas linhas, botão "Jogar". Todas
     abertas, sem ordem. As que ainda não existem não aparecem: a lista vem de um
     registo de missões, que por agora só tem a Serenata.
   - Missões cumpridas: carimbo "cumprida" (classe `.carimbo`), estado em
     `localStorage` (leituras e escritas em try/catch: a página funciona sem ele).
     `terminar(true, …)` marca a missão.
   - Espaço para o trailer (plano 3): um `<figure>` escondido enquanto não houver
     `trailer.mp4`.
   - Em ecrã táctil, uma nota: o jogo precisa de teclado e rato.
   - No fim de uma missão: "Outra vez" (a mesma missão) e "Missões" (volta ao menu).
   - Título do conjunto numa constante: **"Tinta na Alta"** por agora. O utilizador
     pode mudá-lo. `<title>` e descrição da página a condizer. Rodapé com os créditos
     do README.
   - Tem de funcionar a 390 px de largura sem scroll horizontal, mesmo que o jogo
     não corra no telemóvel.
8. **README.** Actualiza o `README.md` do jogo com a nova estrutura (missões, gerador
   por id, página, `?m=`). Não escrevas making-of: só o que um programador precisa para
   acrescentar uma missão. Os planos 1–3 vão partir dele.

## Verificação

1. `npm run build` sem erros de TypeScript.
2. **A Serenata não mudou:** as mesmas capturas do passo 1, lado a lado, sem
   diferenças visíveis. Os mesmos segmentos, o mesmo número de inimigos, as mesmas
   posições `P`. Joga-a de ponta a ponta por `dbg` (`dbg.comecar()`, teleportes pelos
   pontos, `dbg.soltar()`, trazer o fadista ao Arco) e confirma que cada fase avança,
   que as falas tocam (sem 404 nos pedidos de rede) e que o fim de vitória aparece.
3. Menu: abre sem pedir `three`, `nivel` nem `vozes` (confirma nos pedidos de rede).
   Mostra a Serenata e o mapa. "Jogar" abre `?m=serenata`. Depois de `dbg.vencer()`,
   voltar ao menu mostra o carimbo. Com o `localStorage` bloqueado, a página
   continua a funcionar.
4. Menu a 390 px e a 1280 px (capturas).
5. Em produção: `npm run build` e abrir `/tinta-na-alta/` e `/tinta-na-alta/?m=serenata`
   pelo `next dev` do CoimbraLens. Se já houver um `next dev` a correr, usa esse. Só
   arrancas outro se não houver nenhum.
6. Mostra ao utilizador as capturas antes/depois e o menu. Espera pelo aval dele antes
   de se passar ao plano 1.

## Fora do âmbito

- Missões novas (planos 1 e 2) e o trailer (plano 3).
- Mudar a jogabilidade, o aspecto ou o som da Serenata.
- Pôr o jogo no menu do CoimbraLens.
