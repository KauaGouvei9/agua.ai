export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const quizTitle = 'Trilha do Conhecimento';
export const quizIntro = 'Teste o que voce aprendeu! Responda cada pergunta para desbloquear a proxima. Ao final você estará mais preparado para vigiar o consumo de água e conscientizar seus amigos e parentes!';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'As chamadas “big techs” insistem na importância do desenvolvimento da IA, mas escondem os problemas gerados por essa indústria. Quais os principais impactos ambientais do aumento do uso de IA?',
    options: ['Redução do consumo de matéria-prima e energia no ramo', 'Diminuição da poluição ambiental', 'Aumento do consumo de energia e dos gases de efeito estufa (GEE)', 'Aumento dos recursos econômicos pela venda de tecnologia'],
    correctIndex: 2,
    explanation: 'De acordo com o artigo Inteligência artificial, data centers e colonialismo digital: Impactos socioambientais e geopolíticos a partir do Sul Global, parágrafo 6 do tópico NEM INTELIGENTE, NEM ARTIFICIAL, as retóricas das big techs que insuflam a necessidade do desenvolvimento acelerado da IA – inclusive para solucionar a crise climática – invisibilizam o fato de que tal indústria produz efeitos materiais e ambientais significativos. Até 2040, a indústria tech, hoje comparável à da aviação em termos de emissão de GEE, deve se tornar responsável por 14% do total de emissão de gases de efeito estufa.',
  },
  {
    id: 2,
    question: 'A fabricação de componentes eletrônicos para os data centers é outro problema relevante no impacto ambiental causado por essa área. Quais os principais fatores envolvidos na produção desses itens que impactam diretamente no meio ambiente?',
    options: ['Uso mínimo de recursos renováveis e consumo de energia limpa', 'Consumo excessivo de matérias-primas e energia e extração de elementos raros que destrói o meio ambiente ', 'Produção sem impacto e uso de material sustentável', 'Reutilização de componentes e reciclagem de materiais'],
    correctIndex: 1,
    explanation: 'De acordo com o artigo Impactos ambientais invisíveis da inteligência artificial: pegada de carbono, consumo de água e desafios regulatórios, parágrafo 3 do tópico 2. A PEGADA ECOLÓGICA DA INTELIGÊNCIA ARTIFICIAL, conforme relatório das Nações Unidas de 2024, os componentes eletrônicos que os data centers abrigam dependem de grandes quantidades de grãos: para fabricação de um computador de dois quilos, são necessários 800 quilos de matérias-primas. Ademais, o relatório destaca que os microchips que alimentam a IA precisam de elementos de terras raros, extraídos de maneiras destrutivas para o meio ambiente.',
  },
  {
    id: 3,
    question: 'A maior parte dos data centers de grandes empresas como Google precisam de muita energia para funcionar, mas causam muito impacto ambiental pela emissão de GEE. Qual fonte de energia é a principal causa dessa emissão?',
    options: ['Consumo de água excessivo', 'Queima de combustíveis fósseis', 'Energia eólica', 'Outras fontes de energia'],
    correctIndex: 1,
    explanation: 'De acordo com o artigo Inteligência artificial, data centers e colonialismo digital: Impactos socioambientais e geopolíticos a partir do Sul Global, parágrafo 3 do tópico ENTRE IMPACTOS SOCIOAMBIENTAIS E GEOPOLÍTICOS, entre 2019 e 2024, as emissões de GEE da Google aumentaram 48%, sobretudo por causa de seu uso de data centers. Considerando que a maior parte da geração de eletricidade em data centers provêm da queima de combustíveis fósseis, a situação se torna particularmente problemática; em números de 2020, data centers já eram responsáveis por 25% a 30% de todo o consumo do ecossistema digital.',
  },
  {
    id: 4,
    question: 'Um data center localizado na Suécia ou na Finlândia não demanda o mesmo volume de água que um data center instalado na desértica cidade de Phoenix, nos EUA. Qual o principal motivo desse fenômeno?',
    options: ['Porque a Suécia não permite o uso de servidores', 'A cidade desértica precisa de mais energia solar para funcionar', 'Não utilizam energia hidrelétrica', 'O clima frio dos primeiros países diminui o consumo de água utilizado no resfriamento'],
    correctIndex: 3,
    explanation: 'De acordo com o artigo Inteligência artificial, data centers e colonialismo digital: Impactos socioambientais e geopolíticos a partir do Sul Global, parágrafo 2 do tópico ENTRE IMPACTOS SOCIOAMBIENTAIS E GEOPOLÍTICOS, para reduzir a necessidade de consumo de água, que passa de milhões de galões por dia para resfriamento das máquinas, alguns data centers são construídos propositalmente em regiões mais frias e/ou em países cuja matriz energética é majoritariamente hidrelétrica. De acordo como artigo Inteligência artificial, data centers e colonialismo digital: Impactos socioambientais e geopolíticos a partir do Sul Global, parágrafo 3 do tópico ENTRE IMPACTOS SOCIOAMBIENTAIS E GEOPOLÍTICOS, um data center localizado na Suécia ou na Finlândia não demanda o mesmo volume de água que um data center instalado na desértica cidade de Phoenix, nos EUA.',
  },
  {
    id: 5,
    question: 'Com os impactos causados pelas tecnologias como as IAs, houve um aumento na crise climática, gerando desastres que afetam toda a população. Qual a consequência social relacionada a esse problema?',
    options: ['Aumento da pobreza e da desigualdade', 'Melhora das condições de vida da população', 'Diminuição da crise econômica', 'Crescimento do uso da tecnologia no cotidiano'],
    correctIndex: 0,
    explanation: 'De acordo com o artigo Impactos ambientais invisíveis da inteligência artificial: pegada de carbono, consumo de água e desafios regulatórios, parágrafo 16 do tópico 2. A PEGADA ECOLÓGICA DA INTELIGÊNCIA ARTIFICIAL, com o aumento significativo da crise climática, o planeta passa a se tornar mais propenso à desastres climáticos – que empurram anualmente vinte e seis milhões de pessoas para a pobreza. Tais dados demonstram que os impactos da Inteligência Artificial no meio ambiente e, consequentemente, no avanço da crise climática, contribuíram também para o maior aumento das desigualdades e afastamento da justiça climática.',
  },
  {
    id: 6,
    question: 'TBD',
    options: ['tbd', 'tbd', 'tbd', 'tbd'],
    correctIndex: 2,
    explanation: 'tbd',
  },
  {
    id: 7,
    question: 'TBD',
    options: ['tbd', 'tbd', 'tbd', 'tbd'],
    correctIndex: 1,
    explanation: 'tbd',
  },
  {
    id: 8,
    question: 'TBD',
    options: ['tbd', 'tbd', 'tbd', 'tbd'],
    correctIndex: 1,
    explanation: 'tbd',
  },
  {
    id: 9,
    question: 'TBD',
    options: ['tbd', 'tbd', 'tbd', 'tbd'],
    correctIndex: 1,
    explanation: 'tbd',
  },
  {
    id: 10,
    question: 'TBD',
    options: ['tbd', 'tbd', 'tbd', 'tbd'],
    correctIndex: 2,
    explanation: 'tbd',
  },
];
