// Catálogo de EXEMPLO. Nomes, linhas e fichas foram criados para a demonstração.
// Para usar com produtos reais, mantenha o formato e troque o conteúdo.

export type Categoria = "sementes" | "fertilizantes" | "defensivos" | "nutricao-foliar" | "biologicos";
export type Cultura = "soja" | "milho" | "trigo" | "aveia";
export type Embalagem = "saco" | "bag" | "galao" | "frasco";

export const categorias: { id: Categoria; nome: string; descricao: string }[] = [
  { id: "sementes", nome: "Sementes", descricao: "Cultivares de verão e de inverno para a região." },
  { id: "fertilizantes", nome: "Fertilizantes", descricao: "Adubação de base, cobertura e correção de solo." },
  { id: "defensivos", nome: "Defensivos", descricao: "Fungicidas, inseticidas e herbicidas, com receituário." },
  { id: "nutricao-foliar", nome: "Nutrição foliar", descricao: "Micronutrientes aplicados na folha, no estádio certo." },
  { id: "biologicos", nome: "Biológicos", descricao: "Inoculantes e coinoculantes para fixar nitrogênio." },
];

export const culturas: { id: Cultura; nome: string }[] = [
  { id: "soja", nome: "Soja" },
  { id: "milho", nome: "Milho" },
  { id: "trigo", nome: "Trigo" },
  { id: "aveia", nome: "Aveia" },
];

export type Produto = {
  slug: string;
  nome: string;
  categoria: Categoria;
  culturas: Cultura[];
  resumo: string;
  descricao: string;
  embalagem: { tipo: Embalagem; texto: string };
  ficha: { rotulo: string; valor: string }[];
  uso: string[];
  destaque?: boolean;
};

