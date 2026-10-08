---
titulo: "Haiku 5.5 e o subagente barato: quem faz o trabalho braçal e quem decide"
titulo_seo: "Claude Haiku 5.5 como subagente: quem executa e quem decide"
meta_description: "O Claude Haiku 5.5 custa até 90% menos e já resolve tarefas de agente de código. Veja onde usar o modelo pequeno como subagente e onde evitar."
slug: haiku-5-5-subagente-barato
data: 2026-10-08
categoria: ia
resumo: "A Anthropic lançou o Claude Haiku 5.5, até 90% mais barato que o anterior e, pela primeira vez, capaz de resolver parte das tarefas de terminal de um agente de código. A própria empresa diz onde ele não serve, e é aí que está a parte útil para quem usa agente no dia a dia."
palavra_chave: "Claude Haiku 5.5"
palavras_secundarias: ["subagentes", "agentes de código", "custo de LLM", "engenharia de contexto", "GitHub Copilot"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7513951112446660608/"
---

O Haiku 4.5 fazia 0,0% no Terminal-Bench 4.0, um benchmark de tarefas de terminal. O Claude Haiku 5.5, lançado em 7 de outubro, faz 39,2%. E custa US$ 0,10 por milhão de tokens de entrada, contra US$ 1,00 do anterior.

A notícia fácil seria "modelo barato ficou bom". A que me interessa é outra: o que muda na divisão de trabalho dentro de um agente de código.

## O que a Anthropic anunciou

Os números são todos da [página oficial do lançamento](https://www.anthropic.com/claude-haiku-5-5):

- Preço por milhão de tokens: US$ 0,10 de entrada e US$ 0,50 de saída para prompts de até 100 mil tokens; acima disso, US$ 0,50 e US$ 2,50. O Haiku 4.5 custava US$ 1,00 e US$ 5,00.
- A empresa fala em 90% mais barato nas requisições de até 100 mil tokens e em cerca de 75% menos no custo médio de execução, já contando o tokenizer novo, que gasta um pouco mais de tokens por tarefa.
- É o primeiro Haiku com nível de esforço ajustável, de Low a Max, para trocar custo por qualidade.
- Nos benchmarks: 39,2% no Terminal-Bench 4.0 (o Sonnet 5.5 faz 70,6%) e 72,4% no OSWorld 2.1 (o Haiku 4.5 fazia 15,7%).

No mesmo dia, o modelo entrou no [GitHub Copilot](https://github.blog/changelog/2026-10-07-claude-haiku-5-5-in-github-copilot/), nos planos Pro, Pro+, Max, Business e Enterprise, com seletor de modelo no VS Code, no Visual Studio, na CLI e nas IDEs da JetBrains, cobrado pelo preço de lista do provedor.

## O detalhe que a própria Anthropic deixou claro

O trecho de que mais gostei na página não é um número. A Anthropic recomenda o Haiku 5.5 para trabalho rápido, repetitivo e de alto volume (resumo, compactação de contexto, consultas, classificação) e como subagente de um Opus ou de um Sonnet em tarefas de código. E diz com todas as letras que, para código agêntico complexo, o tipo de tarefa que o Terminal-Bench mede, Sonnet e Opus continuam melhores.

São 39% contra 70%, uma diferença grande. Ninguém deveria trocar o modelo principal do agente por causa desse lançamento. O ponto é outro.

## O grande decide, o pequeno executa

Quem usa agente de código no dia a dia sabe que boa parte da sessão não é decisão. É procurar onde uma classe é usada, ler um log enorme, rodar os testes e resumir o que quebrou, condensar o histórico da conversa para caber no contexto. Em muita configuração, tudo isso passa pelo mesmo modelo caro que decide a arquitetura.

Um subagente pequeno que dá conta dessas tarefas muda a conta. O modelo principal recebe o resumo pronto, gasta menos contexto e fica com a parte que exige julgamento: o que mudar, onde e por quê.

Uso Claude e agentes no meu fluxo de trabalho, e a sensação de "estou pagando modelo de ponta para fazer grep" é conhecida. Engenharia de contexto, na prática, é muito isso: decidir o que chega ao modelo que decide.

## Onde eu não usaria o modelo pequeno

- **Regra de negócio sensível.** Em sistema financeiro, um cálculo de juros ou uma regra de conciliação mal interpretada passa nos testes e custa caro depois. O subagente pode levantar o contexto, mas quem propõe a mudança é o modelo maior, e quem aprova é uma pessoa.
- **Decisão de arquitetura e refatoração ampla.** Errar o caminho custa mais do que qualquer economia de token.
- **Resumo que vira verdade sem revisão.** Se o subagente resume um log e omite a linha que importava, o modelo principal decide em cima de informação incompleta. O erro do pequeno vira erro do grande.

Esse último ponto é o que mais me preocupa. Numa cadeia de agentes, o resultado depende do elo mais fraco, e o elo mais fraco agora é o mais barato.

## O custo que volta pela quantidade

Modelo barato tem um efeito colateral conhecido: incentiva disparar mais chamadas. Um subagente para cada arquivo, um resumo para cada log, uma verificação extra "porque é barato". O preço por token caiu, mas, se o número de chamadas multiplicar, a conta volta para perto de onde estava, só que mais difícil de enxergar.

E o esforço ajustável é mais um parâmetro que alguém precisa calibrar. Esforço baixo em tarefa difícil gera resposta ruim e barata; esforço máximo em tudo anula parte da economia.

## Como eu começaria

1. Listar as tarefas repetitivas que o agente faz numa sessão típica: busca, leitura de log, resumo de testes, compactação.
2. Mover só essas para o subagente pequeno e manter o modelo principal onde ele já está.
3. Medir duas coisas por algumas semanas: o custo total, não só o custo por chamada, e quantas vezes o modelo principal precisou refazer algo porque o resumo veio incompleto.
4. Ajustar o esforço por tipo de tarefa, não um valor único para tudo.

## Limites

Os benchmarks e os percentuais de economia são da Anthropic, medidos em tarefas que ela escolheu, e os relatos de clientes na página também vêm do fabricante. No Copilot, a liberação é gradual, e o administrador dos planos Business e Enterprise pode desligar o modelo. Vale testar no seu repositório, com as suas tarefas, antes de mudar a configuração do time.

No seu fluxo com agentes, qual tarefa você entregaria hoje a um modelo pequeno sem revisar?

Fonte: [Anthropic, "Claude Haiku 5.5" (07/10/2026)](https://www.anthropic.com/claude-haiku-5-5)
