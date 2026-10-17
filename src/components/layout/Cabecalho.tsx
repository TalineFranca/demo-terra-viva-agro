"use client";

import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { empresa, paginas } from "@/data/empresa";
import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";
import { classeBotao } from "../ui/Botao";
import { IconeConversa, IconeFechar, IconeTelefone } from "../ui/Icones";
import { Logo } from "./Logo";

const ativa = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);

/**
 * Menu fixo. Na home começa transparente sobre o hero escuro e ganha fundo ao rolar;
 * nas outras páginas já começa com fundo. No celular, abre um menu de tela cheia animado.
 */
export function Cabecalho() {
  const pathname = usePathname();
  const reduzir = useReducedMotion();
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);

  const sobreHero = pathname === "/" && !rolou && !aberto;

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => setAberto(false), [pathname]);

  // Menu aberto: trava a rolagem, Esc fecha, foco fica dentro do painel.
  useEffect(() => {
    if (!aberto) return;
    document.body.style.overflow = "hidden";
    document.body.dataset.menuAberto = "true";
    const focaveis = () => Array.from(painel.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    requestAnimationFrame(() => focaveis()[0]?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botao.current?.focus();
      }
      if (e.key !== "Tab") return;
      const lista = focaveis();
      if (e.shiftKey && document.activeElement === lista[0]) {
        e.preventDefault();
        lista[lista.length - 1]?.focus();
      } else if (!e.shiftKey && document.activeElement === lista[lista.length - 1]) {
        e.preventDefault();
        lista[0]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menuAberto;
      document.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

  const linkAgronomo = linkWhatsApp(mensagemAgronomo);

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          sobreHero ? "escuro bg-transparent text-creme-50" : "border-b border-tinta/10 bg-creme-100/95 text-verde-900 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
          <Logo claro={sobreHero} />

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {[{ href: "/", rotulo: "Início" }, ...paginas].map((p) => {
                const atual = p.href === "/" ? pathname === "/" : ativa(pathname, p.href);
                return (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      aria-current={atual ? "page" : undefined}
                      className={`group relative inline-flex min-h-11 items-center px-3.5 text-[0.9375rem] font-medium ${
                        sobreHero ? "text-creme-100 hover:text-white" : atual ? "text-verde-900" : "text-tinta-suave hover:text-verde-900"
                      }`}
                    >
                      {p.rotulo}
                      <span
                        aria-hidden
                        className={`absolute inset-x-3.5 bottom-1.5 h-0.5 origin-left rounded-full bg-trigo-400 transition-transform duration-300 ${
                          atual ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={linkAgronomo}
              target="_blank"
              rel="noopener noreferrer"
              className={classeBotao(sobreHero ? "trigo" : "primario", "max-lg:hidden min-h-11! px-5! text-[0.9375rem]!")}
            >
              Falar com agrônomo
            </a>
            <a
              href={`tel:${empresa.telefone.link}`}
              aria-label={`Ligar para ${empresa.telefone.exibicao}`}
              className="inline-flex size-11 items-center justify-center rounded-full lg:hidden"
            >
              <IconeTelefone />
            </a>
            <button
              ref={botao}
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-celular"
              className="relative inline-flex min-h-11 items-center gap-2 rounded-full px-3 font-medium lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-300 ${aberto ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
              {aberto ? "Fechar" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {aberto && (
          <m.div
            id="menu-celular"
            ref={painel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="escuro fileiras fixed inset-0 z-50 flex flex-col overflow-y-auto bg-verde-900 text-creme-50 lg:hidden"
            initial={reduzir ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduzir ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduzir ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduzir ? 0.01 : 0.45, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
              <Logo claro onClick={() => setAberto(false)} />
              <button
                type="button"
                onClick={() => {
                  setAberto(false);
                  botao.current?.focus();
                }}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-medium"
              >
                <IconeFechar className="size-5" />
                Fechar
              </button>
            </div>

            <nav aria-label="Menu principal" className="px-4 pt-6 sm:px-6">
              <ul>
                {[{ href: "/", rotulo: "Início" }, ...paginas].map((p, i) => (
                  <m.li
                    key={p.href}
                    className="border-b border-creme-50/15"
                    initial={reduzir ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reduzir ? 0 : 0.18 + i * 0.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <Link
                      href={p.href}
                      onClick={() => setAberto(false)}
                      aria-current={(p.href === "/" ? pathname === "/" : ativa(pathname, p.href)) ? "page" : undefined}
                      className="flex min-h-16 items-center justify-between py-3 text-[2.25rem] leading-none font-semibold tracking-tight aria-[current]:text-trigo-300"
                    >
                      {p.rotulo}
                    </Link>
                  </m.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto space-y-3 px-4 py-8 sm:px-6">
              <a href={linkAgronomo} target="_blank" rel="noopener noreferrer" className={classeBotao("trigo", "w-full")}>
                <IconeConversa />
                Falar com agrônomo
              </a>
              <a href={`tel:${empresa.telefone.link}`} className={classeBotao("contornoClaro", "w-full")}>
                <IconeTelefone />
                Ligar {empresa.telefone.exibicao}
              </a>
              <p className="pt-2 text-sm text-creme-200">{empresa.horario.map((h) => `${h.dias}, ${h.horas}`).join(" · ")}</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
