/**
 * Testes Unitários do CapTableEngine e Lógica de Diluição
 */

const CapTableEngine = require('../js/capTableEngine.js');

function runTests() {
  console.log('🧪 Iniciando testes de CapTableEngine...');
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

  // Teste 1: Cap Table Inicial
  const initial = CapTableEngine.createInitialCapTable('Fundador Teste', 4000000);
  assert(initial.stakeholders.length === 1, 'Deve ter 1 acionista inicial');
  assert(initial.stakeholders[0].sharesPercent === 100, 'Fundador deve ter 100% inicialmente');
  assert(initial.currentValuation === 4000000, 'Valuation inicial deve ser R$ 4M');

  // Teste 2: Cálculo de Pre/Post Money a partir da Equity
  // Aporte R$ 1M por 20% equity -> Post = 1M / 0.20 = 5M -> Pre = 4M
  const calc1 = CapTableEngine.calculateFromEquity(20.0, 1000000);
  assert(calc1.postMoney === 5000000, 'Post-money deve ser R$ 5.000.000');
  assert(calc1.preMoney === 4000000, 'Pre-money deve ser R$ 4.000.000');
  assert(calc1.equityPercent === 20.0, 'Equity negociada deve ser 20%');

  // Teste 3: Aplicação de Rodada Seed (Anjo Serafim)
  const afterSeed = CapTableEngine.applyInvestmentRound(initial, {
    roundName: 'Seed',
    investorId: 'serafim',
    investorName: 'Anjo Serafim',
    investmentAmount: 1000000,
    equityPercent: 20.0,
    postMoney: 5000000,
    preMoney: 4000000,
    role: 'Investidor Anjo'
  });

  assert(afterSeed.stakeholders.length === 2, 'Deve ter 2 acionistas após o Seed');
  const founderAfterSeed = afterSeed.stakeholders.find(s => s.id === 'founder');
  const serafimAfterSeed = afterSeed.stakeholders.find(s => s.id === 'serafim');
  assert(founderAfterSeed.sharesPercent === 80.0, 'Fundador deve ficar com 80% após ceder 20%');
  assert(serafimAfterSeed.sharesPercent === 20.0, 'Anjo Serafim deve ficar com 20%');
  assert(afterSeed.currentValuation === 5000000, 'Valuation atualizado para Post-money');

  // Teste 4: Aplicação de Rodada Série A (Vera Capital) com diluição proporcional
  // Vera investe R$ 12M por 20%
  // Fundador: 80% * (1 - 0.20) = 64%
  // Serafim: 20% * (1 - 0.20) = 16%
  // Vera: 20%
  // Total: 64 + 16 + 20 = 100%
  const afterSeriesA = CapTableEngine.applyInvestmentRound(afterSeed, {
    roundName: 'Série A',
    investorId: 'vera',
    investorName: 'Vera Capital',
    investmentAmount: 12000000,
    equityPercent: 20.0,
    postMoney: 60000000,
    preMoney: 48000000,
    role: 'Venture Capital'
  });

  const founderAfterA = afterSeriesA.stakeholders.find(s => s.id === 'founder');
  const serafimAfterA = afterSeriesA.stakeholders.find(s => s.id === 'serafim');
  const veraAfterA = afterSeriesA.stakeholders.find(s => s.id === 'vera');

  assert(Math.abs(founderAfterA.sharesPercent - 64.0) < 0.1, `Fundador deve ter 64% (calculado: ${founderAfterA.sharesPercent}%)`);
  assert(Math.abs(serafimAfterA.sharesPercent - 16.0) < 0.1, `Serafim deve ter 16% (calculado: ${serafimAfterA.sharesPercent}%)`);
  assert(veraAfterA.sharesPercent === 20.0, `Vera deve ter 20% (calculado: ${veraAfterA.sharesPercent}%)`);

  const sumPercent = afterSeriesA.stakeholders.reduce((acc, s) => acc + s.sharesPercent, 0);
  assert(Math.abs(sumPercent - 100.0) < 0.01, `Soma dos acionistas deve ser 100% (atual: ${sumPercent}%)`);

  // Teste 5: Alerta de Cap Table (Fundador com menos de 50% na Série A)
  const healthCheckGood = CapTableEngine.analyzeCapTableHealth(afterSeed, 'seriesA', 20.0);
  assert(healthCheckGood.isFounderMajority === true, 'Fundador ainda mantém maioria (>50%)');
  assert(healthCheckGood.alerts.length === 0 || healthCheckGood.alerts[0].level === 'info', 'Não deve haver alerta crítico');

  // Teste 6: Cálculo de Exit e Retorno Financeiro
  // Se a empresa for vendida por R$ 300 Milhões
  const exitData = CapTableEngine.calculateExitProceeds(afterSeriesA, 300000000);
  assert(exitData.exitValuation === 300000000, 'Valuation de exit correto');
  // Fundador com 64% de R$ 300M = R$ 192M
  assert(exitData.founderCashOut === 192000000, `Fundador deve receber R$ 192M (calculado: R$ ${exitData.founderCashOut})`);

  // Serafim investiu R$ 1M e recebe 16% de R$ 300M = R$ 48M (MOIC de 48x!)
  const serafimExit = exitData.stakeholderResults.find(s => s.id === 'serafim');
  assert(serafimExit.exitProceeds === 48000000, `Serafim deve receber R$ 48M (calculado: R$ ${serafimExit.exitProceeds})`);
  assert(serafimExit.moic === 48.0, `MOIC de Serafim deve ser 48x (calculado: ${serafimExit.moic}x)`);

  console.log(`\n🎉 Testes concluídos: ${passed} passaram, ${failed} falharam.`);
  if (failed > 0) process.exit(1);
}

runTests();
