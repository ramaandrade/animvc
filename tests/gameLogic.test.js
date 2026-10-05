/**
 * Testes Unitários de Lógica de Jogo, Cláusulas e Curva J
 */

const CapTableEngine = require('../js/capTableEngine.js');
const { CHARACTERS } = require('../js/characters.js');
const { MACRO_CARDS } = require('../js/macroCards.js');
const { TERM_SHEET_CLAUSES, TermSheetEngine } = require('../js/termSheet.js');
const JCurveEngine = require('../js/jCurveEngine.js');
const { SECTORS, GAME_ROUNDS, EXIT_OPTIONS } = require('../js/roundsData.js');
const { GameState } = require('../js/gameState.js');

function runGameLogicTests() {
  console.log('🧪 Iniciando testes de Lógica de Jogo...');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // Teste 1: Personagens configurados com critérios
  assert(CHARACTERS.serafim.criteria.teamWeight === 0.53, 'Serafim deve ter 53% de foco no time');
  assert(CHARACTERS.vera.criteria.productiveCapitalImpact > 0.30, 'Vera deve focar em Capital Produtivo');
  assert(CHARACTERS.equity.criteria.ebitdaAndGovernance > 0.40, 'Sr. Equity deve focar em EBITDA e Governança');

  // Teste 2: Cartas macroeconômicas
  assert(MACRO_CARDS.length >= 4, 'Deve haver ao menos 4 cartas macroeconômicas');
  const interestCard = MACRO_CARDS.find(c => c.id === 'macro_interest_2025');
  assert(interestCard !== undefined, 'Carta de Juros Elevados em 2025 deve existir');
  assert(interestCard.effects.resilientSectors.includes('agritech'), 'Agritech deve ser resiliente aos juros');

  // Teste 3: Cláusulas de Term Sheet
  const clausesSeed = TermSheetEngine.getClausesForRound('seed');
  const clausesSeriesA = TermSheetEngine.getClausesForRound('seriesA');
  assert(clausesSeed.some(c => c.id === 'tag_along'), 'Seed deve incluir Tag Along');
  assert(clausesSeriesA.some(c => c.id === 'drag_along'), 'Série A deve incluir Drag Along');

  const evalResult = TermSheetEngine.evaluateAgreements({
    tag_along: true,
    drag_along: true,
    board_seat: true
  });
  assert(evalResult.trustScore > 80, 'Aceitar termos deve aumentar confiança do investidor');

  // Teste 4: Geração da Curva J
  const mockState = { totalInvested: 60000000, currentValuation: 360000000, finalMoic: 6.0 };
  const jCurvePoints = JCurveEngine.generateJCurveData(mockState);
  assert(jCurvePoints.length === 8, 'Deve gerar 8 pontos na linha do tempo (Ano 0 a 7)');
  assert(jCurvePoints[0].cumulativeCash < 0, 'Ano 0 deve ser negativo (desembolso)');
  assert(jCurvePoints[3].status === 'inflection', 'Ano 3 deve ser o vale de inflexão');
  assert(jCurvePoints[7].cumulativeCash > 0, 'Ano 7 de Exit deve ser positivo (retorno exponencial)');

  // Teste 5: Simulação completa da partida
  const game = new GameState();
  game.initStartup('Carlos Fundador', 'TechVision IA', 'tech');
  assert(game.currentValuation > 0, 'Valuation inicial inicializado');

  // Rodada 1: Seed
  game.recordInvestment('Seed', 15.0, 1000000);
  assert(game.totalInvested === 1000000, 'Total investido após Seed deve ser R$ 1M');

  // Rodada 2: Série A
  game.setupRound(1);
  game.recordInvestment('Série A', 18.0, 12000000);
  assert(game.totalInvested === 13000000, 'Total investido acumulado deve ser R$ 13M');

  // Exit: M&A
  const exitResult = game.executeExit('exit_ma');
  assert(exitResult.finalValuation > 0, 'Valuation final deve ser positivo');
  assert(exitResult.founderCashOut > 0, 'Fundador deve ter cash-out positivo');
  assert(exitResult.overallMoic > 1.0, 'Retorno dos investidores (MOIC) deve ser positivo');

  console.log(`\n🎉 Testes de Lógica concluídos: ${passed} passaram, ${failed} falharam.`);
  if (failed > 0) process.exit(1);
}

runGameLogicTests();
