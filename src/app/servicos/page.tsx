import type { Metadata } from "next";
import { CalendarioSafra } from "@/components/servicos/CalendarioSafra";
import { PerfilSolo } from "@/components/servicos/PerfilSolo";
import { BotaoLink } from "@/components/ui/Botao";
import { Foto } from "@/components/ui/Foto";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { fotos } from "@/data/fotos";
import { servicos } from "@/data/institucional";
import { linkWhatsApp } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Assistência técnica na lavoura, análise de solo e consultoria de safra com a equipe da Safra Certa, em Tapejara (RS).",
};

export default function PaginaServicos() {
  const [assistencia, solo, consultoria] = servicos;
  return (
    <>
      {/* Abertura escura com o índice dos três serviços */}
      <section aria-labelledby="titulo-servicos" className="escuro fileiras bg-verde-900 text-creme-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10 lg:pt-40 lg:pb-28">
          <div className="lg:col-span-7">
            <TituloRevelado id="titulo-servicos" className="text-[2.75rem] sm:text-6xl lg:text-7xl" linhas={["O agrônomo", "vai até você"]} />
            <p className="mt-6 max-w-lg text-lg text-creme-100">
              Quem compra insumo com a gente tem técnico acompanhando a safra. Sem custo à parte pela visita.
            </p>
          </div>
          <ol className="lg:col-span-4 lg:col-start-9">
            {servicos.map((s, i) => (
              <li key={s.id} className="border-t border-creme-50/20">
                <a href={`#${s.id}`} className="group flex min-h-14 items-center gap-4 py-3">
                  <span className="font-mono text-sm text-trigo-300">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-xl font-medium group-hover:text-trigo-300">{s.titulo}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 1. Assistência técnica: foto grande à esquerda, etapas em linha do tempo horizontal */}
      <section id="assistencia" aria-labelledby="titulo-assistencia" className="scroll-mt-20 bg-creme-100">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <Foto foto={fotos.sojaFileiras} sizes="(min-width: 1024px) 50vw, 100vw" proporcao="aspect-[4/3]" className="lg:col-span-6 [&>div]:rounded-[1.5rem]" />
            <div className="lg:col-span-5 lg:col-start-8">
              <h2 id="titulo-assistencia" className="text-4xl text-verde-900 sm:text-5xl">
                {assistencia.titulo}
              </h2>
              <p className="mt-4 text-lg text-tinta-suave">{assistencia.resumo}</p>
            </div>
          </div>
          <ol className="mt-14 grid gap-0 border-t-2 border-verde-800 md:grid-cols-4">
            {assistencia.etapas.map((e, i) => (
              <li key={e.titulo} className="relative border-b border-tinta/15 py-6 md:border-b-0 md:pr-6">
                <span aria-hidden className="absolute -top-[7px] left-0 hidden size-3 rounded-full bg-trigo-400 md:block" />
                <p className="font-mono text-sm text-verde-700">Passo {i + 1}</p>
                <h3 className="mt-1 text-2xl text-verde-900">{e.titulo}</h3>
                <p className="mt-2 text-tinta-suave">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 2. Análise de solo: perfil animado */}
      <section id="solo" aria-labelledby="titulo-solo" className="scroll-mt-20 bg-creme-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <h2 id="titulo-solo" className="text-4xl text-verde-900 sm:text-5xl">
              {solo.titulo}
            </h2>
            <p className="mt-4 text-lg text-tinta-suave">{solo.resumo} O laudo sai em até 10 dias úteis.</p>
          </div>
          <div className="mt-12">
            <PerfilSolo />
          </div>
          <BotaoLink href={linkWhatsApp("Olá! Quero agendar uma coleta para análise de solo.")} externo className="mt-10">
            Agendar coleta de solo
          </BotaoLink>
        </div>
      </section>

      {/* 3. Consultoria: calendário da safra em faixa escura */}
      <section id="consultoria" aria-labelledby="titulo-consultoria" className="escuro scroll-mt-20 bg-verde-800 text-creme-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
          <div className="lg:col-span-4">
            <h2 id="titulo-consultoria" className="text-4xl sm:text-5xl">
              {consultoria.titulo}
            </h2>
            <p className="mt-4 text-lg text-creme-100">{consultoria.resumo}</p>
            <p className="mt-4 text-creme-200">
              Comprar semente e adubo com antecedência costuma sair mais barato e evita faltar produto na janela de
              semeadura.
            </p>
          </div>
          <div className="lg:col-span-8">
            <CalendarioSafra />
          </div>
        </div>
      </section>
    </>
  );
}
