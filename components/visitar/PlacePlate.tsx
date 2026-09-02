import type { PlateKind } from '@/lib/attractions'

/**
 * Chapa desenhada de cada lugar, enquanto não há fotografia.
 *
 * Desenho a duas cores do papel — nunca uma fotografia genérica de banco de
 * imagens, que seria uma imagem de Coimbra que não é de Coimbra. Cada lugar
 * tem o seu: a primeira versão repetia a mesma caixa com janelas em metade
 * das fichas e via-se logo que era enchimento.
 *
 * Todas ocupam o mesmo enquadramento (420×250) e assentam na mesma linha de
 * chão, para as oito lerem como uma série. Quando houver fotografia
 * licenciada, entra no lugar deste componente e o resto da ficha fica igual.
 */

const CHAO = 206

function Fundo() {
  return (
    <>
      <rect x="0" y="0" width="420" height="250" fill="var(--bg-sunken)" />
      <rect x="0" y={CHAO} width="420" height={250 - CHAO} fill="var(--bg-secondary)" />
      <line x1="0" y1={CHAO} x2="420" y2={CHAO} stroke="var(--text-primary)" strokeOpacity="0.18" />
    </>
  )
}

export default function PlacePlate({ kind }: { kind: PlateKind }) {
  return (
    <svg
      viewBox="0 0 420 250"
      width="100%"
      role="presentation"
      style={{ display: 'block' }}
    >
      <Fundo />

      {/* Biblioteca Joanina — o interior: estantes, volumes e a abóbada */}
      {kind === 'biblioteca' && (
        <>
          <path d="M40 206 v-96 a170 76 0 0 1 340 0 v96 z" fill="var(--accent)" fillOpacity="0.85" />
          <g fill="var(--bg-sunken)">
            <rect x="66" y="122" width="90" height="84" />
            <rect x="182" y="108" width="56" height="98" />
            <rect x="264" y="122" width="90" height="84" />
          </g>
          <g stroke="var(--accent)" strokeOpacity="0.75" strokeWidth="3">
            <line x1="66" y1="150" x2="156" y2="150" />
            <line x1="66" y1="178" x2="156" y2="178" />
            <line x1="264" y1="150" x2="354" y2="150" />
            <line x1="264" y1="178" x2="354" y2="178" />
          </g>
          <g fill="var(--accent)" fillOpacity="0.6">
            <rect x="72" y="128" width="6" height="20" /><rect x="82" y="130" width="5" height="18" />
            <rect x="91" y="127" width="7" height="21" /><rect x="102" y="131" width="5" height="17" />
            <rect x="111" y="128" width="6" height="20" /><rect x="121" y="130" width="7" height="18" />
            <rect x="270" y="130" width="6" height="18" /><rect x="280" y="127" width="7" height="21" />
            <rect x="291" y="131" width="5" height="17" /><rect x="300" y="128" width="6" height="20" />
            <rect x="310" y="130" width="7" height="18" /><rect x="321" y="129" width="5" height="19" />
          </g>
          <rect x="182" y="164" width="56" height="8" fill="var(--accent)" />
          <path d="M40 110 a170 76 0 0 1 340 0" fill="none" stroke="var(--bg-sunken)" strokeWidth="3" />
        </>
      )}

      {/* Paço das Escolas — a torre da universidade sobre a colina */}
      {kind === 'torre' && (
        <>
          <path d="M0 206 C 70 190, 130 176, 210 176 S 350 190, 420 206 Z" fill="var(--tone-moss)" fillOpacity="0.22" />
          <rect x="60" y="140" width="300" height="66" fill="var(--accent)" fillOpacity="0.85" />
          <rect x="182" y="34" width="56" height="172" fill="var(--accent)" />
          <path d="M182 34 L210 10 L238 34 Z" fill="var(--accent)" />
          <g fill="var(--bg-sunken)">
            <rect x="198" y="58" width="24" height="30" />
            <rect x="198" y="104" width="24" height="24" />
            <rect x="92" y="162" width="20" height="44" />
            <rect x="132" y="162" width="20" height="44" />
            <rect x="268" y="162" width="20" height="44" />
            <rect x="308" y="162" width="20" height="44" />
          </g>
          <circle cx="210" cy="46" r="7" fill="var(--bg-sunken)" />
        </>
      )}

      {/* Sé Velha — a catedral-fortaleza românica */}
      {kind === 'catedral' && (
        <>
          <rect x="96" y="92" width="228" height="114" fill="var(--accent)" fillOpacity="0.85" />
          <rect x="76" y="66" width="60" height="140" fill="var(--accent)" />
          <rect x="284" y="66" width="60" height="140" fill="var(--accent)" />
          <g fill="var(--bg-sunken)">
            <path d="M186 206 v-58 a24 24 0 0 1 48 0 v58 z" />
            <circle cx="210" cy="120" r="20" />
            <rect x="96" y="88" width="16" height="26" />
            <rect x="308" y="88" width="16" height="26" />
          </g>
          <g fill="var(--accent)">
            <rect x="76" y="58" width="60" height="10" />
            <rect x="284" y="58" width="60" height="10" />
          </g>
          <g stroke="var(--bg-sunken)" strokeWidth="2">
            <line x1="210" y1="100" x2="210" y2="140" />
            <line x1="190" y1="120" x2="230" y2="120" />
          </g>
        </>
      )}

      {/* Jardim Botânico — socalcos, estufa e arvoredo */}
      {kind === 'estufa' && (
        <>
          <g fill="var(--tone-moss)" fillOpacity="0.75">
            <circle cx="72" cy="150" r="46" />
            <circle cx="348" cy="158" r="38" />
            <circle cx="300" cy="140" r="26" />
          </g>
          <g fill="var(--accent)" fillOpacity="0.85">
            <rect x="66" y="190" width="12" height="16" />
            <rect x="342" y="190" width="12" height="16" />
          </g>
          <path d="M140 206 v-64 a70 34 0 0 1 140 0 v64 z" fill="var(--accent)" fillOpacity="0.85" />
          <g stroke="var(--bg-sunken)" strokeWidth="2" fill="none">
            <line x1="210" y1="108" x2="210" y2="206" />
            <line x1="175" y1="116" x2="175" y2="206" />
            <line x1="245" y1="116" x2="245" y2="206" />
            <path d="M140 152 h140" />
          </g>
          <g stroke="var(--text-primary)" strokeOpacity="0.16">
            <line x1="0" y1="224" x2="420" y2="224" />
            <line x1="0" y1="238" x2="420" y2="238" />
          </g>
        </>
      )}

      {/* Santa Clara-a-Velha — arco gótico, rosácea e a água que a inundou */}
      {kind === 'ruina' && (
        <>
          <path d="M96 206 v-90 L210 40 L324 116 v90 z" fill="var(--accent)" fillOpacity="0.85" />
          <g fill="var(--bg-sunken)">
            <path d="M186 206 v-52 L210 116 L234 154 v52 z" />
            <path d="M128 206 v-34 L150 138 L172 172 v34 z" />
            <path d="M248 206 v-34 L270 138 L292 172 v34 z" />
            <circle cx="210" cy="92" r="15" />
          </g>
          <g stroke="var(--accent)" strokeWidth="2">
            <line x1="210" y1="77" x2="210" y2="107" />
            <line x1="195" y1="92" x2="225" y2="92" />
          </g>
          <g fill="none" stroke="var(--tone-blue)" strokeWidth="3" strokeOpacity="0.6">
            <path d="M10 220 C 60 210, 100 232, 150 222 S 250 208, 300 220 S 380 232, 412 220" />
            <path d="M10 238 C 60 228, 100 248, 150 238 S 250 226, 300 238 S 380 248, 412 236" />
          </g>
        </>
      )}

      {/* Aqueduto de São Sebastião — os arcos a atravessar a chapa */}
      {kind === 'arco' && (
        <>
          <g fill="var(--accent)" fillOpacity="0.85">
            <rect x="0" y="74" width="420" height="24" />
            <rect x="0" y="98" width="420" height="108" />
          </g>
          <g fill="var(--bg-sunken)">
            <path d="M22 206 v-58 a26 26 0 0 1 52 0 v58 z" />
            <path d="M106 206 v-58 a26 26 0 0 1 52 0 v58 z" />
            <path d="M190 206 v-58 a26 26 0 0 1 52 0 v58 z" />
            <path d="M274 206 v-58 a26 26 0 0 1 52 0 v58 z" />
            <path d="M358 206 v-58 a26 26 0 0 1 52 0 v58 z" />
          </g>
          <g fill="var(--tone-moss)" fillOpacity="0.6">
            <circle cx="48" cy="196" r="14" />
            <circle cx="216" cy="198" r="12" />
            <circle cx="384" cy="196" r="14" />
          </g>
        </>
      )}

      {/* Quinta das Lágrimas — a fonte entre os jardins históricos */}
      {kind === 'fonte' && (
        <>
          <g fill="var(--tone-moss)" fillOpacity="0.7">
            <circle cx="66" cy="128" r="50" />
            <circle cx="126" cy="152" r="34" />
            <circle cx="352" cy="134" r="46" />
            <circle cx="294" cy="158" r="30" />
          </g>
          <g fill="var(--accent)" fillOpacity="0.85">
            <rect x="60" y="176" width="12" height="30" />
            <rect x="346" y="180" width="12" height="26" />
            <rect x="196" y="120" width="28" height="60" />
            <path d="M186 100 h48 v20 h-48 z" />
          </g>
          <ellipse cx="210" cy="192" rx="82" ry="20" fill="var(--tone-blue)" fillOpacity="0.35" />
          <ellipse cx="210" cy="192" rx="82" ry="20" fill="none" stroke="var(--tone-blue)" strokeOpacity="0.6" />
          <g stroke="var(--tone-blue)" strokeOpacity="0.7" strokeWidth="2" fill="none">
            <path d="M204 120 C 190 138, 188 158, 196 176" />
            <path d="M216 120 C 230 138, 232 158, 224 176" />
          </g>
        </>
      )}

      {/* Portugal dos Pequenitos — o país à escala de uma criança */}
      {kind === 'miniatura' && (
        <>
          <g fill="var(--accent)" fillOpacity="0.85">
            <rect x="34" y="150" width="56" height="56" />
            <path d="M28 150 L62 122 L96 150 Z" />
            <rect x="108" y="128" width="44" height="78" />
            <path d="M102 128 L130 104 L158 128 Z" />
            <rect x="176" y="160" width="68" height="46" />
            <path d="M170 160 L210 132 L250 160 Z" />
            <rect x="264" y="112" width="34" height="94" />
            <path d="M258 112 L281 88 L304 112 Z" />
            <rect x="318" y="152" width="62" height="54" />
            <path d="M312 152 L349 126 L386 152 Z" />
          </g>
          <g fill="var(--bg-sunken)">
            <rect x="52" y="172" width="20" height="34" />
            <rect x="122" y="150" width="16" height="26" />
            <rect x="198" y="178" width="24" height="28" />
            <rect x="273" y="136" width="16" height="22" />
            <rect x="338" y="172" width="22" height="34" />
          </g>
          <g fill="var(--tone-moss)" fillOpacity="0.65">
            <circle cx="160" cy="192" r="14" />
            <circle cx="256" cy="190" r="12" />
          </g>
        </>
      )}
    </svg>
  )
}
