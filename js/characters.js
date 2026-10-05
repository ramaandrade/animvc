/**
 * Characters.js - Definição dos investidores animados, critérios de decisão e avatares dinâmicos
 * AnimVC: A Jornada do Fundador
 */

const CHARACTERS = {
  serafim: {
    id: 'serafim',
    name: 'Anjo Serafim',
    title: 'Investidor Anjo (Angel Investor)',
    stage: 'Seed Capital (Capital Semente)',
    badge: 'Fase de Ideação',
    tagline: 'Aposto no brilho nos olhos e na garra do time fundador.',
    themeColor: '#f59e0b', // Amber
    bio: 'Pioneiro em investimentos anjo, mentor de dezenas de startups de sucesso. Ele sabe que na fase de ideação o modelo de negócios ainda vai pivotar, então avalia prioritariamente a capacidade de execução dos fundadores.',
    criteria: {
      teamWeight: 0.53, // 53% da decisão nesta fase é o Time!
      problemSolutionFit: 0.32,
      financialProjection: 0.15
    },
    defaultOffer: {
      investmentAmount: 1000000, // R$ 1.000.000
      suggestedEquity: 15.0, // 15%
      minEquity: 10.0,
      maxEquity: 25.0,
      preMoney: 5666666,
      postMoney: 6666666
    },
    dialogues: {
      intro: 'Olá! Toda grande jornada começa com uma centelha. Conte-me: quem é o seu time e qual dor real do mundo vocês resolverão?',
      teamFocused: 'Brilhante! Cofundadores complementares com sangue nos olhos são o coração de qualquer unicórnio. Essa paixão me convence!',
      tooFinancial: 'Cuidado, jovem fundador... Planilhas de Excel aceitam qualquer coisa nesta fase. Quero ver validação na rua, com clientes reais!',
      excessiveDilution: 'Atenção! Você está me oferecendo equity demais. Se eu aceitar 30% agora, um fundo de Série A não vai querer investir amanhã por achar que você perdeu o incentivo!',
      accepted: 'Negócio fechado! Vamos colocar R$ 1.000.000 no caixa e validar esse produto. Bem-vindo à família de startups!',
      rejected: 'Infelizmente sinto que o time ainda precisa de mais sintonia e validação do problema. Volte quando tiver clientes testando o protótipo.'
    },
    svg: (emotion = 'neutral') => generateAvatarSvg('serafim', emotion)
  },

  vera: {
    id: 'vera',
    name: 'Vera Capital',
    title: 'Managing Partner - VC Fund',
    stage: 'Venture Capital (Séries A e B)',
    badge: 'Crescimento e Tração',
    tagline: 'Buscamos Capital Produtivo: tração exponencial com impacto sustentável.',
    themeColor: '#ec4899', // Pink / Magenta
    bio: 'Gestora arrojada e visionária de um dos fundos de VC mais ativos da América Latina. Ela busca negócios que não apenas gerem retorno financeiro, mas atuem como "Capital Produtivo", fomentando inovação sustentável e geração de empregos qualificados.',
    criteria: {
      tractionAndRetention: 0.40,
      productiveCapitalImpact: 0.35, // Impacto sustentável e econômico
      unitEconomics: 0.25 // LTV / CAC e Burn Multiple
    },
    defaultOffer: {
      investmentAmount: 12000000, // R$ 12.000.000 (Série A)
      suggestedEquity: 18.0,
      minEquity: 12.0,
      maxEquity: 25.0,
      preMoney: 54666666,
      postMoney: 66666666
    },
    dialogues: {
      intro: 'Chega de teoria, vamos aos números de tração! Queremos ver retenção de clientes, LTV/CAC e como o nosso capital vai gerar impacto produtivo na sociedade.',
      productiveCapitalHigh: 'Excelente! É exatamente isso que chamamos de Capital Produtivo: tecnologia escalável gerando valor real para a economia e empregos qualificados.',
      pureGreedWarning: 'Espere aí. Se o seu único plano for inflar métricas vazias para desovar no próximo investidor sem gerar valor duradouro, nosso fundo está fora!',
      capTableWarning: 'Alerta vermelho! Seu Cap Table está excessivamente fragmentado e você tem menos de 50% de participação. Precisamos reestruturar isso antes de assinar.',
      accepted: 'Term Sheet assinado! R$ 12 Milhões para dominar o mercado nacional com responsabilidade e tração!',
      rejected: 'Sua queima de caixa (Burn Rate) está insustentável e a visão de longo prazo não nos convenceu. Precisamos de fundamentos sólidos.'
    },
    svg: (emotion = 'neutral') => generateAvatarSvg('vera', emotion)
  },

  equity: {
    id: 'equity',
    name: 'Sr. Equity',
    title: 'Senior Partner - Private Equity',
    stage: 'Private Equity (Escala e Consolidação)',
    badge: 'Consolidação e Pré-Exit',
    tagline: 'Governança impecável, eficiência operacional e preparação para o Exit.',
    themeColor: '#4f46e5', // Indigo
    bio: 'Veterano do mercado financeiro de capitais. Especialista em reestruturação, consolidação de setores fragmentados (M&A) e preparação de empresas para IPO ou grandes vendas estratégicas (como no célebre caso da Pura Vida e gigantes de bens de consumo).',
    criteria: {
      ebitdaAndGovernance: 0.45,
      maPotential: 0.30,
      marketResilience: 0.25
    },
    defaultOffer: {
      investmentAmount: 50000000, // R$ 50.000.000
      suggestedEquity: 22.0,
      minEquity: 15.0,
      maxEquity: 35.0,
      preMoney: 177272727,
      postMoney: 227272727
    },
    dialogues: {
      intro: 'Bom dia. Sua empresa atingiu escala expressiva. Agora o jogo é sobre governança corporativa, otimização de EBITDA e preparação para liquidez de classe mundial.',
      governancePraise: 'Muito bem. Auditoria Big Four, conselho independente e margens sólidas. É assim que construímos uma tese vencedora para IPO ou aquisição.',
      highInterestCaution: 'Com os juros elevados no cenário macro, o custo do capital aumentou. Não toleramos ineficiências operacionais. Foco na disciplina!',
      puravidaCase: 'Veja o case da Pura Vida: uma marca excepcional aliada à governança e escala de Private Equity despertou o interesse dos maiores conglomerados globais.',
      accepted: 'Acordo formalizado. Vamos profissionalizar a diretoria, realizar aquisições estratégicas (Roll-up) e preparar a empresa para o maior Exit do setor!',
      rejected: 'Falta maturidade nos controles internos e no compliance fiscal. O mercado de capitais pune amadorismo severamente.'
    },
    svg: (emotion = 'neutral') => generateAvatarSvg('equity', emotion)
  }
};

