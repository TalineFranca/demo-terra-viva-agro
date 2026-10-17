import { cidadesMapa, contornoRS, raioAtuacao, viewBoxRS } from "@/data/mapa-rs";

/**
 * Mapa da região de atuação: o RS inteiro, com Tapejara pulsando e o raio de ~70 km, e uma
 * ampliação da região com os municípios. Contorno real (IBGE); a área atendida é de exemplo.
 */
export function MapaRegiao() {
  const sede = cidadesMapa.find((c) => c.sede)!;
  // Janela de ampliação centrada em Tapejara
  const zoom = { x: sede.x - 120, y: sede.y - 85, w: 240, h: 170 };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
      <figure className="lg:col-span-5">
        <svg viewBox={viewBoxRS} className="h-auto w-full" role="img" aria-label="Mapa do Rio Grande do Sul com Tapejara marcada no norte do estado e o raio de atuação">
          <path d={contornoRS} fill="#e2ebdd" stroke="#27583e" strokeWidth="2" strokeLinejoin="round" />
          <circle cx={sede.x} cy={sede.y} r={raioAtuacao} fill="#e0b04e" fillOpacity="0.25" stroke="#c8952d" strokeWidth="2" strokeDasharray="6 6" />
          <rect x={zoom.x} y={zoom.y} width={zoom.w} height={zoom.h} fill="none" stroke="#1b3e2c" strokeWidth="2" />
          <circle cx={sede.x} cy={sede.y} r="7" fill="#1b3e2c" />
        </svg>
        <figcaption className="mt-2 text-sm text-tinta-suave">
          Rio Grande do Sul. O quadro marca a área ampliada ao lado.
        </figcaption>
      </figure>

      <figure className="lg:col-span-7">
        <div className="overflow-hidden rounded-[1.5rem] border border-tinta/15 bg-creme-50">
          <svg viewBox={`${zoom.x} ${zoom.y} ${zoom.w} ${zoom.h}`} className="h-auto w-full" role="img" aria-label="Ampliação da região de Tapejara com os municípios atendidos">
            <path d={contornoRS} fill="#e2ebdd" stroke="#27583e" strokeWidth="0.8" />
            <circle cx={sede.x} cy={sede.y} r={raioAtuacao} fill="#e0b04e" fillOpacity="0.18" stroke="#c8952d" strokeWidth="0.6" strokeDasharray="3 3" />
            {cidadesMapa
              .filter((c) => !c.sede)
              .map((c) => (
                <g key={c.nome}>
                  <circle cx={c.x} cy={c.y} r="1.6" fill="#27583e" />
                  <text x={c.rotuloEsquerda ? c.x - 3 : c.x + 3} y={c.y + 1.4} textAnchor={c.rotuloEsquerda ? "end" : "start"} fontSize="4.2" fill="#1b1d18" className="font-sans">
                    {c.nome}
                  </text>
                </g>
              ))}
            {/* Tapejara com onda pulsando */}
            <circle cx={sede.x} cy={sede.y} r="6" fill="none" stroke="#c8952d" strokeWidth="1" className="animate-[onda_2.4s_ease-out_infinite] motion-reduce:hidden" style={{ transformBox: "fill-box" }} />
            <circle cx={sede.x} cy={sede.y} r="3" fill="#1b3e2c" stroke="#fbf8f1" strokeWidth="1" />
            <text x={sede.x - 4} y={sede.y - 5} textAnchor="end" fontSize="6" fontWeight="600" fill="#132e21" className="font-sans">
              Tapejara
            </text>
          </svg>
        </div>
        <figcaption className="mt-2 text-sm text-tinta-suave">Raio aproximado de 70 km a partir da loja. Lista de municípios de exemplo.</figcaption>
      </figure>
    </div>
  );
}
