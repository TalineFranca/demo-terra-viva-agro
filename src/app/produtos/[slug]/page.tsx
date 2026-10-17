import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotaoLink } from "@/components/ui/Botao";
import { Embalagem } from "@/components/ui/Embalagem";
import { IconeConversa, IconeSeta } from "@/components/ui/Icones";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { nomeCategoria, produtoPorSlug, produtos, textoCulturas } from "@/data/produtos";
import { linkWhatsApp, mensagemOrcamento } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = produtoPorSlug((await params).slug);
  if (!p) return {};
  return { title: p.nome, description: `${p.resumo} ${nomeCategoria(p.categoria)} para ${textoCulturas(p.culturas).toLowerCase()}.` };
}

export default async function PaginaProduto({ params }: Props) {
  const p = produtoPorSlug((await params).slug);
  if (!p) notFound();

  const relacionados = produtos.filter((o) => o.slug !== p.slug && (o.categoria === p.categoria || o.culturas.some((c) => p.culturas.includes(c)))).slice(0, 3);

  return (
    <>
      <section aria-labelledby="titulo-produto" className="bg-creme-100">
        <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-10 lg:pt-32">
          <nav aria-label="Caminho" className="text-[0.9375rem]">
            <ol className="flex flex-wrap items-center gap-x-2 text-tinta-suave">
              <li>
                <Link href="/produtos" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-verde-700">
                  Produtos
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/produtos?categoria=${p.categoria}`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-verde-700">
                  {nomeCategoria(p.categoria)}
                </Link>
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-6 pb-16 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-10 lg:pb-24">
          {/* Embalagem grande, flutuando de leve sobre um "chão" */}
          <div className="relative flex items-end justify-center overflow-hidden rounded-[2rem] bg-creme-200 px-8 pt-12 lg:order-2 lg:col-span-6 lg:min-h-[34rem]">
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-creme-300/60" />
            <div className="relative w-52 animate-[flutuar_6s_ease-in-out_infinite] sm:w-64 lg:w-80">
              <Embalagem tipo={p.embalagem.tipo} nome={p.nome} categoria={p.categoria} />
            </div>
          </div>

          <div className="lg:order-1 lg:col-span-6">
            <p className="font-medium text-verde-700">
              {nomeCategoria(p.categoria)} · {textoCulturas(p.culturas)}
            </p>
            <TituloRevelado id="titulo-produto" className="mt-3 text-[2.6rem] text-verde-900 sm:text-6xl" linhas={[p.nome]} />
            <p className="mt-6 max-w-xl text-lg">{p.descricao}</p>
            <p className="mt-4 text-tinta-suave">
              <span className="font-semibold text-tinta">Embalagem:</span> {p.embalagem.texto}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BotaoLink href={linkWhatsApp(mensagemOrcamento(p))} externo className="min-h-14 px-8">
                <IconeConversa />
                Pedir orçamento
              </BotaoLink>
              <BotaoLink href="/servicos" variante="contorno" className="min-h-14 px-8">
                Falar sobre o manejo
              </BotaoLink>
            </div>
            {p.categoria === "defensivos" && (
              <p className="mt-6 max-w-md border-l-2 border-trigo-400 pl-4 text-[0.9375rem] text-tinta-suave">
                Defensivo só é vendido com receituário agronômico. O agrônomo avalia a área e emite a receita.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Ficha técnica (tabela que vira blocos no celular) e uso recomendado */}
      <section aria-labelledby="titulo-ficha" className="bg-creme-50">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-7">
            <h2 id="titulo-ficha" className="text-3xl text-verde-900 sm:text-4xl">
              Ficha técnica
            </h2>
            <dl className="mt-6 border-t-2 border-verde-800">
              {p.ficha.map((f) => (
                <div key={f.rotulo} className="grid gap-1 border-b border-tinta/15 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="text-sm text-tinta-suave sm:text-base">{f.rotulo}</dt>
                  <dd className="text-lg font-medium">{f.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-3xl text-verde-900 sm:text-4xl">Indicado para</h2>
            <ul className="mt-6 space-y-3">
              {p.uso.map((u) => (
                <li key={u} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 size-2 shrink-0 rounded-full bg-trigo-400" />
                  {u}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-tinta-suave">Ficha de exemplo. A recomendação para a sua área vem do agrônomo.</p>
          </div>
        </div>
      </section>

      {relacionados.length > 0 && (
        <section aria-labelledby="titulo-relacionados" className="escuro bg-verde-900 text-creme-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10">
            <h2 id="titulo-relacionados" className="text-3xl sm:text-4xl">
              Também pode interessar
            </h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-3">
              {relacionados.map((r) => (
                <li key={r.slug}>
                  <Link href={`/produtos/${r.slug}`} className="group flex items-center gap-5">
                    <div className="w-20 shrink-0 transition-transform group-hover:-translate-y-1">
                      <Embalagem tipo={r.embalagem.tipo} nome={r.nome} categoria={r.categoria} />
                    </div>
                    <span>
                      <span className="block text-sm text-creme-200">{nomeCategoria(r.categoria)}</span>
                      <span className="block text-xl font-semibold group-hover:underline group-hover:decoration-trigo-400 group-hover:underline-offset-4">{r.nome}</span>
                      <span className="mt-1 inline-flex items-center gap-1 text-sm text-trigo-300">
                        Ver <IconeSeta className="size-3.5" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
