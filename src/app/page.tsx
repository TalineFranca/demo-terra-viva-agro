import Link from "next/link";
import { PlantaCrescendo } from "@/components/animacao/PlantaCrescendo";
import { ProdutosHorizontal } from "@/components/animacao/ProdutosHorizontal";
import { ConteudoDestaque, LinhasConteudo } from "@/components/conteudos/ListaConteudos";
import { ChamadaContato } from "@/components/home/ChamadaContato";
import { Hero } from "@/components/home/Hero";
import { Numeros } from "@/components/home/Numeros";
import { IconeSeta } from "@/components/ui/Icones";
import { conteudosOrdenados } from "@/data/conteudos";
import { produtos } from "@/data/produtos";

export default function Home() {
  const destaques = produtos.filter((p) => p.destaque);
  const [primeiro, ...outros] = conteudosOrdenados;

  return (
    <>
      <Hero />

      {/* Resumo da empresa + planta crescendo: cada fase da lavoura e o que a loja entrega nela */}
      <section aria-labelledby="titulo-resumo" className="bg-creme-100">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-20 sm:px-6 lg:px-10 lg:pt-16 lg:pb-28">
          <div className="grid gap-6 lg:grid-cols-12">
            <h2 id="titulo-resumo" className="text-4xl text-verde-900 sm:text-5xl lg:col-span-6 lg:text-6xl">
              Do balcão à lavoura, em cada fase da safra
            </h2>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lg text-tinta-suave">
                A Safra Certa é uma revenda de insumos de Tapejara. Além de vender, a equipe técnica visita as
                lavouras da região e acompanha a soja, o milho e o trigo de perto, fase por fase.
              </p>
              <Link href="/sobre" className="link-sublinhado mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-verde-800">
                Conheça a empresa <IconeSeta />
              </Link>
            </div>
          </div>
          <div className="mt-14 lg:mt-20">
            <PlantaCrescendo />
          </div>
        </div>
      </section>

      <ProdutosHorizontal produtos={destaques} titulo="O que mais sai nesta safra" />

      <Numeros />

      <section aria-labelledby="titulo-conteudos" className="textura bg-creme-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="titulo-conteudos" className="text-4xl text-verde-900 sm:text-5xl">
              Conversa de campo
            </h2>
            <Link href="/conteudos" className="link-sublinhado inline-flex min-h-11 items-center gap-2 font-medium text-verde-800">
              Todos os conteúdos <IconeSeta />
            </Link>
          </div>
          <div className="mt-12">
            <ConteudoDestaque c={primeiro} />
          </div>
          <div className="mt-14">
            <LinhasConteudo lista={outros.slice(0, 3)} />
          </div>
        </div>
      </section>

      <ChamadaContato />
    </>
  );
}
