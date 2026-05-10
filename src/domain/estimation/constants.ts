// ============================================================
// FONTE PRINCIPAL: Li et al. (2023) "Making AI Less Thirsty"
// UC Riverside — https://arxiv.org/abs/2304.03271
// GPT-3: ~500 mL a cada 10–50 prompts médios
// → Adotamos 10 mL/prompt como estimativa conservadora
//   para modelos modernos (mais eficientes que GPT-3)
//
// FONTE SECUNDÁRIA: The Conversation — Leo S. Lo, Univ. of Virginia (set. 2025)
// https://theconversation.com/ai-has-a-hidden-water-cost-heres-how-to-calculate-yours-263252
//
// WUE (Water Usage Effectiveness): média mundial ~1.8 L/kWh
// FONTE: EESI / The Green Grid / ISO IEC 30134-9:2022
// ============================================================

// Padrão da indústria (OpenAI tokenizer / tiktoken)
export const CHARS_PER_TOKEN = 4;

// Li et al. 2023: faixa de 10–50 mL por prompt de 250 tokens
// 25 = centro da faixa — mais representativo da realidade média
export const BASE_WATER_ML_PER_INTERACTION = 25;

// Tokens de referência para calibrar a escala por tamanho do prompt
// Um prompt "médio" do estudo Li et al. corresponde a ~250 tokens (prompt + resposta)
export const REFERENCE_TOKEN_COUNT = 250;

// Faixa de incerteza: Li et al. admite variação de até 5x entre cenários
// (data center frio vs quente, fonte de energia, horário)
export const RANGE_MIN_FACTOR = 0.5;
export const RANGE_MAX_FACTOR = 3.0;

// ============================================================
// WUE — Water Usage Effectiveness (referência técnica opcional)
// ============================================================
export const WUE_L_PER_KWH = 1.8;
export const ENERGY_WH_PER_PROMPT_BASE = 3.0;

// ============================================================
// MULTIPLICADORES POR MODELO
// Referência: ChatGPT (GPT-4o) = 1.0 (baseline do estudo Li et al.)
// ============================================================
export const MODEL_MULTIPLIERS: Record<string, { label: string; multiplier: number }> = {
  chatgpt: { label: 'ChatGPT', multiplier: 1.00 },
  gemini:  { label: 'Gemini',  multiplier: 0.90 },
  grok:    { label: 'Grok',    multiplier: 1.10 },
};

// ============================================================
// COMPLEXIDADE DE TAREFA
// Substitui o multiplicador fixo de resposta (RESPONSE_TOKEN_MULTIPLIER).
// O tamanho do prompt digitado não determina o consumo — a natureza
// da tarefa sim. "Crie um site completo" tem 5 palavras mas gera
// ~2500 tokens de resposta.
//
// responseTokens: estimativa de tokens da resposta típica para cada categoria.
// exemplos: frases clicáveis exibidas como sugestões no ChatPanel.
// ============================================================
export const TASK_COMPLEXITY: Record<string, {
  label: string;
  emoji: string;
  responseTokens: number;
  descricao: string;
  exemplos: string[];
}> = {
  chat_simples: {
    label: 'Pergunta rápida',
    emoji: '💬',
    responseTokens: 200,
    descricao: 'Perguntas curtas, curiosidades, conversas',
    exemplos: [
      'O que é fotossíntese?',
      'Por que o céu é azul?',
      'Me conta uma curiosidade sobre tubarões',
      'Qual animal vive mais tempo no mundo?',
      'Por que sentimos sono depois de almoçar?',
      'O que acontece com o lixo que jogamos fora?',
    ],
  },
  explicacao: {
    label: 'Explicação ou resumo',
    emoji: '📖',
    responseTokens: 600,
    descricao: 'Explicações, resumos, comparações',
    exemplos: [
      'Explique como funciona a internet para um iniciante',
      'Resuma o livro O Pequeno Príncipe',
      'Como funciona uma eleição no Brasil?',
      'Por que é importante reciclar o lixo?',
      'Como a água chega até a minha casa?',
      'O que é aquecimento global e por que ele acontece?',
    ],
  },
  redacao: {
    label: 'Redação ou texto longo',
    emoji: '✍️',
    responseTokens: 1500,
    descricao: 'Redações, dissertações, artigos, histórias',
    exemplos: [
      'Escreva uma história de aventura na floresta amazônica',
      'Faça uma redação sobre a importância de cuidar do meio ambiente',
      'Crie um conto sobre uma criança que descobre um rio escondido',
      'Escreva uma história sobre o futuro da água no planeta',
      'Faça uma redação sobre o uso responsável da tecnologia',
    ],
  },
  pesquisa_longa: {
    label: 'Pesquisa completa',
    emoji: '🔎',
    responseTokens: 2000,
    descricao: 'Pesquisas aprofundadas sobre qualquer tema',
    exemplos: [
      'Me explica tudo sobre como os data centers consomem água',
      'Quais são todos os animais em extinção no Brasil e por quê?',
      'Como funciona o ciclo completo da água na natureza?',
      'Me faz um guia completo sobre energia solar para iniciantes',
      'Explica a história completa da internet, do começo até hoje',
    ],
  },
  criativo: {
    label: 'Criativo',
    emoji: '🎨',
    responseTokens: 1200,
    descricao: 'Criação de conteúdo criativo e entretenimento',
    exemplos: [
      'Crie um quiz divertido sobre animais da Amazônia com 10 perguntas',
      'Invente uma história em quadrinhos sobre super-heróis do meio ambiente',
      'Crie uma letra de música sobre economizar água',
      'Monte um roteiro de vídeo curto sobre desperdício de água',
      'Crie um jogo de perguntas e respostas sobre sustentabilidade',
    ],
  },
  codigo_simples: {
    label: 'Criar um site simples',
    emoji: '🌐',
    responseTokens: 800,
    descricao: 'Páginas simples e projetos básicos',
    exemplos: [
      'Crie uma página simples sobre animais marinhos',
      'Faça um site de curiosidades sobre o espaço para crianças',
    ],
  },
  impacto_gigante: {
    label: 'Projeto gigante',
    emoji: '🚀',
    responseTokens: 60000,
    descricao: 'Projetos absurdamente grandes que mostram impacto real',
    exemplos: [
      'Crie o Facebook 2.0 melhorado com todas as funcionalidades',
      'Desenvolva um sistema completo de streaming como o Netflix do zero',
      'Faça um aplicativo de delivery igual ao iFood com mapa e pagamento',
      'Crie um jogo de RPG completo com história, batalhas e inventário',
      'Desenvolva uma rede social completa com chat, stories e feed',
    ],
  },
};

