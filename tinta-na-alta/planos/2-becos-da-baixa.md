# Plano 2 — "Becos da Baixa"

Para executar por um agente sem contexto. **Depende do plano 0**
(`planos/0-missoes.md`): o jogo já tem de estar separado em missões
(`scripts/missoes/<id>.mjs`, `src/missoes/<id>.ts`, `public/niveis/<id>.json`, menu em
`/tinta-na-alta/`, `?m=<id>`). Pode correr em paralelo com o plano 1, porque cada um
mexe na sua missão. Mas se ambos precisarem de mudar o motor partilhado
(`mundo.ts`, `main.ts`, `audio.ts`), faz-se um de cada vez.
Lê no plano 0 as secções **Contexto** e **Regras do projecto**: valem aqui tal e qual.
Depois lê o `README.md` do jogo e o `src/missoes/serenata.ts` (o exemplo de missão).

Id da missão: `becos`. Nome: **Becos da Baixa**.

## A missão

**Premissa (inventada):** um Borrão, **o Estafeta**, roubou as pastas com as fitas
dos finalistas. A tradição das fitas da Queima é real; o roubo não é. Foge da
Praça 8 de Maio para o rio, onde um barco o espera no cais. Tens de o apanhar nos
becos antes de ele embarcar.

Tipo de jogo: **perseguição**. É o contrário das outras duas missões: não sobes a
um sítio, vais atrás de alguém que foge. Os becos do OSM são reais e têm
alternativas de verdade, por isso o jogador pode cortar caminho por um beco paralelo.
É esse o trunfo da missão.

### Geografia real (OSM, confirmado a 25/09/2026)

Ruas principais:
| Rua | OSM | Centro |
|---|---|---|
| Praça 8 de Maio | `way/122532672` | 40.21107, −8.42916 |
| Rua Visconde da Luz | `way/15228018` | 40.21003, −8.42908 |
| Rua Ferreira Borges | `way/122702013` | 40.20857, −8.42914 |
| Largo da Portagem | `way/15228037` | 40.20766, −8.42931 |
| Rua Eduardo Coelho | `way/23178732` | 40.20996, −8.42982 |
| Rua Adelino Veiga | `way/58433434` | 40.20919, −8.43042 |
| Rua do Sargento-Mor | `way/116224978` | 40.20776, −8.42985 |

Becos e travessas a poente das ruas principais (a rede da perseguição):
Travessa da Rua Velha `116224960`, Beco dos Prazeres `122528900`, Beco do Romal
`122723199`, Beco dos Esteireiros `122723206`, Beco de Santa Maria `143436650`,
Terreiro do Mendonça `143436661`, Travessa das Canivetas `248164741`, Beco das
Canivetas `248164742`, Travessa da Sota `143436657`, Beco do Forno `169530901`,
Beco da Boa União `117598149`, Travessa dos Gatos `247351249`, Beco da Rua Adelino
Veiga `250905292`, Travessa (do) Paço do Conde `257327402`/`257327403`.
A norte, junto à Praça 8 de Maio: Travessa da Rua Nova `169530374`, Travessa do
Marmeleiro `256115434`, Terreiro do Marmeleiro `1172640225`, Beco do Castilho
`169530375`, Beco do Bacalhau `118260336`.

Atenção: `Travessa Adelino Veiga` (`250904275`) é `access=private`. Não faz parte do
percurso; fica fechada com um portão.

Confirma os ids ao gerar o nível. Procura também o edifício da Igreja de Santa Cruz,
na Praça 8 de Maio: a fachada dela é o cenário de abertura. E procura o cais ou a
margem do Mondego a poente/sul do Largo da Portagem (Av. Emídio Navarro).
**Não nomeies** cafés nem lojas, nem o café que fica encostado à igreja.

### Nível

- Caixa: de ~40.2118 (a norte da Praça 8 de Maio) até à margem do rio a sul (~40.2072),
  e de ~−8.4318 a ~−8.4288. Dá ~500 × 250 m: mais do dobro da área da Serenata e
  com quarteirões densos. É o maior risco do plano (ver orçamento).
- A Rua Ferreira Borges já está na borda poente do nível da Serenata. Não é preciso
  coerência entre níveis, cada um é gerado à parte.
- **Becos estreitos (1,5–3 m).** No OSM, na Baixa, é comum o contorno dos edifícios
  pisar a linha do beco, ou o beco estar marcado como passagem coberta. Ao gerar:
  onde uma via pedonal cruza um edifício, recorta a pegada ao longo da via, com a
  largura da tag `width` ou 1,8 m por omissão. Se a via tiver `covered`/`tunnel`, faz
  uma passagem (reaproveita o `passagem` que o gerador já calcula). Regista no
  console quantos recortes fez e onde.
- **Roupa estendida** entre fachadas nos becos (linhas de caneta com peças penduradas).
  É decoração inventada, mas é da Baixa, e tapa a vista aos atiradores. Não colide.
