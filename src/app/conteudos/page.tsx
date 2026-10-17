import type { Metadata } from "next";
import { ConteudoDestaque, LinhasConteudo } from "@/components/conteudos/ListaConteudos";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { conteudosOrdenados } from "@/data/conteudos";

export const metadata: Metadata = {
  title: "Conteúdos",
  description: "Dicas e notícias do campo: manejo, solo e culturas de verão e de inverno no Planalto Médio gaúcho.",
};

export default function PaginaConteudos() {
  const [destaque, ...resto] = conteudosOrdenados;
  return (
    <>
      <section aria-labelledby="titulo-conteudos" className="bg-creme-100">
        <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-10 lg:pt-40">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <TituloRevelado id="titulo-conteudos" className="text-[3rem] text-verde-900 sm:text-7xl lg:col-span-7 lg:text-8xl" linhas={["Conteúdos"]} />
            <p className="text-lg text-tinta-suave lg:col-span-5">
              Orientações da equipe técnica sobre manejo, solo e culturas. Para a recomendação da sua área, fale com o
              agrônomo.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Conteúdo em destaque" className="escuro bg-verde-900 text-creme-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <ConteudoDestaque c={destaque} escuro />
        </div>
      </section>

      <section aria-labelledby="titulo-todos" className="bg-creme-50">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-10">
          <h2 id="titulo-todos" className="mb-8 text-3xl text-verde-900">
            Mais conteúdos
          </h2>
          <LinhasConteudo lista={resto} />
          <p className="mt-8 text-sm text-tinta-suave">Conteúdos de exemplo, para demonstração.</p>
        </div>
      </section>
    </>
  );
}
