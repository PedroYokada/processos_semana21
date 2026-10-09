# Relatório de QA — Gamificação simplificada

## Objetivo

Reformular a camada de gamificação para reduzir confusão sem perder o poder de chamar a atenção dos alunos. A interface agora funciona como uma **jornada de aprendizagem**, e não como um sistema de RPG.

## Alterações aplicadas

| Área | Antes | Agora |
|---|---|---|
| Progresso | XP, nível, missões e várias conquistas | 6 etapas + percentual + barra de progresso |
| Recompensas | Pontos e badges frequentes | 3 marcos discretos |
| Mapa | 7 missões | 5 etapas + desafio final |
| Feedback | Pontuação e popup de conquista | Feedback textual direto e toast curto |
| Relatório | XP, nível e conquistas | Etapas concluídas e resultados acadêmicos |
| Mobile | Mapa horizontal | Mapa vertical até 700 px |
| Estado | XP, awards, badges e missions | stages, respostas, quizzes, cálculos, identidade e tema |

## Jornada atual

1. Wall of Confusion.
2. DevOps e CALMS.
3. Pipeline.
4. Bug / decisão de deploy.
5. Métricas DORA.
6. Desafio final.

## Funcionalidades verificadas

- painel de progresso simples;
- tema claro/escuro;
- identificação e persistência;
- conclusão das etapas;
- desafio CALMS;
- ordenação do pipeline;
- decisão de deploy;
- calculadora de Change Fail Rate;
- cálculo de tempo de recuperação;
- diagnóstico DORA;
- quiz;
- desafio final;
- tela de conclusão;
- relatório sem XP/níveis;
- menu mobile;
- mapa vertical em celular;
- responsividade de 320 a 1920 px;
- ausência de IDs duplicados;
- ausência de referências JavaScript para IDs inexistentes;
- presença dos materiais originais.

## Resultado

**42/42 verificações funcionais e responsivas aprovadas.**

A gamificação ficou limitada a **etapas, progresso, desafios e três marcos discretos**, mantendo o conteúdo pedagógico como elemento principal.
