# Relatório de refatoração — Pipeline da Semana 21

## O que foi removido

- drag and drop;
- atributo `draggable`;
- eventos `dragstart`, `dragend`, `dragover` e `drop`;
- setas de reordenação da versão anterior;
- segunda representação duplicada da esteira;
- estado antigo `pipelineOrder`;
- classes CSS antigas `pipeline-order`, `order-card`, `pipeline-visual` e `pipe-step`.

## O que foi recriado

A atividade agora funciona por cliques. O aluno escolhe cada etapa disponível e ela ocupa automaticamente o próximo espaço do pipeline.

Sequência esperada:

**Commit / Push → Build → Teste → Resultado / Alerta**

Controles disponíveis:

- **Desfazer**: remove somente a última escolha;
- **Recomeçar**: limpa toda a montagem;
- **Verificar pipeline**: confere a sequência;
- **Executar simulação**: só é habilitado após a ordem correta.

## Como funciona a simulação

Depois da ordem correta, a própria representação montada muda de estado:

1. Commit / Push → ✓ alteração enviada;
2. Build → ✓ build concluído;
3. Teste → ✕ falha: esperado 4, obtido 5;
4. Resultado / Alerta → ⚠ alerta enviado e fluxo interrompido.

Em seguida aparecem explicações sobre por que o Build passou, por que o Teste falhou e por que o pipeline foi interrompido. Só então o desafio de decisão de deploy é exibido.

## Estado e compatibilidade

A chave de armazenamento foi atualizada para `processosSemana21SimpleV3`. O estado incompatível da antiga esteira não é reaproveitado. Dados compatíveis, como identificação, tema, quizzes, respostas e cálculos, são migrados quando possível.

## Verificações realizadas

- `node --check script.js`: aprovado;
- busca por código antigo de drag and drop: nenhuma ocorrência;
- busca por caracteres corrompidos comuns (`MÃ`, `âœ`, `â†`, `�`): nenhuma ocorrência;
- IDs duplicados no HTML: nenhum;
- teste interativo da nova atividade em Chromium: aprovado;
- ordem incorreta rejeitada;
- Desfazer aprovado;
- Recomeçar aprovado;
- ordem correta aceita;
- simulação bloqueada antes da verificação;
- Teste falha com esperado 4 / obtido 5;
- Resultado / Alerta exibido;
- decisão de continuar deploy rejeitada;
- decisão de interromper deploy aceita;
- modo escuro alternado sem erro;
- ausência de overflow horizontal em 320, 375, 425, 768, 1024, 1366 e 1920 px.

A rodada de interação e responsividade executada nesta refatoração totalizou **29/29 verificações aprovadas**, sem exceções JavaScript no navegador de teste.

> Observação: o ambiente de teste bloqueia navegação para URLs locais, por isso os testes de interface foram executados em Chromium com os arquivos HTML, CSS e JavaScript carregados em memória. A lógica de `localStorage` e migração foi preservada e revisada estaticamente, mas a persistência após recarregamento não foi validada nessa rodada de navegador.
