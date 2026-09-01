/**
 * Constantes do município que não vêm de uma API.
 *
 * A área não é uma medição periódica: é a delimitação oficial da Carta
 * Administrativa Oficial de Portugal. Estava dentro da rota do INE, o que
 * a fazia desaparecer quando o INE não respondia — um valor que não depende
 * do INE não deve cair com ele.
 */
export const MUNICIPIO = {
  areaKm2: 319.4,
  areaSource: 'DGT · CAOP',
  areaYear: '2024',
} as const
