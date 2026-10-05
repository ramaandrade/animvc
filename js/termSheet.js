/**
 * TermSheet.js - Gestão e explicação interativa de Cláusulas Contratuais (Term Sheet)
 * AnimVC: A Jornada do Fundador
 */

const TERM_SHEET_CLAUSES = [
  {
    id: 'tag_along',
    name: 'Tag Along (Direito de Venda Conjunta)',
    category: 'Proteção Societária',
    badge: 'Essencial para Fundadores',
    isFounderFriendly: true,
    summary: 'Se um acionista majoritário vender sua fatia, os minoritários têm o direito de vender suas ações pelo mesmo preço e condições.',
    explanation: 'Protege você e outros sócios minoritários de ficarem "presos" na empresa sob a gestão de um novo controlador desconhecido. Garante liquidez igualitária em caso de venda do controle.',
    impactAccepted: {
      founderProtection: +25,
      investorTrust: +10,
      text: 'Tag Along de 100% garantido! Seus interesses estão protegidos em qualquer mudança de controle.'
    },
    impactRejected: {
      founderProtection: -25,
      investorTrust: -5,
      text: 'Sem Tag Along, se os fundos venderem o controle da empresa você pode ficar à mercê de novos controladores.'
    }
  },

  {
    id: 'drag_along',
    name: 'Drag Along (Obrigação de Venda Conjunta)',
    category: 'Liquidez & Saída',
    badge: 'Exigência Comum de VC/PE',
    isFounderFriendly: false,
    summary: 'Permite à maioria (ou aos investidores) forçar todos os demais acionistas a venderem suas ações caso surja uma oferta de compra integral (M&A).',
    explanation: 'Fundos de VC e PE possuem prazos de desinvestimento (geralmente 7 a 10 anos). Sem o Drag Along, um fundador com 10% poderia vetar a venda bilionária da empresa para uma multinacional. O segredo é estipular um valuation mínimo aceitável!',
    impactAccepted: {
      founderProtection: -10,
      investorTrust: +20,
      valuationBonus: 1.05,
      text: 'Drag Along aceito com piso de valuation justo! O investidor fica seguro quanto à rota de Exit.'
    },
    impactRejected: {
      founderProtection: +15,
      investorTrust: -25,
      equityPenalty: +2.0, // Investidor pede mais equity como prêmio pelo risco de iliquidez
      text: 'Recusar o Drag Along assustou o investidor! Para compensar o risco de bloqueio de Exit, ele exige +2% de equity.'
    }
  },

  {
    id: 'liquidation_preference',
    name: 'Preferência de Liquidação (1x Non-Participating vs 2x Participating)',
    category: 'Direitos Econômicos',
    badge: 'Crítico no Downside',
    isFounderFriendly: false,
    summary: 'Define quem recebe o dinheiro primeiro se a empresa for vendida ou liquidada.',
    explanation: 'O padrão amigável é 1x Non-Participating: o investidor recebe de volta o capital aportado OU a sua porcentagem do valor da venda (o que for maior). A cláusula predatória é 2x Participating: o investidor retira o dobro do capital investido E MAIS a sua porcentagem do restante!',
    options: [
      {
        id: '1x_non_participating',
        label: '1x Não-Participante (Padrão de Mercado)',
        founderFriendly: true,
        text: 'Justo: Garante o capital inicial do investidor sem canibalizar o ganho dos fundadores.'
      },
      {
        id: '2x_participating',
        label: '2x Participante (Predatória)',
        founderFriendly: false,
        text: 'Perigoso! O investidor embolsa o dobro do capital antes e ainda divide o restante.'
      }
    ],
    impactAccepted: {
      founderProtection: +20,
      investorTrust: +10,
      text: 'Cláusula negociada para 1x Non-Participating. Equilíbrio perfeito entre risco e retorno!'
    },
    impactRejected: {
      founderProtection: -35,
      investorTrust: +15,
      text: 'Aceitar 2x Participating pode deixar o fundador com quase nada se o Exit for menor que o esperado.'
    }
  },

  {
    id: 'board_seat',
    name: 'Assento no Conselho de Administração (Board Seat)',
    category: 'Governança',
    badge: 'Governança & Smart Money',
    isFounderFriendly: null, // Neutro/positivo dependendo do valor do conselheiro
    summary: 'O investidor ganha uma cadeira no Conselho para votar em decisões estratégicas, orçamentos e contratações de C-level.',
    explanation: 'Nas rodadas de Série A e Private Equity, investidores institucionais exigem governança formal. Um bom conselheiro traz "Smart Money", conexões e disciplina; um conselheiro desalinhado pode criar conflitos diários.',
    impactAccepted: {
      founderProtection: 0,
      investorTrust: +20,
      governanceScore: +25,
      text: 'Conselho estruturado! Investidor adiciona valor estratégico e governança de mercado.'
    },
    impactRejected: {
      founderProtection: +10,
      investorTrust: -20,
      governanceScore: -15,
      text: 'Recusar assento no conselho gera desconfiança institucional na Série A e PE.'
    }
  },

  {
    id: 'esop_pool',
    name: 'Pool de Stock Options para Talentos (ESOP 10%)',
    category: 'Incentivos de Time',
    badge: 'Retenção de Talentos',
    isFounderFriendly: true,
    summary: 'Criação de uma reserva de 10% das ações para atrair executivos e engenheiros seniores (Pre-money ESOP).',
    explanation: 'Sem opções de ações (Stock Options), é quase impossível disputar talentos globais de tecnologia com grandes corporações. Investidores exigem que esse pool venha das ações pré-investimento dos fundadores.',
    impactAccepted: {
      teamExecution: +30,
      investorTrust: +15,
      dilutionNote: '10% alocados para o pool de talentos da startup.',
      text: 'Pool aprovado! A startup agora pode atrair os melhores talentos de tecnologia e vendas do país.'
    },
    impactRejected: {
      teamExecution: -20,
      investorTrust: -10,
      text: 'Sem stock options, os talentos seniores recusam as ofertas de trabalho.'
    }
  }
];