/**
 * Gerador de avatares vetoriais expressivos (SVG) para animação inline
 */
function generateAvatarSvg(characterId, emotion = 'neutral') {
  // Configurações visuais por personagem
  const configs = {
    serafim: {
      skin: '#fbd0ab',
      hair: '#e2e8f0', // Cabelos grisalhos distinta
      hairPath: 'M 35 48 C 30 18, 90 12, 85 48 C 75 25, 45 25, 35 48 Z',
      suit: '#d97706',
      accent: '#fef08a',
      glasses: true,
      halo: true
    },
    vera: {
      skin: '#e0a982',
      hair: '#312e81', // Cabelo moderno indigo escuro
      hairPath: 'M 25 55 C 25 15, 95 15, 95 55 C 92 35, 28 35, 25 55 Z M 22 55 Q 18 80 28 85 Q 26 65 29 55 Z M 98 55 Q 102 80 92 85 Q 94 65 91 55 Z',
      suit: '#db2777', // Blazer rosa vibrante
      accent: '#f472b6',
      glasses: false,
      halo: false
    },
    equity: {
      skin: '#f1c29b',
      hair: '#475569', // Cabelo elegante penteado para trás
      hairPath: 'M 32 45 C 32 18, 88 18, 88 45 C 80 24, 40 24, 32 45 Z',
      suit: '#1e1b4b', // Terno azul marinho escuro
      accent: '#818cf8',
      glasses: false,
      halo: false
    }
  };

  const cfg = configs[characterId] || configs.serafim;

  // Ajustes de expressão (boca, sobrancelhas e olhos)
  let eyeLeft = '<ellipse cx="48" cy="54" rx="4.5" ry="5.5" fill="#1e293b"/>';
  let eyeRight = '<ellipse cx="72" cy="54" rx="4.5" ry="5.5" fill="#1e293b"/>';
  let eyebrowLeft = '<path d="M 42 45 Q 48 44 54 45" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  let eyebrowRight = '<path d="M 66 45 Q 72 44 78 45" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  let mouth = '<path d="M 52 70 Q 60 74 68 70" stroke="#991b1b" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  let cheekBlush = '';

  if (emotion === 'happy' || emotion === 'excited' || emotion === 'proud' || emotion === 'satisfied') {
    eyeLeft = '<path d="M 43 55 Q 48 49 53 55" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>';
    eyeRight = '<path d="M 67 55 Q 72 49 77 55" stroke="#1e293b" stroke-width="3" fill="none" stroke-linecap="round"/>';
    eyebrowLeft = '<path d="M 42 42 Q 48 39 54 42" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    eyebrowRight = '<path d="M 66 42 Q 72 39 78 42" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    mouth = '<path d="M 49 68 Q 60 82 71 68" stroke="#991b1b" stroke-width="3" fill="#fda4af" stroke-linecap="round"/>';
    cheekBlush = '<circle cx="42" cy="62" r="5" fill="#fb7185" opacity="0.4"/><circle cx="78" cy="62" r="5" fill="#fb7185" opacity="0.4"/>';
  } else if (emotion === 'skeptical' || emotion === 'strict' || emotion === 'analytical') {
    eyebrowLeft = '<path d="M 42 42 Q 48 40 54 44" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    eyebrowRight = '<path d="M 66 46 Q 72 41 78 38" stroke="#334155" stroke-width="3" fill="none" stroke-linecap="round"/>';
    mouth = '<path d="M 52 72 Q 60 70 68 73" stroke="#991b1b" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  } else if (emotion === 'impressed') {
    eyeLeft = '<ellipse cx="48" cy="54" rx="6" ry="7" fill="#1e293b"/><circle cx="50" cy="52" r="2" fill="#fff"/>';
    eyeRight = '<ellipse cx="72" cy="54" rx="6" ry="7" fill="#1e293b"/><circle cx="74" cy="52" r="2" fill="#fff"/>';
    eyebrowLeft = '<path d="M 42 40 Q 48 36 54 40" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    eyebrowRight = '<path d="M 66 40 Q 72 36 78 40" stroke="#334155" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    mouth = '<ellipse cx="60" cy="72" rx="6" ry="7" fill="#991b1b"/>';
  } else if (emotion === 'furious' || emotion === 'alarmed' || emotion === 'disappointed') {
    eyebrowLeft = '<path d="M 42 46 Q 48 42 54 40" stroke="#334155" stroke-width="3" fill="none" stroke-linecap="round"/>';
    eyebrowRight = '<path d="M 66 40 Q 72 42 78 46" stroke="#334155" stroke-width="3" fill="none" stroke-linecap="round"/>';
    mouth = '<path d="M 52 74 Q 60 67 68 74" stroke="#991b1b" stroke-width="3" fill="none" stroke-linecap="round"/>';
  }

  // Acessórios
  const glassesSvg = cfg.glasses ? `
    <rect x="40" y="47" width="16" height="13" rx="3" fill="rgba(255,255,255,0.2)" stroke="#475569" stroke-width="2"/>
    <rect x="64" y="47" width="16" height="13" rx="3" fill="rgba(255,255,255,0.2)" stroke="#475569" stroke-width="2"/>
    <line x1="56" y1="53" x2="64" y2="53" stroke="#475569" stroke-width="2"/>
  ` : '';

  const haloSvg = cfg.halo ? `
    <ellipse cx="60" cy="18" rx="22" ry="5" fill="none" stroke="#facc15" stroke-width="3" filter="drop-shadow(0 0 4px #fef08a)"/>
  ` : '';

  return `
    <svg viewBox="0 0 120 120" class="investor-avatar-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="suitGrad-${characterId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${cfg.suit}"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      ${haloSvg}
      <!-- Ombros e Terno -->
      <path d="M 20 120 C 20 90, 40 85, 60 85 C 80 85, 100 90, 100 120 Z" fill="url(#suitGrad-${characterId})"/>
      <path d="M 52 85 L 60 102 L 68 85 Z" fill="#ffffff"/>
      <path d="M 58 87 L 60 115 L 62 87 Z" fill="${cfg.accent}"/>
      
      <!-- Pescoço e Cabeça -->
      <rect x="52" y="70" width="16" height="18" rx="4" fill="${cfg.skin}"/>
      <ellipse cx="60" cy="58" rx="26" ry="29" fill="${cfg.skin}"/>
      
      <!-- Cabelo Base e Orelhas -->
      <circle cx="34" cy="58" r="6" fill="${cfg.skin}"/>
      <circle cx="86" cy="58" r="6" fill="${cfg.skin}"/>
      <path d="${cfg.hairPath}" fill="${cfg.hair}"/>
      
      <!-- Rosto e Expressões -->
      ${eyebrowLeft}
      ${eyebrowRight}
      ${eyeLeft}
      ${eyeRight}
      ${glassesSvg}
      <path d="M 59 56 Q 61 63 58 64" stroke="#d97706" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      ${cheekBlush}
      ${mouth}
    </svg>
  `;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CHARACTERS, generateAvatarSvg };
}
