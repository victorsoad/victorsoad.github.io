---
titulo: "GPT-6 em três níveis: escolher o modelo virou decisão de arquitetura"
titulo_seo: "GPT-6 em três níveis: o modelo virou decisão de arquitetura"
meta_description: "GPT-6 tem 100x de diferença de preço entre modelos. Roteamento por tarefa, cache, limites e fallback tratam o LLM como integração. Veja como começar."
slug: gpt-6-escolha-de-modelo-arquitetura
data: 2026-10-03
categoria: ia
resumo: "A OpenAI publicou o guia da família GPT-6 com três modelos e 100 vezes de diferença no preço por token entre o mais caro e o mais barato. Com esse intervalo, escolher o modelo vira desenho de sistema: roteamento por tarefa, cache, limites e fallback, como em qualquer integração cara."
palavra_chave: "GPT-6"
palavras_secundarias: ["custo de LLM", "roteamento de modelos", "prompt caching", "LLM em backend", "arquitetura com IA"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7512221547500290048/"
---

Na nova família GPT-6, o modelo mais caro custa 100 vezes mais por token do que o mais barato. Com essa diferença, a pergunta "qual modelo a gente usa?" passa a ter o mesmo peso de "fila ou chamada síncrona?".

## O que a OpenAI publicou

Em 2 de outubro, a OpenAI publicou um [guia prático para desenvolver com a família GPT-6](https://openai.com/index/practical-guide-building-gpt-6/). São três modelos, com preço por milhão de tokens:

- **GPT-6 Astra:** US$ 10 de entrada e US$ 50 de saída. Indicado para o raciocínio mais difícil, quando se precisa da inteligência máxima.
- **GPT-6.1 Sol:** US$ 2 e US$ 10. Indicado para código complexo, pesquisa e uso de computador.
- **GPT-6 Luna:** US$ 0,10 e US$ 0,50. Indicado para tarefas focadas em escala e trabalho repetido com objetivo claro, como extrair campos de faturas, classificar solicitações ou gerar resumos estruturados.

O guia também descreve níveis de esforço de raciocínio (baixo para extrair fatos, médio para planejar e comparar opções, alto para depuração difícil), cache de prompt com tokens em cache até 95% mais baratos, dependendo do modelo, chamada assíncrona de ferramentas e fluxos com vários agentes, em beta no Sol.

Repare em um detalhe da tabela: nos três modelos, o token de saída custa cinco vezes o de entrada.

## Por que isso é decisão de arquitetura

Quando o mesmo milhão de tokens de entrada custa US$ 10 em um modelo e US$ 0,10 em outro, usar o mais caro para tudo deixa de ser excesso de cuidado. Vira o novo `SELECT *`: funciona no começo, ninguém repara, até a fatura chegar.

O próprio guia já separa os modelos por tipo de tarefa. O passo seguinte é levar essa separação para dentro do fluxo. Um pedido chega, o modelo barato classifica e extrai os campos; só o que for ambíguo sobe para um modelo maior. O mesmo processo passa a ter etapas com custos muito diferentes, e cada etapa paga só o que precisa.

O raciocínio é o mesmo de escolher entre Lambda e container, ou entre ler do cache e ler do banco: cada caminho tem um custo, e o desenho decide por onde cada requisição passa.

## Trate o LLM como integração externa

Em integração financeira, aprendi a tratar todo serviço externo como caro e instável até prova em contrário. Chamada de LLM no backend merece o mesmo tratamento:

- Controle de vazão e backoff. O provedor tem limites; seu sistema precisa respeitá-los antes de receber o erro.
- Circuit breaker e fallback. Se o modelo maior falhar ou estourar o orçamento, o que acontece? Cair para o modelo menor, mandar para uma fila de revisão humana ou recusar com clareza. Precisa estar decidido antes do incidente.
- Orçamento por requisição. Limite de tokens de saída e timeout. Como a saída custa cinco vezes a entrada, resposta longa sem necessidade é o desperdício mais caro.
- Cache de verdade. O desconto do cache só aparece se a parte repetida do prompt for de fato repetida: instruções e contexto fixos, sempre iguais.
- Custo visível por etapa. Registrar modelo, tokens e custo em cada chamada. Sem isso, ninguém sabe qual etapa está pesando.

Fazemos isso com qualquer API de terceiro há anos. Mesmo assim, muita gente ainda trata o LLM como uma função local que sempre responde.

## Trade-offs e o que não funciona

Roteamento por tarefa tem custo. É mais um ponto de decisão no fluxo, mais caminho para testar e mais lugar para depurar quando algo sai errado.

Modelo barato erra de um jeito diferente. Se o classificador manda um caso difícil para o modelo menor, o erro pode custar mais do que a economia. Por isso a escolha precisa de avaliação com casos reais, não de intuição.

Preço muda. A tabela de hoje não é contrato. O modelo e o provedor precisam ficar atrás de uma interface e de configuração, não espalhados pelo código como constante.

E o esforço de raciocínio é um segundo eixo. O mesmo modelo, com esforço diferente, tem custo e latência diferentes. Escolher o modelo e esquecer o esforço é resolver metade da conta.

## Como eu começaria

1. Listar as tarefas do fluxo e separá-las por tipo: extrair, classificar, decidir, depurar.
2. Começar cada tarefa pelo menor modelo que atende, com um conjunto de casos reais para comparar.
3. Subir de modelo só onde a avaliação mostrar ganho que pague a diferença.
4. Medir custo por etapa desde o primeiro dia.
5. Revisar as escolhas quando a tabela de preços ou os modelos mudarem.

## Limites desta análise

Os preços e as indicações de uso são do guia da OpenAI de 02/10/2026. Este texto não é um benchmark: cada sistema precisa da própria avaliação, com os próprios dados. E o que vale para essa família vale, com outros números, para qualquer provedor que ofereça modelos em níveis.

Escolher o modelo por tarefa dá mais trabalho na primeira semana. Depois, sai mais barato todo mês.

Fonte: OpenAI, guia prático para desenvolver com a família GPT-6 (02/10/2026) — https://openai.com/index/practical-guide-building-gpt-6/
