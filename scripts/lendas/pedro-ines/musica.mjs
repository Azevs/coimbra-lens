// Pedro e Inês: a banda sonora completa. Uma pequena banda de 1930 a 120 bpm:
// foxtrote nas cenas leves, lá menor a espreitar na corte, embalar no luto,
// só vento na morte de Inês, tambores na revolta, marcha lenta em Alcobaça.
// Os efeitos caem nos tempos de tempo.mjs (os mesmos que a imagem usa).
//
//   node scripts/lendas/pedro-ines/musica.mjs   → .cache/mistura.wav

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as S from '../anos30/som.mjs'
import { DURATION, BEAT, BAR, EV, vozes } from './tempo.mjs'

const AQUI = dirname(fileURLToPath(import.meta.url))
const M = S.mesa(DURATION)
const T = (bar, beat = 0) => bar * BAR + beat * BEAT
const mus = (t, x, g = 1) => S.add(M.mus, t, x, g)
const sfx = (t, x, g = 1) => S.add(M.sfx, t, x, g)
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const prog = (t, a, b) => clamp((t - a) / (b - a))
const suave = (x) => x * x * (3 - 2 * x), saiDe = (x) => 1 - (1 - x) ** 3
const lerp = (a, b, t) => a + (b - a) * t

const AC = {
  C: [[36, 43], [64, 67, 72]], G7: [[43, 38], [62, 65, 71]], A7: [[45, 40], [61, 64, 67]], Dm: [[38, 45], [62, 65, 69]],
  F: [[41, 36], [60, 65, 69]], CE: [[40, 43], [60, 64, 67]], Dm7: [[38, 45], [60, 65, 69]], D7: [[38, 45], [60, 66, 69]],
  Gm: [[43, 38], [62, 67, 70]], C7: [[36, 43], [64, 67, 70]], Bb: [[34, 41], [62, 65, 70]], Am: [[45, 40], [60, 64, 69]], E7: [[40, 47], [62, 64, 68]],
}
function foxtrote(bar, acordes, { tuba = 1, banjo = 1, escova = 1, bombo = 0.6, curto = 0.9, pizz = 0 } = {}) {
  acordes.forEach((a, h) => {
    const [bx, ch] = AC[a], b0 = h * (4 / acordes.length)
    for (let k = 0; k < 4 / acordes.length; k += 2) {
      const beat = b0 + k
      if (tuba) mus(T(bar, beat), S.tuba(bx[(k / 2) % 2], BEAT * curto, tuba))
      if (bombo) mus(T(bar, beat), S.bombo(bombo * 0.6))
      if (banjo) ch.forEach((m, i) => mus(T(bar, beat + 1) + i * 0.012, S.banjo(m, banjo)))
      if (pizz) ch.forEach((m, i) => mus(T(bar, beat + 1) + i * 0.01, S.pizz(m - 12, pizz)))
      if (escova) mus(T(bar, beat + 1), S.escova(escova))
    }
  })
}
const melodia = (bar, notas, inst, vel = 1) => notas.forEach(([b, m, d]) => mus(T(bar, b), inst(m, d * BEAT * 0.92, vel)))
const cordas = (bar, notas, bars = 1, amp = 0.014, at = 0.5) => mus(T(bar), S.cordas(notas, bars * BAR, amp, at))
// passos: um pé pousa sempre que a fase da passada passa por π/2 + kπ
function passos(fase, t0, t1, vel = 0.6, seco = 800) {
  let antes = null
  for (let t = t0; t < t1; t += 0.002) { const k = Math.floor((fase(t) - Math.PI / 2) / Math.PI); if (antes !== null && k !== antes) sfx(t, S.passo(vel, seco)); antes = k }
}

