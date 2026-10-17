// Textos institucionais (página Sobre e Serviços). TODO o conteúdo é de EXEMPLO:
// histórico, nomes da equipe e números devem ser trocados pelos reais.

export const missao =
  "Entregar o insumo certo, na hora certa, e acompanhar a lavoura até a colheita para que o produtor tome decisão com informação.";

export const valores = [
  { titulo: "Recomendação antes da venda", texto: "Vender o que a lavoura precisa, com base em análise e visita, não no que sobra no estoque." },
  { titulo: "Técnico que volta", texto: "O agrônomo que recomendou é o mesmo que volta na área para ver o resultado." },
  { titulo: "Prazo cumprido", texto: "Semente e adubo chegam antes da janela de semeadura, não depois." },
];

export const historia = [
  { ano: "2011", titulo: "Abertura da loja", texto: "Começamos com um balcão em Tapejara, vendendo semente e adubo para vizinhos e conhecidos." },
  { ano: "2014", titulo: "Primeiro agrônomo de campo", texto: "Contratamos um técnico só para visitar lavouras. A venda passou a sair da recomendação." },
  { ano: "2017", titulo: "Depósito e entrega própria", texto: "Novo depósito e caminhão próprio para entregar na propriedade, inclusive a granel." },
  { ano: "2020", titulo: "Análise de solo", texto: "Parceria com laboratório e coleta feita pela nossa equipe, com laudo em até 10 dias úteis." },
  { ano: "2023", titulo: "Linha de biológicos", texto: "Inoculantes e coinoculantes entram no catálogo, com orientação de uso para cada cultura." },
  { ano: "2026", titulo: "Hoje", texto: "Atendemos produtores de 12 municípios do Planalto Médio, na safra de verão e na de inverno." },
];

export const equipe = [
  { nome: "Ana Paula Bortolini", iniciais: "AB", funcao: "Engenheira agrônoma", area: "Soja e trigo" },
  { nome: "Rodrigo Zanella", iniciais: "RZ", funcao: "Engenheiro agrônomo", area: "Milho e nutrição" },
  { nome: "Fernanda Lazzari", iniciais: "FL", funcao: "Técnica agrícola", area: "Análise de solo" },
  { nome: "Marcos Dalmolin", iniciais: "MD", funcao: "Comercial", area: "Atendimento na loja" },
  { nome: "Júlio Pertile", iniciais: "JP", funcao: "Logística", area: "Entregas e depósito" },
];

export const estrutura = [
  { valor: "1.800 m²", item: "Depósito coberto", detalhe: "Área separada para defensivos, com controle de entrada e saída." },
  { valor: "3", item: "Caminhões", detalhe: "Entrega ensacada e a granel na propriedade." },
  { valor: "10 dias", item: "Laudo de solo", detalhe: "Coleta pela equipe e laboratório parceiro." },
];

export const servicos = [
  {
    id: "assistencia",
    titulo: "Assistência técnica",
    resumo: "O agrônomo visita a lavoura em cada fase e passa a recomendação por escrito.",
    etapas: [
      { titulo: "Agendamento", texto: "Pelo WhatsApp, com o técnico que atende a sua região." },
      { titulo: "Visita", texto: "Avaliação de estande, pragas, doenças e nutrição, talhão por talhão." },
      { titulo: "Recomendação", texto: "Resumo da visita e receituário, quando necessário, no mesmo dia." },
      { titulo: "Retorno", texto: "Nova visita na fase seguinte para conferir o resultado." },
    ],
  },
  {
    id: "solo",
    titulo: "Análise de solo",
    resumo: "Coleta por profundidade, laboratório parceiro e recomendação de calagem e adubação.",
    camadas: [
      { profundidade: "0 a 10 cm", texto: "Camada mais rica em matéria orgânica no plantio direto." },
      { profundidade: "10 a 20 cm", texto: "Mostra a acidez e o fósforo onde a raiz se desenvolve." },
      { profundidade: "20 a 40 cm", texto: "Indica se é preciso gesso para levar cálcio mais fundo." },
    ],
  },
  {
    id: "consultoria",
    titulo: "Consultoria de safra",
    resumo: "Planejamento das safras de verão e de inverno: cultivar, adubação, defensivos e datas.",
    calendario: [
      { cultura: "Soja", inicio: 9, fim: 3, cor: "verde" },
      { cultura: "Milho", inicio: 7, fim: 1, cor: "verde-claro" },
      { cultura: "Trigo", inicio: 5, fim: 10, cor: "trigo" },
      { cultura: "Aveia", inicio: 3, fim: 8, cor: "palha" },
    ],
  },
] as const;

export const perguntas = [
  { pergunta: "Qual o prazo de entrega?", resposta: "Produtos em estoque saem em até 3 dias úteis para os municípios atendidos. Semente para a safra é melhor reservar com antecedência." },
  { pergunta: "Quais as formas de pagamento?", resposta: "Pix, boleto e cartão. Para clientes cadastrados, há pagamento na safra, depois de análise de crédito." },
  { pergunta: "A visita técnica é cobrada?", resposta: "Para quem compra insumos com a gente, o acompanhamento da safra não tem custo à parte. A análise de solo tem o valor do laboratório." },
  { pergunta: "Preciso de receita para comprar defensivo?", resposta: "Sim. Defensivo só é vendido com receituário agronômico, emitido pelo nosso agrônomo depois de avaliar a área." },
  { pergunta: "Atendem fora de Tapejara?", resposta: "Sim, atendemos os municípios do Planalto Médio listados na página Sobre. Se a sua cidade não estiver lá, chame no WhatsApp." },
];