- Placas nas esquinas com os nomes reais dos becos (usa `placa()` do motor). É por aí
  que o jogador se orienta quando perde o Estafeta de vista.

### O Estafeta

- Inimigo especial (`src/missoes/becos.ts` ou uma classe ao lado de `Inimigo`), com a
  pasta às costas desenhada no `Boneco`.
- **Grafo de vias:** constrói um grafo com as vias pedonais/escadas/residenciais do
  nível (nós nas junções) e usa A* até ao cais. Nas junções escolhe entre os 2–3
  caminhos mais curtos, dando preferência ao que o tira da linha de vista do jogador.
  Quando é visto, corre. Quando não é visto, recupera o fôlego e às vezes pára para
  espreitar.
- Velocidade: um pouco abaixo da corrida do jogador e acima do andar. Uma perseguição
  a direito tem de ser ganhável, mas ao pé.
- **Som:** os passos dele usam a oclusão e o eco de rua do `Som`. Quem ouve com
  atenção sabe por que beco ele foi. O rádio da Central ajuda às vezes ("Virou para a
  Travessa da Sota"), usando o nome real da via onde ele está.
- **Marcador:** só aparece quando ele está à vista e nos 2 s seguintes. Depois desaparece
  (ao contrário das outras missões).
- **Derrubar, não matar:** os tiros nas pernas atrasam-no. Com dano suficiente cai,
  e aí "Recuperar as fitas (manter F)". Um tiro na cabeça **não** acaba a missão: o
  dano dele é limitado e ele cai como nos outros casos. Confirma que o jogador percebe
  que não pode matá-lo (fala da Central logo ao início).
- Às vezes larga dois Borrões atrás dele como emboscada (nas praças: Terreiro do
  Mendonça, Largo da Portagem) e há atiradores em varandas (`varanda()` do motor).

### Fases

1. **Praça 8 de Maio.** Começas diante de Santa Cruz. A Central explica. O Estafeta
   sai a correr (à vista, para o jogador perceber quem é) pela Rua Visconde da Luz ou
   para os becos.
2. **Perseguição.** Objectivo: "Apanha o Estafeta antes do cais". Há um relógio
   discreto no HUD (o barco a aquecer). O tempo sai do comprimento do caminho dele
   mais uma folga, a afinar a jogar.
3. **Recuperar as fitas.** Quando ele cai, mantém F. Vaga final: Borrões a sair dos
   becos para o Largo da Portagem.
4. **Fim.** Chega ao Largo da Portagem com as fitas (ou aguenta a vaga). Ecrã de fim
   com o texto da missão. Derrota: se ele embarcar ("O barco levou as fitas rio
   abaixo") ou se morreres.

### Falas novas

Rascunho:
- início: "Atenção. Um Borrão levou as fitas dos finalistas. Vai para o rio, há um barco à espera. Não o mates, preciso dele a respirar. Apanha-o."
- "Perdeste-o. Ouve os passos."
- "Virou para o {beco}." (uma fala por beco provável: grava só as que usares, com o nome real)
- "Está quase no cais!"
- "Tens as fitas. Agora sai daí."
- fim: "As fitas voltam a casa. Bom trabalho."
- Estafeta: "Apanha-me, se puderes!", "Não me apanhas!", ofegar, "Ai, a perna!"

## Orçamento e desempenho

- Mede os segmentos de traço. A meta é ≤ ~220k, com 60 fps numa RTX 3060 Ti. Se passar:
  menos pormenor de fachada (janelas, candeeiros) a mais de ~25 m do grafo de vias,
  telhados simples nas quadras interiores, e encolher a caixa a norte (começar em
  Visconde da Luz em vez de na Praça 8 de Maio) como último recurso, com o aval do
  utilizador.
- Mede também o tempo de geração e o tamanho do `becos.json`.

## Verificação

1. `npm run build` sem erros. A Serenata e a Cabra continuam a abrir e a jogar.
2. Capturas `vistas.mjs` com `?m=becos`: Santa Cruz, Visconde da Luz, 4 becos
   diferentes (confirma que se passa e que as placas estão certas), Terreiro do Mendonça,
   Largo da Portagem, cais. Compara com a ortofoto
   (`coimbra-lens/scripts/blender/dem/ortos2025_*.tif`) nos becos onde houve recortes.
3. Teste automático da perseguição, por `dbg`: corre 20 fugas com o jogador parado e
   confirma que o Estafeta chega sempre ao cais sem ficar preso (regista os tempos). Corre
   outras tantas com o jogador teleportado para o caminho e confirma que ele muda de
   rota.
4. Anda os becos mais estreitos com teclas simuladas e confirma que ninguém fica encalhado.
5. Mostra ao utilizador as capturas, o número de segmentos e os tempos de fuga. Não faças
   commit/push sem ele pedir.

## Fora do âmbito

- Novas mecânicas de arma, veículos, barco jogável.
- Mudar as outras missões, para além de ajustes necessários no motor partilhado.