// ---------- 1. título ----------
mus(0, S.prato(0.9, 1.6))
foxtrote(0, ['C'], { tuba: 1.1 }); foxtrote(1, ['G7'], { tuba: 1.1 })
const fanfarra = [[[0, 67, 0.5], [0.5, 72, 0.5], [1, 76, 0.5], [1.5, 79, 1.5], [3, 76, 0.5], [3.5, 79, 0.5]], [[0, 81, 1], [1, 79, 0.5], [1.5, 76, 0.5], [2, 74, 1]]]
fanfarra.forEach((ns, b) => { melodia(b, ns, S.trompete, 1); ns.forEach(([bb, m]) => mus(T(b, bb), S.xilofone(m + 12, 0.5))) })
for (const m of [48, 55, 64, 67, 72]) mus(T(1, 3), S.trompete(m, 0.35, 0.7))
mus(T(1, 3), S.tuba(36, 0.3, 1.2)); mus(T(1, 3), S.prato(0.7, 0.8))

// ---------- 2. a chegada ----------
;[['C'], ['A7'], ['Dm'], ['G7']].forEach((a, i) => foxtrote(2 + i, a, { tuba: 0.9, banjo: 0.9 }))
;[[[0, 64, 1], [1, 67, 0.5], [1.5, 64, 0.5], [2, 60, 2]], [[0, 61, 1], [1, 64, 0.5], [1.5, 61, 0.5], [2, 57, 2]],
  [[0, 62, 1], [1, 65, 0.5], [1.5, 69, 0.5], [2, 65, 2]], [[0, 67, 1], [1, 65, 0.5], [1.5, 62, 0.5], [2, 59, 1], [3, 55, 1]]].forEach((ns, i) => melodia(2 + i, ns, S.clarinete, 0.8))
{
  const pr = (t) => clamp((t - 4) / (EV.paragem - 4)); let antes = null, alto = true
  for (let t = 4; t < EV.paragem; t += 0.001) {
    const xC = -800 + 1100 * saiDe(pr(t)), p = Math.floor((xC / 24 - Math.PI / 2) / Math.PI)
    if (antes !== null && p !== antes) { sfx(t, S.casco(alto, clamp((xC + 700) / 500, 0.2, 1))); sfx(t + 0.05, S.casco(!alto, 0.5)); alto = !alto }
    antes = p
  }
}
sfx(EV.paragem + 0.1, S.bufo(1)); sfx(EV.venia, S.apito(900, 520, 0.28, 0.7)); sfx(EV.venia + 0.25, S.xilofone(96, 0.6))

// ---------- 3. Inês ----------
foxtrote(6, ['C'], { tuba: 0.7, banjo: 0.6, bombo: 0 }); foxtrote(7, ['F'], { tuba: 0.7, banjo: 0.6, bombo: 0 })
foxtrote(8, ['Dm7'], { tuba: 0.6, banjo: 0.5, bombo: 0, escova: 0.6 })
melodia(6, [[0, 76, 1.5], [1.5, 74, 0.5], [2, 72, 1], [3, 67, 1]], S.clarinete, 0.9)
melodia(7, [[0, 69, 1.5], [1.5, 72, 0.5], [2, 77, 1], [3, 76, 0.5], [3.5, 74, 0.5]], S.clarinete, 0.9)
melodia(8, [[0, 74, 1.9]], S.clarinete, 0.8)
cordas(6, [60, 64, 67], 1, 0.012, 0.6); cordas(7, [60, 65, 69], 1, 0.012, 0.4)
sfx(EV.porta, S.rangido(0.42, 0.9))
sfx(EV.espreita + 0.1, S.xilofone(84, 0.45)); sfx(EV.espreita + 0.22, S.xilofone(88, 0.45))
sfx(EV.salto, S.boing(170, 0.6, 0.8)); sfx(EV.aterra, S.baque(0.8))
;[72, 76, 79].forEach((m, i) => sfx(EV.cortesia + 0.3 + i * 0.08, S.harpa(m, 0.6)))
for (const k of [0, 0.28]) { sfx(EV.pestanas + k, S.xilofone(91, 0.35)); sfx(EV.pestanas + k + 0.07, S.xilofone(96, 0.3)) }
sfx(EV.arregala, S.xilofone(84, 0.6)); sfx(EV.arregala + 0.1, S.xilofone(91, 0.6))
sfx(EV.pop, S.apito(500, 2200, 0.2, 1)); sfx(EV.pop + 0.2, S.pop(1))
sfx(EV.coroa, S.boing(330, 0.55, 0.7)); sfx(EV.coroa + 0.55, S.xilofone(100, 0.5))
sfx(EV.buzina, S.buzina(1))
EV.coracao.forEach((t, i) => sfx(t, S.batida(1 - i * 0.05)))
mus(EV.coracao[0], S.cordas([64, 67, 71, 76], 1.4, 0.016, 0.7))
for (let i = 0; i < 10; i++) mus(EV.irisFecha + i * 0.055, S.harpa(96 - [0, 3, 5, 7, 10, 12, 15, 17, 19, 22][i], 0.55))

