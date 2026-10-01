---
titulo: "A code review vai acabar? Em sistema financeiro, ela muda de função"
titulo_seo: "Code review e IA: o que muda em sistemas financeiros"
meta_description: "Code review vai acabar com a IA? Veja por que, em fintech e ambiente regulado, a revisão deixa o estilo e passa a proteger regras e riscos. Leia."
slug: code-review-ia-sistemas-financeiros
data: 2026-10-01
categoria: carreira
resumo: "Peter Mattis, CTO da Cockroach Labs, prevê que vamos parar de ler código como paramos de ler assembly. Concordo em parte. Em ambiente regulado, a revisão deixa de caçar estilo e passa a proteger regra de negócio, segurança e conformidade."
palavra_chave: "code review com IA"
palavras_secundarias: ["agentes de código", "revisão de código em fintech", "liderança técnica", "ambiente regulado", "senioridade dev"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7511542581437042688/"
---

Peter Mattis não é um entusiasta qualquer de IA. Ele é cofundador e CTO da Cockroach Labs, criou o GIMP e foi revisor de legibilidade de C++ no Google. Em [entrevista ao The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/distributed-databases-with-peter), publicada em 30 de setembro, ele disse que os agentes estão melhorando a ponto de exigir cada vez menos escrutínio, e que, talvez ainda este ano ou no próximo, vamos deixar de olhar para o código do mesmo jeito que ninguém mais lê o assembly gerado pelo compilador.

Ele não fala de fora. Antes da IA, entregava cerca de 100 mil linhas de código de banco de dados por ano em produção. Hoje diz que produz ainda mais, sem queda de qualidade, disparando vários experimentos em paralelo. E conta que funcionários não técnicos da empresa criaram perto de mil aplicações internas em poucos meses.

Quando alguém com esse histórico diz que a code review como conhecemos vai acabar, vale parar para pensar. Eu parei, e minha resposta é: depende do que você chama de revisão.

## Code review com IA: revisão de estilo já é trabalho de máquina

Boa parte do que antes aparecia em comentário de pull request hoje não deveria nem chegar até um humano:

- Nome de variável, formatação, organização de arquivos.
- Violações óbvias de SOLID e de Clean Code.
- Testes faltando para o caminho feliz.
- Padrões repetidos que um linter ou um agente aponta em segundos.

Gastar o tempo de um sênior nisso sempre foi caro. Com agentes, ficou indefensável. Nesse ponto, Mattis está certo: a revisão linha a linha, focada em forma, tende a sumir.

## Revisão de código em fintech é controle de risco

A comparação com o assembly tem um furo. O compilador transforma uma especificação precisa em código de máquina de forma determinística. O agente transforma uma intenção, muitas vezes ambígua, em código que parece certo. São coisas diferentes.

Em sistema financeiro, o erro mais caro raramente é um bug de sintaxe. É uma regra de negócio interpretada errado, que passa em todos os testes porque os testes foram escritos com a mesma interpretação errada.

Pense no CNPJ Alfanumérico. Escrever o código da mudança é a parte fácil. O difícil é ter certeza de que nenhum ponto que tratava o CNPJ como número ficou para trás: validações, integrações com parceiros, bases antigas. Ou pense num limite de chamadas para uma registradora. Um agente escreve o throttling em minutos. Saber se aquele limite faz sentido para aquele parceiro, naquele horário, é outra conversa.

Nesses casos, a revisão humana não está procurando vírgula. Está respondendo a perguntas que o código sozinho não responde:

- Essa mudança respeita a regra regulatória, ou só a regra que alguém descreveu no ticket?
- Algum dado sensível está saindo de onde não deveria?
- Se o parceiro externo cair, o sistema degrada com segurança ou trava?
- Daqui a seis meses, alguém vai entender por que isso foi feito assim?

## O que muda no papel de quem revisa

Não acho que a revisão vá acabar. Acho que ela vai subir de nível. Em vez de ler cada linha, o revisor passa a revisar:

1. **A intenção:** o problema foi entendido do jeito certo antes de virar código?
2. **Os testes:** eles provam a regra de negócio ou só confirmam o que o código já faz?
3. **Os limites:** segurança, dados, integrações externas e comportamento em falha.
4. **A decisão:** por que essa abordagem e não outra.

Isso pede mais senioridade, não menos. Ler código gerado é fácil. Saber o que falta nele exige conhecer o domínio.

## Como eu aplicaria isso num time

Se você lidera um time e quer começar a mudar a revisão sem perder controle:

- Automatize tudo o que é forma: lint, formatação, análise estática e uma primeira passada por agente antes do humano.
- Separe os PRs por risco. Mudança de texto de tela não precisa do mesmo rigor que mudança em cálculo financeiro ou em integração regulatória.
- Exija que o PR explique a intenção e a regra de negócio, não só o que mudou.
- Use a revisão como mentoria: o tempo que sobra da revisão de estilo vai para discutir decisão de arquitetura.

## Os limites desse raciocínio

Mattis fala de uma empresa de banco de dados com engenheiros muito experientes e uma base de testes séria. O contexto dele é diferente da maioria dos times. E ele mesmo não crava prazo: diz que pode ser este ano ou o próximo.

Eu também posso estar subestimando a velocidade com que os agentes vão melhorar em entender regra de negócio. Mas, enquanto um erro de interpretação puder virar multa, retrabalho com o regulador ou dinheiro no lugar errado, alguém com contexto precisa olhar.

A code review que conhecemos, focada em estilo, provavelmente vai acabar. A revisão como controle de risco, não. Ela só fica mais exigente.

---

Fonte: The Pragmatic Engineer, ["Distributed databases with Peter Mattis"](https://newsletter.pragmaticengineer.com/p/distributed-databases-with-peter), 30/09/2026.
