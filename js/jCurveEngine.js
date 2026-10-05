/**
 * JCurveEngine.js - Renderização e Explicação Pedagógica da Curva J (J-Curve)
 * AnimVC: A Jornada do Fundador
 */

class JCurveEngine {
  /**
   * Gera os dados de pontos da Curva J com base no desempenho do jogo
   * @param {Object} gameState
   */
  static generateJCurveData(gameState) {
    const totalInvested = gameState.totalInvested || 63000000;
    const exitValuation = gameState.currentValuation || 300000000;
    const moic = gameState.finalMoic || (exitValuation / totalInvested);

    // Estrutura de anos de um fundo clássico de VC (ciclo de 7 a 8 anos)
    const points = [
      {
        year: 0,
        label: 'Ano 0 (Vintage)',
        stage: 'Captação do Fundo',
        cashFlowDelta: -0.05 * totalInvested, // Taxas de estruturação / gestão inicial
        cumulativeCash: -0.05 * totalInvested,
        narrative: 'Chamada inicial de capital e custos de estruturação jurídica do fundo. Retorno ainda inexistente.',
        status: 'negative'
      },
      {
        year: 1,
        label: 'Ano 1',
        stage: 'Seed (Anjo Serafim)',
        cashFlowDelta: -0.15 * totalInvested,
        cumulativeCash: -0.20 * totalInvested,
        narrative: 'Aportes iniciais na ideação. Empresas ainda em validação; algumas fecham cedo (taxa de mortalidade inicial).',
        status: 'negative'
      },
      {
        year: 2,
        label: 'Ano 2',
        stage: 'Série A (Vera Capital)',
        cashFlowDelta: -0.35 * totalInvested,
        cumulativeCash: -0.55 * totalInvested,
        narrative: 'Fase de desembolso intensivo para expandir vendas e equipe. O fluxo de caixa acumulado atinge o ponto mais baixo.',
        status: 'trough' // Vale da Curva J
      },
      {
        year: 3,
        label: 'Ano 3',
        stage: 'O Vale da Inflexão',
        cashFlowDelta: -0.20 * totalInvested,
        cumulativeCash: -0.75 * totalInvested,
        narrative: 'O "Fundo do Poço" da Curva J! Empresas vencedoras atingem Product-Market Fit e começam a gerar margens positivas.',
        status: 'inflection'
      },
      {
        year: 4,
        label: 'Ano 4',
        stage: 'Série B (Escala)',
        cashFlowDelta: +0.10 * totalInvested,
        cumulativeCash: -0.65 * totalInvested,
        narrative: 'Início da inflexão positiva. Primeiras saídas secundárias ou receitas operacionais cobrem a queima de caixa.',
        status: 'rising'
      },
      {
        year: 5,
        label: 'Ano 5',
        stage: 'Private Equity (Sr. Equity)',
        cashFlowDelta: +0.40 * totalInvested,
        cumulativeCash: -0.25 * totalInvested,
        narrative: 'Consolidação, ganhos de eficiência (EBITDA) e crescimento sustentável. A curva cruza a linha de equilíbrio (Break-even).',
        status: 'breakeven'
      },
      {
        year: 6,
        label: 'Ano 6',
        stage: 'Pré-Exit & Consolidação',
        cashFlowDelta: +0.80 * totalInvested,
        cumulativeCash: +0.55 * totalInvested,
        narrative: 'Preparação para liquidez total. A empresa lidera o setor e atrai cobiça de adquirentes multinacionais.',
        status: 'positive'
      },
      {
        year: 7,
        label: 'Ano 7',
        stage: 'Exit (IPO / M&A)',
        cashFlowDelta: +(totalInvested * moic) - totalInvested,
        cumulativeCash: +(totalInvested * (moic - 1)),
        narrative: `Desinvestimento triunfal! O fundo distribui retornos astronômicos aos seus cotistas (LPs). Retorno estimado: ${moic.toFixed(1)}x MOIC.`,
        status: 'exponential'
      }
    ];

    return points;
  }

  /**
   * Renderiza a Curva J diretamente num elemento HTML5 Canvas com alta fidelidade visual e responsividade
   */
  static renderJCurveCanvas(canvasId, points, activeIndex = points.length - 1) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Ajuste para nitidez em telas Retina / High-DPI
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Margens
    const padLeft = 60;
    const padRight = 30;
    const padTop = 30;
    const padBottom = 40;

