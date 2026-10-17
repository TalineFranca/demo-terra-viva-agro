import Image from "next/image";
import { empresa } from "@/data/empresa";
import { fotos } from "@/data/fotos";
import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";
import { BotaoLink } from "../ui/Botao";

/** Chamada final: foto de milho de fundo e um painel verde com os contatos. */
export function ChamadaContato() {
  return (
    <section aria-labelledby="titulo-chamada" className="relative isolate overflow-hidden">
      <Image src={fotos.milho.src} alt="" fill sizes="100vw" placeholder="blur" quality={60} className="-z-10 object-cover object-[50%_60%]" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10 lg:py-32">
        <div className="escuro max-w-xl rounded-[2rem] bg-verde-900/95 p-8 text-creme-50 sm:p-12">
          <h2 id="titulo-chamada" className="text-4xl sm:text-5xl">
            Vamos planejar a próxima safra?
          </h2>
          <p className="mt-4 text-lg text-creme-100">
            Fale com um agrônomo pelo WhatsApp ou passe na loja em {empresa.cidade}. A gente ajuda a escolher
            cultivar, adubação e manejo para a sua área.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BotaoLink href={linkWhatsApp(mensagemAgronomo)} externo variante="trigo">
              Chamar no WhatsApp
            </BotaoLink>
            <BotaoLink href="/contato" variante="contornoClaro">
              Outras formas de contato
            </BotaoLink>
          </div>
          <p className="mt-6 text-creme-200">
            Telefone <a href={`tel:${empresa.telefone.link}`} className="font-medium text-creme-50 underline underline-offset-4">{empresa.telefone.exibicao}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
