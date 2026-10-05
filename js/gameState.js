/**
 * GameState.js - Gerenciador central de estado da partida
 * AnimVC: A Jornada do Fundador
 */

let _CapTable = (typeof CapTableEngine !== 'undefined') ? CapTableEngine : null;
let _CHARACTERS = (typeof CHARACTERS !== 'undefined') ? CHARACTERS : null;
let _SECTORS = (typeof SECTORS !== 'undefined') ? SECTORS : null;
let _GAME_ROUNDS = (typeof GAME_ROUNDS !== 'undefined') ? GAME_ROUNDS : null;
let _EXIT_OPTIONS = (typeof EXIT_OPTIONS !== 'undefined') ? EXIT_OPTIONS : null;

if (typeof require !== 'undefined') {
  try { if (!_CapTable) _CapTable = require('./capTableEngine.js'); } catch (e) {}
  try { if (!_CHARACTERS) _CHARACTERS = require('./characters.js').CHARACTERS; } catch (e) {}
  try {
    const rd = require('./roundsData.js');
    if (!_SECTORS) _SECTORS = rd.SECTORS;
    if (!_GAME_ROUNDS) _GAME_ROUNDS = rd.GAME_ROUNDS;
    if (!_EXIT_OPTIONS) _EXIT_OPTIONS = rd.EXIT_OPTIONS;
  } catch (e) {}
}

class GameState {
  constructor() {
    this.reset();
  }

  reset() {
    this.founderName = 'Marina Santos';
    this.startupName = 'AgroTech Soluções';
    this.sectorId = 'agritech';

    this.currentRoundIndex = 0; // 0: Seed, 1: Series A, 2: Series B, 3: PE
    this.isGameOver = false;
    this.exitChosen = null;

    this.cashOnHand = 250000; // R$ 250.000 capital inicial
    this.runwayMonths = 12;
    this.currentValuation = 4000000; // R$ 4.000.000
    this.totalInvested = 0;
    this.governanceScore = 50; // 0 a 100
    this.teamExecutionScore = 75; // 0 a 100
    this.investorTrustScore = 70; // 0 a 100

    this.investorMood = 'neutral';
    this.negotiatedEquity = 15.0; // Equity proposta na rodada atual
    this.proposedInvestment = 1000000;

    // Cláusulas ativas
    this.clauseState = {
      tag_along: true,
      drag_along: false,
      liquidation_preference: '1x_non_participating',
      board_seat: true,
      esop_pool: true
    };

    // Histórico de eventos
    this.macroHistory = [];
    this.decisionsHistory = [];
    this.exitSummary = null;

    // Inicializar Cap Table
    const engine = _CapTable || (typeof CapTableEngine !== 'undefined' ? CapTableEngine : null);
    if (engine) {
      this.capTable = engine.createInitialCapTable(this.founderName, this.currentValuation);
    } else {
      this.capTable = null;
    }
  }

  initStartup(founderName, startupName, sectorId) {
    this.founderName = founderName || 'Fundador(a)';
    this.startupName = startupName || 'NovaStartup';
    this.sectorId = sectorId || 'tech';

    const sector = this.getSectorData();
    this.currentValuation = 4000000 * (sector ? sector.baseMultiplier : 1.0);

    const engine = _CapTable || (typeof CapTableEngine !== 'undefined' ? CapTableEngine : null);
    if (engine) {
      this.capTable = engine.createInitialCapTable(this.founderName, this.currentValuation);
    }
    this.setupRound(0);
  }

  getSectorData() {
    const list = _SECTORS || (typeof SECTORS !== 'undefined' ? SECTORS : []);
    return list.find(s => s.id === this.sectorId) || list[0] || null;
  }

  getCurrentRound() {
    const rounds = _GAME_ROUNDS || (typeof GAME_ROUNDS !== 'undefined' ? GAME_ROUNDS : []);
    return rounds[this.currentRoundIndex] || null;
  }

  getCurrentCharacter() {
    const round = this.getCurrentRound();
    if (!round) return null;
    const chars = _CHARACTERS || (typeof CHARACTERS !== 'undefined' ? CHARACTERS : {});
    return chars[round.characterId] || null;
  }