// ---------- 4. o rei (lá menor, em bicos de pés) ----------
const espreita = (bar, acordes, vel = 0.8) => foxtrote(bar, acordes, { tuba: vel, banjo: 0, bombo: 0, escova: 0.4, curto: 0.35, pizz: vel })
;[['Am'], ['Dm'], ['E7'], ['Am']].forEach((a, i) => espreita(10 + i, a))
melodia(10, [[0, 57, 0.5], [1, 60, 0.5], [2, 64, 0.5], [3, 63, 0.5], [3.5, 64, 0.5]], S.clarinete, 0.8)
melodia(11, [[0, 62, 0.5], [1, 65, 0.5], [2, 69, 0.5], [3, 68, 0.5], [3.5, 69, 0.5]], S.clarinete, 0.8)
melodia(12, [[0, 59, 0.5], [0.5, 62, 0.5], [1, 64, 0.5], [1.5, 68, 0.5], [2, 71, 2]], S.clarinete, 0.8)
melodia(13, [[0, 69, 1.5], [2, 64, 0.5], [2.5, 60, 0.5]], S.clarinete, 0.8)
for (let i = 0; i < 6; i++) sfx(EV.sussurro + i * 0.9 + 0.3, S.sopro(0.5))
sfx(EV.bate, S.bombo(1.4)); sfx(EV.bate, S.baque(1)); sfx(EV.bate + 0.02, S.prato(0.5, 0.9))
mus(T(14), S.tuba(40, BAR * 0.9, 0.6)); cordas(14, [52, 59, 62, 68], 1, 0.012, 0.3)

// ---------- 5. o mapa (ré menor, de viagem) ----------
;[['Dm'], ['Bb'], ['Gm'], ['A7']].forEach((a, i) => foxtrote(15 + i, a, { tuba: 0.6, banjo: 0.5, bombo: 0, escova: 0.5 }))
melodia(15, [[0, 74, 1.5], [1.5, 72, 0.5], [2, 69, 2]], S.clarinete, 0.75)
melodia(16, [[0, 70, 1.5], [1.5, 69, 0.5], [2, 65, 2]], S.clarinete, 0.75)
melodia(17, [[0, 67, 1], [1, 69, 0.5], [1.5, 70, 0.5], [2, 74, 2]], S.clarinete, 0.75)
melodia(18, [[0, 73, 2], [2, 76, 1], [3, 69, 1]], S.clarinete, 0.75)
for (let t = EV.linha0; t < EV.linha1; t += BEAT / 2) sfx(t, S.casco(Math.round(t * 4) % 2 === 0, 0.25))
sfx(EV.lagrima + 0.5, S.xilofone(93, 0.4)); sfx(EV.lagrima + 0.5, S.harpa(81, 0.3))

// ---------- 6. o luto (sem compasso: embalar e sinos) ----------
cordas(19, [50, 57, 62, 65], 1, 0.013, 1.2); cordas(20, [46, 53, 62, 65], 1, 0.013, 0.8); cordas(21, [43, 55, 62, 67], 1, 0.013, 0.8); cordas(22, [45, 52, 61, 64], 1, 0.011, 0.8)
;[74, 77, 81, 77, 74, 77, 81, 77, 70, 74, 77, 74, 69, 73, 76, 73].forEach((m, i) => { if (T(19, i) < EV.apaga) mus(T(19, i) + 0.02, S.celesta(m, 0.45)) })
for (const t of EV.sino) sfx(t, S.sino(147, 0.07))
sfx(EV.apaga, S.sopro(0.8))

