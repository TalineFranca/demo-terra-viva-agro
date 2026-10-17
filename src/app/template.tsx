"use client";

import { useEffect, useState } from "react";

// O template remonta a cada troca de rota. No primeiro carregamento quem aparece é o preloader.
let primeiraCarga = true;

/** Troca de página: uma cortina verde sobe e revela a página nova. Só CSS; some com "reduzir movimento". */
export default function Template({ children }: { children: React.ReactNode }) {
  const [cortina] = useState(() => !primeiraCarga);
  useEffect(() => {
    if (!primeiraCarga) document.documentElement.dataset.navegou = "1";
    primeiraCarga = false;
  }, []);

  return (
    <>
      {cortina && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] origin-top scale-y-0 animate-[cortina_420ms_cubic-bezier(0.7,0,0.3,1)] bg-verde-900 motion-reduce:hidden md:animate-[cortina_650ms_cubic-bezier(0.7,0,0.3,1)]"
        />
      )}
      {children}
    </>
  );
}
