import { empresa } from "@/data/empresa";
import { nomeCategoria, textoCulturas, type Produto } from "@/data/produtos";

/** Monta o link do WhatsApp com a mensagem já escrita. */
export function linkWhatsApp(mensagem: string, numero: string = empresa.whatsapp.numero) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export const mensagemAgronomo = "Olá! Vim pelo site da Safra Certa e quero falar com um agrônomo.";

/** Mensagem de orçamento que já cita o produto, a categoria e as culturas. */
export function mensagemOrcamento(p: Produto) {
  return `Olá! Vi no site da Safra Certa o produto "${p.nome}" (${nomeCategoria(p.categoria).toLowerCase()}, para ${textoCulturas(p.culturas).toLowerCase()}) e quero um orçamento.\n\nMinha cidade:\nÁrea ou quantidade:`;
}
