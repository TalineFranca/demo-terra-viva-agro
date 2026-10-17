"use client";

import { AnimatePresence, LazyMotion, domMax, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { categorias, culturas, nomeCategoria, produtos, textoCulturas, type Categoria, type Cultura } from "@/data/produtos";
import { linkWhatsApp } from "@/lib/whatsapp";
import { BotaoLink } from "../ui/Botao";
import { Embalagem } from "../ui/Embalagem";

type Filtro<T> = T | "todas";

/**
 * Catálogo com filtro por categoria e cultura. O filtro fica na URL (?categoria=&cultura=),
 * então dá para compartilhar o link e o rodapé pode abrir uma categoria direto.
 * Ao filtrar, os itens se reorganizam com animação (Framer Motion).
 */
export function Catalogo() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const reduzir = useReducedMotion();

  const categoria = (categorias.some((c) => c.id === params.get("categoria")) ? params.get("categoria") : "todas") as Filtro<Categoria>;
  const cultura = (culturas.some((c) => c.id === params.get("cultura")) ? params.get("cultura") : "todas") as Filtro<Cultura>;

  const mudar = (chave: "categoria" | "cultura", valor: string) => {
    const novo = new URLSearchParams(params.toString());
    if (valor === "todas") novo.delete(chave);
    else novo.set(chave, valor);
    const q = novo.toString();
    router.replace(q ? `${pathname}?${q}` : pathname, { scroll: false });
  };

  const lista = useMemo(
    () => produtos.filter((p) => (categoria === "todas" || p.categoria === categoria) && (cultura === "todas" || p.culturas.includes(cultura))),
    [categoria, cultura],
  );
  const descricaoCategoria = categorias.find((c) => c.id === categoria)?.descricao;

  const chip = (ativo: boolean) =>
    `min-h-11 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors ${
      ativo ? "border-verde-800 bg-verde-800 text-creme-50" : "border-tinta/20 bg-creme-50 text-tinta hover:border-verde-800"
    }`;

  return (
    <div>
      <div className="grid gap-6 border-y border-tinta/15 py-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-tinta-suave">Categoria</legend>
          <div className="flex flex-wrap gap-2">
            {[{ id: "todas", nome: "Todas" }, ...categorias].map((c) => (
              <button key={c.id} type="button" aria-pressed={categoria === c.id} onClick={() => mudar("categoria", c.id)} className={chip(categoria === c.id)}>
                {c.nome}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="filtro-cultura" className="mb-2 block text-sm font-medium text-tinta-suave">
            Cultura
          </label>
          <div className="relative">
            <select
              id="filtro-cultura"
              value={cultura}
              onChange={(e) => mudar("cultura", e.target.value)}
              className="min-h-11 w-full appearance-none rounded-full border border-tinta/20 bg-creme-50 py-2 pr-10 pl-4 font-medium sm:w-56"
            >
              <option value="todas">Todas as culturas</option>
              {culturas.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-2 -translate-y-3/4 rotate-45 border-r-2 border-b-2 border-tinta" />
          </div>
        </div>
      </div>

      <p className="mt-5 min-h-6 text-tinta-suave" aria-live="polite">
        {lista.length} {lista.length === 1 ? "produto" : "produtos"}
        {descricaoCategoria && <span> · {descricaoCategoria}</span>}
      </p>

      {lista.length === 0 ? (
        <div className="mt-6 rounded-[1.5rem] border border-dashed border-tinta/30 px-6 py-14 text-center">
          <p className="text-2xl font-semibold text-verde-900">Nenhum produto com esse filtro no site.</p>
          <p className="mx-auto mt-2 max-w-md text-tinta-suave">O site mostra parte do estoque. Pergunte no WhatsApp que o vendedor confere.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => router.replace(pathname, { scroll: false })} className={chip(false)}>
              Limpar filtros
            </button>
            <BotaoLink href={linkWhatsApp("Olá! Procuro um produto que não achei no site da Safra Certa:")} externo>
              Perguntar no WhatsApp
            </BotaoLink>
          </div>
        </div>
      ) : (
        <LazyMotion features={domMax} strict>
          <ul className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial={false} mode="popLayout">
              {lista.map((p) => (
                <m.li
                  key={p.slug}
                  layout={reduzir ? false : "position"}
                  initial={reduzir ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduzir ? undefined : { opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link href={`/produtos/${p.slug}`} className="group block">
                    <div className="relative flex aspect-[5/4] items-end justify-center overflow-hidden rounded-[1.5rem] bg-creme-200 pt-6">
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-creme-300/50" />
                      <div className="relative w-36 transition-transform duration-500 ease-[var(--ease-suave)] group-hover:-translate-y-2 group-hover:rotate-[-2deg] sm:w-44 lg:w-48">
                        <Embalagem tipo={p.embalagem.tipo} nome={p.nome} categoria={p.categoria} />
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-tinta-suave">
                      {nomeCategoria(p.categoria)} · {textoCulturas(p.culturas)}
                    </p>
                    <h2 className="mt-1 text-2xl text-verde-900 group-hover:underline group-hover:decoration-trigo-400 group-hover:decoration-2 group-hover:underline-offset-4">
                      {p.nome}
                    </h2>
                    <p className="mt-1.5 text-tinta-suave">{p.resumo}</p>
                  </Link>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </LazyMotion>
      )}

      <p className="mt-14 text-sm text-tinta-suave">
        Defensivos são vendidos somente com receituário agronômico. Produtos e fichas de exemplo, para demonstração.
      </p>
    </div>
  );
}
