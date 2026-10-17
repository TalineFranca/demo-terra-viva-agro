"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Foto } from "@/data/fotos";
import { carregarGsap, ehDesktop, semMovimento } from "@/lib/animacao";

/** Foto de fundo do hero que desce mais devagar que a página (parallax), só no desktop. */
export function FotoParallax({ foto }: { foto: Foto }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || semMovimento() || !ehDesktop()) return;
    let desfazer: (() => void) | undefined;
    let cancelado = false;
    carregarGsap().then(({ gsap }) => {
      if (cancelado) return;
      const t = gsap.to(el, {
        yPercent: 18,
        scale: 1.08,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: true },
      });
      desfazer = () => {
        t.scrollTrigger?.kill();
        t.kill();
      };
    });
    return () => {
      cancelado = true;
      desfazer?.();
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 -z-20 will-change-transform">
      <Image src={foto.src} alt={foto.alt} fill preload fetchPriority="high" quality={60} placeholder="blur" sizes="100vw" className="object-cover object-[60%_45%]" />
    </div>
  );
}
