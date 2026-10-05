/**
 * MacroCards.js - Cartas de Eventos Macroeconômicos com Impacto Real
 * AnimVC: A Jornada do Fundador
 */

const MACRO_CARDS = [
  {
    id: 'macro_interest_2025',
    title: 'Juros Elevados em 2025',
    tag: 'Política Monetária',
    icon: '📈',
    badgeClass: 'badge-danger',
    description: 'Bancos Centrais mantêm taxas de juros elevadas para combater a inflação persistente. O custo de oportunidade do capital sobe e o fluxo de Venture Capital global retrai.',
    context: 'Com a Selic e os juros do Fed altos, investidores institucionais exigem rentabilidade imediata em vez de crescimento desenfreado a qualquer custo.',
    roundTrigger: 'seriesB', // ou sorteada
    investorReaction: {
      serafim: 'Sinto menos impacto na ideação, mas alerto: o dinheiro ficou mais caro lá na frente.',
      vera: 'Precisamos de eficiência de capital (Burn Multiple abaixo de 1.5x) e foco em receita líquida!',
      equity: 'Foco absoluto em EBITDA positivo e setores resilientes como Agronegócio e Tecnologia Essencial.'
    },
    effects: {
      valuationMultiplier: 0.85, // -15% nos valuations de mercado
      resilientSectors: ['agritech', 'tech', 'healthtech'],
      marketSentiment: 'cautious'
    },
    tacticalChoices: [
      {
        id: 'cut_burn',
        title: 'Esticar o Runway (Reduzir Custos)',
        description: 'Reduzir despesas operacionais em 15% e congelar contratações não essenciais.',
        impact: { runwayMonths: +6, valuationMod: 0.95, investorApproval: +15, text: 'Runway estendido em 6 meses! Investidores aplaudem disciplina financeira.' }
      },
      {
        id: 'maintain_growth',
        title: 'Manter Agressividade Comercial',
        description: 'Continuar queimando caixa para conquistar market share dos concorrentes fragilizados.',
        impact: { runwayMonths: -3, valuationMod: 1.10, investorApproval: -10, text: 'Arriscado! Crescimento mantido, mas pressão por rentabilidade aumentou.' }
      }
    ]
  },

  {
    id: 'macro_geopolitics_q1_2025',
    title: 'Incerteza Geopolítica no 1º Tri 2025',
    tag: 'Cenário Global',
    icon: '🌐',
    badgeClass: 'badge-warning',
    description: 'Tensões nas cadeias de suprimentos globais e volatilidade cambial impactam a confiança dos investidores cross-border.',
    context: 'Fundos globais de SoftBank, Tiger e Sequoia seguram aportes secundários no Brasil, valorizando startups que produzem valor local e contratos em moeda forte.',
    roundTrigger: 'seriesA',
    investorReaction: {
      serafim: 'Foque nos problemas reais dos clientes brasileiros para blindar o modelo.',
      vera: 'Apoio total ao Capital Produtivo local. É hora de fortalecer a cadeia produtiva nacional!',
      equity: 'Excelente momento para quem tiver caixa fazer M&A de concorrentes em apuros.'
    },
    effects: {
      valuationMultiplier: 0.90,
      resilientSectors: ['tech', 'agritech'],
      marketSentiment: 'volatile'
    },
    tacticalChoices: [
      {
        id: 'local_focus',
        title: 'Foco na Eficiência Nacional',
        description: 'Renegociar contratos com fornecedores e focar em clientes corporativos locais.',
        impact: { runwayMonths: +4, valuationMod: 1.0, investorApproval: +10, text: 'Operação blindada contra o dólar e clientes fidelizados.' }
      },
      {
        id: 'internationalize',
        title: 'Buscar Clientes Internacionais',
        description: 'Faturar em dólar para se proteger contra a desvalorização cambial.',
        impact: { runwayMonths: -2, valuationMod: 1.15, investorApproval: +5, text: 'Receita em moeda forte destrava múltiplos maiores de valuation!' }
      }
    ]
  },

  {
    id: 'macro_ai_boom',
    title: 'A Corrida do Ouro da Inteligência Artificial',
    tag: 'Disrupção Tecnológica',
    icon: '🤖',
    badgeClass: 'badge-success',
    description: 'Avanços vertiginosos em Modelos de Linguagem e Automação Agêntica atraem bilhões em liquidez global para empresas de base tecnológica.',
    context: 'Investidores procuram soluções onde a IA não seja apenas um "wrap", mas sim uma vantagem competitiva defensável (Data Moat).',
    roundTrigger: 'seed',
    investorReaction: {
      serafim: 'Inovação fascinante, mas lembre-se: a IA é ferramenta, o que importa é a dor do cliente.',
      vera: 'Queremos IA aplicada a processos produtivos reais, gerando ganhos de produtividade e novos empregos especializados.',
      equity: 'Se a IA aumentar a margem operacional de 20% para 40%, temos uma candidata brilhante ao IPO.'
    },
    effects: {
      valuationMultiplier: 1.25, // +25% de prêmio
      resilientSectors: ['tech', 'healthtech'],
      marketSentiment: 'bullish'
    },
    tacticalChoices: [
      {
        id: 'integrate_ai',
        title: 'Integrar IA no Core do Produto',
        description: 'Construir automação nativa para reduzir tempo de resposta ao cliente.',
        impact: { runwayMonths: -1, valuationMod: 1.20, investorApproval: +20, text: 'Valuation disparou! A empresa virou queridinha dos fundos tech.' }
      },
      {
        id: 'pragmatic_tech',
        title: 'Foco no Modelo Tradicional Provado',
        description: 'Não se distrair com modismos e focar em entrega operacional sem riscos de alucinação de IA.',
        impact: { runwayMonths: +2, valuationMod: 1.0, investorApproval: 0, text: 'Segurança garantida, embora com múltiplos de mercado convencionais.' }
      }
    ]
  },

  {
    id: 'macro_esg_wave',
    title: 'Onda ESG & Capital Produtivo',
    tag: 'Sustentabilidade & Impacto',
    icon: '🌱',
    badgeClass: 'badge-info',
    description: 'Grandes alocadores de fundos de pensão exigem métricas rigorosas de governança ambiental, inclusão social e impacto de longo prazo.',
    context: 'Fundos de VC e PE com mandato de "Capital Produtivo" priorizam negócios que geram empregos de qualidade e resolvem desafios sustentáveis.',
    roundTrigger: 'pe',
    investorReaction: {
      serafim: 'Startups com propósito atraem os melhores talentos da nova geração.',
      vera: 'Música para os meus ouvidos! É a confirmação da nossa tese de Capital Produtivo!',
      equity: 'Conformidade ESG é pré-requisito indispensável para ser adquirido por multinacionais como Nestlé ou Unilever.'
    },
    effects: {
      valuationMultiplier: 1.15,
      resilientSectors: ['agritech', 'healthtech'],
      marketSentiment: 'sustainable'
    },
    tacticalChoices: [
      {
        id: 'certify_bcorp',
        title: 'Obter Certificação e Governança ESG',
        description: 'Auditar emissões de carbono, diversidade na liderança e compliance social.',
        impact: { runwayMonths: -2, valuationMod: 1.18, investorApproval: +25, text: 'Excelente posicionamento para M&A estratégico global (padrão Pura Vida)!' }
      },
      {
        id: 'focus_margins_only',
        title: 'Priorizar Apenas Margem Líquida',
        description: 'Adiar iniciativas ESG para economizar caixa de curto prazo.',
        impact: { runwayMonths: +3, valuationMod: 0.92, investorApproval: -15, text: 'Vera Capital e grandes fundos torcem o nariz para a falta de responsabilidade.' }
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MACRO_CARDS };
}
