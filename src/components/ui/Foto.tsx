import Image from "next/image";
import type { Foto as TipoFoto } from "@/data/fotos";

/** Foto com legenda. Import estático: AVIF/WebP no tamanho certo e placeholder borrado. */
export function Foto({
  foto,
  sizes,
  className = "",
  proporcao = "aspect-[4/3]",
  preload = false,
  posicao = "center",
  legenda = true,
  escuro = false,
}: {
  foto: TipoFoto;
  sizes: string;
  className?: string;
  proporcao?: string;
  preload?: boolean;
  posicao?: string;
  legenda?: boolean;
  escuro?: boolean;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-creme-300 ${proporcao}`}>
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : "auto"}
          quality={60}
          className="object-cover"
          style={{ objectPosition: posicao }}
        />
      </div>
      {legenda && (
        <figcaption className={`mt-2 text-sm ${escuro ? "text-creme-200" : "text-tinta-suave"}`}>
          {foto.legenda}. Foto ilustrativa.
        </figcaption>
      )}
    </figure>
  );
}
