import { numeros } from "@/data/empresa";
import { fotos } from "@/data/fotos";
import { Foto } from "../ui/Foto";
import { NumeroContado } from "../ui/NumeroContado";

/**
 * Números em composição desencontrada: um número grande ao lado da foto e os outros em
 * escada, cada um com seu tamanho. Os valores contam quando entram na tela.
 */
export function Numeros() {
  return (
    <section aria-labelledby="titulo-numeros" className="bg-creme-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <h2 id="titulo-numeros" className="max-w-sm text-4xl text-verde-900 sm:text-5xl">
            Presença no campo, safra após safra
          </h2>
          <div className="mt-10 border-t border-tinta/20 pt-6">
            <p className="font-mono text-[5.5rem] leading-none font-medium tracking-tight text-verde-800 sm:text-[7rem]">
              <NumeroContado valor={numeros.produtores} />
            </p>
            <p className="mt-2 max-w-xs text-lg text-tinta-suave">produtores atendidos na última safra</p>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-6">
          <Foto foto={fotos.trigo} sizes="(min-width: 1024px) 40vw, 100vw" proporcao="aspect-[4/3] lg:aspect-[16/11]" className="sm:col-span-2 lg:col-span-6" />
          <div className="border-t border-tinta/20 pt-5 lg:col-span-2">
            <p className="font-mono text-5xl font-medium text-verde-800">
              <NumeroContado valor={numeros.hectares} />
              <span className="ml-1 text-2xl">mil ha</span>
            </p>
            <p className="mt-2 text-tinta-suave">acompanhados pela equipe técnica</p>
          </div>
          <div className="border-t border-tinta/20 pt-5 lg:col-span-2 lg:mt-12">
            <p className="font-mono text-5xl font-medium text-verde-800">
              <NumeroContado valor={numeros.municipios} />
            </p>
            <p className="mt-2 text-tinta-suave">municípios do Planalto Médio</p>
          </div>
          <div className="border-t border-tinta/20 pt-5 lg:col-span-2 lg:mt-24">
            <p className="font-mono text-5xl font-medium text-verde-800">
              <NumeroContado valor={numeros.anos} />
              <span className="ml-1 text-2xl">anos</span>
            </p>
            <p className="mt-2 text-tinta-suave">de loja em Tapejara</p>
          </div>
          <p className="text-sm text-tinta-suave sm:col-span-2 lg:col-span-6">Números de exemplo, para demonstração.</p>
        </div>
      </div>
    </section>
  );
}
