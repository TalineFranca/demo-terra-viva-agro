"use client";

import { useEffect, useRef, useState } from "react";
import { servicos } from "@/data/institucional";
import { carregarGsap, ehDesktop, semMovimento } from "@/lib/animacao";

const camadas = servicos[1].camadas;
const cores = ["#7a5a3a", "#6a4c30", "#5a3f28"];

/**
 * Perfil do solo em camadas com o trado de coleta. No desktop o trado desce com a rolagem
 * e cada camada acende quando ele chega, mostrando por que coletamos em profundidades
 * diferentes. No celular e com "reduzir movimento", o perfil aparece completo.
 */
export function PerfilSolo() {
  const ref = useRef<HTMLDivElement>(null);
  const [ativa, setAtiva] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el || semMovimento() || !ehDesktop()) return;
    let desfazer: (() => void) | undefined;
    let cancelado = false;
    carregarGsap().then(({ gsap }) => {
      if (cancelado) return;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-trado]",
          { y: -230 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.5,
              onUpdate: (st) => setAtiva(Math.min(camadas.length - 1, Math.floor(st.progress * camadas.length * 0.999))),
            },
          },
        );
      }, el);
      desfazer = () => ctx.revert();
    });
    return () => {
      cancelado = true;
      desfazer?.();
    };
  }, []);

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <svg viewBox="0 0 360 420" className="mx-auto w-full max-w-sm lg:col-span-5" role="img" aria-label="Perfil do solo em três camadas com o trado de coleta">
        {/* palhada e superfície */}
        <rect x="20" y="60" width="320" height="16" fill="#d7c9a9" />
        {[30, 70, 110, 150, 190, 230, 270, 310].map((x) => (
          <path key={x} d={`M${x} 64 l18 -6`} stroke="#c8952d" strokeWidth="3" strokeLinecap="round" />
        ))}
        {camadas.map((c, i) => {
          const y = 76 + i * 104;
          const acesa = ativa === -1 || i <= ativa;
          return (
            <g key={c.profundidade} style={{ transition: "opacity .4s" }} opacity={acesa ? 1 : 0.45}>
              <rect x="20" y={y} width="320" height="104" fill={cores[i]} />
              {/* pedrinhas e raízes, para dar textura */}
              <circle cx={60 + i * 30} cy={y + 30} r="4" fill="#000" opacity="0.15" />
              <circle cx={250 - i * 20} cy={y + 64} r="5" fill="#000" opacity="0.12" />
              <path d={`M${120 + i * 10} ${y} q -6 30 4 ${60 - i * 10}`} stroke="#e9e0cc" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
              <text x="330" y={y + 58} textAnchor="end" fontSize="15" fontWeight="600" fill="#fbf8f1" className="font-mono">
                {c.profundidade}
              </text>
            </g>
          );
        })}
        {/* trado */}
        <g data-trado>
          <rect x="166" y="10" width="28" height="12" rx="4" fill="#1b3e2c" />
          <rect x="176" y="20" width="8" height="290" fill="#c3d6bf" />
          <path d="M172 300 h16 l-8 26 Z" fill="#c3d6bf" />
        </g>
      </svg>

      <ol className="lg:col-span-6 lg:col-start-7">
        {camadas.map((c, i) => (
          <li
            key={c.profundidade}
            className={`grid grid-cols-[7rem_1fr] gap-4 border-t border-tinta/15 py-5 transition-opacity duration-500 ${ativa === -1 || i <= ativa ? "opacity-100" : "lg:opacity-40"}`}
          >
            <span className="font-mono text-lg font-medium text-verde-800">{c.profundidade}</span>
            <p className="text-tinta-suave">{c.texto}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
