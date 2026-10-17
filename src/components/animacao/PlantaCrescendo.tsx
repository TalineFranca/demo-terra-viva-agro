"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { carregarGsap, ehDesktop, semMovimento } from "@/lib/animacao";

const etapas = [
  { fase: "Semeadura", titulo: "Semente certa e inoculada", texto: "Cultivar adequada para a janela e a área, com inoculante aplicado no dia.", href: "/produtos?categoria=sementes" },
  { fase: "Desenvolvimento", titulo: "Adubação e controle de daninhas", texto: "Fósforo e potássio na base, nitrogênio em cobertura quando a cultura pede.", href: "/produtos?categoria=fertilizantes" },
  { fase: "Floração", titulo: "Nutrição foliar no estádio certo", texto: "Boro, molibdênio e manganês aplicados quando a planta mais precisa.", href: "/produtos?categoria=nutricao-foliar" },
  { fase: "Enchimento de grão", titulo: "Monitoramento de pragas e doenças", texto: "Visita técnica, pano de batida e fungicida no momento certo, com receituário.", href: "/produtos?categoria=defensivos" },
];

// Folha trifoliolada desenhada a partir da origem (0,0), crescendo para cima.
function Trifolio({ x, y, lado, escala = 1, cor }: { x: number; y: number; lado: 1 | -1; escala?: number; cor: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${lado * escala} ${escala})`}>
      <g data-folha>
      <path d="M0 0 C 16 -6 30 -12 44 -14" stroke="#27583e" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M44 -14 C 52 -40 78 -46 86 -30 C 80 -14 60 -8 44 -14 Z" fill={cor} />
      <path d="M44 -14 C 40 -44 54 -64 70 -60 C 72 -40 60 -22 44 -14 Z" fill={cor} opacity="0.9" />
      <path d="M44 -14 C 60 -12 76 2 72 14 C 56 14 46 2 44 -14 Z" fill={cor} opacity="0.85" />
      </g>
    </g>
  );
}

/**
 * Planta de soja que cresce conforme a rolagem: raiz, caule, folhas, flores e vagens.
 * Cada fase acende um item da lista ao lado, ligando a fase da lavoura ao produto certo.
 * No celular e com "reduzir movimento", a planta aparece pronta e a lista fica estática.
 */
export function PlantaCrescendo() {
  const secao = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [etapa, setEtapa] = useState(-1);

  useEffect(() => {
    const el = secao.current;
    const s = svg.current;
    if (!el || !s || semMovimento() || !ehDesktop()) return;
    let desfazer: (() => void) | undefined;
    let cancelado = false;

    carregarGsap().then(({ gsap }) => {
      if (cancelado) return;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
            onUpdate: (st) => setEtapa(Math.min(etapas.length - 1, Math.floor(st.progress * etapas.length * 0.999))),
          },
        });
        tl.fromTo("[data-raiz]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6 }, 0);
        tl.fromTo("[data-caule]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 3 }, 0.3);
        // A folha cresce a partir do pecíolo (origem 0,0 no sistema do grupo externo).
        gsap.utils.toArray<SVGGElement>("[data-folha]", s).forEach((f, i) => {
          tl.fromTo(f, { scale: 0, svgOrigin: "0 0" }, { scale: 1, svgOrigin: "0 0", duration: 0.5, ease: "back.out(1.6)" }, 0.6 + i * 0.42);
        });
        tl.fromTo("[data-flor]", { scale: 0, transformOrigin: "50% 100%" }, { scale: 1, duration: 0.4, stagger: 0.12 }, 2.4);
        tl.fromTo("[data-vagem]", { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.5, stagger: 0.15 }, 3.1);
      }, s);
      desfazer = () => ctx.revert();
    });
    return () => {
      cancelado = true;
      desfazer?.();
    };
  }, []);

  return (
    <div ref={secao} className="grid gap-12 lg:min-h-[180vh] lg:grid-cols-12 lg:gap-10">
      <ol className="space-y-2 self-start lg:col-span-6 lg:space-y-6 lg:pt-[8vh]">
        {etapas.map((e, i) => {
          const acesa = etapa === -1 || i <= etapa;
          return (
            <li
              key={e.fase}
              className={`grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-tinta/15 py-5 transition-opacity duration-500 lg:py-7 ${
                acesa ? "opacity-100" : "lg:opacity-35"
              }`}
            >
              <span className="font-mono text-sm text-verde-700 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-sm font-medium text-verde-700">{e.fase}</p>
                <h3 className="mt-1 text-2xl text-verde-900 sm:text-[1.75rem]">{e.titulo}</h3>
                <p className="mt-2 max-w-md text-tinta-suave">{e.texto}</p>
                <Link href={e.href} className="link-sublinhado mt-3 inline-flex min-h-11 items-center font-medium text-verde-800 hover:text-verde-600">
                  Ver produtos desta fase
                </Link>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-[12vh]">
          <svg ref={svg} viewBox="0 0 320 560" className="mx-auto h-[56vh] max-h-[640px] min-h-80 w-auto" role="img" aria-label="Ilustração de uma planta de soja crescendo, da semente às vagens">
            {/* solo */}
            <rect x="0" y="470" width="320" height="90" fill="#e9e0cc" />
            <path d="M0 470 C 80 462 240 478 320 468" stroke="#d7c9a9" strokeWidth="3" fill="none" />
            {/* raízes */}
            <path data-raiz pathLength={1} strokeDasharray="1" d="M160 470 C 158 500 150 520 140 548 M160 486 C 175 500 190 512 196 534 M158 500 C 140 506 128 516 120 530" stroke="#a08a5f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* caule */}
            <path data-caule pathLength={1} strokeDasharray="1" d="M160 470 C 156 400 166 330 158 260 C 152 200 164 140 160 70" stroke="#27583e" strokeWidth="5" fill="none" strokeLinecap="round" />
            {/* folhas, de baixo para cima */}
            <Trifolio x={160} y={420} lado={-1} escala={0.75} cor="#6f9d72" />
            <Trifolio x={161} y={370} lado={1} escala={0.85} cor="#377250" />
            <Trifolio x={160} y={310} lado={-1} escala={0.95} cor="#27583e" />
            <Trifolio x={158} y={250} lado={1} escala={1} cor="#377250" />
            <Trifolio x={157} y={190} lado={-1} escala={0.9} cor="#6f9d72" />
            <Trifolio x={161} y={130} lado={1} escala={0.75} cor="#377250" />
            {/* flores */}
            <circle data-flor cx="150" cy="292" r="6" fill="#b9a2cf" />
            <circle data-flor cx="170" cy="232" r="6" fill="#b9a2cf" />
            <circle data-flor cx="149" cy="172" r="5" fill="#b9a2cf" />
            {/* vagens */}
            <path data-vagem d="M164 330 C 176 340 180 362 174 378 C 168 366 164 350 164 330 Z" fill="#c8952d" />
            <path data-vagem d="M154 330 C 142 342 140 362 146 376 C 152 364 156 348 154 330 Z" fill="#e0b04e" />
            <path data-vagem d="M164 270 C 178 280 182 300 176 316 C 170 304 166 288 164 270 Z" fill="#e0b04e" />
            <path data-vagem d="M152 270 C 140 282 138 300 144 314 C 150 302 154 288 152 270 Z" fill="#c8952d" />
          </svg>
        </div>
      </div>
    </div>
  );
}
