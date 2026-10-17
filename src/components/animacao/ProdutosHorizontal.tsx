"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { nomeCategoria, textoCulturas, type Produto } from "@/data/produtos";
import { carregarGsap, ehDesktop, semMovimento } from "@/lib/animacao";
import { Embalagem } from "../ui/Embalagem";
import { IconeSeta } from "../ui/Icones";

/**
 * Destaques em faixa horizontal. No desktop a seção fica presa na tela e a rolagem vertical
 * move os produtos para o lado (com barra de progresso). No celular, deslizar com o dedo.
 * Com "reduzir movimento", vira uma faixa rolável comum.
 */
export function ProdutosHorizontal({ produtos, titulo }: { produtos: Produto[]; titulo: React.ReactNode }) {
  const secao = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLUListElement>(null);
  const barra = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = secao.current;
    const t = trilho.current;
    if (!el || !t || semMovimento() || !ehDesktop()) return;
    let desfazer: (() => void) | undefined;
    let cancelado = false;

    carregarGsap().then(({ gsap }) => {
      if (cancelado) return;
      const ctx = gsap.context(() => {
        const distancia = () => t.scrollWidth - window.innerWidth + 80;
        gsap.to(t, {
          x: () => -distancia(),
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => `+=${distancia()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (st) => {
              if (barra.current) barra.current.style.transform = `scaleX(${st.progress})`;
            },
          },
        });
        // Cada embalagem gira um pouco conforme passa, dando volume.
        gsap.utils.toArray<HTMLElement>("[data-embalagem]").forEach((emb) => {
          gsap.fromTo(emb, { rotate: -6, y: 20 }, { rotate: 4, y: -10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${distancia()}`, scrub: true } });
        });
      }, el);
      desfazer = () => ctx.revert();
    });
    return () => {
      cancelado = true;
      desfazer?.();
    };
  }, []);

  // O GSAP envolve a seção presa numa div própria (pin-spacer). Por isso a seção fica dentro
  // de um contêiner do React: ao trocar de página o React remove o contêiner inteiro, sem
  // tentar tirar a seção de um lugar onde ela já não está.
  return (
    <div>
    <section ref={secao} aria-labelledby="titulo-destaques" className="escuro fileiras relative overflow-hidden bg-verde-900 text-creme-50">
      <div className="flex min-h-svh flex-col justify-center py-20 lg:py-16">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-6 px-4 sm:px-6 lg:px-10">
          <h2 id="titulo-destaques" className="max-w-xl text-4xl sm:text-5xl lg:text-6xl">
            {titulo}
          </h2>
          <Link href="/produtos" className="hidden shrink-0 items-center gap-2 font-medium text-trigo-300 hover:text-trigo-400 sm:inline-flex">
            Catálogo completo <IconeSeta />
          </Link>
        </div>

        <ul
          ref={trilho}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-6 [scrollbar-width:none] sm:px-6 lg:snap-none lg:gap-8 lg:overflow-visible lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {produtos.map((p, i) => (
            <li key={p.slug} className="w-[78vw] max-w-sm shrink-0 snap-start sm:w-[44vw] lg:w-[30rem] lg:max-w-none">
              <Link href={`/produtos/${p.slug}`} className="group grid h-full grid-rows-[auto_1fr] gap-6 rounded-[2rem] bg-verde-800/70 p-6 transition-colors hover:bg-verde-700/70 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1 lg:items-center lg:p-8">
                <div data-embalagem className="mx-auto w-40 lg:w-full">
                  <Embalagem tipo={p.embalagem.tipo} nome={p.nome} categoria={p.categoria} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-trigo-300">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-2xl lg:text-3xl">{p.nome}</h3>
                  <p className="mt-1 text-sm text-creme-200">
                    {nomeCategoria(p.categoria)} · {textoCulturas(p.culturas)}
                  </p>
                  <p className="mt-3 text-creme-100">{p.resumo}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-medium text-trigo-300">
                    Ver produto
                    <IconeSeta className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-6 hidden w-full max-w-7xl px-10 lg:block" aria-hidden>
          <div className="h-px w-full bg-creme-50/20">
            <span ref={barra} className="block h-0.5 origin-left scale-x-0 bg-trigo-400" />
          </div>
        </div>
        <Link href="/produtos" className="mx-4 mt-2 inline-flex min-h-11 items-center gap-2 font-medium text-trigo-300 sm:hidden">
          Catálogo completo <IconeSeta />
        </Link>
      </div>
    </section>
    </div>
  );
}
