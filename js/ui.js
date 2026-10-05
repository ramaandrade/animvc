/**
 * UI.js - Renderização do DOM, interatividade de Cap Table, Modais e Animações
 * AnimVC: A Jornada do Fundador
 */

class UIManager {
  constructor() {
    this.mainView = document.getElementById('main-view');
    this.metricsBar = document.getElementById('metrics-bar');
    this.activeTab = 'pitch'; // 'pitch', 'captable', 'termsheet', 'jcurve'
    this.selectedScrubYear = 7;
  }

  init() {
    this.setupNavigation();
    this.setupMuteToggle();
    this.renderOnboarding();
  }

  setupMuteToggle() {
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const isMuted = sounds.toggleMute();
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
        sounds.playPop();
      });
      muteBtn.textContent = sounds.isMuted ? '🔇' : '🔊';
    }
  }

  setupNavigation() {
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-tab');
        if (state.isGameOver && target !== 'report' && target !== 'jcurve') {
          return;
        }
        sounds.playPop();
        this.switchTab(target);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });

    if (tabId === 'pitch') {
      this.renderPitchScreen();
    } else if (tabId === 'captable') {
      this.renderCapTableScreen();
    } else if (tabId === 'termsheet') {
      this.renderTermSheetScreen();
    } else if (tabId === 'jcurve') {
      this.renderJCurveScreen();
    }
  }

  updateMetricsBar() {
    const round = state.getCurrentRound();
    const stageEl = document.getElementById('metric-stage');
    const runwayEl = document.getElementById('metric-runway');
    const valuationEl = document.getElementById('metric-valuation');

    if (stageEl) stageEl.textContent = round ? round.name : 'Exit';
    if (runwayEl) runwayEl.textContent = `${state.runwayMonths} meses`;
    if (valuationEl) valuationEl.textContent = JCurveEngine.formatCurrencyCompact(state.currentValuation).replace('+', '');
  }

  /* ==========================================================================
     1. ONBOARDING & CRIAÇÃO DA STARTUP
     ========================================================================== */
  renderOnboarding() {
    document.getElementById('bottom-nav').style.display = 'none';
    document.getElementById('metrics-bar').style.display = 'none';

    this.mainView.innerHTML = `
      <div class="card fade-in-slide pop-in" style="text-align: center; padding: 24px 16px;">
        <div style="font-size: 3rem; margin-bottom: 8px;">🚀</div>
        <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 6px;">AnimVC: A Jornada do Fundador</h2>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">
          Domine a mecânica de Venture Capital, negocie seu Cap Table sem perder o controle e leve sua startup da ideação até o Exit!
        </p>

        <form id="onboarding-form" style="display: flex; flex-direction: column; gap: 14px; text-align: left;">
          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Seu Nome (Fundador / CEO)</label>
            <input type="text" id="input-founder" value="Marina Santos" required style="width: 100%; padding: 10px 12px; border-radius: var(--radius-sm); background: rgba(15,23,42,0.8); border: 1px solid var(--border-color); color: #fff; font-size: 0.9rem; margin-top: 4px;">
          </div>

          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Nome da Startup</label>
            <input type="text" id="input-startup" value="TerraVerde AgTech" required style="width: 100%; padding: 10px 12px; border-radius: var(--radius-sm); background: rgba(15,23,42,0.8); border: 1px solid var(--border-color); color: #fff; font-size: 0.9rem; margin-top: 4px;">
          </div>

          <div>
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; display: block;">Setor de Atuação</label>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              ${SECTORS.map((s, idx) => `
                <div class="sector-opt ${idx === 2 ? 'selected' : ''}" data-sector="${s.id}" style="padding: 10px; border-radius: var(--radius-sm); border: 1px solid ${idx === 2 ? 'var(--accent-emerald)' : 'var(--border-color)'}; background: rgba(15,23,42,0.6); cursor: pointer; text-align: center; transition: all 0.2s;">
                  <div style="font-size: 1.5rem;">${s.icon}</div>
                  <div style="font-size: 0.8rem; font-weight: 700; margin-top: 4px;">${s.name}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.3); border-radius: var(--radius-sm); padding: 10px 12px; font-size: 0.75rem; color: #cbd5e1; margin-top: 6px;">
            🎯 <strong>Regra de Ouro:</strong> Chegue à rodada de Série A com pelo menos <strong>50%</strong> das ações para manter o controle e o incentivo da equipe!
          </div>

          <button type="submit" class="btn btn-success" style="margin-top: 10px;">
            Começar Jornada de Captação ➔
          </button>
        </form>
      </div>
    `;

    // Seleção de setor
    const sectorOpts = document.querySelectorAll('.sector-opt');
    sectorOpts.forEach(opt => {
      opt.addEventListener('click', () => {
        sectorOpts.forEach(o => {
          o.classList.remove('selected');
          o.style.borderColor = 'var(--border-color)';
        });
        opt.classList.add('selected');
        opt.style.borderColor = 'var(--accent-emerald)';
        sounds.playPop();
      });
    });

    // Submissão do formulário
    document.getElementById('onboarding-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const founder = document.getElementById('input-founder').value.trim();
      const startup = document.getElementById('input-startup').value.trim();
      const selectedSectorEl = document.querySelector('.sector-opt.selected');
      const sectorId = selectedSectorEl ? selectedSectorEl.getAttribute('data-sector') : 'agritech';

      sounds.playSuccess();
      state.initStartup(founder, startup, sectorId);

      document.getElementById('bottom-nav').style.display = 'flex';
      document.getElementById('metrics-bar').style.display = 'grid';
      this.updateMetricsBar();
      this.switchTab('pitch');
    });
  }

  /* ==========================================================================
     2. TELA DE PITCH & NEGOCIAÇÃO COM INVESTIDOR
     ========================================================================== */
  renderPitchScreen() {
    this.updateMetricsBar();
    const round = state.getCurrentRound();
    const char = state.getCurrentCharacter();
    if (!round || !char) {
      this.renderExitScreen();
      return;
    }

    const moodSvg = char.svg(state.investorMood);

    this.mainView.innerHTML = `
      <!-- Palco do Investidor -->
      <div class="investor-stage fade-in-slide">
        <div class="avatar-wrapper ${char.id}">
          ${moodSvg}
          <div class="investor-badge-pill" style="border-color: ${char.themeColor}; color: ${char.themeColor};">
            ${char.badge}
          </div>
        </div>

        <div class="speech-bubble pop-in">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="font-size: 0.85rem; color: ${char.themeColor};">${char.name}</strong>
            <span class="badge badge-info">${char.stage}</span>
          </div>
          <p id="investor-speech">${char.dialogues.intro}</p>
          <div class="criteria-meter">
            <span>Foco de Avaliação:</span>
            <strong>${char.tagline}</strong>
          </div>
        </div>
      </div>

      <!-- Elevator Pitch Card -->
      <div class="pitch-card fade-in-slide">
        <div class="pitch-meta">
          <span style="font-size: 0.75rem; font-weight: 700; color: #fff;">${round.elevatorPitch.title}</span>
          <span class="badge badge-warning">⏱️ ${round.elevatorPitch.readTime}</span>
        </div>
        <p class="pitch-text">${round.elevatorPitch.content}</p>

        <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px;">
          Como você conduzirá a ênfase da sua apresentação?
        </div>

        <div class="pitch-choices">
          ${round.elevatorPitch.options.map((opt, idx) => `
            <button class="pitch-choice-btn" data-opt-idx="${idx}">
              <strong>${opt.label}</strong>
              <span class="pitch-choice-hint">${opt.hint}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Card Rápido de Acesso ao Cap Table -->
      <div class="card fade-in-slide" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px;">
        <div>
          <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Oferta de Aporte</div>
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--accent-emerald);">
            ${JCurveEngine.formatCurrencyCompact(state.proposedInvestment).replace('+', '')}
          </div>
        </div>
        <button id="btn-open-captable" class="btn btn-primary" style="width: auto; padding: 8px 16px; font-size: 0.8rem;">
          Negociar Cap Table ➔
        </button>
      </div>

      <div style="font-size: 0.72rem; color: var(--text-dim); text-align: center;">
        ${round.educationalTip}
      </div>
    `;

    // Eventos de escolha do pitch
    const choiceBtns = document.querySelectorAll('.pitch-choice-btn');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        choiceBtns.forEach(b => b.classList.remove('selected'));
        const targetBtn = e.currentTarget;
        targetBtn.classList.add('selected');

        const optIdx = parseInt(targetBtn.getAttribute('data-opt-idx'));
        const selectedOpt = round.elevatorPitch.options[optIdx];

        sounds.playPop();
        state.investorMood = selectedOpt.investorMood;

        // Atualizar fala do investidor e avatar
        const speechEl = document.getElementById('investor-speech');
        if (speechEl) speechEl.textContent = selectedOpt.dialogueResponse;

        const avatarWrap = document.querySelector('.avatar-wrapper');
        if (avatarWrap) {
          avatarWrap.innerHTML = `
            ${char.svg(selectedOpt.investorMood)}
            <div class="investor-badge-pill" style="border-color: ${char.themeColor}; color: ${char.themeColor};">
              ${char.badge}
            </div>
          `;
        }

        if (selectedOpt.investorMood === 'happy' || selectedOpt.investorMood === 'excited' || selectedOpt.investorMood === 'satisfied') {
          sounds.playSuccess();
        } else if (selectedOpt.investorMood === 'furious' || selectedOpt.investorMood === 'skeptical') {
          sounds.playWarning();
        }
      });
    });

    document.getElementById('btn-open-captable').addEventListener('click', () => {
      sounds.playPop();
      this.switchTab('captable');
    });
  }

  /* ==========================================================================
     3. TELA DE CAP TABLE E SLIDER INTERATIVO
     ========================================================================== */
  renderCapTableScreen() {
    this.updateMetricsBar();
    const round = state.getCurrentRound();
    const char = state.getCurrentCharacter();
    if (!round || !char) {
      this.renderExitScreen();
      return;
    }

    const calculated = CapTableEngine.calculateFromEquity(state.negotiatedEquity, state.proposedInvestment);
    const health = CapTableEngine.analyzeCapTableHealth(state.capTable, round.id, state.negotiatedEquity);

    this.mainView.innerHTML = `
      <div class="card fade-in-slide captable-panel">
        <div class="card-title">
          <span>Cap Table da Rodada: ${round.name}</span>
          <span class="badge badge-info">Aporte: ${JCurveEngine.formatCurrencyCompact(state.proposedInvestment).replace('+', '')}</span>
        </div>

        <!-- Donut Chart & Legenda -->
        <div class="donut-chart-container">
          <div class="donut-svg-wrap">
            <svg viewBox="0 0 100 100" class="donut-svg" id="captable-donut-svg">
              ${this.generateDonutSlicesSvg(state.capTable, state.negotiatedEquity, char.themeColor)}
            </svg>
            <div class="donut-center-text">
              <div class="center-num" id="founder-center-pct">${health.projectedFounderEquity.toFixed(0)}%</div>
              <div class="center-lbl">Fundador</div>
            </div>
          </div>

          <div class="stakeholder-legend" id="stakeholder-legend-list">
            ${this.renderStakeholderLegendHtml(state.capTable, state.negotiatedEquity, char)}
          </div>
        </div>

        <!-- Controles Interativos de Drag / Slider -->
        <div class="negotiation-controls">
          <div class="control-header">
            <span style="font-size: 0.8rem; font-weight: 700;">Participação Ofertada:</span>
            <span style="font-size: 1.1rem; font-weight: 800; color: ${char.themeColor};" id="slider-equity-val">
              ${state.negotiatedEquity.toFixed(1)}%
            </span>
          </div>

          <div class="equity-slider-wrap">
            <input type="range" class="range-slider" id="equity-range-slider"
                   min="${round.minEquity}" max="${round.maxEquity}" step="0.5"
                   value="${state.negotiatedEquity}">
            <div style="display: flex; justify-content: space-between; font-size: 0.68rem; color: var(--text-dim);">
              <span>Mínimo: ${round.minEquity}%</span>
              <span>Sugerido: ${round.suggestedEquity}%</span>
              <span>Máximo: ${round.maxEquity}%</span>
            </div>
          </div>

          <!-- Métricas de Valuation Dinâmicas -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; font-size: 0.78rem;">
            <div style="background: rgba(15,23,42,0.8); padding: 6px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <span style="color: var(--text-muted); font-size: 0.68rem; display: block;">Pre-Money Valuation</span>
              <strong id="val-pre-money">${JCurveEngine.formatCurrencyCompact(calculated.preMoney).replace('+', '')}</strong>
            </div>
            <div style="background: rgba(15,23,42,0.8); padding: 6px 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <span style="color: var(--text-muted); font-size: 0.68rem; display: block;">Post-Money Valuation</span>
              <strong id="val-post-money" style="color: #facc15;">${JCurveEngine.formatCurrencyCompact(calculated.postMoney).replace('+', '')}</strong>
            </div>
          </div>
        </div>

        <!-- Alertas de Saúde do Cap Table -->
        <div id="cap-alert-container">
          ${this.renderAlertsHtml(health.alerts)}
        </div>

        <!-- Botões de Ação -->
        <div style="display: flex; gap: 8px; margin-top: 6px;">
          <button id="btn-check-termsheet" class="btn btn-secondary" style="flex: 1; font-size: 0.82rem;">
            Revisar Term Sheet 📄
          </button>
          <button id="btn-confirm-investment" class="btn btn-success" style="flex: 1; font-size: 0.82rem;">
            Assinar Rodada ✍️
          </button>
        </div>
      </div>
    `;

    // Handler do Slider
    const slider = document.getElementById('equity-range-slider');
    slider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      state.negotiatedEquity = val;
      this.updateCapTableCalculations(round, char);
    });

    document.getElementById('btn-check-termsheet').addEventListener('click', () => {
      sounds.playPop();
      this.switchTab('termsheet');
    });

    document.getElementById('btn-confirm-investment').addEventListener('click', () => {
      sounds.playCash();
      this.onConfirmRoundInvestment();
    });
  }

  updateCapTableCalculations(round, char) {
    const calculated = CapTableEngine.calculateFromEquity(state.negotiatedEquity, state.proposedInvestment);
    const health = CapTableEngine.analyzeCapTableHealth(state.capTable, round.id, state.negotiatedEquity);

    const equityValEl = document.getElementById('slider-equity-val');
    if (equityValEl) equityValEl.textContent = `${state.negotiatedEquity.toFixed(1)}%`;

    const founderPctEl = document.getElementById('founder-center-pct');
    if (founderPctEl) founderPctEl.textContent = `${health.projectedFounderEquity.toFixed(0)}%`;

    const preEl = document.getElementById('val-pre-money');
    if (preEl) preEl.textContent = JCurveEngine.formatCurrencyCompact(calculated.preMoney).replace('+', '');

    const postEl = document.getElementById('val-post-money');
    if (postEl) postEl.textContent = JCurveEngine.formatCurrencyCompact(calculated.postMoney).replace('+', '');

    const alertContainer = document.getElementById('cap-alert-container');
    if (alertContainer) alertContainer.innerHTML = this.renderAlertsHtml(health.alerts);

    // Atualizar Donut e Legenda
    const donutSvg = document.getElementById('captable-donut-svg');
    if (donutSvg) donutSvg.innerHTML = this.generateDonutSlicesSvg(state.capTable, state.negotiatedEquity, char.themeColor);

    const legendList = document.getElementById('stakeholder-legend-list');
    if (legendList) legendList.innerHTML = this.renderStakeholderLegendHtml(state.capTable, state.negotiatedEquity, char);

    // Reação do investidor ao equity
    if (state.negotiatedEquity > round.suggestedEquity + 4) {
      state.investorMood = 'happy';
    } else if (state.negotiatedEquity < round.suggestedEquity - 4) {
      state.investorMood = 'skeptical';
    } else {
      state.investorMood = 'neutral';
    }
  }

  generateDonutSlicesSvg(capTable, proposedEquity, newInvestorColor) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius; // ~251.32
    let accumulatedOffset = 0;

    const dilutionFactor = (100 - proposedEquity) / 100;
    const slices = [];

    // Sócios atuais diluídos
    capTable.stakeholders.forEach(s => {
      const share = s.sharesPercent * dilutionFactor;
      const strokeLength = (share / 100) * circumference;
      slices.push({
        color: s.color,
        strokeLength,
        dashoffset: -accumulatedOffset
      });
      accumulatedOffset += strokeLength;
    });

    // Novo investidor
    const newLength = (proposedEquity / 100) * circumference;
    slices.push({
      color: newInvestorColor,
      strokeLength: newLength,
      dashoffset: -accumulatedOffset
    });

    return slices.map(sl => `
      <circle cx="50" cy="50" r="${radius}"
              fill="transparent"
              stroke="${sl.color}"
              stroke-width="14"
              stroke-dasharray="${sl.strokeLength.toFixed(1)} ${circumference.toFixed(1)}"
              stroke-dashoffset="${sl.dashoffset.toFixed(1)}"
              class="donut-slice" />
    `).join('');
  }

  renderStakeholderLegendHtml(capTable, proposedEquity, newInvestor) {
    const dilutionFactor = (100 - proposedEquity) / 100;
    let html = '';

    capTable.stakeholders.forEach(s => {
      const projected = (s.sharesPercent * dilutionFactor).toFixed(1);
      html += `
        <div class="stakeholder-row">
          <div class="stakeholder-tag">
            <span class="color-dot" style="background: ${s.color};"></span>
            <span>${s.name}</span>
          </div>
          <span class="stakeholder-pct">${projected}%</span>
        </div>
      `;
    });

    html += `
      <div class="stakeholder-row" style="color: ${newInvestor.themeColor}; font-weight: 700;">
        <div class="stakeholder-tag">
          <span class="color-dot" style="background: ${newInvestor.themeColor};"></span>
          <span>${newInvestor.name} (Novo)</span>
        </div>
        <span class="stakeholder-pct">${proposedEquity.toFixed(1)}%</span>
      </div>
    `;

    return html;
  }

  renderAlertsHtml(alerts) {
    if (!alerts || alerts.length === 0) return '';
    return alerts.map(a => `
      <div class="cap-alert ${a.level} shake">
        <div>${a.title}: ${a.message}</div>
      </div>
    `).join('');
  }

  /* ==========================================================================
     4. TELA DE CLÁUSULAS (TERM SHEET)
     ========================================================================== */
  renderTermSheetScreen() {
    this.updateMetricsBar();
    const round = state.getCurrentRound();
    const clauses = TermSheetEngine.getClausesForRound(round.id);

    this.mainView.innerHTML = `
      <div class="card fade-in-slide">
        <div class="card-title">
          <span>Term Sheet da Rodada: ${round.name}</span>
          <span class="badge badge-info">Governança: ${state.governanceScore}%</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
          Negocie cláusulas contratuais vitais. Elas definem quem manda na empresa e quem tem prioridade na hora do Exit!
        </p>

        <div class="clauses-list">
          ${clauses.map(c => {
            const isChecked = state.clauseState[c.id] !== false;
            return `
              <div class="clause-card ${isChecked ? 'active' : ''}" id="clause-card-${c.id}">
                <div class="clause-header">
                  <div>
                    <div class="clause-title">${c.name}</div>
                    <span class="badge ${c.isFounderFriendly ? 'badge-success' : 'badge-warning'}">
                      ${c.badge}
                    </span>
                  </div>
                  <label class="clause-toggle">
                    <input type="checkbox" class="clause-checkbox" data-clause="${c.id}" ${isChecked ? 'checked' : ''}>
                    <span class="slider-toggle"></span>
                  </label>
                </div>
                <div class="clause-body">
                  <p><strong>Resumo:</strong> ${c.summary}</p>
                  <p style="margin-top: 4px; color: #cbd5e1;">💡 ${c.explanation}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button id="btn-save-termsheet" class="btn btn-primary" style="margin-top: 14px;">
          Salvar Condições do Term Sheet ➔
        </button>
      </div>
    `;

    document.querySelectorAll('.clause-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-clause');
        state.clauseState[id] = e.target.checked;
        const card = document.getElementById(`clause-card-${id}`);
        if (card) card.classList.toggle('active', e.target.checked);
        sounds.playPop();

        const evalResult = TermSheetEngine.evaluateAgreements(state.clauseState);
        state.governanceScore = evalResult.governanceScore;
        state.investorTrustScore = evalResult.trustScore;
      });
    });

    document.getElementById('btn-save-termsheet').addEventListener('click', () => {
      sounds.playSuccess();
      this.switchTab('captable');
    });
  }

  /* ==========================================================================
     5. TELA E DASHBOARD DA CURVA J (J-CURVE)
     ========================================================================== */
  renderJCurveScreen() {
    this.updateMetricsBar();
    const points = JCurveEngine.generateJCurveData(state);
    const activePoint = points[this.selectedScrubYear] || points[points.length - 1];

    this.mainView.innerHTML = `
      <div class="card fade-in-slide jcurve-card">
        <div class="card-title">
          <span>Dashboard da Curva J (J-Curve)</span>
          <span class="badge badge-success">Mecânica de Fundos VC</span>
        </div>

        <div style="font-size: 0.78rem; color: var(--text-muted);">
          A Curva J ilustra o fluxo de caixa acumulado do investidor de risco: negativo nos primeiros anos de aportes e custos, explodindo no positivo após o Exit!
        </div>

        <!-- Canvas da Curva J -->
        <div class="jcurve-canvas-wrap">
          <canvas id="jcurve-canvas" class="jcurve-canvas"></canvas>
        </div>

        <!-- Scrubber da Linha do Tempo (Ano 0 a Ano 7) -->
        <div class="jcurve-scrubber">
          ${points.map((p, idx) => `
            <button class="scrub-btn ${idx === this.selectedScrubYear ? 'active' : ''}" data-year="${idx}">
              ${p.label}
            </button>
          `).join('')}
        </div>

        <!-- Caixa de Explicação do Ponto Selecionado -->
        <div class="jcurve-callout pop-in" id="jcurve-narrative-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="color: #38bdf8;">${activePoint.stage}</strong>
            <span style="font-weight: 700; color: ${activePoint.cumulativeCash >= 0 ? 'var(--accent-emerald)' : '#f87171'};">
              ${JCurveEngine.formatCurrencyCompact(activePoint.cumulativeCash)}
            </span>
          </div>
          <p>${activePoint.narrative}</p>
        </div>

        <div style="background: rgba(15,23,42,0.6); padding: 10px 12px; border-radius: var(--radius-sm); font-size: 0.72rem; color: var(--text-dim); line-height: 1.4;">
          📌 <strong>Por que a Curva J importa?</strong> Nos primeiros 3 anos, o fundo parece dar prejuízo devido a taxas e queima de caixa das startups. A paciência dos investidores institucionais (LPs) é recompensada quando os vencedores realizam a saída (Exit) nos anos 5 a 7.
        </div>
      </div>
    `;

    // Renderizar o Canvas após a inserção no DOM
    setTimeout(() => {
      JCurveEngine.renderJCurveCanvas('jcurve-canvas', points, this.selectedScrubYear);
    }, 50);

    // Eventos do Scrubber
    document.querySelectorAll('.scrub-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playPop();
        const yearIdx = parseInt(e.currentTarget.getAttribute('data-year'));
        this.selectedScrubYear = yearIdx;
        this.renderJCurveScreen();
      });
    });
  }

  /* ==========================================================================
     6. CONCLUSÃO DA RODADA & DISPARO DE EVENTO MACROECONÔMICO
     ========================================================================== */
  onConfirmRoundInvestment() {
    const round = state.getCurrentRound();
    state.recordInvestment(round.name, state.negotiatedEquity, state.proposedInvestment);

    // Exibir Carta Macroeconômica antes da próxima rodada!
    this.showMacroCardModal(() => {
      // Avançar para próxima rodada ou para o Exit
      const nextIndex = state.currentRoundIndex + 1;
      if (nextIndex < GAME_ROUNDS.length) {
        state.setupRound(nextIndex);
        this.switchTab('pitch');
      } else {
        this.renderExitScreen();
      }
    });
  }

  showMacroCardModal(onDoneCallback) {
    const round = state.getCurrentRound();
    // Escolher carta baseada na rodada ou sorteada
    let card = MACRO_CARDS.find(c => c.roundTrigger === round.id);
    if (!card) {
      card = MACRO_CARDS[Math.floor(Math.random() * MACRO_CARDS.length)];
    }

    const overlay = document.createElement('div');
    overlay.className = 'macro-overlay pop-in';
    overlay.innerHTML = `
      <div class="macro-card">
        <div class="macro-header">
          <div class="macro-icon">${card.icon}</div>
          <div>
            <span class="badge ${card.badgeClass}">${card.tag}</span>
            <h3 style="font-size: 1.15rem; font-weight: 800; color: #fff; margin-top: 2px;">${card.title}</h3>
          </div>
        </div>

        <p style="font-size: 0.82rem; color: #cbd5e1; line-height: 1.4;">
          ${card.description}
        </p>

        <div style="background: rgba(15,23,42,0.8); padding: 8px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-size: 0.74rem; color: var(--text-muted);">
          🌐 <em>Contexto Real:</em> ${card.context}
        </div>

        <div style="font-size: 0.78rem; font-weight: 700; color: #fff; margin-top: 4px;">
          Qual é a sua decisão de gestão para reagir a este cenário?
        </div>

        <div class="macro-tactical-btns">
          ${card.tacticalChoices.map((choice, idx) => `
            <button class="btn btn-secondary macro-choice-btn" data-choice-idx="${idx}" style="text-align: left; padding: 10px; font-size: 0.8rem; display: flex; flex-direction: column; align-items: flex-start;">
              <strong style="color: #fff;">${choice.title}</strong>
              <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 2px;">${choice.description}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    sounds.playWarning();

    overlay.querySelectorAll('.macro-choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        sounds.playPop();
        const choiceIdx = parseInt(e.currentTarget.getAttribute('data-choice-idx'));
        const choice = card.tacticalChoices[choiceIdx];

        state.applyTacticalMacroChoice(choice, card);
        document.body.removeChild(overlay);

        if (onDoneCallback) onDoneCallback();
      });
    });
  }

  /* ==========================================================================
     7. TELA DE EXIT (DESINVESTIMENTO)
     ========================================================================== */
  renderExitScreen() {
    this.updateMetricsBar();
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === 'pitch');
    });

    this.mainView.innerHTML = `
      <div class="card fade-in-slide">
        <div class="card-title">
          <span>O Grande Exit (Desinvestimento)</span>
          <span class="badge badge-success">Hora da Colheita</span>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px;">
          Sua startup atingiu maturidade, liderança e escala. Agora é o momento em que os investidores realizam o retorno da Curva J e o fundador realiza fortuna pessoal. Escolha a sua rota de saída:
        </p>

        <div class="exit-grid">
          ${EXIT_OPTIONS.map(opt => `
            <div class="exit-card" data-exit-id="${opt.id}">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.5rem;">${opt.icon}</span>
                  <strong style="font-size: 0.95rem; color: #fff;">${opt.title}</strong>
                </div>
                <span class="badge badge-info">${opt.tag}</span>
              </div>
              <p style="font-size: 0.78rem; color: #cbd5e1; margin-bottom: 8px;">
                ${opt.description}
              </p>
              <div style="font-size: 0.7rem; color: var(--text-dim);">
                🔍 <strong>Ideal:</strong> ${opt.idealWhen}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    document.querySelectorAll('.exit-card').forEach(card => {
      card.addEventListener('click', (e) => {
        sounds.playCash();
        const exitId = e.currentTarget.getAttribute('data-exit-id');
        state.executeExit(exitId);
        this.renderFinalReport();
      });
    });
  }

  /* ==========================================================================
     8. RELATÓRIO FINAL E SCORECARD DO FUNDADOR
     ========================================================================== */
  renderFinalReport() {
    const summary = state.exitSummary;
    const founderResult = summary.stakeholderResults.find(s => s.id === 'founder');

    this.mainView.innerHTML = `
      <div class="card fade-in-slide pop-in scorecard-hero">
        <div style="font-size: 3rem; margin-bottom: 4px;">🏆</div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: #fff;">Parabéns, ${state.founderName}!</h2>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
          Startup: <strong>${state.startupName}</strong> | Saída via <strong>${summary.exitOption.title}</strong>
        </div>

        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); letter-spacing: 0.5px;">
          Dinheiro no Bolso do Fundador (Cash-Out)
        </div>
        <div class="cashout-number">
          ${JCurveEngine.formatCurrencyCompact(summary.founderCashOut).replace('+', '')}
        </div>
        <div style="font-size: 0.8rem; color: var(--accent-emerald); font-weight: 700; margin-top: 4px;">
          Você reteve ${summary.founderSharesPercent.toFixed(1)}% das ações no momento do Exit!
        </div>
      </div>

      <!-- Resumo Financeiro da Empresa e Investidores -->
      <div class="card fade-in-slide">
        <div class="card-title">Métricas Finais do Desinvestimento</div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem;">
          <div style="background: rgba(15,23,42,0.6); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <span style="font-size: 0.68rem; color: var(--text-muted); display: block;">Valuation Final</span>
            <strong style="color: #facc15;">${JCurveEngine.formatCurrencyCompact(summary.finalValuation).replace('+', '')}</strong>
          </div>
          <div style="background: rgba(15,23,42,0.6); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <span style="font-size: 0.68rem; color: var(--text-muted); display: block;">Capital Total Captado</span>
            <strong>${JCurveEngine.formatCurrencyCompact(summary.totalInvested).replace('+', '')}</strong>
          </div>
          <div style="background: rgba(15,23,42,0.6); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <span style="font-size: 0.68rem; color: var(--text-muted); display: block;">Retorno Geral (MOIC)</span>
            <strong style="color: var(--accent-emerald);">${summary.overallMoic.toFixed(1)}x</strong>
          </div>
          <div style="background: rgba(15,23,42,0.6); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <span style="font-size: 0.68rem; color: var(--text-muted); display: block;">Índice de Governança</span>
            <strong>${summary.governanceScore}%</strong>
          </div>
        </div>

        <div style="margin-top: 14px;">
          <div style="font-size: 0.78rem; font-weight: 700; color: #fff; margin-bottom: 6px;">
            Distribuição dos Acionistas no Exit:
          </div>
          ${summary.stakeholderResults.map(s => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.06); font-size: 0.75rem;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="color-dot" style="background: ${s.color};"></span>
                <span>${s.name} (${s.sharesPercent.toFixed(1)}%)</span>
              </div>
              <div style="text-align: right;">
                <strong>${JCurveEngine.formatCurrencyCompact(s.exitProceeds).replace('+', '')}</strong>
                ${s.moic ? `<span style="font-size: 0.65rem; color: var(--accent-emerald); display: block;">${s.moic}x MOIC</span>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Análise Pedagógica -->
      <div class="card fade-in-slide" style="border-left: 3px solid var(--accent-indigo);">
        <div class="card-title">💡 Como o Smart Money Destravou Valor</div>
        <p style="font-size: 0.8rem; color: #cbd5e1; line-height: 1.45;">
          A entrada de <strong>Anjo Serafim</strong> validou sua proposta com o time; a energia de <strong>Vera Capital</strong> garantiu Capital Produtivo e crescimento com retenção; e o rigor do <strong>Sr. Equity</strong> implementou a governança necessária para o maior múltiplo de Exit da história do setor!
        </p>
      </div>

      <div style="display: flex; gap: 8px;">
        <button id="btn-view-final-jcurve" class="btn btn-secondary" style="flex: 1; font-size: 0.85rem;">
          Ver Curva J Completa 📈
        </button>
        <button id="btn-play-again" class="btn btn-primary" style="flex: 1; font-size: 0.85rem;">
          Jogar Novamente 🔄
        </button>
      </div>
    `;

    document.getElementById('btn-view-final-jcurve').addEventListener('click', () => {
      sounds.playPop();
      this.switchTab('jcurve');
    });

    document.getElementById('btn-play-again').addEventListener('click', () => {
      sounds.playSuccess();
      state.reset();
      this.renderOnboarding();
    });
  }
}

const ui = new UIManager();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { UIManager, ui };
}
