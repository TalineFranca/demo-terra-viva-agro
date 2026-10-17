import type { StaticImageData } from "next/image";
import milhoEntardecer from "@/assets/fotos/milho-entardecer.jpg";
import pastagemGado from "@/assets/fotos/pastagem-gado.jpg";
import plantioMao from "@/assets/fotos/plantio-mao.jpg";
import sojaFileiras from "@/assets/fotos/soja-fileiras.jpg";
import sojaMadura from "@/assets/fotos/soja-madura.jpg";
import sojaPorDoSol from "@/assets/fotos/soja-por-do-sol.jpg";
import soloRaiz from "@/assets/fotos/solo-raiz.jpg";
import trigo from "@/assets/fotos/trigo.jpg";

// Fotos ilustrativas em domínio público (CC0 / Public Domain Mark). Não são da empresa.
export type Foto = { src: StaticImageData; alt: string; legenda: string; credito: string; fonte: string };

export const fotos = {
  hero: {
    src: sojaPorDoSol,
    alt: "Lavoura de soja fechando as entrelinhas, com o sol baixo no fim da tarde",
    legenda: "Soja em fase vegetativa, fim de tarde",
    credito: "Alabama Extension (CC0)",
    fonte: "https://www.flickr.com/photos/184594136@N08/51554612641",
  },
  sojaMadura: {
    src: sojaMadura,
    alt: "Plantas de soja secas e carregadas de vagens, prontas para a colheita",
    legenda: "Soja no ponto de colheita",
    credito: "USDA (domínio público)",
    fonte: "https://www.flickr.com/photos/41284017@N08/52491361268",
  },
  plantio: {
    src: plantioMao,
    alt: "Mão abrindo a palhada para conferir a profundidade da semente no solo",
    legenda: "Conferindo a profundidade de semeadura na palhada",
    credito: "USDA (domínio público)",
    fonte: "https://www.flickr.com/photos/41284017@N08/51239674809",
  },
  soloRaiz: {
    src: soloRaiz,
    alt: "Duas mãos segurando um torrão de terra escura com raízes",
    legenda: "Raiz e estrutura do solo",
    credito: "USDA (domínio público)",
    fonte: "https://www.flickr.com/photos/41284017@N08/52017715366",
  },
  sojaFileiras: {
    src: sojaFileiras,
    alt: "Entrelinha de soja vista de perto do chão, com palhada entre as fileiras",
    legenda: "Estande uniforme de soja sobre palhada",
    credito: "Alabama Extension (CC0)",
    fonte: "https://www.flickr.com/photos/184594136@N08/51554612456",
  },
  milho: {
    src: milhoEntardecer,
    alt: "Lavoura de milho verde se estendendo até o horizonte sob céu nublado",
    legenda: "Lavoura de milho",
    credito: "Luciagarciagon (CC0)",
    fonte: "https://www.flickr.com/photos/145039335@N03/29009945234",
  },
  trigo: {
    src: trigo,
    alt: "Lavoura de trigo dourada com marcas de rodado de trator e céu nublado",
    legenda: "Trigo perto da colheita",
    credito: "Ian Livesey, StockSnap (CC0)",
    fonte: "https://stocksnap.io/photo/tractor-field-OYF2RHMKWN",
  },
  pastagem: {
    src: pastagemGado,
    alt: "Gado pastando em pasto verde, com cerca e árvores ao fundo",
    legenda: "Pastagem de inverno com gado",
    credito: "USDA (domínio público)",
    fonte: "https://www.flickr.com/photos/41284017@N08/9303668809",
  },
} satisfies Record<string, Foto>;

export type ChaveFoto = keyof typeof fotos;