// ---------- 7. o regresso (fá maior, alegre) ----------
;[['F'], ['D7'], ['Gm', 'C7'], ['F']].forEach((a, i) => foxtrote(23 + i, a, { tuba: 0.9, banjo: 0.9 }))
melodia(23, [[0, 72, 1], [1, 77, 1], [2, 81, 2]], S.clarinete, 0.85)
melodia(24, [[0, 78, 1], [1, 74, 1], [2, 72, 2]], S.clarinete, 0.85)
melodia(25, [[0, 70, 1], [1, 74, 1], [2, 79, 1], [3, 76, 1]], S.clarinete, 0.85)
melodia(26, [[0, 77, 2], [2, 72, 1], [3, 77, 1]], S.trompete, 0.7)
{
  let antes = null, alto = true
  const xC = (t) => (t < EV.cocheParte ? lerp(1750, 900, saiDe(prog(t, 46, EV.cochePara))) : lerp(900, -900, prog(t, EV.cocheParte, 54.6) ** 1.8))
  for (let t = 46; t < 54; t += 0.001) {
    if (t > EV.cochePara - 0.1 && t < EV.cocheParte + 0.1) { antes = null; continue }
    const p = Math.floor((-xC(t) / 24 - Math.PI / 2) / Math.PI)
    if (antes !== null && p !== antes) { sfx(t, S.casco(alto, 0.8)); sfx(t + 0.05, S.casco(!alto, 0.4)); alto = !alto }
    antes = p
  }
}
sfx(EV.cochePara + 0.05, S.rangido(0.35, 0.8)); sfx(EV.inesSai, S.boing(170, 0.6, 0.8)); sfx(EV.inesAterra, S.baque(0.7))
passos((t) => lerp(250, 490, suave(prog(t, EV.corre, EV.abraco))) / 22, EV.corre, EV.abraco, 0.5)
for (let i = 0; i < 12; i++) mus(EV.abraco + i * 0.045, S.harpa(65 + [0, 4, 7, 12, 16, 19, 24, 28, 31, 36, 40, 43][i], 0.5))
sfx(EV.abraco, S.xilofone(96, 0.5)); sfx(EV.abraco + 0.1, S.xilofone(100, 0.5))

// ---------- 8. Coimbra (dó maior, pastoral) ----------
;[['C'], ['F'], ['G7']].forEach((a, i) => foxtrote(27 + i, a, { tuba: 0.6, banjo: 0, bombo: 0, escova: 0.5, pizz: 0.6 }))
melodia(27, [[0, 72, 1.5], [1.5, 74, 0.5], [2, 76, 1], [3, 79, 1]], S.clarinete, 0.8)
melodia(28, [[0, 77, 1.5], [1.5, 76, 0.5], [2, 74, 1], [3, 72, 1]], S.clarinete, 0.8)
melodia(29, [[0, 71, 2], [2, 74, 1], [3, 67, 1]], S.clarinete, 0.8)
cordas(27, [60, 64, 67], 3, 0.01, 0.6)
sfx(54, S.agua(6, 0.7))
for (const t of [55.0, 56.3, 57.9, 59.0]) sfx(t, S.chilreio(0.8))

