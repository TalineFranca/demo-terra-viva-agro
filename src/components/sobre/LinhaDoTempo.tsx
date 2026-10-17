"use client";

import { useEffect, useRef } from "react";
import { historia } from "@/data/institucional";
import { carregarGsap, ehDesktop, semMovimento } from "@/lib/animacao";

/**
 * Linha do tempo vertical. No desktop, um fio dourado desce com a rolagem e um broto
 * acompanha a ponta do fio; cada ano ganha cor quando o fio chega nele.
 * No celular e com "reduzir movimento", tudo aparece estático.
 */
export function LinhaDoTempo() {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || semMovimento() || !ehDesktop()) return;
    let desfazer: (() => void) | undefined;
    let cancelado = false;
    carregarGsap().then(({ gsap }) => {
      if (cancelado) return;
      const ctx = gsap.context(() => {
        const st = { trigger: el, start: "top 60%", end: "bottom 60%", scrub: 0.4 };
        gsap.fromTo("[data-fio]", { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top center", scrollTrigger: st });
        gsap.fromTo("[data-broto]", { top: "0%" }, { top: "100%", ease: "none", scrollTrigger: st });
        gsap.utils.toArray<HTMLElement>("[data-ano]").forEach((ano) => {
          gsap.fromTo(ano, { color: "rgb(27 29 24 / 0.25)" }, { color: "#27583e", ease: "none", scrollTrigger: { trigger: ano, start: "top 68%", end: "top 52%", scrub: true } });
        });
      }, el);
      desfazer = () => ctx.revert();
    });
    return () => {
      cancelado = true;
      desfazer?.();
    };
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-tinta/20 md:left-[12.5rem]" />
      <span aria-hidden data-fio className="absolute top-2 bottom-2 left-[4px] w-[3px] origin-top bg-trigo-400 md:left-[calc(12.5rem-1px)]" style={{ transform: "scaleY(1)" }} />
      <span aria-hidden data-broto className="absolute top-full left-[5px] hidden -translate-x-1/2 -translate-y-1/2 md:left-[12.5rem] lg:block">
        <svg viewBox="0 0 32 32" className="size-8">
          <circle cx="16" cy="16" r="15" fill="#f3eee2" stroke="#e0b04e" strokeWidth="2" />
          <path d="M16 24V14" stroke="#27583e" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 16c0-4-3-7-8-7 0 4 3 7 8 7Z" fill="#377250" />
          <path d="M16 14c0-4 3-6 8-6 0 4-3 6-8 6Z" fill="#27583e" />
        </svg>
      </span>
      {historia.map((h) => (
        <li key={h.ano} className="relative grid gap-1 pb-14 pl-8 last:pb-0 md:grid-cols-[12.5rem_1fr] md:gap-0 md:pl-0">
          <p data-ano className="font-mono text-5xl leading-none font-medium text-verde-700 md:pr-10 md:text-right md:text-6xl">
            {h.ano}
          </p>
          <div className="md:pt-2 md:pl-12">
            <h3 className="text-2xl text-verde-900">{h.titulo}</h3>
            <p className="mt-2 max-w-lg text-tinta-suave">{h.texto}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
