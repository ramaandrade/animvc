/**
 * RoundsData.js - Configuração estruturada de cada rodada do jogo
 * AnimVC: A Jornada do Fundador
 */

const SECTORS = [
  {
    id: 'tech',
    name: 'Tecnologia & IA',
    icon: '⚡',
    baseMultiplier: 1.2,
    pitchTemplate: 'Plataforma SaaS B2B com inteligência artificial para otimização de fluxos operacionais corporativos.',
    painPoint: 'Empresas perdem 35% do tempo com processos analógicos e retrabalho manual.'
  },
  {
    id: 'healthtech',
    name: 'Saúde & Biotecnologia',
    icon: '🧬',
    baseMultiplier: 1.15,
    pitchTemplate: 'Diagnósticos preventivos e gestão clínica inteligente para reduzir custos hospitalares.',
    painPoint: 'Altos custos de sinistralidade e lentidão na detecção precoce de doenças crônicas.'
  },
  {
    id: 'agritech',
    name: 'Agronegócio & Clima',
    icon: '🌱',
    baseMultiplier: 1.25,
    pitchTemplate: 'Sensoriamento remoto e monitoramento de solo em tempo real para maximizar a produtividade por hectare.',
    painPoint: 'Perdas agrícolas por eventos climáticos extremos e falta de dados precisos na lavoura.'
  },
  {
    id: 'fintech',
    name: 'FinTech & Pagamentos',
    icon: '💳',
    baseMultiplier: 1.1,
    pitchTemplate: 'Infraestrutura de crédito e pagamentos instantâneos para médias empresas desbancarizadas.',
    painPoint: 'Taxas bancárias extorsivas e burocracia na antecipação de recebíveis.'
  }
];

