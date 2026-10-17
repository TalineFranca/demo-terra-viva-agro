import Image from "next/image";
import Link from "next/link";
import { formatarData, type Conteudo } from "@/data/conteudos";
import { fotos } from "@/data/fotos";
import { IconeSeta } from "../ui/Icones";

/** Conteúdo em destaque: foto grande e título forte. */
export function ConteudoDestaque({ c, escuro = false }: { c: Conteudo; escuro?: boolean }) {
  const foto = fotos[c.foto];
  return (
    <Link href={`/conteudos/${c.slug}`} className="group grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-creme-300 lg:col-span-7">
        <Image src={foto.src} alt={foto.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" placeholder="blur" quality={60} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      </div>
      <div className="lg:col-span-5">
        <p className={`text-sm ${escuro ? "text-creme-200" : "text-tinta-suave"}`}>
          {c.categoria} · {formatarData(c.data)} · {c.leitura} min de leitura
        </p>
        <h3 className={`mt-3 text-3xl sm:text-4xl ${escuro ? "text-creme-50" : "text-verde-900"} group-hover:underline group-hover:decoration-trigo-400 group-hover:decoration-2 group-hover:underline-offset-[0.2em]`}>
          {c.titulo}
        </h3>
        <p className={`mt-3 ${escuro ? "text-creme-100" : "text-tinta-suave"}`}>{c.resumo}</p>
        <span className={`mt-5 inline-flex items-center gap-2 font-medium ${escuro ? "text-trigo-300" : "text-verde-800"}`}>
          Ler conteúdo <IconeSeta className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

/** Lista simples de conteúdos, em linhas separadas por fio. */
export function LinhasConteudo({ lista }: { lista: Conteudo[] }) {
  return (
    <ul className="border-t border-tinta/20">
      {lista.map((c) => (
        <li key={c.slug} className="border-b border-tinta/15">
          <Link href={`/conteudos/${c.slug}`} className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-6">
            <span className="font-mono text-sm text-tinta-suave">{formatarData(c.data)}</span>
            <span>
              <span className="block text-xl font-semibold text-verde-900 group-hover:underline group-hover:decoration-trigo-400 group-hover:decoration-2 group-hover:underline-offset-4 sm:text-2xl">
                {c.titulo}
              </span>
              <span className="mt-1 block text-tinta-suave">{c.resumo}</span>
            </span>
            <span className="text-sm font-medium text-verde-700">{c.categoria}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
