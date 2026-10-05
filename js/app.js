/**
 * App.js - Ponto de Entrada da Aplicação AnimVC
 * Coordena inicialização, registro PWA e ciclo de vida
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 AnimVC: A Jornada do Fundador inicializando...');

  // Inicializar interface do usuário
  if (typeof ui !== 'undefined') {
    ui.init();
  }

  // Registrar Service Worker para Progressive Web App (PWA)
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('✅ ServiceWorker registrado com sucesso:', reg.scope);
        })
        .catch(err => {
          console.warn('⚠️ Falha ao registrar ServiceWorker:', err);
        });
    });
  }

  // Redesenho responsivo do Canvas da Curva J no resize
  window.addEventListener('resize', () => {
    if (ui.activeTab === 'jcurve') {
      const points = JCurveEngine.generateJCurveData(state);
      JCurveEngine.renderJCurveCanvas('jcurve-canvas', points, ui.selectedScrubYear);
    }
  });

  // Log de boas-vindas didático no console
  console.log(`
  ===========================================
    AnimVC: A Jornada do Fundador (MVP)
    - Investidores: Serafim, Vera, Sr. Equity
    - Diluição, Cap Table, Curva J e Exits
  ===========================================
  `);
});
