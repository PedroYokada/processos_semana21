# Explicação da atividade prática — Simulação de pipeline

## Cenário
O roteiro apresenta um sistema financeiro em que uma alteração faz a função de soma retornar **2 + 2 = 5**. O objetivo é impedir que o defeito chegue ao cliente.

## Fluxo esperado
**Commit/Push → Build → Teste → Resultado/Monitoramento**.

## Passo 1 — Desenhar a esteira
O aluno deve representar a sequência automática. O foco não é decorar uma ferramenta, mas compreender a responsabilidade de cada etapa.

## Passo 2 — Identificar a falha
A resposta esperada é **Teste**. O build pode concluir com sucesso mesmo quando a regra de negócio está errada. O teste automatizado é a etapa responsável por validar o comportamento esperado.

## Passo 3 — Decisão técnica
Com **Build = sucesso** e **Teste = falha**, o sistema **não deve seguir para deploy**. A esteira atua como filtro de segurança e deve interromper o fluxo quando uma validação crítica falha.

## Distinção importante
- **Teste:** verifica comportamento esperado.
- **Monitoramento:** torna o estado/falha visível para a equipe agir rapidamente.

## Fechamento
Relacionar a decisão ao conceito de **fail fast** e à redução do **lead time** por meio de feedback mais rápido e menos retrabalho.
