// GSAP carregado sob demanda (só quando uma animação vai rodar), para não pesar
// no primeiro carregamento de quem acessa com internet fraca.

type Gsap = typeof import("gsap").gsap;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;

let promessa: Promise<{ gsap: Gsap; ScrollTrigger: ST }> | null = null;

export function carregarGsap() {
  promessa ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger };
  });
  return promessa;
}

export const semMovimento = () =>
  typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ehDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
