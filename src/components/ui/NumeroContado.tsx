"use client";

import { useEffect, useRef, useState } from "react";

const formato = new Intl.NumberFormat("pt-BR");

/**
 * Número que conta de zero até o valor quando entra na tela.
 * O HTML do servidor já traz o valor final (leitor de tela, busca, sem JavaScript).
 */
export function NumeroContado({ valor, duracao = 1600, className = "" }: { valor: number; duracao?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [atual, setAtual] = useState(valor);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    setAtual(0);
    let quadro = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const inicio = performance.now();
        const passo = (t: number) => {
          const p = Math.min(1, (t - inicio) / duracao);
          setAtual(Math.round(valor * (1 - Math.pow(1 - p, 4))));
          if (p < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor, duracao]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      <span aria-hidden>{formato.format(atual)}</span>
      <span className="sr-only">{formato.format(valor)}</span>
    </span>
  );
}
