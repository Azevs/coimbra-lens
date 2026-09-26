# Plano 3 — Trailer do jogo

Para executar por um agente sem contexto. **Depende dos planos 1 e 2**: usa cenas das
três missões (Operação Serenata, A Cabra não toca, Becos da Baixa). Lê no plano 0
(`planos/0-missoes.md`) as secções **Contexto** e **Regras do projecto**, e depois o
`README.md` do jogo.

## O que se quer

Um trailer de **~60 s** (máx. 75 s), 16:9, 1920×1080, 30 fps. Tem de ser emotivo,
com cortes rápidos, e deixar vontade de jogar. Vai para a página de missões
(`/tinta-na-alta/`).

**Regra de ouro: só imagens do jogo a sério.** Todos os planos são renderizados pelo
motor do jogo, nos níveis reais. Nada de mecânicas, sítios ou efeitos que o jogo não
tenha. Podes pôr câmaras cinematográficas e encenar os inimigos, mas o que se vê
tem de existir quando se joga.

## Como se faz

Há um precedente no projecto: o filme de Coimbra em `coimbra-lens/scripts/video/`
(`timeline.mjs` em compassos, `audio.mjs` com síntese Karplus–Strong e Freeverb,
`make.mjs` com o ffmpeg do pip `imageio-ffmpeg`, loudnorm −16 LUFS, BT.709). Lê-o e
reaproveita o que servir. O trailer fica em `tinta-na-alta/scripts/trailer/`.

1. **Modo filme no jogo** (`?filme`, só dev, não vai para o build, ou fica inerte):
   - Tempo determinístico: `dt` fixo de 1/30, `performance.now` e `Math.random`
     substituídos por relógio e gerador com semente. O mesmo plano tem de dar sempre
     as mesmas imagens.
   - O ciclo deixa de correr sozinho: `dbg.passo()` avança um frame e desenha-o.
   - O tremor da caneta em `tinta.ts` (se animar) fica preso ao número do frame.
   - Câmara por guião: chaves (tempo, posição, olhar, fov) interpoladas
     (Catmull–Rom). Pode ser câmara de jogador (arma à vista, recuo) ou câmara livre.
   - Eventos por guião: criar/alertar inimigos, disparar a arma do jogador numa
     direcção, soltar o fadista, tocar a Cabra, pôr o Estafeta a correr.
   - HUD opcional por plano (em geral escondido; num ou dois planos visível, por
     honestidade: é um FPS).
   - **Registo de som:** cada chamada ao `Som` (tiro, impacto, passo, sino, guitarra,
     fala, zumbido, coração) fica num registo com o tempo do frame, a posição da fonte
     e a do ouvinte.
2. **Render:** `render.mjs` abre o Chrome headless com GPU (como `scripts/vistas.mjs`),
   carrega `?m=<missão>&filme=<plano>` e, frame a frame, chama `dbg.passo()` e
   `Page.captureScreenshot` (PNG). Grava em `trailer/frames/<plano>/`. Primeiro em
   640×360 para o animático, depois em 1920×1080.
3. **Som:**
   - Efeitos: reproduz o registo de som de cada plano pelo `Som` do jogo num
     `OfflineAudioContext` (uma página headless que importa `src/audio.ts`) e exporta WAV.
     Assim soam exactamente como no jogo, com eco e oclusão. Se o `Som` não aceitar um
     contexto offline sem grandes mudanças, faz uma camada fina à volta dele e deixa o
     jogo como está.
   - Música original sintetizada (reaproveita `scripts/video/audio.mjs`): guitarra de
     Coimbra (Karplus–Strong) com o motivo do fadista (`GUITARRA` na missão Serenata),
     pulsação grave que acelera, e o sino grave da Cabra como golpe.
   - Falas: as da Central que já existem (voz Helia, filtro de rádio do jogo). Se
     precisares de uma ou duas novas, junta-as a `falas.json` e grava com
     `npm run build:vozes`.
   - Mistura: ducking da música sob as falas, loudnorm −16 LUFS. **Não consegues
     ouvir:** verifica por análise (níveis por secção, voz 10+ dB acima da música, sem
     clipping, silêncio onde o guião pede silêncio) e diz isso ao utilizador.
