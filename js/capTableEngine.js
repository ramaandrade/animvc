/**
 * CapTableEngine - Motor matemático e pedagógico de Cap Table e Diluição
 * AnimVC: A Jornada do Fundador
 */

class CapTableEngine {
  /**
   * Inicializa o Cap Table com o fundador (e opcionalmente um pool de opções ESOP)
   * @param {string} founderName 
   * @param {number} initialValuation (R$)
   */
  static createInitialCapTable(founderName = 'Fundador(a)', initialValuation = 4000000) {
    return {
      currentValuation: initialValuation,
      totalSharesPercent: 100,
      stakeholders: [
        {
          id: 'founder',
          name: founderName,
          role: 'Fundador(a)',
          sharesPercent: 100.0,
          investedAmount: 0,
          color: '#10b981', // Emerald
          avatar: 'founder'
        }
      ],
      roundsHistory: []
    };
  }

  /**
   * Calcula métricas da rodada com base em Pre-Money e Aporte
   */
  static calculateFromPreMoney(preMoney, investmentAmount) {
    const postMoney = preMoney + investmentAmount;
    const equityPercent = postMoney > 0 ? (investmentAmount / postMoney) * 100 : 0;
    return {
      preMoney,
      investmentAmount,
      postMoney,
      equityPercent: parseFloat(equityPercent.toFixed(2))
    };
  }

  /**
   * Calcula métricas da rodada com base no Aporte e na % de Equity negociada
   */
  static calculateFromEquity(equityPercent, investmentAmount) {
    if (equityPercent <= 0 || equityPercent >= 100) {
      throw new Error('A porcentagem de equity deve estar entre 0.1% e 99.9%');
    }
    const postMoney = investmentAmount / (equityPercent / 100);
    const preMoney = postMoney - investmentAmount;
    return {
      preMoney: Math.max(0, parseFloat(preMoney.toFixed(2))),
      investmentAmount,
      postMoney: parseFloat(postMoney.toFixed(2)),
      equityPercent: parseFloat(equityPercent.toFixed(2))
    };
  }

  /**
   * Aplica uma nova rodada de investimento diluindo os acionistas anteriores
   * @param {Object} capTable 
   * @param {Object} roundDetails { roundName, investorId, investorName, investmentAmount, equityPercent, postMoney, preMoney }
   */
  static applyInvestmentRound(capTable, roundDetails) {
    const { roundName, investorId, investorName, investmentAmount, equityPercent, postMoney, preMoney, role, color } = roundDetails;
    const dilutionFactor = (100 - equityPercent) / 100;

    // Diluir os acionistas atuais proporcionalmente
    const updatedStakeholders = capTable.stakeholders.map(stakeholder => {
      const newPercent = parseFloat((stakeholder.sharesPercent * dilutionFactor).toFixed(2));
      return {
        ...stakeholder,
        sharesPercent: newPercent
      };
    });

    // Adicionar o novo investidor
    updatedStakeholders.push({
      id: investorId,
      name: investorName,
      role: role || 'Investidor',
      sharesPercent: parseFloat(equityPercent.toFixed(2)),
      investedAmount: investmentAmount,
      color: color || '#6366f1'
    });

    // Ajuste de arredondamento para garantir 100%
    const sum = updatedStakeholders.reduce((acc, s) => acc + s.sharesPercent, 0);
    const diff = 100 - sum;
    if (Math.abs(diff) > 0.001) {
      updatedStakeholders[0].sharesPercent = parseFloat((updatedStakeholders[0].sharesPercent + diff).toFixed(2));
    }

    const roundRecord = {
      roundName,
      timestamp: Date.now(),
      investorId,
      investorName,
      investmentAmount,
      equityPercent,
      preMoney: preMoney || (postMoney - investmentAmount),
      postMoney,
      stakeholdersSnapshot: JSON.parse(JSON.stringify(updatedStakeholders))
    };

    return {
      currentValuation: postMoney,
      totalSharesPercent: 100,
      stakeholders: updatedStakeholders,
      roundsHistory: [...capTable.roundsHistory, roundRecord]
    };
  }

