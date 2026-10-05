# AnimVC: A Jornada do Fundador 🚀
> 🌐 **Acesso Online (GitHub Pages):** [https://ramaandrade.github.io/animvc/](https://ramaandrade.github.io/animvc/)  
> 📦 **Repositório GitHub:** [https://github.com/ramaandrade/animvc](https://github.com/ramaandrade/animvc)  
> 📱 **Web App Gamificado de Capital Empreendedor (Venture Capital & Private Equity - PWA)**  
> 💡 *Aprenda rodadas de captação, diluição de Cap Table, Curva J e estratégias de Exit!*

---

## 🎯 1. Visão Geral e Objetivo
O **AnimVC** coloca o jogador no papel de um(a) fundador(a) de startup em busca do sucesso empresarial através de rodadas sucessivas de investimento de risco.

O objetivo central é ensinar a mecânica real do ecossistema de Venture Capital (VC) e Private Equity (PE):
- **Equilíbrio de Cap Table**: Negociar participação societária em troca de *Smart Money* sem sofrer diluição excessiva.
- **Regra de Ouro da Série A**: Manter pelo menos 50% de participação ao chegar na Série A para garantir incentivo e governança.
- **Term Sheet e Cláusulas Jurídicas**: Entender os trade-offs de *Tag Along*, *Drag Along*, *Liquidation Preference*, *Board Seat* e *Pool de Opções (ESOP)*.
- **Curva J (J-Curve)**: Visualizar por que os fundos de VC ficam no fluxo de caixa negativo nos primeiros anos antes da colheita exponencial no Exit.
- **Cenários Macroeconômicos Reais**: Reagir a juros elevados (2025), volatilidade geopolítica, boom de IA e exigências de Capital Produtivo/ESG.
- **Exit & Liquidez**: Escolher a rota final (IPO, M&A Estratégico ou Venda Secundária) e ver o cash-out real embolsado.

---

## 🎭 2. Os Personagens (Investidores Animados)

| Personagem | Modalidade | Estilo & Foco de Decisão | Visual & Reações |
| :--- | :--- | :--- | :--- |
| **Anjo Serafim** | **Seed Capital** | Foco prioritário no **Time** (53% da decisão nesta fase) e validação de problema-solução. | Mentor experiente, auréola estilizada, reage com entusiasmo a fundadores dedicados e ceticismo a projeções puramente teóricas. |
| **Vera Capital** | **Venture Capital** (Séries A & B) | Foco em **Capital Produtivo**: tração com retenção real, LTV/CAC saudável, impacto sustentável e criação de empregos. | Gestora enérgica com blazer rosa e tablet; rejeita empresas com queima inconsequente de caixa ("castelo de cartas"). |
| **Sr. Equity** | **Private Equity** | Foco em **Governança**, consolidação setorial via fusões (Roll-up, espelhado no case brasileiro da **Pura Vida**), margem EBITDA e preparação para IPO. | Executivo sênior formal com terno escuro e olhar cirúrgico; exige auditoria Big Four e compliance rigoroso. |

---

## 🛠️ 3. Estrutura do Projeto

```
animvc/
├── index.html                   # Estrutura Mobile-First semântica e PWA
├── manifest.json                # Manifesto PWA com tema escuro e ícones
├── sw.js                        # Service Worker com cache offline
├── run.bat                      # Inicializador rápido para Windows
├── serve.py                     # Servidor HTTP Python com MIME types adequados
├── server.js                    # Servidor HTTP Node.js alternativo
├── package.json                 # Scripts de inicialização e testes automatizados
├── css/
│   ├── main.css                 # Design System fintech, layout responsivo
│   ├── components.css           # Cap Table donut, slider, cartões e avatares
│   └── animations.css           # Animações de micro-interações, reações e SVG
├── js/
│   ├── capTableEngine.js        # Motor matemático de diluição, pre/post money
│   ├── characters.js            # Definições, diálogos e gerador de SVG dos investidores
│   ├── macroCards.js            # Cartas de eventos macroeconômicos (2025/2026)
│   ├── termSheet.js             # Motor de cláusulas (Tag/Drag Along, Liquidation Pref)
│   ├── jCurveEngine.js          # Gráfico Canvas responsivo de alta precisão da Curva J
│   ├── roundsData.js            # Fases do jogo: Seed, Séries A e B, PE e Exits
│   ├── audioEffects.js          # Efeitos sonoros sintetizados nativos (Web Audio API)
│   ├── gameState.js             # Armazenamento e gerenciamento de estado do jogo
│   ├── ui.js                    # Manipulação de DOM, sliders táteis e modais
│   └── app.js                   # Bootstrap do aplicativo e registro do Service Worker
├── assets/
│   └── icons/
│       ├── icon-192.svg         # Ícone de inicialização PWA 192x192
│       └── icon-512.svg         # Ícone de inicialização PWA 512x512
└── tests/
    ├── capTableEngine.test.js   # Testes unitários da matemática do Cap Table
    └── gameLogic.test.js        # Testes unitários do fluxo de jogo e regras
```

---

## 🚀 4. Como Executar

### Opção 1: Via Python (Recomendado)
```bash
python serve.py
```
Acesse no seu navegador: **`http://localhost:8080`**

### Opção 2: Via Node.js
```bash
node server.js
```
Acesse no seu navegador: **`http://localhost:8080`**

### Opção 3: Executar a Suíte de Testes
```bash
npm.cmd test
# ou diretamente:
node tests/capTableEngine.test.js
node tests/gameLogic.test.js
```

---

## 💡 5. Mecânicas Educativas Implementadas

1. **Donut de Cap Table em Tempo Real**:
   - Desenho de arcos em SVG responsivo atualizado ao deslizar o slider de equity.
   - Cálculo automático de Pre-Money e Post-Money Valuation.
   - Notificações de alerta se o fundador doar equity excessiva precocemente.
2. **Elevator Pitch Interativo**:
   - Formato rápido com opções de ênfase para leitura em até 60 segundos.
   - Mudança imediata de humor e expressão facial do investidor (feliz, cético, impressionado, rígido).
3. **Cartas Macroeconômicas com Decisões Táticas**:
   - Simulação de choques de juros em 2025, tensões geopolíticas, boom de inteligência artificial e exigências ESG.
   - O fundador escolhe se reduz Burn Rate para esticar o Runway ou se acelera a aquisição comercial.
4. **Dashboard Interativo da Curva J (J-Curve)**:
   - Renderização limpa em HTML5 Canvas de alta resolução com suporte a telas Retina.
   - Scrubber de linha do tempo do Ano 0 (vintage do fundo) até o Ano 7 (Exit).
   - Demonstração do vale da curva (onde o fluxo acumulado é mais negativo) até a colheita exponencial.
5. **Rotas de Exit e Scorecard Final**:
   - Cálculo de cash-out pessoal do fundador, MOIC dos fundos investidores e lições de governança corporativa.