const GAME_ROUNDS = [
  {
    id: 'seed',
    number: 1,
    name: 'Rodada Seed (Ideação)',
    stageTitle: 'Fase de Ideação & Validação',
    characterId: 'serafim',
    badge: 'Anjo Serafim',
    defaultInvestment: 1000000, // R$ 1.000.000
    suggestedEquity: 15.0,
    minEquity: 8.0,
    maxEquity: 30.0,
    basePreMoney: 5666666,
    elevatorPitch: {
      title: 'Elevator Pitch: A Dor & O Time',
      readTime: '45 segundos',
      content: 'Temos um problema massivo no setor, que afeta milhões diariamente. Nossos fundadores trabalharam juntos nos últimos 4 anos, combinando liderança técnica sênior e histórico comercial comprovado. Já temos 15 clientes em lista de espera validando o MVP.',
      options: [
        {
          id: 'focus_team_passion',
          label: '🌟 Focar no Time, Visão e Dedicação Integral',
          hint: 'Agrada diretamente o Anjo Serafim (Time = 53% da decisão nesta fase).',
          investorMood: 'happy',
          scoreBonus: 25,
          dialogueResponse: 'É isso que eu quero ouvir! Na ideação, pivotamos o produto 5 vezes se necessário, mas um time resiliente nunca desiste.'
        },
        {
          id: 'focus_numbers_only',
          label: '📊 Focar em Projeções Financeiras de 5 Anos',
          hint: 'Planilhas rebuscadas em estágio tão inicial soam artificiais para anjos experientes.',
          investorMood: 'skeptical',
          scoreBonus: 5,
          dialogueResponse: 'Planilhas aceitam qualquer fórmula, amigo. Menos fórmulas no Excel e mais suor validando o cliente na rua!'
        },
        {
          id: 'focus_aggressive_marketing',
          label: '🚀 Prometer Retorno Rápido em 12 Meses',
          hint: 'Promessas fáceis geram desconfiança sobre a maturidade do empreendedor.',
          investorMood: 'skeptical',
          scoreBonus: -10,
          dialogueResponse: 'Construir algo com valor real leva tempo. Promessas de enriquecimento rápido acendem um sinal amarelo.'
        }
      ]
    },
    educationalTip: '💡 Lição VC: No Seed, 53% da decisão de investimento se baseia na competência e complementaridade do time fundador. O produto ainda irá mudar muito!'
  },

  {
    id: 'seriesA',
    number: 2,
    name: 'Série A (Operação & Tração)',
    stageTitle: 'Validação de Unit Economics & Capital Produtivo',
    characterId: 'vera',
    badge: 'Vera Capital',
    defaultInvestment: 12000000, // R$ 12.000.000
    suggestedEquity: 18.0,
    minEquity: 10.0,
    maxEquity: 28.0,
    basePreMoney: 54666666,
    elevatorPitch: {
      title: 'Elevator Pitch: Tração & Eficiência Produtiva',
      readTime: '55 segundos',
      content: 'Nosso produto atingiu Product-Market Fit! Faturamos R$ 450k/mês com crescimento de 18% ao mês. Nossa retenção líquida é de 115% e o LTV/CAC é superior a 4x. Precisamos de R$ 12M para estruturar nossa força de vendas e gerar mais de 60 empregos qualificados.',
      options: [
        {
          id: 'focus_productive_impact',
          label: '🌱 Provar Unit Economics Sólidos & Capital Produtivo',
          hint: 'Conquista a tese de Vera Capital: crescimento sustentável com impacto socioeconômico real.',
          investorMood: 'excited',
          scoreBonus: 30,
          dialogueResponse: 'Perfeito! Tração com retenção real e criação de empregos de alta tecnologia. Isso sim é o Capital Produtivo que defendemos!'
        },
        {
          id: 'focus_hypergrowth_burn',
          label: '🔥 Queimar Caixa Rápido para Abafar Concorrentes',
          hint: 'Vera repudia queima irresponsável de caixa sem fundamentos saudáveis.',
          investorMood: 'furious',
          scoreBonus: -20,
          dialogueResponse: 'Crescimento com queima desenfreada sem reter clientes? Isso é castelo de cartas! Nosso fundo não financia pirotecnia.'
        },
        {
          id: 'focus_tech_alone',
          label: '💻 Focar Apenas no Código e Ignorar o Comercial',
          hint: 'Na Série A, Go-to-Market e vendas são tão cruciais quanto o produto.',
          investorMood: 'skeptical',
          scoreBonus: 0,
          dialogueResponse: 'A melhor tecnologia do mundo não sobrevive sem uma máquina previsível de aquisição de clientes.'
        }
      ]
    },
    educationalTip: '💡 Lição VC: Chegar à Série A com mais de 50% de participação é crucial para manter os fundadores no comando e com apetite para o longo prazo.'
  },

  {
    id: 'seriesB',
    number: 3,
    name: 'Série B (Expansão & Escala)',
    stageTitle: 'Consolidação de Liderança de Mercado',
    characterId: 'vera',
    badge: 'Sindicato VC',
    defaultInvestment: 35000000, // R$ 35.000.000
    suggestedEquity: 16.0,
    minEquity: 10.0,
    maxEquity: 25.0,
    basePreMoney: 183750000,
    elevatorPitch: {
      title: 'Elevator Pitch: Liderança Nacional & Internacionalização',
      readTime: '50 segundos',
      content: 'Somos líderes na nossa vertical com mais de 800 clientes corporativos ativos e receita anualizada (ARR) de R$ 32M. A rodada Série B permitirá consolidar a expansão na América Latina e expandir a infraestrutura com segurança.',
      options: [
        {
          id: 'focus_sustainable_expansion',
          label: '🌎 Expansão Regional Estratégica com Margens Claras',
          hint: 'Demonstra maturidade para gerenciar múltiplos mercados simultâneos.',
          investorMood: 'proud',
          scoreBonus: 25,
          dialogueResponse: 'Visão cirúrgica. Expansão com controle de margem é a marca de um futuro unicórnio.'
        },
        {
          id: 'focus_aggressive_subsidies',
          label: '💸 Subsidiar Preços para Ganhar Usuários Gratuitos',
          hint: 'Usuários não pagantes inflacionam custos e destroem margens em escala.',
          investorMood: 'alarmed',
          scoreBonus: -15,
          dialogueResponse: 'Cuidado! Comprar crescimento com margem negativa em estágio avançado atrai clientes voláteis que cancelam no dia seguinte.'
        }
      ]
    },
    educationalTip: '💡 Lição VC: Na Série B, múltiplos de valuation começam a olhar para EBITDA e governança, preparando a empresa para fundos de Private Equity.'
  },

  {
    id: 'pe',
    number: 4,
    name: 'Private Equity (Governança & M&A)',
    stageTitle: 'Eficiência Operacional & Caso Pura Vida',
    characterId: 'equity',
    badge: 'Sr. Equity',
    defaultInvestment: 60000000, // R$ 60.000.000
    suggestedEquity: 20.0,
    minEquity: 12.0,
    maxEquity: 30.0,
    basePreMoney: 240000000,
    elevatorPitch: {
      title: 'Elevator Pitch: Governança & Consolidação Setorial',
      readTime: '60 segundos',
      content: 'Nossa empresa fatura R$ 110M/ano com margem EBITDA de 24%. Estruturamos auditoria com Big Four e conselho independente. Com aporte de PE, vamos adquirir 2 concorrentes complementares (estratégia Roll-up, espelhada no case da Pura Vida) para maximizar o valuation antes do Exit.',
      options: [
        {
          id: 'focus_governance_ma',
          label: '🏛️ Excelência em Governança, Roll-up e Margem EBITDA',
          hint: 'Alinhamento total com a cartilha de Private Equity do Sr. Equity.',
          investorMood: 'satisfied',
          scoreBonus: 35,
          dialogueResponse: 'Impecável. É exatamente a cartilha da Pura Vida e das grandes consolidações: profissionalizar a gestão, destravar sinergias de custo e atrair compradores globais.'
        },
        {
          id: 'focus_informal_management',
          label: '⚡ Dispensar Auditorias para "Manter a Agilidade"',
          hint: 'Falta de auditoria afasta fundos sérios de Private Equity e derruba o valuation.',
          investorMood: 'strict',
          scoreBonus: -30,
          dialogueResponse: 'Inadmissível. Agilidade sem compliance fiscal e auditoria independente chama-se risco jurídico. Não colocamos nosso capital em aventuras.'
        }
      ]
    },
    educationalTip: '💡 Lição PE: Fundos de Private Equity agregam valor profissionalizando a gestão e realizando aquisições complementares (Roll-up), multiplicando o múltiplo de saída!'
  }
];

