"use client";

import { useEffect, useRef, useState } from "react";
import { culturas } from "@/data/produtos";
import { mascararTelefone } from "@/lib/formato";
import { Botao } from "../ui/Botao";
import { IconeAlerta, IconeCheck } from "../ui/Icones";

type Campos = { nome: string; telefone: string; cidade: string; assunto: string; mensagem: string };
type Chave = keyof Campos;

const vazio: Campos = { nome: "", telefone: "", cidade: "", assunto: "", mensagem: "" };
const rotulos: Record<Chave, string> = { nome: "Nome", telefone: "Telefone ou WhatsApp", cidade: "Cidade", assunto: "Assunto", mensagem: "Mensagem" };
const assuntos = ["Orçamento de produto", "Visita técnica", "Análise de solo", "Outro assunto"];

function validar(c: Campos) {
  const e: Partial<Record<Chave, string>> = {};
  if (c.nome.trim().length < 3) e.nome = "Escreva seu nome, com pelo menos 3 letras.";
  const d = c.telefone.replace(/\D/g, "");
  if (!d) e.telefone = "Informe um telefone para a gente retornar.";
  else if (d.length < 10) e.telefone = "Telefone incompleto. Coloque o DDD, ex.: (54) 99999-1234.";
  if (c.cidade.trim().length < 2) e.cidade = "Informe a cidade da propriedade.";
  if (!c.assunto) e.assunto = "Escolha o assunto.";
  if (c.mensagem.length > 600) e.mensagem = "A mensagem passou de 600 caracteres.";
  return e;
}

const campo = (erro?: string) =>
  `mt-1.5 block min-h-12 w-full rounded-xl border bg-white px-4 py-2.5 text-lg ${erro ? "border-erro" : "border-tinta/25"}`;

