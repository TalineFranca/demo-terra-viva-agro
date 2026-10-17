import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "trigo" | "contorno" | "contornoClaro" | "claro";

const estilos: Record<Variante, string> = {
  primario: "bg-verde-800 text-creme-50 hover:bg-verde-700",
  trigo: "bg-trigo-400 text-verde-950 hover:bg-trigo-300",
  contorno: "border border-verde-800/60 text-verde-800 hover:bg-verde-800 hover:text-creme-50",
  contornoClaro: "border border-creme-50/50 text-creme-50 hover:bg-creme-50 hover:text-verde-900",
  claro: "bg-creme-50 text-verde-900 hover:bg-creme-200",
};

export const classeBotao = (variante: Variante = "primario", extra = "") =>
  [
    "group/botao inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-2.5",
    "text-base font-medium leading-tight transition-colors duration-200",
    "disabled:cursor-not-allowed disabled:opacity-60",
    estilos[variante],
    extra,
  ].join(" ");

type Comum = { variante?: Variante; className?: string; children: ReactNode };

/** Link com cara de botão. Rotas internas usam o Link do Next; o resto vira <a>. */
export function BotaoLink({
  variante,
  className,
  children,
  href,
  externo,
  ...props
}: Comum & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; externo?: boolean }) {
  const classe = classeBotao(variante, className);
  if (href.startsWith("/") && !externo) {
    return (
      <Link href={href} className={classe} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classe} {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}

export function Botao({ variante, className, children, type = "button", ...props }: Comum & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={classeBotao(variante, className)} {...props}>
      {children}
    </button>
  );
}