const EXIT_OPTIONS = [
  {
    id: 'exit_ipo',
    title: 'IPO (Oferta Pública Inicial na Bolsa)',
    icon: '🔔',
    tag: 'Máximo Prestígio & Liquidez',
    minGovernanceRequired: 75,
    valuationMultiplier: 1.4,
    description: 'Abertura de capital na B3 ou Nasdaq. Proporciona visibilidade global, liquidez para os acionistas e acesso contínuo ao mercado de capitais.',
    idealWhen: 'Empresas com governança auditada, faturamento acima de R$ 150M e forte previsibilidade de receita.',
    feedbackSuccess: '🎉 IPO Concluído com Sucesso! O sino da bolsa tocou e as ações dispararam na estreia!',
    feedbackFail: '⚠️ Mercado de IPO fechado por fragilidade na governança. Tivemos que recorrer ao M&A de emergência.'
  },
  {
    id: 'exit_ma',
    title: 'M&A Estratégico (Aquisição por Conglomerado)',
    icon: '🤝',
    tag: 'Venda Total com Sinergia (Estilo Pura Vida)',
    minGovernanceRequired: 50,
    valuationMultiplier: 1.25,
    description: 'Venda de 100% da empresa para uma gigante global do setor (ex: estilo venda da Pura Vida para a Nestlé, ou compra de healthtechs por redes hospitalares). Dinheiro líquido e seguro.',
    idealWhen: 'Quando há fortes sinergias comerciais e distribuição complementar com o adquirente.',
    feedbackSuccess: '🚀 Aquisição Estratégica Bilionária Concluída! Fundadores e investidores recebem liquidez total à vista.',
    feedbackFail: 'Acordo travado em disputas contratuais devido a cláusulas mal negociadas no passado.'
  },
  {
    id: 'exit_secondary',
    title: 'Venda Secundária (Secondary Sale)',
    icon: '💼',
    tag: 'Cash-out Pessoal do Fundador',
    minGovernanceRequired: 40,
    valuationMultiplier: 1.0,
    description: 'O fundador vende 50% de suas próprias ações para um fundo soberano de Growth Equity, embolsando dezenas de milhões de reais e mantendo a empresa operando.',
    idealWhen: 'O fundador quer realizar fortuna pessoal sem abrir mão do controle da empresa no longo prazo.',
    feedbackSuccess: '💰 Liquidez Pessoal Garantida! O fundador embolsou dezenas de milhões sem vender o controle total do negócio.',
    feedbackFail: 'Desconto elevado aplicado na compra secundária.'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SECTORS, GAME_ROUNDS, EXIT_OPTIONS };
}