// ---------- 9. a fonte (serenata) ----------
const serenata = [['F'], ['CE'], ['Dm7', 'G7'], ['C'], ['F'], ['CE'], ['Dm7', 'G7'], ['C']]
serenata.forEach((a, i) => foxtrote(30 + i, a, { tuba: 0.5, banjo: 0, bombo: 0, escova: 0.6 }))
const acF = [[53, 57, 60, 65], [52, 55, 60, 64], [50, 53, 57, 60], [48, 52, 55, 60]]
for (let i = 0; i < 8; i++) cordas(30 + i, acF[i % 4].map((m) => m + 12), 1, 0.013, 0.5)
const arp = [[65, 69, 72, 77], [64, 67, 72, 76], [62, 65, 69, 74], [60, 64, 67, 72]]
for (let i = 0; i < 8; i++) for (let k = 0; k < 8; k++) if (T(30 + i, k * 0.5) < EV.irisFonte) mus(T(30 + i, k * 0.5), S.celesta(arp[i % 4][k % 4] + 12, 0.45))
melodia(30, [[0, 69, 1.5], [1.5, 67, 0.5], [2, 65, 1], [3, 60, 1]], S.clarinete, 0.7)
melodia(31, [[0, 64, 1.5], [1.5, 62, 0.5], [2, 60, 2]], S.clarinete, 0.7)
melodia(32, [[0, 65, 1], [1, 64, 0.5], [1.5, 62, 0.5], [2, 67, 1], [3, 71, 1]], S.clarinete, 0.7)
melodia(33, [[0, 72, 2], [2, 76, 2]], S.clarinete, 0.7)
melodia(34, [[0, 77, 1.5], [1.5, 76, 0.5], [2, 74, 1], [3, 72, 1]], S.clarinete, 0.7)
melodia(35, [[0, 71, 1.5], [1.5, 72, 0.5], [2, 67, 2]], S.clarinete, 0.7)
melodia(36, [[0, 69, 1], [1, 71, 1], [2, 74, 1], [3, 71, 1]], S.clarinete, 0.7)
melodia(37, [[0, 72, 3]], S.clarinete, 0.7)
passos((t) => lerp(-130, 540, saiDe(prog(t, EV.entram, EV.param))) / 26, EV.entram, EV.param, 0.35, 700)
passos((t) => (1420 - lerp(1420, 772, saiDe(prog(t, EV.entram, EV.param)))) / 26 + 1, EV.entram, EV.param, 0.45, 600)
for (const k of [0, 0.28]) sfx(EV.pestanas2 + k, S.xilofone(91, 0.3))
;[72, 76, 79, 84].forEach((m, i) => sfx(EV.flor + 0.2 + i * 0.06, S.harpa(m, 0.5)))
sfx(EV.maos, S.xilofone(88, 0.4))
EV.filhos.forEach((t, i) => { sfx(t, S.pop(0.8)); sfx(t + 0.02, S.xilofone([72, 76, 79, 84][i], 0.7)) })
sfx(EV.irisFonte, S.apito(1200, 500, 0.6, 0.4))

// ---------- 10. o medo (lá menor, mais escuro) ----------
;[['Am'], ['Dm'], ['E7'], ['Am'], ['F'], ['Dm'], ['E7']].forEach((a, i) => espreita(38 + i, a, 0.85))
melodia(38, [[0, 57, 0.5], [1, 60, 0.5], [2, 64, 0.5], [3, 63, 0.5], [3.5, 64, 0.5]], S.clarinete, 0.8)
melodia(39, [[0, 62, 0.5], [1, 65, 0.5], [2, 69, 0.5], [3, 68, 0.5], [3.5, 69, 0.5]], S.clarinete, 0.8)
melodia(40, [[0, 59, 0.5], [0.5, 62, 0.5], [1, 64, 0.5], [1.5, 68, 0.5], [2, 71, 2]], S.clarinete, 0.8)
melodia(41, [[0, 69, 2], [2, 64, 1], [3, 60, 1]], S.clarinete, 0.8)
melodia(42, [[0, 65, 1], [1, 64, 0.5], [1.5, 62, 0.5], [2, 60, 2]], S.clarinete, 0.75)
melodia(43, [[0, 62, 1], [1, 60, 0.5], [1.5, 58, 0.5], [2, 57, 2]], S.clarinete, 0.75)
cordas(38, [45, 52], 7, 0.012, 1)
sfx(EV.bolha1, S.bolha(1)); sfx(EV.bolha2, S.bolha(0.8)); sfx(EV.fechaBolha, S.pop(0.8))
for (let t = EV.avancam; t < EV.escuroMedo; t += 0.07) mus(t, S.timbale(40, 0.12 + 0.25 * prog(t, EV.avancam, EV.escuroMedo), 0.4))
mus(EV.escuroMedo, S.timbale(40, 0.6, 1.2)); cordas(44, [40, 47, 52, 56], 1, 0.016, 0.4)