export const produtos: Produto[] = [
  {
    slug: "semente-soja-sc-59",
    nome: "Soja SC 5.9",
    categoria: "sementes",
    culturas: ["soja"],
    resumo: "Ciclo precoce, libera a área cedo para o trigo ou o milho safrinha.",
    descricao:
      "Cultivar de ciclo precoce para o Planalto Médio. Fecha a entrelinha rápido e colhe cedo, o que dá folga para entrar com a cultura de inverno no tempo certo.",
    embalagem: { tipo: "saco", texto: "Saco com 200 mil sementes" },
    ficha: [
      { rotulo: "Grupo de maturação", valor: "5.9" },
      { rotulo: "Ciclo", valor: "Precoce, cerca de 120 dias" },
      { rotulo: "População de referência", valor: "280 a 320 mil plantas/ha" },
      { rotulo: "Época de semeadura", valor: "Outubro a meados de novembro" },
    ],
    uso: ["Áreas com sucessão soja e trigo", "Solo corrigido e com boa fertilidade", "Semeadura no início da janela"],
    destaque: true,
  },
  {
    slug: "semente-trigo-sc-planalto",
    nome: "Trigo SC Planalto",
    categoria: "sementes",
    culturas: ["trigo"],
    resumo: "Trigo de inverno com boa sanidade de folha e grão para panificação.",
    descricao:
      "Cultivar de trigo pensada para o inverno do norte gaúcho. Boa sanidade de folha e porte que segura bem o acamamento com adubação nitrogenada correta.",
    embalagem: { tipo: "saco", texto: "Saco de 40 kg" },
    ficha: [
      { rotulo: "Ciclo", valor: "Médio" },
      { rotulo: "Densidade de referência", valor: "300 a 350 sementes aptas/m²" },
      { rotulo: "Época de semeadura", valor: "Junho a meados de julho" },
      { rotulo: "Uso do grão", valor: "Panificação" },
    ],
    uso: ["Sucessão à soja", "Áreas com histórico de acamamento: ajustar o nitrogênio", "Semeadura em plantio direto"],
    destaque: true,
  },
  {
    slug: "milho-hibrido-sc-2610",
    nome: "Milho híbrido SC 2610",
    categoria: "sementes",
    culturas: ["milho"],
    resumo: "Híbrido para grão, com colmo firme e boa resposta a adubação.",
    descricao:
      "Híbrido de ciclo precoce para grão. Colmo firme, que mantém a planta em pé até a colheita, e boa resposta a nitrogênio em cobertura.",
    embalagem: { tipo: "saco", texto: "Saco com 60 mil sementes" },
    ficha: [
      { rotulo: "Uso", valor: "Grão" },
      { rotulo: "Ciclo", valor: "Precoce" },
      { rotulo: "População de referência", valor: "65 a 75 mil plantas/ha" },
      { rotulo: "Época de semeadura", valor: "Agosto a outubro" },
    ],
    uso: ["Milho de primeira safra", "Áreas de alto potencial", "Adubação nitrogenada parcelada"],
  },
  {
    slug: "aveia-preta-cobertura",
    nome: "Aveia preta Cobertura",
    categoria: "sementes",
    culturas: ["aveia"],
    resumo: "Cobertura de inverno que segura o solo e deixa palha para o plantio direto.",
    descricao:
      "Aveia preta para cobertura de solo no inverno. Produz bastante palha, ajuda a controlar plantas daninhas e protege o solo da erosão até a semeadura da soja.",
    embalagem: { tipo: "saco", texto: "Saco de 40 kg" },
    ficha: [
      { rotulo: "Uso", valor: "Cobertura de solo e pastejo" },
      { rotulo: "Densidade de referência", valor: "60 a 80 kg/ha" },
      { rotulo: "Época de semeadura", valor: "Abril a junho" },
      { rotulo: "Manejo", valor: "Dessecação antes da soja" },
    ],
    uso: ["Áreas em pousio no inverno", "Integração lavoura-pecuária", "Formação de palhada"],
  },
  {
    slug: "npk-05-20-20-arranque",
    nome: "NPK 05-20-20 Arranque",
    categoria: "fertilizantes",
    culturas: ["soja", "milho", "trigo"],
    resumo: "Adubo de base com fósforo e potássio para o estabelecimento da lavoura.",
    descricao:
      "Formulação de base para semeadura, com fósforo e potássio equilibrados. Grânulo uniforme, que flui bem na semeadora e não empedra no depósito.",
    embalagem: { tipo: "bag", texto: "Saco de 50 kg ou big bag de 1 t" },
    ficha: [
      { rotulo: "Formulação", valor: "05-20-20" },
      { rotulo: "Aplicação", valor: "Na linha de semeadura" },
      { rotulo: "Dose", valor: "Conforme análise de solo" },
      { rotulo: "Entrega", valor: "Ensacado ou a granel em big bag" },
    ],
    uso: ["Adubação de base da soja e do milho", "Trigo em solos com fósforo médio", "Dose definida pela análise de solo"],
    destaque: true,
  },
  {
    slug: "ureia-protegida-n46",
    nome: "Ureia protegida N46",
    categoria: "fertilizantes",
    culturas: ["milho", "trigo", "aveia"],
    resumo: "Nitrogênio de cobertura com menos perda para o ar.",
    descricao:
      "Ureia tratada para reduzir a perda de nitrogênio quando a chuva demora a vir depois da aplicação. Indicada para cobertura no milho e no trigo.",
    embalagem: { tipo: "saco", texto: "Saco de 50 kg" },
    ficha: [
      { rotulo: "Teor de nitrogênio", valor: "46%" },
      { rotulo: "Aplicação", valor: "A lanço, em cobertura" },
      { rotulo: "Momento", valor: "Perfilhamento do trigo, V4 a V8 no milho" },
      { rotulo: "Dose", valor: "Conforme recomendação do agrônomo" },
    ],
    uso: ["Cobertura no trigo", "Cobertura no milho", "Pastagens de inverno"],
  },
  {
    slug: "calcario-dolomitico",
    nome: "Calcário dolomítico",
    categoria: "fertilizantes",
    culturas: ["soja", "milho", "trigo", "aveia"],
    resumo: "Correção da acidez com cálcio e magnésio, entregue a granel.",
    descricao:
      "Calcário para corrigir a acidez do solo e repor cálcio e magnésio. Entrega a granel, direto na propriedade. A quantidade vem da análise de solo.",
    embalagem: { tipo: "bag", texto: "A granel, por tonelada" },
    ficha: [
      { rotulo: "Tipo", valor: "Dolomítico" },
      { rotulo: "Aplicação", valor: "A lanço, de preferência meses antes da semeadura" },
      { rotulo: "Dose", valor: "Calculada pela análise de solo" },
      { rotulo: "Entrega", valor: "Caminhão a granel" },
    ],
    uso: ["Correção de solo antes da safra", "Reposição de cálcio e magnésio", "Áreas novas ou degradadas"],
  },
  {
    slug: "fungicida-folha-limpa",
    nome: "Fungicida Folha Limpa",
    categoria: "defensivos",
    culturas: ["soja", "trigo"],
    resumo: "Para o manejo de ferrugem asiática na soja e manchas foliares no trigo.",
    descricao:
      "Fungicida para o manejo de doenças de folha. O momento da aplicação é definido pelo monitoramento feito pelo agrônomo na área.",
    embalagem: { tipo: "galao", texto: "Galão de 5 L" },
    ficha: [
      { rotulo: "Classe", valor: "Fungicida" },
      { rotulo: "Alvos", valor: "Ferrugem asiática, manchas foliares" },
      { rotulo: "Aplicação", valor: "Pulverização, conforme receituário" },
      { rotulo: "Venda", valor: "Somente com receituário agronômico" },
    ],
    uso: ["Programa de fungicidas da soja", "Manchas foliares no trigo", "Sempre com receituário"],
    destaque: true,
  },
  {
    slug: "inseticida-lavoura-firme",
    nome: "Inseticida Lavoura Firme",
    categoria: "defensivos",
    culturas: ["soja", "milho"],
    resumo: "Controle de lagartas e percevejos, com decisão pelo monitoramento.",
    descricao:
      "Inseticida para lagartas e percevejos. A aplicação é decidida pela contagem de pragas no pano de batida, feita na visita técnica.",
    embalagem: { tipo: "frasco", texto: "Frasco de 1 L" },
    ficha: [
      { rotulo: "Classe", valor: "Inseticida" },
      { rotulo: "Alvos", valor: "Lagartas e percevejos" },
      { rotulo: "Aplicação", valor: "Pulverização, conforme receituário" },
      { rotulo: "Venda", valor: "Somente com receituário agronômico" },
    ],
    uso: ["Manejo integrado de pragas", "Decisão pelo nível de dano", "Sempre com receituário"],
  },
  {
    slug: "herbicida-dessecante-pre-plantio",
    nome: "Herbicida Dessecante",
    categoria: "defensivos",
    culturas: ["soja", "milho", "trigo"],
    resumo: "Dessecação da cobertura de inverno antes da semeadura.",
    descricao:
      "Herbicida para dessecar a cobertura e as plantas daninhas antes da semeadura, deixando a palha pronta para o plantio direto.",
    embalagem: { tipo: "galao", texto: "Galão de 20 L" },
    ficha: [
      { rotulo: "Classe", valor: "Herbicida" },
      { rotulo: "Uso", valor: "Dessecação em pré-semeadura" },
      { rotulo: "Aplicação", valor: "Pulverização, conforme receituário" },
      { rotulo: "Venda", valor: "Somente com receituário agronômico" },
    ],
    uso: ["Manejo da aveia antes da soja", "Plantas daninhas de inverno", "Sempre com receituário"],
  },
  {
    slug: "foliar-boro-molibdenio",
    nome: "Foliar Boro + Molibdênio",
    categoria: "nutricao-foliar",
    culturas: ["soja"],
    resumo: "Boro e molibdênio para a fixação de nitrogênio e o pegamento das flores.",
    descricao:
      "Nutrição foliar com boro e molibdênio. O molibdênio ajuda a fixação biológica de nitrogênio e o boro, o pegamento das flores e das vagens.",
    embalagem: { tipo: "galao", texto: "Galão de 5 L" },
    ficha: [
      { rotulo: "Nutrientes", valor: "Boro e molibdênio" },
      { rotulo: "Aplicação", valor: "Pulverização foliar" },
      { rotulo: "Momento", valor: "V3 a V5 e início da floração" },
      { rotulo: "Dose", valor: "Conforme recomendação do agrônomo" },
    ],
    uso: ["Soja em início de desenvolvimento", "Pré-florada", "Pode entrar junto com a aplicação de herbicida, conforme bula"],
  },
  {
    slug: "foliar-manganes",
    nome: "Foliar Manganês",
    categoria: "nutricao-foliar",
    culturas: ["soja", "trigo"],
    resumo: "Correção de deficiência de manganês, comum em solo com calagem alta.",
    descricao:
      "Manganês para aplicação foliar. Corrige a deficiência que aparece em áreas com pH alto depois da calagem, com folhas novas amareladas entre as nervuras.",
    embalagem: { tipo: "frasco", texto: "Frasco de 1 L" },
    ficha: [
      { rotulo: "Nutriente", valor: "Manganês" },
      { rotulo: "Aplicação", valor: "Pulverização foliar" },
      { rotulo: "Momento", valor: "Ao primeiro sinal de deficiência" },
      { rotulo: "Dose", valor: "Conforme recomendação do agrônomo" },
    ],
    uso: ["Áreas com calagem recente", "Soja e trigo", "Confirmação por análise de folha"],
  },
  {
    slug: "inoculante-soja-liquido",
    nome: "Inoculante para soja",
    categoria: "biologicos",
    culturas: ["soja"],
    resumo: "Bactérias que fixam nitrogênio do ar na raiz da soja.",
    descricao:
      "Inoculante líquido com bactérias fixadoras de nitrogênio para a soja. Aplicado na semente ou no sulco, no dia da semeadura, longe do sol e do calor.",
    embalagem: { tipo: "frasco", texto: "Frasco para 50 kg de semente" },
    ficha: [
      { rotulo: "Tipo", valor: "Inoculante líquido" },
      { rotulo: "Aplicação", valor: "Na semente ou no sulco" },
      { rotulo: "Momento", valor: "No dia da semeadura" },
      { rotulo: "Armazenagem", valor: "Local fresco, longe do sol" },
    ],
    uso: ["Toda área de soja, todo ano", "Semear logo depois de inocular", "Evitar mistura direta com fungicida sem orientação"],
    destaque: true,
  },
  {
    slug: "coinoculante-gramineas",
    nome: "Coinoculante para gramíneas",
    categoria: "biologicos",
    culturas: ["milho", "trigo"],
    resumo: "Bactérias promotoras de crescimento de raiz para milho e trigo.",
    descricao:
      "Produto biológico com bactérias que estimulam o crescimento das raízes e ajudam a planta a aproveitar melhor a água e o adubo.",
    embalagem: { tipo: "frasco", texto: "Frasco de 1 L" },
    ficha: [
      { rotulo: "Tipo", valor: "Biológico líquido" },
      { rotulo: "Aplicação", valor: "Na semente ou no sulco" },
      { rotulo: "Culturas", valor: "Milho e trigo" },
      { rotulo: "Armazenagem", valor: "Local fresco, longe do sol" },
    ],
    uso: ["Milho e trigo", "Aplicação junto da semeadura", "Complementa a adubação, não substitui"],
  },
];

export const produtoPorSlug = (slug: string) => produtos.find((p) => p.slug === slug);
export const nomeCategoria = (id: Categoria) => categorias.find((c) => c.id === id)?.nome ?? id;
export const nomeCultura = (id: Cultura) => culturas.find((c) => c.id === id)?.nome ?? id;
export const textoCulturas = (lista: Cultura[]) => lista.map(nomeCultura).join(", ");
