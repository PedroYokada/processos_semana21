# Resumo dos conceitos — Semana 21

## 1. Wall of Confusion
Conflito histórico entre Desenvolvimento e Operações quando as equipes trabalham com objetivos e responsabilidades isoladas. O efeito esperado no processo é atraso, retrabalho, baixa visibilidade e problemas descobertos tarde.

## 2. Agile → DevOps
A aula apresenta Agile como avanço de colaboração e velocidade dentro do time, mas destaca a necessidade de integrar também operações e infraestrutura. DevOps aparece como cultura que conecta pessoas, processos e tecnologia.

## 3. CALMS
- **Culture:** colaboração e responsabilidade compartilhada.
- **Automation:** automatizar tarefas repetitivas para reduzir erro humano.
- **Lean:** eliminar desperdícios e focar no que agrega valor.
- **Measurement:** medir desempenho e qualidade com dados.
- **Sharing:** compartilhar ferramentas, sucessos, aprendizados e falhas.

## 4. Pipeline de feedback
Sequência automática disparada a cada alteração para validar o software rapidamente. Fluxo-base: **commit/push → build → teste → resultado/monitoramento**.

## 5. Build, Test e Monitor
- **Build:** prepara/compila o software e suas dependências.
- **Test:** valida comportamento e lógica esperada.
- **Monitor:** torna o status e as falhas visíveis para ação rápida.

## 6. Fail fast
Descobrir falhas cedo, não “falhar de qualquer jeito”. O objetivo é reduzir impacto, retrabalho e custo de correção.

## 7. Lead Time
Tempo desde o início de uma mudança/ideia até sua chegada à produção.

## 8. Métricas DORA
- **Lead Time:** tempo até produção.
- **Deployment Frequency:** frequência de entrega/deploy.
- **MTTR:** tempo médio para restaurar o serviço após falha.
- **Change Fail Rate:** porcentagem de deploys que provocam falhas.

## 9. Interpretação conjunta
As métricas devem ser analisadas como equilíbrio entre **velocidade** e **estabilidade**. A aula não deve reduzir DORA a um ranking de pessoas.