/** Formulário curto com validação ao sair do campo, resumo de erros e estados de envio. */
export function FormularioContato() {
  const [c, setC] = useState<Campos>(vazio);
  const [tocado, setTocado] = useState<Partial<Record<Chave, boolean>>>({});
  const [tentou, setTentou] = useState(false);
  const [status, setStatus] = useState<"editando" | "enviando" | "enviado" | "falhou">("editando");
  const resumo = useRef<HTMLDivElement>(null);
  const sucesso = useRef<HTMLHeadingElement>(null);

  const erros = validar(c);
  const mostrar = (k: Chave) => (tocado[k] || tentou ? erros[k] : undefined);
  const lista = (Object.keys(rotulos) as Chave[]).filter((k) => mostrar(k));

  useEffect(() => {
    if (status === "enviado") sucesso.current?.focus();
  }, [status]);

  const props = (k: Chave) => ({
    id: `campo-${k}`,
    name: k,
    value: c[k],
    "aria-invalid": mostrar(k) ? true : undefined,
    "aria-describedby": mostrar(k) ? `erro-${k}` : undefined,
    onBlur: () => setTocado((t) => ({ ...t, [k]: true })),
  });
  const erroDe = (k: Chave) =>
    mostrar(k) ? (
      <p id={`erro-${k}`} className="mt-1.5 flex gap-1.5 text-sm font-medium text-erro">
        <IconeAlerta className="mt-0.5 size-4 shrink-0" />
        {mostrar(k)}
      </p>
    ) : null;

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setTentou(true);
    if (Object.keys(erros).length) {
      requestAnimationFrame(() => resumo.current?.focus());
      return;
    }
    setStatus("enviando");
    // Demonstração: nada é enviado. Ligue aqui o envio real (e-mail, CRM ou API).
    await new Promise((r) => setTimeout(r, 1200));
    setStatus(navigator.onLine ? "enviado" : "falhou");
  }

  if (status === "enviado")
    return (
      <div role="status" className="flex min-h-96 flex-col justify-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-verde-800 text-creme-50">
          <IconeCheck className="size-7" />
        </span>
        <h2 ref={sucesso} tabIndex={-1} className="mt-5 text-3xl text-verde-900 outline-none">
          Recebemos, {c.nome.trim().split(" ")[0]}.
        </h2>
        <p className="mt-3 max-w-md text-tinta-suave">
          Vamos retornar para {c.telefone} até o próximo dia útil. Formulário de demonstração: nada foi enviado.
        </p>
        <Botao
          variante="contorno"
          className="mt-6 self-start"
          onClick={() => {
            setC(vazio);
            setTocado({});
            setTentou(false);
            setStatus("editando");
          }}
        >
          Enviar outra mensagem
        </Botao>
      </div>
    );

  return (
    <form onSubmit={enviar} noValidate aria-describedby="aviso-form">
      <h2 className="text-3xl text-verde-900">Mande uma mensagem</h2>
      <p id="aviso-form" className="mt-1 text-sm text-tinta-suave">Todos os campos são obrigatórios, menos a mensagem.</p>

      {tentou && lista.length > 0 && (
        <div ref={resumo} tabIndex={-1} role="alert" className="mt-5 rounded-xl border-l-4 border-erro bg-erro/5 p-4">
          <p className="font-semibold text-erro">{lista.length === 1 ? "Falta acertar 1 campo:" : `Faltam acertar ${lista.length} campos:`}</p>
          <ul className="mt-1 list-disc pl-5 text-[0.9375rem]">
            {lista.map((k) => (
              <li key={k}>
                <a href={`#campo-${k}`} className="underline underline-offset-2">{rotulos[k]}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {status === "falhou" && (
        <div role="alert" className="mt-5 rounded-xl border-l-4 border-erro bg-erro/5 p-4">
          <p className="font-semibold text-erro">Sem conexão. A mensagem não foi enviada.</p>
          <p className="mt-1 text-[0.9375rem]">Seus dados continuam aqui. Tente de novo quando o sinal voltar ou chame no WhatsApp.</p>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="campo-nome" className="font-medium">{rotulos.nome}</label>
          <input {...props("nome")} type="text" autoComplete="name" onChange={(e) => setC({ ...c, nome: e.target.value })} className={campo(mostrar("nome"))} />
          {erroDe("nome")}
        </div>
        <div>
          <label htmlFor="campo-telefone" className="font-medium">{rotulos.telefone}</label>
          <input {...props("telefone")} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(54) 99999-1234" onChange={(e) => setC({ ...c, telefone: mascararTelefone(e.target.value) })} className={campo(mostrar("telefone"))} />
          {erroDe("telefone")}
        </div>
        <div>
          <label htmlFor="campo-cidade" className="font-medium">{rotulos.cidade}</label>
          <input {...props("cidade")} type="text" autoComplete="address-level2" onChange={(e) => setC({ ...c, cidade: e.target.value })} className={campo(mostrar("cidade"))} />
          {erroDe("cidade")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="campo-assunto" className="font-medium">{rotulos.assunto}</label>
          <div className="relative">
            <select
              {...props("assunto")}
              onChange={(e) => {
                setC({ ...c, assunto: e.target.value });
                setTocado((t) => ({ ...t, assunto: true }));
              }}
              className={`${campo(mostrar("assunto"))} appearance-none pr-10`}
            >
              <option value="">Escolha</option>
              {assuntos.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-2 -translate-y-1/4 rotate-45 border-r-2 border-b-2 border-tinta" />
          </div>
          {erroDe("assunto")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="campo-mensagem" className="font-medium">
            {rotulos.mensagem} <span className="font-normal text-tinta-suave">(opcional)</span>
          </label>
          <textarea
            {...props("mensagem")}
            rows={4}
            placeholder={`Ex.: quero orçamento de semente de ${culturas[0].nome.toLowerCase()} para 120 ha.`}
            onChange={(e) => setC({ ...c, mensagem: e.target.value })}
            className={`${campo(mostrar("mensagem"))} resize-y`}
          />
          <div className="flex justify-between gap-4">
            {erroDe("mensagem")}
            <p className="mt-1.5 ml-auto text-sm text-tinta-suave tabular-nums">{c.mensagem.length}/600</p>
          </div>
        </div>
      </div>

      <Botao type="submit" disabled={status === "enviando"} className="mt-6 w-full sm:w-auto sm:min-w-48">
        {status === "enviando" ? (
          <>
            <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-creme-50/40 border-t-creme-50 motion-reduce:animate-none" />
            Enviando…
          </>
        ) : (
          "Enviar mensagem"
        )}
      </Botao>
      <p className="sr-only" aria-live="polite">{status === "enviando" ? "Enviando mensagem." : ""}</p>
      <p className="mt-4 text-sm text-tinta-suave">Formulário de demonstração: os dados não são enviados.</p>
    </form>
  );
}