// ---------- 11. a morte: só o vento ----------
sfx(92, S.vento(14.5, 0.55))
passos((t) => lerp(330, 900, clamp(prog(t, EV.sombras0, EV.sombras1) * 1.45)) / 26, EV.sombras0, EV.sombras1, 0.3, 400)
sfx(EV.portaFecha, S.baque(0.6)); sfx(EV.portaFecha - 0.3, S.rangido(0.3, 0.5))
mus(96, S.cordas([38, 45], 6.6, 0.012, 2))
sfx(EV.apagaJanela + 0.1, S.sino(98, 0.1))

// ---------- 12. a revolta (tambores e trovões) ----------
for (let b = 53; b < 56; b++) for (let k = 0; k < 4; k++) { mus(T(b, k), S.timbale(k % 2 ? 45 : 38, k === 0 ? 0.55 : 0.35, 0.5)); if (k % 2) mus(T(b, k + 0.5), S.timbale(45, 0.2, 0.3)) }
mus(T(56), S.timbale(38, 0.5, 0.8))
melodia(53, [[0, 50, 1], [1, 53, 1], [2, 57, 1.5], [3.5, 55, 0.5]], S.trompete, 0.9)
melodia(54, [[0, 53, 1], [1, 50, 1], [2, 57, 2]], S.trompete, 0.9)
melodia(55, [[0, 58, 1], [1, 57, 1], [2, 55, 1], [3, 53, 0.5], [3.5, 52, 0.5]], S.trompete, 0.9)
cordas(53, [38, 45, 50], 3, 0.016, 0.3)
EV.relampagos.forEach((t) => { sfx(t, S.trovao(1)); mus(t, S.prato(0.7, 1.4)) })
passos((t) => lerp(1400, 740, saiDe(prog(t, EV.afonsoEntra, EV.pazes))) / 22, EV.afonsoEntra, EV.pazes, 0.5)
cordas(56, [50, 54, 57, 62], 2, 0.016, 0.8)
melodia(56, [[1, 66, 1.5], [2.5, 69, 1.5]], S.clarinete, 0.7)
;[62, 66, 69, 74].forEach((m, i) => mus(EV.maosPaz + i * 0.07, S.harpa(m, 0.6)))

// ---------- 13. o rei Pedro e Cantanhede ----------
cordas(58, [48, 55, 64], 1, 0.014, 0.8); cordas(59, [53, 57, 65], 1, 0.014, 0.6); cordas(60, [55, 59, 62, 65], 1, 0.014, 0.6); cordas(61, [48, 55, 60, 64], 2, 0.014, 0.6)
for (let b = 58; b < 64; b++) { mus(T(b), S.tuba([36, 41, 43, 36, 41, 43][b - 58], BAR * 0.45, 0.6)); mus(T(b), S.bombo(0.4)) }
for (let i = 0; i < 8; i++) mus(EV.coroaDesce + i * 0.16, S.celesta(84 + [0, 4, 7, 12, 16, 12, 7, 4][i], 0.5))
;[[0, 60, 0.5], [0.5, 64, 0.5], [1, 67, 0.5], [1.5, 72, 1.5]].forEach(([b, m, d]) => { mus(EV.coroaPousa + b * BEAT, S.trompete(m, d * BEAT, 0.9)); mus(EV.coroaPousa + b * BEAT, S.trompete(m - 12, d * BEAT, 0.6)) })
mus(EV.coroaPousa, S.prato(0.6, 1.4))
melodia(61, [[0, 72, 2], [2, 71, 1], [3, 69, 1]], S.clarinete, 0.7)
melodia(62, [[0, 67, 2], [2, 65, 1], [3, 64, 1]], S.clarinete, 0.7)
cordas(63, [53, 57, 62, 65], 1, 0.013, 0.5); cordas(64, [48, 55, 60, 64], 1, 0.013, 0.5)
sfx(EV.rolo, S.papel(0.7, 1))
for (let i = 0; i < 6; i++) mus(EV.rolo + 0.3 + i * 0.12, S.harpa(67 + [0, 4, 7, 12, 16, 19][i], 0.45))
sfx(EV.selo, S.baque(1)); sfx(EV.selo, S.bloco(false, 0.8))

