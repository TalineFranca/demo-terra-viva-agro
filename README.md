# Safra Certa Insumos Agrícolas - site institucional

Site institucional com várias páginas para a Safra Certa (Tapejara - RS, @safracerta).

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP (ScrollTrigger) · Framer Motion.

> Textos, números, equipe, endereço e produtos são **de exemplo**. Troque pelos dados reais
> (veja abaixo) e desligue o aviso de demonstração.

## Rodar

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
npm run typecheck
```

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero com foto e campo em parallax, planta crescendo com as fases da lavoura, produtos em rolagem horizontal, números, conteúdos, chamada para contato |
| `/sobre` | História em linha do tempo, missão e valores, mapa da região de atuação, equipe e estrutura |
| `/produtos` | Catálogo com filtro por categoria e cultura (o filtro fica na URL, ex.: `/produtos?categoria=sementes`) |
| `/produtos/[slug]` | Página de cada produto: embalagem ilustrada, ficha técnica, indicação, orçamento pelo WhatsApp |
| `/servicos` | Assistência técnica, análise de solo (perfil animado) e consultoria (calendário da safra) |
| `/conteudos` e `/conteudos/[slug]` | Blog com dicas do campo |
| `/contato` | Formulário, WhatsApp, telefone, mapa, horários e perguntas frequentes |

Menu fixo com todas as páginas (Início, Sobre, Produtos, Serviços, Conteúdos, Contato) e rodapé completo em todas elas.

## Onde trocar os dados

Todo o conteúdo fica em `src/data/`:

| Arquivo | O que tem |
| --- | --- |
| `empresa.ts` | nome, telefone, WhatsApp, e-mail, Instagram, endereço, horários, números; `demonstracao` liga o aviso no rodapé |
| `produtos.ts` | categorias, culturas e produtos (slug, ficha, uso, embalagem, destaque) |
| `conteudos.ts` | posts do blog (texto em blocos: parágrafo, subtítulo, lista) |
| `institucional.ts` | missão, valores, história, equipe, estrutura, serviços, perguntas frequentes |
| `mapa-rs.ts` | contorno do RS (IBGE) e municípios mostrados no mapa |
| `fotos.ts` | fotos, textos alternativos e créditos |

Antes de publicar:

- `demonstracao: false` em `empresa.ts`.
- `PERMITIR_INDEXACAO=true` no ambiente (sem isso, o site sai com `noindex`).
- Coordenadas exatas da loja no mapa de `src/app/contato/page.tsx`.
- Ligar o formulário a um envio real (`src/components/contato/FormularioContato.tsx`, função `enviar`).

## Animações

Cada animação tem uma função, e todas respeitam `prefers-reduced-motion`.

| Animação | Onde | Como funciona |
| --- | --- | --- |
| Preloader | Ao abrir o site | Semente germinando. Só CSS e some sozinho em ~1,6 s. Não roda nas trocas de página. |
| Campo e foto em parallax | Saída do hero | GSAP, só no desktop. |
| Planta crescendo | Home | Raiz, caule, folhas, flores e vagens surgem com a rolagem e acendem a fase da lavoura e os produtos dela. |
| Produtos em destaque | Home | Desktop: a seção fica presa e anda para o lado. Celular: deslizar com o dedo. |
| Catálogo | Produtos | Reorganiza com animação ao filtrar (Framer Motion). |
| Linha do tempo | Sobre | Fio e broto descendo com a rolagem. |
| Mapa | Sobre | Tapejara pulsando. |
| Perfil do solo | Serviços | O trado desce e cada camada acende. |
| Calendário da safra | Serviços | As faixas crescem ao entrar na tela. |
| Títulos | Todas as páginas | Entram linha por linha. |
| Troca de página | Todas as páginas | Cortina verde. |
| Botões e WhatsApp | Todas as páginas | Microinterações nos botões e WhatsApp redondo pulsando. |

O GSAP só é baixado quando vai ser usado, pensando em quem acessa com internet fraca.

## Produtos sem foto

Cada produto tem uma ilustração de embalagem desenhada em SVG (`src/components/ui/Embalagem.tsx`):
saco, big bag, galão ou frasco, com cores conforme a categoria. Quando houver fotos reais, troque
pela imagem do produto.

## Créditos

Fotos em domínio público (CC0 / Public Domain Mark): Alabama Extension e USDA (Flickr),
Luciagarciagon (Flickr), Ian Livesey (StockSnap). Links em `src/data/fotos.ts` e no rodapé.
Contorno do RS: malhas do IBGE. Mapa da página de contato: © colaboradores do OpenStreetMap.
