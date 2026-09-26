# Plano 1 — "A Cabra não toca"

Para executar por um agente sem contexto. **Depende do plano 0**
(`planos/0-missoes.md`): o jogo já está separado em missões (`scripts/missoes/<id>.mjs`,
`src/missoes/<id>.ts`, `public/niveis/<id>.json`, página de missões, `?m=<id>`).
Lê primeiro, no plano 0, as secções **Contexto** e **Regras do projecto**. Depois lê o
`README.md` do jogo (actualizado no plano 0) e o `src/missoes/serenata.ts`, que é o
exemplo de missão.

## A missão

**Premissa (inventada, e dita como tal):** os Borrões tomaram a Torre da
Universidade e amarraram a Cabra, o sino da torre a que os estudantes chamam assim.
A Central quer que ela toque. Entras pela Porta Férrea, atravessas o Pátio das
Escolas, sobes a torre, soltas o badalo e tocas a Cabra. Depois aguentas lá em cima
enquanto a Alta acorda.

Não escrevas no jogo factos sobre a Cabra (horários, história, número de degraus) sem
fonte. A premissa não precisa deles.

Id da missão: `cabra`. Nome: **A Cabra não toca**.

### Geografia real (OSM, confirmado a 25/09/2026)

| Elemento | OSM | Onde |
|---|---|---|
| Porta Férrea | `node/3496226629` (`barrier=sally_port`, `historic=city_gate`) | 40.20779, −8.42567 |
| Passagem da porta | `way/342657026` (`tunnel=building_passage`) | idem |
| Praça da Porta Férrea | `way/112265806` | 40.20784, −8.42522 (fora, a nascente) |
| Rua Larga | `way/14382058` | 40.20795, −8.42391 |
| Escadas Monumentais | `way/14381390`, área `way/967604268` | 40.20813, −8.42199 |
| Pátio das Escolas | `way/201710790` (`man_made=courtyard`) | 40.20739, −8.42600 |
| Paço das Escolas (edifício) | `relation/2708767` ("Faculdade de Direito") | à volta do pátio |
| Via Latina (escadaria/colunata) | `way/115744958`, `779645929`, `1409615576`, `1409615579` | lado norte do pátio |
| Torre da Universidade | `way/115574903` (`height=33.5`, `tower:type=bell_tower`) | 40.20780, −8.42648 |
| Estátua de D. João III | `node/1306837151` | 40.20722, −8.42595 (no pátio: abrigo) |
| Capela de São Miguel | `way/1315902875` | 40.20741, −8.42646 |
| Biblioteca Joanina | `way/51293313` | 40.20713, −8.42652 (porta fechada: fica para outra missão) |
| Reitoria | `way/201989127` | 40.20743, −8.42556 |
| Portões a sul do pátio | `node/1305375734`, `2116724008`, `10773709781` (`barrier=gate`) | ~40.2070, −8.4263 |
| Muro de suporte a sul | `way/201990651` | 40.20697, −8.42587 |

Confirma estes ids ao gerar o nível, porque o OSM muda. Descobre também em que
edifício está a passagem da Porta Férrea (`way/342657026` atravessa-o). A
`Sé Velha` fica ~150 m a noroeste, fora ou mesmo na borda do nível.

### Nível

`scripts/missoes/cabra.mjs`: a caixa vai do cimo das Escadas Monumentais (nascente)
até à Torre, com folga a poente (~−8.4270). Isto dá ~450 × 200 m, mais comprido do que a
Serenata. Acrescenta à query Overpass o que faltar: `barrier=gate`, `man_made=courtyard`,
`node["historic"]` para a estátua. Gera `public/niveis/cabra.json`.

### Percurso e fases

1. **Início, fora do Paço.** De preferência no **cimo das Escadas Monumentais /
   Largo D. Dinis**: confirma qual das pontas de `way/14381390` é a de cima pela cota
   do LiDAR. Segue pela **Rua Larga** para poente até à **Praça da Porta Férrea**.
   Se o nível ficar pesado demais (ver orçamento abaixo), começa a meio da Rua
   Larga. Rádio da Central: é pela Porta Férrea que se entra. O objectivo no HUD é
   "Entra no Paço pela Porta Férrea", com o marcador na porta e uma placa "Porta Férrea"
   na parede, como as placas das ruas. As outras entradas do pátio (portões a sul,
   passagens pela Reitoria) ficam **fechadas**: portões desenhados trancados, com
   colisão.
   A Rua Larga é larga e aberta, ao contrário das ruelas da Serenata. Põe atiradores
   nas janelas altas e Borrões a descer a rua.
2. **Porta Férrea.** É um portal monumental, não uma porta de cerca: arco de volta
   perfeita no túnel. A fachada exterior é esboçada (pilastras, nichos com figuras em
   silhueta, remate) e o pormenor é inventado. Reaproveita `portaDaCidade` do motor
   (arco, aduelas, túnel abobadado) e acrescenta a fachada como construtor especial da
   missão (`DefMundo`). Guardas dentro do túnel.
3. **Pátio das Escolas.** Um espaço aberto grande: o primeiro sítio do jogo onde se
   leva fogo cruzado. Há abrigo na estátua (desenhada, com colisão) e nas colunas da
   Via Latina. Põe atiradores na galeria da Via Latina, patrulhas no pátio e um no
   terraço a sul (o muro de suporte é uma queda: o jogador não passa, mas vê o rio).
   Objectivo: "Chega à Torre".