// ---------- 14. a vingança (tambor surdo) ----------
for (let b = 65; b < 71; b++) for (const k of [0, 2]) mus(T(b, k), S.timbale(38, 0.35, 0.9))
cordas(65, [38, 44, 50], 6, 0.013, 1.2)
sfx(130, S.crepitar(14, 1))
sfx(EV.coracoes, S.batida(0.9)); sfx(EV.coracoes + 0.35, S.batida(0.8))
passos((t) => lerp(760, -200, prog(t, EV.foge, EV.foge + 1.3)) / 18, EV.foge, EV.foge + 1.3, 0.6)
melodia(70, [[1, 62, 0.25], [1.25, 61, 0.25], [1.5, 60, 0.25], [1.75, 59, 0.25], [2, 58, 0.25], [2.25, 57, 0.25], [2.5, 56, 0.25], [2.75, 55, 1]], S.clarinete, 0.8)

// ---------- 15. Alcobaça (marcha lenta, depois órgão) ----------
for (let b = 72; b < 76; b++) { mus(T(b), S.tuba([38, 43, 45, 38][b - 72], BEAT * 1.6, 0.6)); mus(T(b, 2), S.tuba([45, 38, 40, 45][b - 72], BEAT * 1.6, 0.5)); for (const k of [0, 2]) mus(T(b, k), S.bombo(0.45)) }
melodia(72, [[0, 62, 2], [2, 65, 1], [3, 64, 1]], S.clarinete, 0.7)
melodia(73, [[0, 67, 2], [2, 65, 1], [3, 62, 1]], S.clarinete, 0.7)
melodia(74, [[0, 61, 2], [2, 64, 1], [3, 69, 1]], S.clarinete, 0.7)
melodia(75, [[0, 62, 3]], S.clarinete, 0.7)
cordas(72, [50, 57], 4, 0.011, 1)
sfx(144, S.crepitar(8, 0.6))
for (let t = 144.2; t < EV.igreja; t += BEAT) sfx(t, S.passo(0.25, 500))
const orgao = [[38, 50, 57, 62, 65], [34, 46, 53, 62, 65], [41, 53, 57, 60, 65], [36, 48, 55, 60, 64], [38, 50, 57, 62, 65]]
orgao.forEach((ch, i) => mus(EV.igreja + i * BAR, S.cordas(ch, BAR * (i === 4 ? 1.8 : 1), 0.013, 0.7)))
;[74, 77, 81, 79, 77, 74, 72, 74].forEach((m, i) => mus(EV.igreja + 0.4 + i * BAR * 0.62, S.celesta(m, 0.4)))
sfx(EV.igreja, S.sino(131, 0.06))

// ---------- 16. as lendas ----------
cordas(81, [53, 57, 60, 65], 2, 0.013, 1); cordas(83, [50, 57, 62, 65], 2, 0.013, 0.8)
for (let i = 0; i < 32; i++) { const t = T(81, i * 0.5); if (t < EV.fonteLagrimas - 0.2) mus(t, S.harpa([65, 69, 72, 77, 62, 65, 69, 74][i % 8], 0.35)) }
;[[0, 72, 1], [1, 77, 1], [2, 76, 2]].forEach(([b, m, d]) => mus(EV.coroaInesPousa + b * BEAT, S.trompete(m, d * BEAT * 0.9, 0.5)))
for (let i = 0; i < 8; i++) mus(EV.coroaInes + i * 0.16, S.celesta(84 + [0, 4, 7, 12, 16, 12, 7, 4][i], 0.4))
EV.beijos.forEach((t, i) => mus(t, S.celesta([77, 81, 84, 89][i], 0.45)))
cordas(85, [50, 57, 62, 65], 1, 0.013, 1); cordas(86, [46, 53, 62, 65], 1, 0.013, 0.8); cordas(87, [48, 55, 60, 64], 1, 0.013, 0.8); cordas(88, [53, 57, 60, 65], 1, 0.013, 0.8)
EV.lagrimas.forEach((t, i) => sfx(t + 1.0, S.xilofone([93, 91, 88, 86, 84][i], 0.45)))
sfx(EV.nasce, S.agua(178 - EV.nasce, 1))
for (let i = 0; i < 10; i++) mus(EV.nasce + i * 0.08, S.harpa(60 + [0, 5, 9, 12, 17, 21, 24, 29, 33, 36][i], 0.5))
;[[0, 72, 1.5], [1.5, 74, 0.5], [2, 76, 2], [4, 77, 1.5], [5.5, 76, 0.5], [6, 72, 2]].forEach(([b, m, d]) => mus(T(86, b), S.clarinete(m, d * BEAT * 0.92, 0.65)))

