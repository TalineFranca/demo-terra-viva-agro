import { empresa } from "@/data/empresa";
import { fotos } from "@/data/fotos";
import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";
import { CampoParallax } from "../animacao/CampoParallax";
import { BotaoLink } from "../ui/Botao";
import { TituloRevelado } from "../ui/TituloRevelado";
import { FotoParallax } from "./FotoParallax";

/** Hero de impacto: foto em parallax e a silhueta do campo em camadas na saída. */
export function Hero() {
  return (
    <section aria-labelledby="titulo-hero" className="escuro relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-verde-950 text-creme-50">
      <FotoParallax foto={fotos.hero} />
      {/* véu escuro para leitura do texto (cor sólida, sem gradiente) */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-verde-950/55" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pt-28 pb-[36vh] sm:px-6 lg:px-10 lg:pt-32 lg:pb-[30vh]">
        <p className="text-base font-medium text-trigo-300 sm:text-lg">
          Insumos agrícolas em {empresa.cidade} e região
        </p>
        <TituloRevelado
          id="titulo-hero"
          atrasoInicial
          className="mt-4 max-w-4xl text-[2.9rem] leading-[0.98] xs:text-[3.4rem] sm:text-7xl lg:text-[6.5rem]"
          linhas={["A safra começa", "na escolha certa."]}
        />
        <p className="mt-6 max-w-xl text-lg text-creme-100 sm:text-xl">
          Sementes, fertilizantes, defensivos e nutrição foliar, com agrônomo que visita a sua lavoura em
          cada fase da safra.
        </p>
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <BotaoLink href="/produtos" variante="trigo" className="min-h-14 px-8 text-lg">
            Ver produtos
          </BotaoLink>
          <BotaoLink href={linkWhatsApp(mensagemAgronomo)} externo variante="contornoClaro" className="min-h-14 px-8 text-lg">
            Falar com agrônomo
          </BotaoLink>
        </div>
      </div>

      <p className="absolute right-4 bottom-[12vh] z-10 hidden text-xs text-creme-200 sm:block lg:right-10">
        {fotos.hero.legenda}. Foto ilustrativa.
      </p>
      <CampoParallax corFinal="#f3eee2" />
    </section>
  );
}
