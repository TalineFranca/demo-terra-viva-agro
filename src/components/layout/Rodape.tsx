import Link from "next/link";
import { empresa, paginas } from "@/data/empresa";
import { fotos } from "@/data/fotos";
import { categorias } from "@/data/produtos";
import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";
import { Logo } from "./Logo";

const link = "inline-flex min-h-11 items-center text-tinta hover:text-verde-700 hover:underline hover:decoration-trigo-400 hover:decoration-2 hover:underline-offset-4";

/** Rodapé completo em bege-claro. */
export function Rodape() {
  const ano = new Date().getFullYear();
  return (
    <footer className="textura border-t border-tinta/10 bg-creme-200 text-tinta">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-28 sm:px-6 lg:px-10 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-tinta-suave">{empresa.descricao}</p>
            <a href={empresa.instagram.url} target="_blank" rel="noopener noreferrer" className={`${link} mt-3 font-medium`}>
              Instagram {empresa.instagram.usuario}
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <nav aria-label="Páginas">
              <h2 className="text-sm font-semibold text-verde-800">Páginas</h2>
              <ul className="mt-2">
                <li>
                  <Link href="/" className={link}>Início</Link>
                </li>
                {paginas.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className={link}>{p.rotulo}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Produtos">
              <h2 className="text-sm font-semibold text-verde-800">Produtos</h2>
              <ul className="mt-2">
                {categorias.map((c) => (
                  <li key={c.id}>
                    <Link href={`/produtos?categoria=${c.id}`} className={link}>{c.nome}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-semibold text-verde-800">Contato</h2>
              <ul className="mt-2">
                <li>
                  <a href={linkWhatsApp(mensagemAgronomo)} target="_blank" rel="noopener noreferrer" className={link}>
                    WhatsApp {empresa.whatsapp.exibicao}
                  </a>
                </li>
                <li>
                  <a href={`tel:${empresa.telefone.link}`} className={link}>Telefone {empresa.telefone.exibicao}</a>
                </li>
                <li>
                  <a href={`mailto:${empresa.email}`} className={`${link} break-all`}>{empresa.email}</a>
                </li>
                <li className="mt-1 text-tinta-suave">{empresa.endereco}</li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-verde-800">Horário</h2>
              <dl className="mt-3 space-y-3">
                {empresa.horario.map((h) => (
                  <div key={h.dias}>
                    <dt className="text-tinta-suave">{h.dias}</dt>
                    <dd className="font-medium">{h.horas}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-tinta-suave">{empresa.plantao}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-tinta/15 pt-6 text-sm text-tinta-suave lg:flex-row lg:items-start lg:justify-between">
          <p>
            © {ano} {empresa.nomeCompleto}. {empresa.cidade} - {empresa.uf}.
            {empresa.demonstracao && (
              <span className="mt-1 block font-medium text-tinta">
                Conteúdo de demonstração: textos, números e produtos são exemplos.
              </span>
            )}
          </p>
          <details className="lg:max-w-md lg:text-right">
            <summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4 hover:text-verde-700">
              Créditos das fotos
            </summary>
            <ul className="mt-2 space-y-1 text-left">
              {Object.values(fotos).map((f) => (
                <li key={f.fonte}>
                  {f.legenda}:{" "}
                  <a href={f.fonte} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-verde-700">
                    {f.credito}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </footer>
  );
}
