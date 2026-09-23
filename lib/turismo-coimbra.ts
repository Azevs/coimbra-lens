/**
 * GERADO por `node scripts/build-turismo.mjs` — não editar à mão.
 *
 * Séries do Inquérito à permanência de hóspedes na hotelaria e outros
 * alojamentos (INE), município de Coimbra (NUTS 2024: 1920603). Um valor
 * `null` é um valor que o INE não publica (confidencial ou nulo) —
 * nunca um zero.
 */

export interface PontoTurismo {
  /** Período tal como o INE o escreve. */
  p: string
  ano: number
  /** 1–12 nas séries mensais; null nas anuais. */
  mes: number | null
  /** Valor por código de categoria. */
  v: Record<string, number | null>
}

export interface SerieTurismo {
  varcd: string
  nome: string
  atualizado: string | null
  /** Último período que o INE declarava publicado quando se pediu. */
  ultimo: string | null
  categorias: Record<string, string>
  pontos: PontoTurismo[]
}

export type ChaveTurismo = 'dormidas' | 'hospedes' | 'proveitos' | 'dormidasMes' | 'hospedesOrigem' | 'estadaMedia' | 'ocupacaoCama' | 'camas' | 'estabelecimentos' | 'revpar' | 'proveitosAposento' | 'dormidasPor100Hab' | 'dormidasVerao'

export const TURISMO: Partial<Record<ChaveTurismo, SerieTurismo>> = {
 "estabelecimentos": {
  "varcd": "0013284",
  "nome": "Estabelecimentos de alojamento turístico (N.º) por Localização geográfica (NUTS - 2024) e Tipo (alojamento turístico); Anual - INE, Inquérito à permanência de hóspedes na hotelaria e outros alojamentos",
  "atualizado": "2026-07-09",
  "ultimo": "2025",
  "categorias": {
   "010115": "5 estrelas",
   "03": "Turismo no espaço rural e de habitação",
   "0102": "Hotéis-apartamentos",
   "010214": "4 estrelas",
   "010111": "1 estrela",
   "010112": "2 estrelas",
   "010113": "3 estrelas",
   "010114": "4 estrelas",
   "0101": "Hotéis",
   "01": "Hotelaria",
   "02": "Alojamento local",
   "T": "Total",
   "010212": "2 estrelas",
   "010213": "3 estrelas",
   "010215": "5 estrelas",
   "0103": "Pousadas/Quintas da Madeira",
   "0104": "Apartamentos turísticos",
   "010402": "2 estrelas",
   "010403": "3 estrelas",
   "010404": "4 estrelas",
   "010405": "5 estrelas",
   "0105": "Aldeamentos turísticos",
   "010503": "3 estrelas",
   "010504": "4 estrelas",
   "010505": "5 estrelas"
  },
  "pontos": [
   {
    "p": "2025",
    "ano": 2025,
    "mes": null,
    "v": {
     "010115": 1,
     "03": 1,
     "0102": 2,
     "010214": 2,
     "010111": 3,
     "010112": 4,
     "010113": 5,
     "010114": 5,
     "0101": 18,
     "01": 20,
     "02": 59,
     "T": 80,
     "010212": null,
     "010213": null,
     "010215": null,
     "0103": null,
     "0104": null,
     "010402": null,
     "010403": null,
     "010404": null,
     "010405": null,
     "0105": null,
     "010503": null,
     "010504": null,
     "010505": null
    }
   }
  ]
 }
}
