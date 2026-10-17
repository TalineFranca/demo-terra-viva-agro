import Link from "next/link";

/** Logo em texto, com um broto simples desenhado à mão como marca. */
export function Logo({ claro = false, onClick }: { claro?: boolean; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Safra Certa, página inicial"
      className={`inline-flex min-h-11 shrink-0 items-center gap-2 whitespace-nowrap ${claro ? "text-creme-50" : "text-verde-900"}`}
    >
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <path d="M16 29V15" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M16 17C16 10 11 6 4 6c0 7 5 11 12 11Z" fill={claro ? "#e0b04e" : "#27583e"} />
        <path d="M16 14c0-6 4-10 11-10 0 6-4 10-11 10Z" fill="currentColor" />
      </svg>
      <span className="text-[1.35rem] leading-none font-semibold tracking-tight sm:text-[1.5rem]">Safra Certa</span>
    </Link>
  );
}
