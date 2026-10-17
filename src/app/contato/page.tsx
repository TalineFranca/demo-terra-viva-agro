import type { Metadata } from "next";
import { FormularioContato } from "@/components/contato/FormularioContato";
import { BotaoLink } from "@/components/ui/Botao";
import { IconeConversa, IconeMais, IconeTelefone } from "@/components/ui/Icones";
import { TituloRevelado } from "@/components/ui/TituloRevelado";
import { empresa } from "@/data/empresa";
import { perguntas } from "@/data/institucional";
import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "WhatsApp, telefone, endereço, horários e formulário de contato da Safra Certa Insumos Agrícolas, em Tapejara (RS).",
};

// Mapa do OpenStreetMap centrado em Tapejara (RS). Troque pelas coordenadas exatas da loja.
const mapa = "https://www.openstreetmap.org/export/embed.html?bbox=-52.045%2C-28.088%2C-51.985%2C-28.050&layer=mapnik&marker=-28.0686%2C-52.0136";

export default function PaginaContato() {
  return (
    <>
      <section aria-labelledby="titulo-contato" className="bg-creme-100">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pt-40 lg:pb-28">
          <div className="lg:col-span-5">
            <TituloRevelado id="titulo-contato" className="text-[3rem] text-verde-900 sm:text-7xl" linhas={["Fale com", "a gente"]} />
            <p className="mt-6 max-w-sm text-lg text-tinta-suave">
              O WhatsApp é o caminho mais rápido. Para orçamento, diga o produto, a cultura e a área.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <BotaoLink href={linkWhatsApp(mensagemAgronomo)} externo className="min-h-14 justify-start px-6 text-lg">
                <IconeConversa className="size-6" />
                WhatsApp {empresa.whatsapp.exibicao}
              </BotaoLink>
              <BotaoLink href={`tel:${empresa.telefone.link}`} variante="contorno" className="min-h-14 justify-start px-6 text-lg">
                <IconeTelefone className="size-6" />
                Telefone {empresa.telefone.exibicao}
              </BotaoLink>
            </div>

            <dl className="mt-10 space-y-5">
              <div>
                <dt className="text-sm font-medium text-verde-700">Endereço</dt>
                <dd className="mt-1">{empresa.endereco}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-verde-700">Horário</dt>
                {empresa.horario.map((h) => (
                  <dd key={h.dias} className="mt-1 flex justify-between gap-4 border-b border-dotted border-tinta/25 pb-1">
                    <span>{h.dias}</span>
                    <span className="font-medium">{h.horas}</span>
                  </dd>
                ))}
                <dd className="mt-2 text-sm text-tinta-suave">{empresa.plantao}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-verde-700">E-mail e redes</dt>
                <dd className="mt-1">
                  <a href={`mailto:${empresa.email}`} className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-verde-700">{empresa.email}</a>
                </dd>
                <dd>
                  <a href={empresa.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-verde-700">
                    Instagram {empresa.instagram.usuario}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-[2rem] bg-creme-50 p-5 sm:p-10 lg:col-span-7">
            <FormularioContato />
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section aria-labelledby="titulo-mapa" className="bg-creme-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="titulo-mapa" className="text-3xl text-verde-900 sm:text-4xl">
              Onde estamos
            </h2>
            <a
              href="https://www.openstreetmap.org/?mlat=-28.0686&mlon=-52.0136#map=15/-28.0686/-52.0136"
              target="_blank"
              rel="noopener noreferrer"
              className="link-sublinhado inline-flex min-h-11 items-center font-medium text-verde-800"
            >
              Abrir no mapa
            </a>
          </div>
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-tinta/15 bg-creme-200">
            <iframe title="Mapa de Tapejara, RS, com a localização aproximada da loja" src={mapa} loading="lazy" className="block aspect-[4/3] w-full sm:aspect-[21/9]" />
          </div>
          <p className="mt-2 text-sm text-tinta-suave">Localização aproximada (centro de Tapejara). Mapa © colaboradores do OpenStreetMap.</p>
        </div>
      </section>

      {/* Perguntas frequentes */}
      <section aria-labelledby="titulo-duvidas" className="escuro fileiras bg-verde-900 text-creme-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
          <h2 id="titulo-duvidas" className="text-4xl sm:text-5xl lg:col-span-4">
            Perguntas frequentes
          </h2>
          <div className="border-t border-creme-50/25 lg:col-span-8">
            {perguntas.map((p) => (
              <details key={p.pergunta} name="faq" className="group border-b border-creme-50/20">
                <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 py-4 text-xl font-medium sm:text-2xl hover:text-trigo-300">
                  {p.pergunta}
                  <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full border border-creme-50/40 transition-colors group-open:border-trigo-400 group-open:bg-trigo-400 group-open:text-verde-950">
                    <IconeMais className="size-4 transition-transform duration-200 group-open:rotate-45" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-creme-100">{p.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