4. **Subir a Torre.** A entrada no pé da torre, virada ao pátio, é inventada. O
   interior da torre é **inventado**: lanços rectos à volta de um poço quadrado (a
   planta é quadrada no OSM), 3 ou 4 patamares, frestas estreitas por onde entra
   luz e se vê o pátio. Guardas nos patamares, combate a curta distância, som abafado
   (usa a oclusão que o `Som` já tem).
   Física: o chão da torre **não** pode vir do LiDAR (o MDS mede o telhado). Os
   patamares e as escadas são malhas de colisão na octree da física, e as escadas são
   rampas invisíveis de ≤ 35° desenhadas como degraus. Lê o comentário da física em
   `main.ts` e `Corpo` em `src/jogador.ts`: o chão do terreno é a função `Corpo.chao`,
   e quem está numa malha usa a octree. Garante que dentro da torre `Corpo.chao` não
   puxa o jogador para a cota do pátio nem para o topo: precisa de uma excepção, como
   a que a Serenata tem para o claustro (ajuste ao chão no `DefMundo`).
5. **A Cabra.** Na sala dos sinos, sineiras abertas para os quatro lados. O sino está
   amarrado. "Soltar o badalo (manter F)" usa o mesmo mecanismo do fadista
   (`hud.accaoMostrar`, `som.corda()`).
6. **Tocar e aguentar.** Tocar a Cabra: manter F 2–3 s por toque, **três toques**.
   Usa um sino grave novo em `audio.ts`, derivado de `som.sino`, que se ouve em
   todo o nível. Cada toque chama uma vaga: Borrões entram pela Porta Férrea e sobem
   pela Via Latina. Tu estás nas sineiras, a disparar para baixo, e ficas exposto
   enquanto tocas. Entre toques, os que sobem a torre chegam aos patamares.
   Os inimigos têm de conseguir disparar para cima (miram a `olhos()`). Confirma que
   as sineiras têm parapeito com colisão, para dar abrigo.
7. **Fim.** Ao terceiro toque, a Central diz uma fala curta. A câmara fica nas sineiras
   com a vista da cidade até ao rio (dá um bom plano para o trailer). Ecrã de fim no
   formato actual (tempo, abatidos, pontaria), com o texto próprio da missão.
   Derrota: se morreres, ecrã de falhanço com o texto da missão.

### Falas novas (pt-PT, curtas, Central por rádio + Borrões)

Rascunho, que podes afinar mantendo o tom da Serenata. Ids com o prefixo `cabra_`:
- início: "Atenção. Os Borrões tomaram a Torre e amarraram a Cabra. Entra no Paço pela Porta Férrea. Não há outro caminho."
- porta: "Estás na Porta Férrea. O pátio é aberto. Não pares no meio."
- pátio: "A entrada da Torre é do outro lado do pátio."
- torre: "Sobe. Eles estão nos patamares."
- sino: "Solta o badalo. Depois toca. Três vezes."
- vaga: "Ouviram-te. Vêm pela Porta Férrea e pela Via Latina."
- fim: "Ouviu-se em toda a Alta. Bom trabalho."
- Borrões: 2–3 gritos novos ("Está na torre!", "Calem esse sino!").

Grava só as novas (`npm run build:vozes`).

### Página de missões

Regista a missão: cartão com nome, lugar ("Paço das Escolas") e briefing de duas
linhas, e marca no mapa no sítio real da Torre.

### Orçamento e desempenho

- Mede os segmentos de traço e escreve o número no fim do trabalho. A Serenata tem
  ~160k. Se este nível passar ~220k, corta a ponta das Escadas Monumentais ou tira
  pormenor de fachada longe do percurso.
- Quadrículas de 48 m (`Mundo.quadricula`) para o *frustum culling* continuar a
  funcionar.

## Verificação

1. `npm run build` sem erros de TypeScript.
2. Capturas com `vistas.mjs` (com `?m=cabra`): início, Rua Larga, Porta Férrea
   por fora e por dentro, pátio com a Torre, cada patamar, sineiras a olhar para o
   pátio e para o rio. Compara as capturas com a realidade (ortofoto
   `coimbra-lens/scripts/blender/dem/ortos2025_*.tif`) para confirmar a posição da
   porta, o pátio e a torre.
3. Percurso com `dbg`: teleporta por cada fase e confirma que o objectivo avança,
   que as portas fechadas não deixam passar e que o jogador não cai pelo chão da torre
   nem fica preso nas escadas (anda-as com teclas simuladas, não por teleporte).
4. A Serenata continua a abrir e a jogar (`?m=serenata`, fases por `dbg`). Se tiveres
   mexido no motor partilhado, repete as capturas de controlo do plano 0.
5. Menu: a Cabra aparece. A marca de "cumprida" aparece depois de `dbg.vencer()`.
6. Mostra ao utilizador as capturas e o número de segmentos.

## Fora do âmbito

- A missão da Baixa (plano 2) e o trailer (plano 3).
- Pôr o jogo no menu do CoimbraLens.
- Interior da Joanina (só a porta fechada, como promessa).
