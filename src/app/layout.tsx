import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Cabecalho } from "@/components/layout/Cabecalho";
import { Preloader } from "@/components/layout/Preloader";
import { Rodape } from "@/components/layout/Rodape";
import { WhatsAppFlutuante } from "@/components/layout/WhatsAppFlutuante";
import { empresa } from "@/data/empresa";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const descricao =
  "Sementes, fertilizantes, defensivos, nutrição foliar e biológicos em Tapejara (RS), com assistência técnica, análise de solo e consultoria de safra.";

export const metadata: Metadata = {
  metadataBase: new URL(empresa.siteUrl),
  title: {
    default: "Safra Certa Insumos Agrícolas | Tapejara - RS",
    template: "%s | Safra Certa",
  },
  description: descricao,
  applicationName: empresa.nomeCompleto,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: empresa.nomeCompleto,
    description: descricao,
    images: [{ url: "/images/og-safra-certa.jpg", width: 1200, height: 630, alt: "Lavoura de soja ao fim da tarde com o nome Safra Certa" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/og-safra-certa.jpg"] },
  // Enquanto o conteúdo for de demonstração, o site não é indexado.
  // Para publicar, defina PERMITIR_INDEXACAO=true.
  robots: process.env.PERMITIR_INDEXACAO === "true" ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#132e21",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${plex.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-full focus:bg-verde-800 focus:px-5 focus:py-3 focus:text-creme-50"
        >
          Pular para o conteúdo
        </a>
        <Preloader />
        <Cabecalho />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Rodape />
        <WhatsAppFlutuante />
      </body>
    </html>
  );
}
