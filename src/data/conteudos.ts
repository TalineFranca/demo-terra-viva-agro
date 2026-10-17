// Conteúdos de EXEMPLO para o blog. Orientações gerais; a recomendação para cada área
// deve vir do agrônomo.

import type { ChaveFoto } from "./fotos";

export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "lista"; itens: string[] };

export type Conteudo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: "Manejo" | "Solo" | "Culturas";
  data: string; // AAAA-MM-DD
  leitura: number; // minutos
  foto: ChaveFoto;
  corpo: Bloco[];
};

export const conteudos: Conteudo[] = [
  {
    slug: "coleta-amostra-de-solo",
    titulo: "Como coletar a amostra de solo do jeito certo",
    resumo: "A análise só é boa se a amostra representa o talhão. Veja como dividir a área e a que profundidade coletar.",
    categoria: "Solo",
    data: "2026-09-02",
    leitura: 4,
    foto: "soloRaiz",
    corpo: [
      { tipo: "p", texto: "O laudo de análise de solo orienta quanto calcário e quanto adubo colocar. Se a amostra não representa a área, a recomendação sai errada, por melhor que seja o laboratório." },
      { tipo: "h2", texto: "Divida a propriedade em talhões parecidos" },
      { tipo: "p", texto: "Cada amostra deve vir de uma área com o mesmo tipo de solo, o mesmo histórico de cultivo e a mesma posição no relevo. Baixadas, coxilhas e áreas que receberam calcário em anos diferentes ficam em amostras separadas." },
      { tipo: "h2", texto: "Colete várias subamostras" },
      { tipo: "lista", itens: ["Ande em zigue-zague pelo talhão", "Retire de 15 a 20 subamostras e misture num balde limpo", "Evite cupinzeiros, carreadores e locais de depósito de adubo", "No plantio direto, colete de 0 a 10 cm e de 10 a 20 cm"] },
      { tipo: "p", texto: "Identifique cada saquinho com o nome do talhão e a profundidade. O técnico da Safra Certa pode fazer a coleta junto com você." },
    ],
  },
  {
    slug: "ferrugem-asiatica-monitoramento",
    titulo: "Ferrugem asiática: quando começar a monitorar",
    resumo: "A doença avança rápido com tempo úmido. O monitoramento desde cedo evita aplicação tardia.",
    categoria: "Manejo",
    data: "2026-08-18",
    leitura: 5,
    foto: "sojaFileiras",
    corpo: [
      { tipo: "p", texto: "A ferrugem asiática é uma das doenças que mais tiram produtividade da soja. Os primeiros sinais aparecem nas folhas de baixo, como pequenas pontuações escuras na face de cima da folha." },
      { tipo: "h2", texto: "Comece pelas folhas do terço inferior" },
      { tipo: "p", texto: "Vire a folha contra a luz e observe com lupa a face de baixo. As pústulas parecem pequenas elevações. Em períodos de chuva e orvalho longo, aumente a frequência das vistorias." },
      { tipo: "h2", texto: "Não espere a doença aparecer em toda a lavoura" },
      { tipo: "lista", itens: ["Siga o programa de fungicidas combinado com o agrônomo", "Respeite o intervalo entre aplicações", "Use sempre receituário e a dose da bula", "Fique de olho nos alertas da região"] },
    ],
  },
  {
    slug: "inoculacao-da-soja",
    titulo: "Inoculação da soja: cuidados para não perder a bactéria",
    resumo: "O inoculante é um produto vivo. Sol, calor e mistura errada podem matar as bactérias antes da semeadura.",
    categoria: "Culturas",
    data: "2026-08-04",
    leitura: 3,
    foto: "plantio",
    corpo: [
      { tipo: "p", texto: "As bactérias do inoculante formam nódulos na raiz da soja e fornecem nitrogênio para a planta. Para isso, elas precisam chegar vivas ao solo." },
      { tipo: "lista", itens: ["Inocule na sombra e semeie no mesmo dia", "Não deixe a semente inoculada no sol ou dentro da cabine quente", "Consulte o agrônomo antes de misturar com fungicida ou inseticida de semente", "Guarde o inoculante em local fresco até o uso"] },
      { tipo: "p", texto: "Inocular todo ano vale a pena, mesmo em áreas antigas de soja: o custo é baixo perto do nitrogênio que a planta recebe." },
    ],
  },
  {
    slug: "nitrogenio-em-cobertura-no-trigo",
    titulo: "Trigo: nitrogênio em cobertura no momento certo",
    resumo: "O perfilhamento é a fase em que o trigo mais responde ao nitrogênio. Veja como planejar a cobertura.",
    categoria: "Culturas",
    data: "2026-07-10",
    leitura: 4,
    foto: "trigo",
    corpo: [
      { tipo: "p", texto: "No trigo, o nitrogênio aplicado no início do perfilhamento aumenta o número de espigas. Aplicar tarde demais rende menos e pode favorecer o acamamento." },
      { tipo: "h2", texto: "Olhe a umidade do solo" },
      { tipo: "p", texto: "A ureia aplicada em solo seco, sem chuva nos dias seguintes, perde parte do nitrogênio para o ar. A ureia protegida reduz essa perda." },
      { tipo: "lista", itens: ["Planeje a dose pela análise de solo e pela cultura anterior", "Parcele em áreas com dose alta", "Ajuste a dose em cultivares com tendência a acamar"] },
    ],
  },
  {
    slug: "cobertura-de-inverno",
    titulo: "Cobertura de inverno: por que não deixar a área parada",
    resumo: "Aveia e outras coberturas protegem o solo, seguram plantas daninhas e deixam palha para a soja.",
    categoria: "Solo",
    data: "2026-04-22",
    leitura: 3,
    foto: "pastagem",
    corpo: [
      { tipo: "p", texto: "A área sem cobertura no inverno fica exposta à chuva forte, perde solo e vira espaço para planta daninha. Uma cobertura bem formada resolve as três coisas." },
      { tipo: "lista", itens: ["A aveia preta produz bastante palha e é fácil de manejar", "Pode servir de pasto para o gado no inverno", "A dessecação deve ser feita com antecedência antes da soja"] },
    ],
  },
  {
    slug: "janela-de-semeadura-da-soja",
    titulo: "Janela de semeadura da soja no Planalto Médio",
    resumo: "Semear dentro da janela reduz riscos de estiagem no enchimento de grão e organiza a safra de inverno.",
    categoria: "Manejo",
    data: "2026-09-20",
    leitura: 4,
    foto: "sojaMadura",
    corpo: [
      { tipo: "p", texto: "A escolha da data de semeadura depende do ciclo da cultivar, da umidade do solo e do que vem depois da soja. Semear cedo com cultivar precoce libera a área para o trigo." },
      { tipo: "h2", texto: "Solo com umidade, não só calendário" },
      { tipo: "p", texto: "Semear em solo seco esperando a chuva aumenta o risco de falhas. Com umidade boa, a emergência é uniforme e o estande fecha mais rápido." },
      { tipo: "lista", itens: ["Combine o ciclo da cultivar com a data de semeadura", "Regule a semeadora antes de começar", "Confira a população nos primeiros dias depois da emergência"] },
    ],
  },
];

export const conteudosOrdenados = [...conteudos].sort((a, b) => b.data.localeCompare(a.data));
export const conteudoPorSlug = (slug: string) => conteudos.find((c) => c.slug === slug);

const formatoData = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
export const formatarData = (iso: string) => formatoData.format(new Date(`${iso}T12:00:00Z`));