  setupRound(roundIndex) {
    this.currentRoundIndex = roundIndex;
    const round = this.getCurrentRound();
    if (!round) return;

    this.proposedInvestment = round.defaultInvestment;
    this.negotiatedEquity = round.suggestedEquity;
    this.investorMood = 'neutral';

    // Se houver cálculo com base no valuation atual
    const engine = _CapTable || (typeof CapTableEngine !== 'undefined' ? CapTableEngine : null);
    if (engine) {
      const implied = engine.calculateFromEquity(this.negotiatedEquity, this.proposedInvestment);
      this.currentValuation = implied.postMoney;
    }
  }

  applyTacticalMacroChoice(choice, macroCard) {
    this.macroHistory.push({
      card: macroCard,
      choice: choice,
      timestamp: Date.now()
    });

    if (choice.impact) {
      if (choice.impact.runwayMonths) {
        this.runwayMonths = Math.max(3, this.runwayMonths + choice.impact.runwayMonths);
      }
      if (choice.impact.valuationMod) {
        this.currentValuation = Math.round(this.currentValuation * choice.impact.valuationMod);
      }
      if (choice.impact.investorApproval) {
        this.investorTrustScore = Math.min(100, Math.max(0, this.investorTrustScore + choice.impact.investorApproval));
      }
    }
  }

  recordInvestment(roundName, equityPercent, investmentAmount) {
    const round = this.getCurrentRound();
    const character = this.getCurrentCharacter();
    const engine = _CapTable || (typeof CapTableEngine !== 'undefined' ? CapTableEngine : null);

    const calculation = engine.calculateFromEquity(equityPercent, investmentAmount);

    this.capTable = engine.applyInvestmentRound(this.capTable, {
      roundName: round.name,
      investorId: character.id,
      investorName: character.name,
      role: character.title,
      investmentAmount: investmentAmount,
      equityPercent: equityPercent,
      preMoney: calculation.preMoney,
      postMoney: calculation.postMoney,
      color: character.themeColor
    });

    this.currentValuation = calculation.postMoney;
    this.totalInvested += investmentAmount;
    this.cashOnHand += investmentAmount;
    this.runwayMonths += 18; // Cada rodada adiciona 18 meses de runway

    this.decisionsHistory.push({
      roundName: round.name,
      investor: character.name,
      amount: investmentAmount,
      equity: equityPercent,
      postMoney: calculation.postMoney
    });
  }

  executeExit(exitChoiceId) {
    this.isGameOver = true;
    this.exitChosen = exitChoiceId;

    const exits = _EXIT_OPTIONS || (typeof EXIT_OPTIONS !== 'undefined' ? EXIT_OPTIONS : []);
    const exitOption = exits.find(e => e.id === exitChoiceId) || exits[0];

    // Ajuste de valuation baseado na governança e tipo de exit
    let finalValuation = this.currentValuation * exitOption.valuationMultiplier;
    if (this.governanceScore >= 75) {
      finalValuation *= 1.15; // Bônus de governança
    } else if (this.governanceScore < 50 && exitOption.id === 'exit_ipo') {
      finalValuation *= 0.75; // Penalidade por fraca governança no IPO
    }

    finalValuation = Math.round(finalValuation);

    const engine = _CapTable || (typeof CapTableEngine !== 'undefined' ? CapTableEngine : null);
    const exitCalculations = engine.calculateExitProceeds(this.capTable, finalValuation, {
      active: this.clauseState.liquidation_preference === '2x_participating',
      multiplier: 2.0,
      isParticipating: true
    });

    const founderData = exitCalculations.stakeholderResults.find(s => s.id === 'founder');

    this.exitSummary = {
      exitOption,
      finalValuation,
      totalInvested: this.totalInvested,
      founderCashOut: exitCalculations.founderCashOut,
      founderSharesPercent: founderData ? founderData.sharesPercent : 0,
      stakeholderResults: exitCalculations.stakeholderResults,
      overallMoic: this.totalInvested > 0 ? (finalValuation / this.totalInvested) : 0,
      governanceScore: this.governanceScore,
      decisionsCount: this.decisionsHistory.length
    };

    return this.exitSummary;
  }
}

// Instância singleton para uso em todo o app
const state = new GameState();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameState, state };
}
