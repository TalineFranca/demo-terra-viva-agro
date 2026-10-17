// Dados institucionais da Safra Certa.
// ATENÇÃO: telefone, e-mail, endereço, horários e números abaixo são EXEMPLOS.
// Troque pelos dados reais antes de publicar e mude `demonstracao` para false.

export const empresa = {
  nome: "Safra Certa",
  nomeCompleto: "Safra Certa Insumos Agrícolas",
  cidade: "Tapejara",
  uf: "RS",
  descricao:
    "Sementes, fertilizantes, defensivos e nutrição foliar para produtores de Tapejara e região, com agrônomo acompanhando a lavoura.",
  telefone: { exibicao: "(54) 3000-0000", link: "+555430000000" },
  whatsapp: { exibicao: "(54) 90000-0000", numero: "5554900000000" },
  email: "contato@safracerta.exemplo",
  instagram: { usuario: "@safracerta", url: "https://instagram.com/safracerta" },
  endereco: "Endereço da loja, Tapejara - RS",
  horario: [
    { dias: "Segunda a sexta", horas: "7h30 às 18h" },
    { dias: "Sábado", horas: "7h30 às 11h30" },
  ],
  plantao: "Na safra de verão, plantão técnico pelo WhatsApp até as 20h.",
  siteUrl: "https://safracerta.exemplo",
  /** Mostra o aviso de conteúdo de demonstração no rodapé. */
  demonstracao: true,
} as const;

export const paginas = [
  { href: "/sobre", rotulo: "Sobre" },
  { href: "/produtos", rotulo: "Produtos" },
  { href: "/servicos", rotulo: "Serviços" },
  { href: "/conteudos", rotulo: "Conteúdos" },
  { href: "/contato", rotulo: "Contato" },
] as const;

/** Números da empresa (exemplo). */
export const numeros = {
  anos: 15,
  hectares: 48,
  produtores: 620,
  municipios: 12,
};
