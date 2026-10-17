import type { Metadata } from "next";
import { MapaRegiao } from "@/components/sobre/MapaRegiao";
import { LinhaDoTempo } from "@/components/sobre/LinhaDoTempo";
import { Foto } from "@/components/ui/Foto";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { empresa } from "@/data/empresa";
import { fotos } from "@/data/fotos";
import { equipe, estrutura, missao, valores } from "@/data/institucional";
import { cidadesMapa } from "@/data/mapa-rs";

export const metadata: Metadata = {
  title: "Sobre",
  description: "História, missão, região de atuação, equipe e estrutura da Safra Certa Insumos Agrícolas, em Tapejara (RS).",
};

export default function PaginaSobre() {
  return (
    <>
      {/* Abertura: título e texto à esquerda, foto alta à direita */}
      <section aria-labelledby="titulo-sobre" className="bg-creme-100">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10 lg:pt-40 lg:pb-24">
          <div className="lg:col-span-6">
            <p className="font-medium text-verde-700">Sobre a Safra Certa</p>
            <TituloRevelado id="titulo-sobre" className="mt-3 text-[2.75rem] text-verde-900 sm:text-6xl lg:text-7xl" linhas={["Uma loja de Tapejara", "que vai até a lavoura"]} />
            <p className="mt-6 max-w-lg text-lg text-tinta-suave">
              Somos uma revenda de insumos do Planalto Médio gaúcho. Vendemos o que a lavoura precisa e
              mandamos agrônomo para ver se deu certo.
            </p>
          </div>
          <Foto foto={fotos.plantio} sizes="(min-width: 1024px) 45vw, 100vw" preload proporcao="aspect-[4/3] lg:aspect-[5/4]" className="lg:col-span-6 [&>div]:rounded-[1.5rem]" />
        </div>
      </section>

      {/* Missão em faixa escura, com os valores numerados */}
      <section aria-labelledby="titulo-missao" className="escuro fileiras bg-verde-900 text-creme-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
          <div className="lg:col-span-7">
            <h2 id="titulo-missao" className="font-medium text-trigo-300">Missão</h2>
            <p className="mt-4 text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl">{missao}</p>
          </div>
          <ol className="lg:col-span-4 lg:col-start-9">
            {valores.map((v, i) => (
              <li key={v.titulo} className="grid grid-cols-[2.5rem_1fr] border-t border-creme-50/20 py-5">
                <span className="font-mono text-sm text-trigo-300">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-xl">{v.titulo}</h3>
                  <p className="mt-1 text-creme-200">{v.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* História */}
      <section aria-labelledby="titulo-historia" className="bg-creme-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <h2 id="titulo-historia" className="mb-14 max-w-xl text-4xl text-verde-900 sm:text-5xl md:ml-[12.5rem] md:pl-12">
            Como chegamos até aqui
          </h2>
          <LinhaDoTempo />
          <p className="mt-10 text-sm text-tinta-suave md:ml-[12.5rem] md:pl-12">Histórico de exemplo, para demonstração.</p>
        </div>
      </section>

      {/* Região de atuação */}
      <section aria-labelledby="titulo-regiao" className="textura bg-creme-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="titulo-regiao" className="text-4xl text-verde-900 sm:text-5xl lg:col-span-6">
              Região de atuação
            </h2>
            <p className="text-lg text-tinta-suave lg:col-span-5 lg:col-start-8">
              A loja fica em {empresa.cidade}, no norte do estado. A equipe técnica atende produtores em
              {" "}{cidadesMapa.length} municípios do Planalto Médio.
            </p>
          </div>
          <div className="mt-12">
            <MapaRegiao />
          </div>
          <ul className="mt-10 columns-2 gap-8 text-tinta-suave sm:columns-3 lg:columns-4">
            {cidadesMapa.map((c) => (
              <li key={c.nome} className={`py-1 ${c.sede ? "font-semibold text-verde-900" : ""}`}>
                {c.nome}
                {c.sede && " (sede)"}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Equipe e estrutura */}
      <section aria-labelledby="titulo-equipe" className="bg-creme-50">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
          <div className="lg:col-span-6">
            <h2 id="titulo-equipe" className="text-4xl text-verde-900 sm:text-5xl">
              Equipe
            </h2>
            <ul className="mt-8 border-t border-tinta/20">
              {equipe.map((p) => (
                <li key={p.nome} className="grid grid-cols-[3.25rem_1fr] items-center gap-4 border-b border-tinta/15 py-4">
                  <span aria-hidden className="flex size-13 items-center justify-center rounded-full bg-verde-100 font-mono text-verde-800">
                    {p.iniciais}
                  </span>
                  <span>
                    <span className="block text-lg font-semibold text-verde-900">{p.nome}</span>
                    <span className="block text-tinta-suave">
                      {p.funcao} · {p.area}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-tinta-suave">Nomes de exemplo, para demonstração.</p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="text-4xl text-verde-900 sm:text-5xl">Estrutura</h2>
            <Foto foto={fotos.sojaMadura} sizes="(min-width: 1024px) 35vw, 100vw" proporcao="aspect-[16/10]" className="mt-8 [&>div]:rounded-[1.5rem]" />
            <dl className="mt-6">
              {estrutura.map((e) => (
                <div key={e.item} className="grid grid-cols-[7.5rem_1fr] gap-4 border-t border-tinta/15 py-4">
                  <dt className="font-mono text-2xl font-medium text-verde-800">{e.valor}</dt>
                  <dd>
                    <span className="block font-semibold text-verde-900">{e.item}</span>
                    <span className="text-tinta-suave">{e.detalhe}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
