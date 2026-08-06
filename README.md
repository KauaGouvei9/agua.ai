# Tem Água.AI?

Plataforma educacional gamificada sobre o consumo oculto de água pela inteligência artificial e data centers. Desenvolvida como projeto de extensão universitária na Universidade Federal Fluminense (UFF), pela disciplina de Computação e Meio Ambiente.

A proposta é mostrar, de forma simples e interativa, que serviços como busca, vídeo e chat com IA dependem de água no mundo real — e estimar quanto seria esse consumo em situações do dia a dia.

**Acesse a plataforma:** [kauagouvei9.github.io/agua.ai](https://kauagouvei9.github.io/agua.ai/)

---

## Sobre este fork

Este repositório é um fork do projeto original desenvolvido pelo Grupo 4 da disciplina. Aqui continuo o desenvolvimento de forma independente, com novas funcionalidades, melhorias visuais e refatorações que vão além do escopo acadêmico original.

Minhas contribuições no projeto original incluem:

- Estimador de Água (ChatPanel) — cálculo de consumo hídrico por prompt, com categorias de complexidade e multiplicadores por modelo de IA
- Mural de Promessas — seção interativa onde o visitante registra um compromisso pessoal com o uso consciente de tecnologia
- Modo escuro — toggle persistente entre tema escuro e claro, com hook dedicado e tokens CSS
- Diversas correções de bugs e melhorias de interface

---

## Tecnologias

- React 19 com componentes funcionais e hooks
- TypeScript para tipagem estática
- Vite como bundler e servidor de desenvolvimento
- CSS Modules para estilos isolados por componente
- GitHub Actions para deploy automático no GitHub Pages

Não há backend. Todo o cálculo de estimativa de água acontece no navegador, com base em valores de referência de estudos acadêmicos.

---

## Como rodar localmente

Instalar dependências:

```
npm install
```

Subir o servidor de desenvolvimento:

```
npm run dev
```

Acesse em `http://localhost:5173/agua.ai/`

Gerar build de produção:

```
npm run build
```

---

## Seções do site

### Motivação

Apresenta o tema para quem está chegando agora. Explica o que é a internet por trás das telas, o que é um data center e por que esses prédios precisam de água para funcionar. O conteúdo aparece em uma linha do tempo no estilo de museu.

### Estimador de Água

Parte interativa central do site. O visitante escolhe um modelo de IA (ChatGPT, Gemini, Grok) e seleciona uma pergunta de exemplo ou digita a sua. O sistema calcula uma estimativa de quanta água seria gasta para gerar aquela resposta e exibe o valor com equivalências do cotidiano, como colher de chá, copo ou garrafa.

O cálculo é baseado em dois estudos principais: *Making AI Less Thirsty* (Li et al., UC Riverside, 2023) e artigo de Leo S. Lo (Universidade da Virgínia, 2025).

### Seu Papel (Impactos)

Reúne três faces do impacto ambiental da computação: escassez de água, geração de resíduos e custo energético. Cada bloco traz uma explicação curta com referências externas.

### Quiz

Questionário em trilha que revisa os conceitos apresentados no site. Serve para fixar o conteúdo e medir o que o visitante aprendeu.

### Mural de Promessas

Espaço onde o visitante registra um compromisso pessoal com o uso mais consciente de tecnologia.

---

## Organização das pastas

- `src/components/` — componentes de interface, organizados por área (layout, chat, quiz, mural, modais)
- `src/content/pt/` — textos do site em português, separados por seção
- `src/domain/estimation/` — lógica de cálculo da estimativa de água, constantes e multiplicadores por modelo
- `src/hooks/` — hooks reutilizáveis (ex: `useTheme` para controle do tema claro/escuro)
- `src/theme/` — tokens de design globais: cores, espaçamentos, tipografia e fundos animados

---

## Melhorias planejadas

- [ ] Compartilhamento de resultado — botão para compartilhar a estimativa no WhatsApp/Instagram
- [ ] Histórico de cálculos — acumular o consumo total dos prompts estimados na sessão
- [ ] Internacionalização (i18n) — versão em inglês da plataforma
- [ ] Banco de dados — persistência real do Mural de Promessas com Supabase

---

## Referências acadêmicas

- Li et al. (2023). *Making AI Less Thirsty*. UC Riverside. [arXiv:2304.03271](https://arxiv.org/abs/2304.03271)
- Lo, Leo S. (2025). *The environmental impact of AI*. The Conversation / University of Virginia.
- Furtado e Cunha (2024). *Inteligência artificial, data centers e colonialismo digital*.
- Mazziero e Basigli (2025). *Impactos ambientais invisíveis da inteligência artificial*.