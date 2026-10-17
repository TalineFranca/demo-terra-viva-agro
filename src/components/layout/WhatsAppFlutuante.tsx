import { linkWhatsApp, mensagemAgronomo } from "@/lib/whatsapp";
import { IconeConversa } from "../ui/Icones";

/** Botão redondo de WhatsApp com anel pulsando. Para no hover e com "reduzir movimento". */
export function WhatsAppFlutuante() {
  return (
    <a
      href={linkWhatsApp(mensagemAgronomo)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp com a Safra Certa"
      className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 inline-flex size-14 items-center justify-center rounded-full bg-verde-700 text-creme-50 shadow-[0_4px_14px_rgb(14_34_24/0.3)] transition-[transform,background-color] duration-200 hover:scale-105 hover:bg-verde-600 [body[data-menu-aberto]_&]:hidden"
    >
      <span aria-hidden className="absolute inset-0 animate-[pulsar_2.2s_cubic-bezier(0.2,0.6,0.4,1)_infinite] rounded-full bg-verde-600 group-hover:animate-none motion-reduce:hidden" />
      <span aria-hidden className="absolute inset-0 animate-[pulsar_2.2s_cubic-bezier(0.2,0.6,0.4,1)_1.1s_infinite] rounded-full bg-verde-600 group-hover:animate-none motion-reduce:hidden" />
      <IconeConversa className="relative size-7" />
    </a>
  );
}