// ============================================================
// EQUIVALÊNCIAS — comparações lúdicas para comunicar o impacto
// ============================================================
export interface Equivalence {
  labelPt: string;
  unitPt: string;
  mlPerUnit: number;
  minMl: number;
}

export const EQUIVALENCES: Equivalence[] = [
  // === MICRO (0 mL+) ===
  {
    labelPt: 'gotas de água (0,05 mL cada)',
    unitPt:  'gota',
    mlPerUnit: 0.05,
    minMl: 0,
  },

  // === PEQUENO (5 mL+) ===
  {
    labelPt: 'colheres de chá cheias (5 mL)',
    unitPt:  'colher de chá',
    mlPerUnit: 5,
    minMl: 2,
  },
  {
    labelPt: 'goles de água (30 mL)',
    unitPt:  'gole',
    mlPerUnit: 30,
    minMl: 10,
  },

  // === MÉDIO (80 mL+) ===
  {
    labelPt: 'copos americanos de água (200 mL)',
    unitPt:  'copo',
    mlPerUnit: 200,
    minMl: 80,
  },
  {
    labelPt: 'latas de refrigerante (350 mL)',
    unitPt:  'latinha',
    mlPerUnit: 350,
    minMl: 150,
  },
  {
    labelPt: 'garrafinhas de água mineral (500 mL)',
    unitPt:  'garrafinha',
    mlPerUnit: 500,
    minMl: 200,
  },
  {
    labelPt: 'garrafões de água (5 L)',
    unitPt:  'garrafão',
    mlPerUnit: 5_000,
    minMl: 2_000,
  },

  // === DOMÉSTICO (400 mL+) ===
  {
    labelPt: 'vezes lavando as mãos (1 L com torneira aberta)',
    unitPt:  'lavagem de mãos',
    mlPerUnit: 1_000,
    minMl: 400,
  },
  {
    labelPt: 'descargas de vaso sanitário (~6 L)',
    unitPt:  'descarga',
    mlPerUnit: 6_000,
    minMl: 2_500,
  },
  {
    labelPt: 'escovações de dente com torneira aberta (~12 L)',
    unitPt:  'escovação',
    mlPerUnit: 12_000,
    minMl: 5_000,
  },
  {
    labelPt: 'bacias de roupa lavadas à mão (~20 L)',
    unitPt:  'bacia de roupa',
    mlPerUnit: 20_000,
    minMl: 8_000,
  },

  // === GRANDE (15 L+) ===
  {
    labelPt: 'banhos de 5 minutos (~50 L)',
    unitPt:  'banho',
    mlPerUnit: 50_000,
    minMl: 15_000,
  },
  {
    labelPt: 'dias de consumo de água de uma pessoa (~110 L/dia — média brasileira IBGE)',
    unitPt:  'dia de consumo pessoal',
    mlPerUnit: 110_000,
    minMl: 50_000,
  },

  // === IMPACTO COLETIVO (200 L+) ===
  {
    labelPt: "caixas d'água residenciais de 500 L",
    unitPt:  "caixa d'água",
    mlPerUnit: 500_000,
    minMl: 200_000,
  },
  {
    labelPt: 'semanas de água para uma família de 4 pessoas (~3.000 L)',
    unitPt:  'semana familiar',
    mlPerUnit: 3_000_000,
    minMl: 1_000_000,
  },
];