  /**
   * Analisa a saúde do Cap Table e emite alertas pedagógicos
   * @param {Object} capTable 
   * @param {string} currentRound ('seed', 'seriesA', 'seriesB', 'pe')
   * @param {number} proposedEquityPercent % que está sendo oferecida agora
   */
  static analyzeCapTableHealth(capTable, currentRound, proposedEquityPercent = 0) {
    const founder = capTable.stakeholders.find(s => s.id === 'founder');
    const currentFounderEquity = founder ? founder.sharesPercent : 0;
    const projectedFounderEquity = proposedEquityPercent > 0 
      ? currentFounderEquity * ((100 - proposedEquityPercent) / 100)
      : currentFounderEquity;

    const alerts = [];

    if (currentRound === 'seed') {
      if (proposedEquityPercent > 20) {
        alerts.push({
          level: 'warning',
          title: '⚠️ Diluição Precoce Excessiva',
          message: `Ceder ${proposedEquityPercent.toFixed(1)}% na fase Seed é arriscado. O padrão de mercado é ceder entre 10% e 20%. Ceder mais de 25% compromete seu controle nas rodadas futuras!`
        });
      }
      if (proposedEquityPercent > 30) {
        alerts.push({
          level: 'danger',
          title: '🚨 Risco Crítico de "Dead Equity"',
          message: 'Se você ceder mais de 30% no Seed, fundos de Série A podem recusar sua empresa alegando desincentivo dos fundadores a longo prazo.'
        });
      }
    }

    if (currentRound === 'seriesA' || currentRound === 'seriesB') {
      if (projectedFounderEquity < 50.0) {
        alerts.push({
          level: 'danger',
          title: '🚨 Alerta: Perda da Maioria (>50%)',
          message: `Sua participação cairá para ${projectedFounderEquity.toFixed(1)}%. Na Série A, o ideal é que os fundadores ainda retenham 50% ou mais para manter o controle e alinhamento de longo prazo.`
        });
      } else if (projectedFounderEquity < 60.0) {
        alerts.push({
          level: 'info',
          title: 'ℹ️ Monitoramento de Controle',
          message: `Você ficará com ${projectedFounderEquity.toFixed(1)}%. Mantenha atenção nas próximas rodadas para não diluir além do necessário.`
        });
      }
    }

    if (currentRound === 'pe') {
      if (projectedFounderEquity < 25.0) {
        alerts.push({
          level: 'warning',
          title: '⚠️ Baixa Participação Residual',
          message: `Com ${projectedFounderEquity.toFixed(1)}%, você se torna um minoritário dependente das regras do investidor de PE. Assegure cláusulas de proteção como Tag Along!`
        });
      }
    }

    return {
      currentFounderEquity,
      projectedFounderEquity: parseFloat(projectedFounderEquity.toFixed(2)),
      alerts,
      isFounderMajority: projectedFounderEquity >= 50.0
    };
  }

  /**
   * Calcula o resultado financeiro no momento do Exit (desinvestimento)
   * @param {Object} capTable 
   * @param {number} exitValuation (R$)
   * @param {Object} liquidationPreferenceConfig
   */
  static calculateExitProceeds(capTable, exitValuation, liquidationPreferenceConfig = null) {
    const results = [];
    let remainingValuation = exitValuation;

    // Se houver preferência de liquidação (Liquidation Preference)
    const prefInvestors = [];
    if (liquidationPreferenceConfig && liquidationPreferenceConfig.active) {
      capTable.stakeholders.forEach(s => {
        if (s.id !== 'founder' && s.investedAmount > 0) {
          const prefMultiplier = liquidationPreferenceConfig.multiplier || 1.0;
          const guaranteedAmount = Math.min(s.investedAmount * prefMultiplier, remainingValuation);
          prefInvestors.push({
            id: s.id,
            guaranteedAmount,
            isParticipating: liquidationPreferenceConfig.isParticipating || false
          });
        }
      });
    }

    // Distribuição proporcional padrão
    capTable.stakeholders.forEach(stakeholder => {
      const stakePercent = stakeholder.sharesPercent / 100;
      const proceeds = exitValuation * stakePercent;
      const invested = stakeholder.investedAmount || 0;
      const moic = invested > 0 ? proceeds / invested : null; // Multiple on Invested Capital

      results.push({
        id: stakeholder.id,
        name: stakeholder.name,
        role: stakeholder.role,
        sharesPercent: stakeholder.sharesPercent,
        investedAmount: invested,
        exitProceeds: proceeds,
        moic: moic ? parseFloat(moic.toFixed(2)) : null,
        color: stakeholder.color
      });
    });

    const founderResult = results.find(r => r.id === 'founder');

    return {
      exitValuation,
      founderCashOut: founderResult ? founderResult.exitProceeds : 0,
      stakeholderResults: results,
      totalInvestorsProceeds: results.filter(r => r.id !== 'founder').reduce((acc, r) => acc + r.exitProceeds, 0)
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = CapTableEngine;
}
