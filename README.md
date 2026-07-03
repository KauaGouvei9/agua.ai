# agua.ai

Site educativo sobre o consumo de água por trás dos serviços digitais, com foco em data centers e inteligência artificial. Foi feito como trabalho da disciplina de Computação e Meio Ambiente.

A proposta é mostrar, de forma simples, que serviços como busca, vídeo e chat com IA dependem de água no mundo real, e estimar quanto seria esse consumo em situações do dia a dia.

## Tecnologias usadas

- React 19 para montar a interface em componentes
- TypeScript para dar tipagem ao código e reduzir erros em tempo de desenvolvimento
- Vite como ferramenta de build e servidor de desenvolvimento
- CSS Modules para escrever estilos isolados por componente

Não há backend nem banco de dados. Todo o cálculo da estimativa de água acontece no próprio navegador, com base em valores de referência tirados de estudos acadêmicos.

## Como rodar

Instalar as dependências:

```
npm install
```

Subir o servidor de desenvolvimento:

```
npm run dev
```

Gerar a versão final para publicação:

```
npm run build
npm run preview
```

## Seções do site

O site é uma página única dividida em quatro partes, acessíveis pelo menu fixo no topo.

### Motivação

Apresenta o tema para quem está chegando agora. Explica o que é a internet por trás das telas, o que é um data center e por que esses prédios precisam de água para funcionar. O conteúdo aparece em uma linha do tempo no estilo de museu, com cartões que o visitante lê no ritmo dele.

### Estimador de água

Parte interativa do site. O visitante escolhe um modelo de inteligência artificial (ChatGPT, Gemini, Claude e outros) e seleciona uma pergunta de exemplo. O sistema calcula uma estimativa de quanta água seria gasta para responder aquela pergunta e mostra o valor em mililitros ou litros, junto com uma comparação fácil de visualizar, como uma colher de chá, um copo ou uma garrafa.

O cálculo se baseia em dois estudos principais: "Making AI Less Thirsty", da UC Riverside, e um artigo de Leo S. Lo, da Universidade da Virgínia. A explicação completa da metodologia fica disponível em um botão de informação dentro do próprio estimador.

### Impactos

Reúne três faces do impacto ambiental ligado à computação: escassez de água, geração de resíduos e custo energético. Cada bloco traz uma explicação curta e links externos para quem quiser se aprofundar. O objetivo é mostrar que cada serviço digital tem um custo escondido no mundo físico.

### Quiz

Questionário em formato de trilha no final do site. Cada pergunta revisa um conceito apresentado nas seções anteriores, e serve tanto para fixar o conteúdo quanto para o visitante medir o que aprendeu.

## Organização das pastas

- `src/components/` guarda os componentes de tela, separados por área: layout geral, chat do estimador, quiz e janelas modais
- `src/content/pt/` guarda os textos do site em português, separados por seção
- `src/domain/estimation/` guarda os cálculos da estimativa de água e as constantes usadas, como multiplicadores por modelo e tokens médios por tipo de tarefa
- `src/theme/` guarda os estilos compartilhados: cores, espaçamentos, tipografia e fundos animados
