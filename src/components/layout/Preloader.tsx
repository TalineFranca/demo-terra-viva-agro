/**
 * Preloader temático: uma semente que germina enquanto a página carrega.
 * É só CSS (nada depende de JavaScript) e some sozinho em ~1,6 s. Roda no carregamento
 * da página, não nas trocas internas de rota. Com "reduzir movimento" não aparece.
 */
export function Preloader() {
  return (
    <div aria-hidden className="preloader escuro pointer-events-none fixed inset-0 z-[70] flex items-center justify-center bg-verde-900">
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 120 120" className="size-28">
          {/* solo */}
          <path d="M14 92 Q60 84 106 92" stroke="#6f9d72" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* semente */}
          <ellipse className="pre-semente" cx="60" cy="96" rx="9" ry="6" fill="#e0b04e" />
          {/* caule */}
          <path className="pre-caule" d="M60 92 C60 78 58 64 60 48" stroke="#c3d6bf" strokeWidth="3" fill="none" strokeLinecap="round" pathLength={1} />
          {/* folhas */}
          <path className="pre-folha pre-folha-1" d="M60 58 C50 56 40 48 38 36 C50 36 58 44 60 58 Z" fill="#6f9d72" />
          <path className="pre-folha pre-folha-2" d="M60 52 C70 48 80 38 82 28 C70 28 62 38 60 52 Z" fill="#c3d6bf" />
        </svg>
        <p className="pre-nome mt-4 text-lg font-semibold tracking-tight text-creme-50">Safra Certa</p>
      </div>
    </div>
  );
}
