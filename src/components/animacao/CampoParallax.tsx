"use client";

import { useEffect, useRef } from "react";
import { carregarGsap, ehDesktop, semMovimento } from "@/lib/animacao";

/**
 * Silhueta do campo em camadas (coxilhas com fileiras de plantio). Cada camada se move numa
 * velocidade diferente com a rolagem, dando profundidade à saída do hero.
 * A última camada tem a cor da seção seguinte, fazendo a transição sem corte reto.
 * Sem animação no celular e com "reduzir movimento".
 */
export function CampoParallax({ corFinal = "#f3eee2" }: { corFinal?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || semMovimento() || !ehDesktop()) return;
    let desfazer: (() => void) | undefined;
    let cancelado = false;
    carregarGsap().then(({ gsap }) => {
      if (cancelado) return;
      const ctx = gsap.context(() => {
        gsap.utils.toArray<SVGGElement>("[data-camada]").forEach((camada) => {
          const vel = Number(camada.dataset.camada);
          gsap.to(camada, {
            yPercent: -vel,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
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
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] min-h-48 lg:h-[42vh]">
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <defs>
          <pattern id="linhas-campo" width="14" height="400" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)">
            <rect width="14" height="400" fill="transparent" />
            <rect width="2" height="400" fill="#ffffff" opacity="0.06" />
          </pattern>
        </defs>
        <g data-camada="6">
          <path d="M0 210 C 220 150 420 170 640 200 S 1060 150 1440 190 L1440 400 L0 400 Z" fill="#27583e" opacity="0.85" />
          <path d="M0 210 C 220 150 420 170 640 200 S 1060 150 1440 190 L1440 400 L0 400 Z" fill="url(#linhas-campo)" />
        </g>
        <g data-camada="12">
          <path d="M0 270 C 260 220 520 250 760 270 S 1180 230 1440 260 L1440 400 L0 400 Z" fill="#1b3e2c" />
          <path d="M0 270 C 260 220 520 250 760 270 S 1180 230 1440 260 L1440 400 L0 400 Z" fill="url(#linhas-campo)" />
        </g>
        <g data-camada="0">
          <path d="M0 340 C 300 310 560 330 820 345 S 1240 320 1440 336 L1440 400 L0 400 Z" fill={corFinal} />
        </g>
      </svg>
    </div>
  );
}
