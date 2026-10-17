import { servicos } from "@/data/institucional";

const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const corDe: Record<string, string> = {
  verde: "bg-verde-600",
  "verde-claro": "bg-verde-400",
  trigo: "bg-trigo-400",
  palha: "bg-creme-300",
};

/** Ocupação das culturas ao longo do ano (meses de 1 a 12). Faixas que viram o ano são divididas. */
function faixas(inicio: number, fim: number) {
  return inicio <= fim ? [[inicio, fim]] : [[inicio, 12], [1, fim]];
}

/**
 * Calendário da safra no Planalto Médio: cultura de verão e de inverno em faixas por mês.
 * As faixas crescem da esquerda para a direita ao entrar na tela (CSS, sem JavaScript).
 */
export function CalendarioSafra() {
  const calendario = servicos[2].calendario;
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-[4.5rem_repeat(12,1fr)] text-center font-mono text-xs text-creme-200 sm:grid-cols-[6rem_repeat(12,1fr)] sm:text-sm">
        <span />
        {meses.map((m) => (
          <span key={m} className="py-2">
            {m}
          </span>
        ))}
      </div>
      <ul className="border-t border-creme-50/20">
        {calendario.map((c) => (
          <li key={c.cultura} className="grid grid-cols-[4.5rem_repeat(12,1fr)] items-center border-b border-creme-50/15 py-3 sm:grid-cols-[6rem_repeat(12,1fr)]">
            <span className="text-sm font-medium [grid-row:1] sm:text-base">{c.cultura}</span>
            {faixas(c.inicio, c.fim).map(([a, b]) => (
              <span
                key={a}
                className={`h-5 rounded-full ${corDe[c.cor]} origin-left animate-[crescer-faixa_1s_cubic-bezier(0.2,0.8,0.2,1)_both] [animation-timeline:view()] [animation-range:entry_10%_cover_35%]`}
                style={{ gridColumn: `${a + 1} / ${b + 2}`, gridRow: 1 }}
              />
            ))}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-creme-200">Calendário de referência. As datas mudam com a cultivar e o clima de cada ano.</p>
    </div>
  );
}
