# Semana 21 — Processos de Desenvolvimento de Software e Metodologias Ágeis

Projeto interativo refatorado pedagogicamente a partir dos materiais anexados da Semana 21.

## Gamificação simplificada

A experiência foi reformulada como uma **jornada de aprendizagem**, sem XP, níveis, combos ou ranking. O aluno acompanha apenas:

- etapas concluídas;
- barra de progresso;
- pequenos desafios com feedback;
- três marcos simples: Pipeline completo, Bug identificado e Semana 21 concluída.

A progressão é: **conteúdo → interação → feedback → avanço**.

## Estrutura

- `index.html` — conteúdo e componentes semânticos.
- `style.css` — layout responsivo, modo escuro, animações leves e impressão.
- `script.js` — quizzes, progresso, localStorage, pipeline, calculadora DORA e relatório.
- `materials/` — materiais originais renomeados para caminhos simples.
- `docs/` — materiais de apoio ao professor, gabarito, mapa mental, resumo e QA.

## Como usar

1. Abra `index.html` no navegador ou publique a pasta no GitHub Pages.
2. Para PDF via jsPDF, é necessário acesso à internet para carregar a biblioteca CDN.
3. Se jsPDF não carregar, use **Imprimir / Salvar como PDF**.
4. Identificação, etapas, respostas, quizzes, cálculos e tema são salvos no `localStorage` do navegador.

## Jornada do aluno

1. Entenda o problema — Wall of Confusion.
2. Conecte DevOps e CALMS.
3. Monte o pipeline.
4. Decida sobre o bug e o deploy.
5. Leia os dados com métricas DORA.
6. Conclua o desafio final de melhoria do processo.

## Responsividade e acessibilidade

A versão foi revisada nas larguras 320, 375, 425, 768, 1024, 1366 e 1920 px. O mapa da jornada fica vertical em telas pequenas, a atividade de pipeline funciona por clique, sem drag-and-drop, e `prefers-reduced-motion` reduz as animações.

## GitHub Pages

Configuração sugerida: **Settings → Pages → Deploy from a branch → main → /(root)**.

## QA

- Relatório: `docs/relatorio_qa.md`
- Log: `docs/qa_test_log.txt`
- Refatoração do pipeline: `docs/relatorio_refatoracao_pipeline.md`
- Resultado da rodada específica da nova esteira: **29/29 verificações aprovadas**.