// ---------- 17. fim ----------
mus(178, S.prato(0.8, 1.6))
foxtrote(89, ['C'], { tuba: 1 }); foxtrote(90, ['F'], { tuba: 1 }); foxtrote(91, ['G7'], { tuba: 1 })
melodia(89, [[0, 67, 0.5], [0.5, 72, 0.5], [1, 76, 0.5], [1.5, 79, 1.5], [3, 76, 0.5], [3.5, 79, 0.5]], S.trompete, 1)
melodia(90, [[0, 81, 1], [1, 79, 0.5], [1.5, 77, 0.5], [2, 76, 1], [3, 74, 1]], S.trompete, 1)
;[72, 76, 79, 84].forEach((m, i) => mus(EV.fimIris - 0.4 + i * 0.1, S.xilofone(m, 0.7)))
for (const m of [48, 55, 60, 64, 67, 72]) mus(EV.fimIris, S.trompete(m, 1.1, 0.6))
mus(EV.fimIris, S.clarinete(76, 1.1, 0.7)); mus(EV.fimIris, S.tuba(36, 1.1, 1.2)); mus(EV.fimIris, S.prato(1, 1.5)); mus(EV.fimIris, S.bombo(1))

// ---------- a narração ----------
const falas = vozes()
for (const v of falas) S.add(M.vox, v.t0, S.lerWav(v.wav))

// ---------- mistura ----------
const N = M.N, fala = new Float32Array(N)
for (const v of falas) for (let i = Math.round((v.t0 - 0.12) * S.SR); i < Math.round((v.t1 + 0.25) * S.SR) && i < N; i++) if (i >= 0) fala[i] = 1
let g = 1; const duck = new Float32Array(N)
for (let i = 0; i < N; i++) { const alvo = fala[i] ? 0.19 : 1; g += (alvo - g) * (alvo < g ? 0.0009 : 0.00012); duck[i] = g }
const salaM = S.sala(M.mus, { tam: 1.1 }), salaS = S.sala(M.sfx, { tam: 0.8 })
// na igreja de Alcobaça a sala é maior
const igreja = S.sala(M.mus, { tam: 1.9, fb: 0.84 })
const cama = new Float32Array(N)
for (let i = 0; i < N; i++) {
  const t = i / S.SR, ig = t > EV.igreja && t < 162.5 ? 0.3 : 0
  cama[i] = (M.mus[i] * 0.9 + salaM[i] * 0.22 + igreja[i] * ig) * duck[i] + (M.sfx[i] + salaS[i] * 0.1) * (0.35 + 0.65 * duck[i])
}
S.antigo(cama, { hp: 110, lp: 5200, drive: 1.3 })
const voz = Float32Array.from(M.vox); S.biquad(voz, 'hp', 95); S.biquad(voz, 'lp', 7800)
const salaV = S.sala(voz, { tam: 0.6, fb: 0.6 })
const chi = S.chiado(N)
const L = new Float32Array(N)
let pico = 0
for (let i = 0; i < N; i++) { L[i] = cama[i] * 0.8 + voz[i] * 1.3 + salaV[i] * 0.05 + chi[i]; pico = Math.max(pico, Math.abs(L[i])) }
for (let i = 0; i < N; i++) L[i] *= 0.89 / pico
S.gravarWav(join(AQUI, '.cache', 'mistura.wav'), L)
if (process.env.STEMS) { const k = 0.89 / pico; S.gravarWav(join(AQUI, '.cache', 'cama.wav'), cama.map((v) => v * 0.8 * k)); S.gravarWav(join(AQUI, '.cache', 'voz.wav'), voz.map((v) => v * 1.3 * k)) }
console.log(`mistura: ${(N / S.SR).toFixed(2)} s, pico ${pico.toFixed(2)}`)
