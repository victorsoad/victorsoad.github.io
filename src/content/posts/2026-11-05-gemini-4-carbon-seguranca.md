---
titulo: "Gemini 4 Carbon: o modelo que mais acha falha chegou só para defensores. Seu time está pronto para corrigir?"
titulo_seo: "Gemini 4 Carbon: modelo que acha falha e o seu patch lento"
meta_description: "O Gemini 4 Carbon lidera o ranking e foi treinado para achar falhas, mas só defensores têm acesso. Veja o que preparar no seu time antes de ele chegar."
slug: gemini-4-carbon-seguranca
data: 2026-11-05
categoria: ia
resumo: "O Google lançou o Gemini 4 Carbon, primeiro lugar no Artificial Analysis Intelligence Index e treinado para achar e corrigir vulnerabilidades. Por enquanto, só um grupo de defensores tem acesso. Mais útil do que saber quando vamos poder usar é saber quanto tempo o time leva para corrigir o que um modelo assim encontrar."
palavra_chave: "Gemini 4 Carbon"
palavras_secundarias: ["IA em cibersegurança", "vulnerabilidades", "gestão de patches", "dependências vulneráveis", "Google DeepMind"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7524073008542650368/"
---

No dia 28 de outubro, o Google anunciou o Gemini 4 Carbon, que ele chama de seu modelo mais forte, com capacidade de ponta em cibersegurança. Estreou em primeiro lugar no ranking da Artificial Analysis. E quase ninguém pode usar ainda.

Li o anúncio, e o que mais me fez pensar foi a ordem de liberação, mais do que o ranking.

## O que o Google anunciou

Segundo o [post do Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/), assinado por Koray Kavukcuoglu, o Carbon fez 59 pontos no Artificial Analysis Intelligence Index v5.0, o primeiro lugar. Chegou duas semanas depois do Gemini 4 Argon.

Os números de segurança são o centro do anúncio:

- 88,2% no SEC-bench Pro, que mede a capacidade de achar vulnerabilidades;
- 54,8% no ExploitGym, um benchmark de exploração de falhas;
- 71,0% no CWE-bench, da Collinear, que mede correção na causa raiz;
- mais que o dobro da taxa de sucesso do Argon para gerar código seguro, num teste interno;
- 0,0% de ataques bem-sucedidos no benchmark de prompt injection indireto da Gray Swan, contra 0,7% do Argon.

O Google observa que os benchmarks externos foram rodados sem as travas de segurança do produto.

O preço introdutório é de US$ 2 por milhão de tokens de entrada e US$ 10 por milhão de saída. Depois, sobe para US$ 4 e US$ 20. O post não diz quanto tempo dura o período introdutório.

## Primeiro os defensores, depois o resto

Desde a semana do anúncio, o Carbon está disponível para "um subconjunto de defensores cibernéticos", e o acesso vai crescer aos poucos para outros parceiros de confiança pelo Fairwind Program. Para devs, empresas e consumidores, o Google fala em "o quanto antes", sem data. Diz que ainda está colhendo feedback e ajustando as travas, e que participa do processo voluntário do governo dos EUA para testar modelos antes do lançamento.

Entendo a lógica. Se um modelo é bom em achar falha, faz sentido que quem defende sistemas o receba antes.

Eu só leio essa vantagem como uma janela curta. O post não fala em uso ofensivo, mas um modelo que tira 54,8% num benchmark de exploração acha a falha e também mostra como ela é explorada. Cedo ou tarde, modelos com essa capacidade vão estar disponíveis para qualquer um, deste fornecedor ou de outro. A partir daí, achar vulnerabilidade fica barato para todo mundo.

## O gargalo está na correção

Quem acompanha alerta de segurança num repositório sabe que encontrar o problema raramente é a parte difícil. O scanner já avisa, e o alerta fica lá, aberto, semana após semana.

O que trava costuma ser outra coisa. Ninguém sabe direito quais sistemas usam aquela biblioteca. A atualização muda uma versão major e ninguém leu o changelog. Os testes não cobrem o fluxo que a dependência toca, então ninguém tem coragem de subir. E o deploy depende de uma pessoa ou leva dias.

Em sistema financeiro, isso pesa mais. O patch costuma ficar parado por medo de quebrar alguma coisa que não tem teste, raramente por dificuldade técnica.

Um modelo como o Carbon pode encontrar muito mais falhas do que o time consegue tratar. Se o processo de correção já é lento hoje, uma lista dez vezes maior só aumenta o backlog.

## O que dá para preparar antes de ter acesso

Nada disso depende do Carbon. É o que eu faria agora, sabendo que esse tipo de ferramenta vai chegar para os dois lados.

1. Ter um inventário de dependências: para cada serviço, quais bibliotecas e versões estão em produção. Sem isso, a pergunta "onde estamos expostos?" leva dias para ser respondida.
2. Testar bem os fluxos críticos. Não precisa de cobertura alta em tudo; precisa de confiança nos caminhos que mexem com dinheiro, autenticação e dado pessoal, para subir um patch sem medo.
3. Encurtar o caminho até produção. Se uma correção pequena leva uma semana para subir, o sistema fica exposto uma semana, seja quem for que achou a falha.
4. Dar dono a cada alerta. Alguém precisa decidir se corrige agora, aceita o risco ou agenda.
5. Corrigir em lotes pequenos. Quando a ferramenta sugerir dezenas de correções, revisar uma por vez, com build e testes rodando, em vez de um PR gigante.

O número do anúncio que mais me interessa é o do CWE-bench, porque mede correção na causa raiz, além da detecção. Se os modelos ficarem bons em propor o patch certo, o trabalho que sobra é revisar e entregar, e isso depende do processo do time.

## O que ainda não sei

Os números são do Google, e as comparações diretas com modelos de outros laboratórios aparecem em gráficos, fora do texto. Alguns resultados vêm de testes internos. Até o acesso ser aberto, não dá para conferir nada disso de forma independente.

Também não sei quando devs e empresas vão poder usar, nem quanto dura o preço introdutório. E não sei como as travas do produto vão se comportar no dia a dia, já que o Google diz que os benchmarks externos foram medidos sem elas.

Por isso, a pergunta que eu levaria para o time é outra: se um modelo encontrasse hoje todas as falhas do seu sistema, quanto tempo vocês levariam para corrigir?

Fonte: [Google, "Introducing Gemini 4 Carbon" (28/10/2026)](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/)
