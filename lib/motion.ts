/**
 * As animações de entrada partem de opacity 0. Isso torna-as perigosas:
 * se a animação não correr, o conteúdo fica invisível para sempre.
 *
 * Dois casos reais em que não corre:
 *   · o separador está em segundo plano — o browser suspende o
 *     requestAnimationFrame e o GSAP nunca sai do estado inicial;
 *   · o utilizador pediu movimento reduzido.
 *
 * Em qualquer deles o conteúdo deve simplesmente aparecer, já visível.
 */
export function canAnimate(): boolean {
  if (typeof window === 'undefined') return false
  if (document.visibilityState === 'hidden') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
