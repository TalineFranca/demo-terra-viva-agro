import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalogo } from "@/components/produtos/Catalogo";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { categorias, produtos } from "@/data/produtos";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Catálogo de sementes, fertilizantes, defensivos, nutrição foliar e biológicos da Safra Certa, em Tapejara (RS).",
};

export default function PaginaProdutos() {
  return (
    <div className="bg-creme-100">
      <section aria-labelledby="titulo-produtos" className="mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-10 lg:pt-40 lg:pb-14">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <TituloRevelado id="titulo-produtos" className="text-[3rem] text-verde-900 sm:text-7xl lg:col-span-7 lg:text-8xl" linhas={["Produtos"]} />
          <p className="text-lg text-tinta-suave lg:col-span-5">
            {produtos.length} produtos em {categorias.length} categorias. Abra a ficha de cada um para ver indicação,
            embalagem e uso, e peça o orçamento pelo WhatsApp.
          </p>
        </div>
      </section>
      <section aria-label="Catálogo" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-10">
        <Suspense fallback={<p className="py-10 text-tinta-suave">Carregando catálogo…</p>}>
          <Catalogo />
        </Suspense>
      </section>
    </div>
  );
}
