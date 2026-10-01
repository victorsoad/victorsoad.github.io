export const SITE = {
  nome: 'Victor Soares',
  titulo: 'Victor Soares · Engenharia de software e IA aplicada',
  descricao:
    'Opinião prática sobre IA, arquitetura .NET e cloud, fintech, carreira e regulação, escrita por quem constrói sistemas financeiros.',
  linkedin: 'https://www.linkedin.com/in/victorsoad',
  github: 'https://github.com/victorsoad',
};

export const CATEGORIAS = {
  ia: { nome: 'IA', descricao: 'Como usar IA no trabalho e no negócio, modelos, agentes e ferramentas.' },
  desenvolvimento: {
    nome: 'Dev, Arquitetura e DevOps',
    descricao: '.NET, arquitetura, integrações em escala, cloud, pipelines e ferramentas de time.',
  },
  fintech: { nome: 'Fintech', descricao: 'Pix, Open Finance, Drex, pagamentos, crédito, securitização e registradoras.' },
  carreira: { nome: 'Carreira', descricao: 'Senioridade, liderança técnica, mentoria e o mercado de tecnologia.' },
  regulatorio: { nome: 'Regulatório', descricao: 'Bacen, CVM, LGPD, CNPJ Alfanumérico e normas do mercado de capitais.' },
} as const;

export type Categoria = keyof typeof CATEGORIAS;

export const formatarData = (d: Date) =>
  d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