    const plotWidth = width - padLeft - padRight;
    const plotHeight = height - padTop - padBottom;

    // Escala dos eixos
    const values = points.map(p => p.cumulativeCash);
    const minVal = Math.min(...values, 0);
    const maxVal = Math.max(...values, 1000000);
    const valRange = (maxVal - minVal) || 1;

    const getY = (val) => padTop + plotHeight - ((val - minVal) / valRange) * plotHeight;
    const getX = (index) => padLeft + (index / (points.length - 1)) * plotWidth;

    const zeroY = getY(0);

    // Limpar Canvas
    ctx.clearRect(0, 0, width, height);

    // Gradiente de Fundo
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#1e293b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Grade de Linhas Suaves
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < points.length; i++) {
      const x = getX(i);
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, height - padBottom);
      ctx.stroke();
    }

    // Linha Zero (Break-even horizontal)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, zeroY);
    ctx.lineTo(width - padRight, zeroY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label do Break-even
    ctx.fillStyle = '#f87171';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('Break-even (R$ 0)', padLeft - 8, zeroY + 3);

    // Área sob a curva (Gradiente com cores da Curva J: vermelho no negativo, esmeralda no positivo)
    const curvePoints = points.map((p, idx) => ({ x: getX(idx), y: getY(p.cumulativeCash) }));

    // Desenhar Área preenchida
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].x, zeroY);
    for (let i = 0; i < curvePoints.length; i++) {
      if (i === 0) {
        ctx.lineTo(curvePoints[i].x, curvePoints[i].y);
      } else {
        const xc = (curvePoints[i].x + curvePoints[i - 1].x) / 2;
        const yc = (curvePoints[i].y + curvePoints[i - 1].y) / 2;
        ctx.quadraticCurveTo(curvePoints[i - 1].x, curvePoints[i - 1].y, xc, yc);
      }
    }
    ctx.lineTo(curvePoints[curvePoints.length - 1].x, curvePoints[curvePoints.length - 1].y);
    ctx.lineTo(curvePoints[curvePoints.length - 1].x, zeroY);
    ctx.closePath();

    const areaGrad = ctx.createLinearGradient(0, padTop, 0, height - padBottom);
    areaGrad.addColorStop(0, 'rgba(16, 185, 129, 0.35)'); // Verde nos lucros
    areaGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.15)');
    areaGrad.addColorStop(1, 'rgba(239, 68, 68, 0.25)'); // Vermelho no vale
    ctx.fillStyle = areaGrad;
    ctx.fill();
    ctx.restore();

    // Traçado da Curva J principal
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < curvePoints.length; i++) {
      if (i === 0) {
        ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
      } else {
        const xc = (curvePoints[i].x + curvePoints[i - 1].x) / 2;
        const yc = (curvePoints[i].y + curvePoints[i - 1].y) / 2;
        ctx.quadraticCurveTo(curvePoints[i - 1].x, curvePoints[i - 1].y, xc, yc);
      }
    }
    ctx.lineTo(curvePoints[curvePoints.length - 1].x, curvePoints[curvePoints.length - 1].y);
    ctx.stroke();

    // Destaque dos Pontos Interativos
    points.forEach((p, idx) => {
      const pt = curvePoints[idx];
      const isSelected = idx === activeIndex;

      // Glow no ponto selecionado
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(pt.x, pt.y, isSelected ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = p.cumulativeCash >= 0 ? '#10b981' : '#f87171';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();

      // Label do Ano no Eixo X
      ctx.fillStyle = isSelected ? '#38bdf8' : '#94a3b8';
      ctx.font = isSelected ? 'bold 11px Inter, sans-serif' : '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`A${p.year}`, pt.x, height - padBottom + 18);
    });
  }

  /**
   * Formata valores em R$ abreviados (ex: R$ 5,2M ou -R$ 1,2M)
   */
  static formatCurrencyCompact(val) {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    const sign = isNeg ? '-' : '+';

    if (absVal >= 1000000000) {
      return `${sign}R$ ${(absVal / 1000000000).toFixed(1)}B`;
    }
    if (absVal >= 1000000) {
      return `${sign}R$ ${(absVal / 1000000).toFixed(1)}M`;
    }
    if (absVal >= 1000) {
      return `${sign}R$ ${(absVal / 1000).toFixed(0)}k`;
    }
    return `${sign}R$ ${absVal.toFixed(0)}`;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = JCurveEngine;
}