4. **Montagem:** `timeline.mjs` com os planos presos a tempos musicais (100 bpm → 0,6 s
   por tempo), e `make.mjs` que junta frames + áudio → `tinta-na-alta/public/trailer.mp4`
   (H.264, CRF ~23, alvo < 15 MB), poster `trailer.jpg` e legendas `trailer.vtt` (pt-PT)
   para as falas. Fica em `public/` do jogo para o Vite o copiar no build.

## Guião (ponto de partida; afina com o animático)

| Tempo | Imagem | Som |
|---|---|---|
| 0:00–0:05 | Papel branco. A Alta desenha-se traço a traço a partir da Torre (revela os segmentos por distância a um ponto). | Caneta a riscar. Um sino longe. |
| 0:05–0:15 | Três planos lentos, ~3 s cada, câmara a avançar: o Arco de Almedina; o Pátio das Escolas com a Torre; um beco da Baixa com a placa do nome. Ninguém. | Guitarra de Coimbra sozinha, o motivo do fadista. Rádio: "Atenção." |
| 0:15–0:18 | Cartão à mão (Caveat): **"Os Borrões tomaram a cidade."** | Pulsação grave entra. |
| 0:18–0:40 | Montagem a acelerar: cortes de 1,2 s → 0,6 s → 0,3 s, no tempo. Borrão numa varanda do Quebra-Costas a disparar; mancha de tinta na parede; o fadista amarrado no banco; subida da torre em lanços; o sino amarrado; o Estafeta a desaparecer num beco; roupa estendida a abanar com os tiros; recarregar; Borrão a cair; "Olha ali!"; vinheta e coração. Dois ou três cartões de uma palavra entre os cortes (os nomes das missões). | Música a subir, tiros no tempo, gritos dos Borrões. |
| 0:40–0:43 | Corte seco. Um plano quieto: as mãos a desatar a corda do fadista (ou o badalo). | **Silêncio total**, só a corda. |
| 0:43–0:53 | A Cabra toca. A câmara sobe pelas sineiras e abre a Alta inteira até ao Mondego. Corta para o fadista a descer o Quebra-Costas e o Estafeta a cair no cais. | Sino grave, depois o motivo completo da guitarra. |
| 0:53–1:02 | Título desenhado à mão: **Tinta na Alta** (ou o nome que o utilizador escolher: é a constante do plano 0). Por baixo, as três missões. Última linha: "Joga no browser." | Um tiro final e uma mancha de tinta a cair sobre o título. Fim. |

Regras do guião:
- Pelo menos um plano de cada missão em cada bloco. Nenhuma pode parecer secundária.
- Textos curtos, pt-PT, sem frases de publicidade genéricas. Sem "baseado em dados
  reais": o site não se gaba das fontes. Os créditos (OSM, DGT, Operation Ink) ficam
  na página, não no trailer.
- Nada de sangue a sério: a tinta dos Borrões é o que o jogo já mostra.

## Etapas e entregas

1. **Animático** (640×360, planos provisórios, música final ou provisória):
   mostra-o ao utilizador com uma folha de contactos (um frame por plano) e o guião
   com os tempos. **Espera pelo aval** antes do render final: é aqui que ele corta e
   troca planos.
2. **Render final** 1080p, mistura final, mp4 + poster + vtt.
3. **Na página de missões**: o espaço do trailer (previsto no plano 0) passa a mostrar
   o poster e só carrega o vídeo ao clicar (`preload="none"`), com legendas.
4. `npm run build` e confirmar que `trailer.mp4` sai em `public/tinta-na-alta/`.

## Verificação

- O vídeo tem a duração, a resolução e o fps pedidos (`ffprobe`), H.264 + AAC, e
  toca no Chrome.
- Folha de contactos final ao utilizador, e o relatório de análise do som.
- Nenhum plano mostra algo que o jogo não faça (revê o guião contra o código).
- Não faças commit/push nem publiques sem o utilizador pedir.
