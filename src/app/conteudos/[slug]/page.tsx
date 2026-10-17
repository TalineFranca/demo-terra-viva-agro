import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinhasConteudo } from "@/components/conteudos/ListaConteudos";
import { BotaoLink } from "@/components/ui/Botao";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { conteudoPorSlug, conteudos, conteudosOrdenados, formatarData } from "@/data/conteudos";
import { fotos } from "@/data/fotos";
import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return conteudos.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = conteudoPorSlug((await params).slug);
  if (!c) return {};
  return { title: c.titulo, description: c.resumo };
}

export default async function PaginaConteudo({ params }: Props) {
  const c = conteudoPorSlug((await params).slug);
  if (!c) notFound();
  const foto = fotos[c.foto];
  const outros = conteudosOrdenados.filter((o) => o.slug !== c.slug).slice(0, 3);

  return (
    <article aria-labelledby="titulo-conteudo">
      <header className="bg-creme-100">
        <div className="mx-auto max-w-4xl px-4 pt-28 pb-10 sm:px-6 lg:pt-40">
          <Link href="/conteudos" className="inline-flex min-h-11 items-center text-[0.9375rem] text-tinta-suave underline underline-offset-4 hover:text-verde-700">
            Conteúdos
          </Link>
          <p className="mt-4 text-sm text-tinta-suave">
            {c.categoria} · {formatarData(c.data)} · {c.leitura} min de leitura
          </p>
          <TituloRevelado id="titulo-conteudo" className="mt-3 text-[2.4rem] text-verde-900 sm:text-5xl lg:text-6xl" linhas={[c.titulo]} />
          <p className="mt-5 text-xl text-tinta-suave">{c.resumo}</p>
        </div>
        <figure className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[1.5rem] bg-creme-300">
            <Image src={foto.src} alt={foto.alt} fill preload sizes="(min-width: 1152px) 1100px, 100vw" placeholder="blur" quality={60} className="object-cover" />
          </div>
          <figcaption className="mt-2 text-sm text-tinta-suave">{foto.legenda}. Foto ilustrativa.</figcaption>
        </figure>
      </header>

      <div className="bg-creme-100">
        <div className="mx-auto max-w-[42rem] px-4 py-14 text-lg leading-relaxed sm:px-6">
          {c.corpo.map((b, i) => {
            if (b.tipo === "h2") return <h2 key={i} className="mt-10 mb-3 text-2xl text-verde-900 sm:text-3xl">{b.texto}</h2>;
            if (b.tipo === "lista")
              return (
                <ul key={i} className="my-5 space-y-2">
                  {b.itens.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span aria-hidden className="mt-3 size-2 shrink-0 rounded-full bg-trigo-400" />
                      {it}
                    </li>
                  ))}
                </ul>
              );
            return <p key={i} className="my-5">{b.texto}</p>;
          })}

          <aside className="mt-12 rounded-[1.5rem] bg-verde-100 p-6 sm:p-8">
            <p className="text-xl font-semibold text-verde-900">Dúvida sobre a sua lavoura?</p>
            <p className="mt-2 text-base text-tinta-suave">Este conteúdo é uma orientação geral. O agrônomo pode olhar a sua área e recomendar o manejo.</p>
            <BotaoLink href={linkWhatsApp(mensagemAgronomo)} externo className="mt-5">
              Falar com agrônomo
            </BotaoLink>
          </aside>
        </div>
      </div>

      <section aria-labelledby="titulo-outros" className="bg-creme-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-10">
          <h2 id="titulo-outros" className="mb-6 text-3xl text-verde-900">
            Leia também
          </h2>
          <LinhasConteudo lista={outros} />
        </div>
      </section>
    </article>
  );
}