class TermSheetEngine {
  static getClausesForRound(roundId) {
    if (roundId === 'seed') {
      return TERM_SHEET_CLAUSES.filter(c => ['tag_along', 'esop_pool'].includes(c.id));
    }
    if (roundId === 'seriesA') {
      return TERM_SHEET_CLAUSES.filter(c => ['tag_along', 'drag_along', 'board_seat', 'liquidation_preference'].includes(c.id));
    }
    if (roundId === 'seriesB' || roundId === 'pe') {
      return TERM_SHEET_CLAUSES;
    }
    return TERM_SHEET_CLAUSES;
  }

  static evaluateAgreements(selectedClausesState) {
    let trustScore = 70;
    let founderProtection = 70;
    let governanceScore = 50;
    let equityPenalty = 0;

    Object.entries(selectedClausesState).forEach(([clauseId, isAccepted]) => {
      const clause = TERM_SHEET_CLAUSES.find(c => c.id === clauseId);
      if (!clause) return;

      if (isAccepted) {
        if (clause.impactAccepted.investorTrust) trustScore += clause.impactAccepted.investorTrust;
        if (clause.impactAccepted.founderProtection) founderProtection += clause.impactAccepted.founderProtection;
        if (clause.impactAccepted.governanceScore) governanceScore += clause.impactAccepted.governanceScore;
      } else {
        if (clause.impactRejected.investorTrust) trustScore += clause.impactRejected.investorTrust;
        if (clause.impactRejected.founderProtection) founderProtection += clause.impactRejected.founderProtection;
        if (clause.impactRejected.equityPenalty) equityPenalty += clause.impactRejected.equityPenalty;
      }
    });

    return {
      trustScore: Math.min(100, Math.max(0, trustScore)),
      founderProtection: Math.min(100, Math.max(0, founderProtection)),
      governanceScore: Math.min(100, Math.max(0, governanceScore)),
      equityPenalty
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TERM_SHEET_CLAUSES, TermSheetEngine };
}
