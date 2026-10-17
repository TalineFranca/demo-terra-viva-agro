const inteiro = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const decimal1 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

export const formatarInteiro = (n: number) => inteiro.format(n);
export const formatarDecimal = (n: number) => decimal1.format(n);

/** Converte texto digitado ("1.250,5") em número. Retorna NaN se não der. */
export function lerNumero(texto: string): number {
  const limpo = texto.trim().replace(/\s/g, "").replace(/\./g, "").replace(",", ".");
  if (limpo === "") return NaN;
  return Number(limpo);
}

/** Máscara simples de telefone brasileiro: (69) 99999-0000 ou (69) 3000-0000. */
export function mascararTelefone(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}
