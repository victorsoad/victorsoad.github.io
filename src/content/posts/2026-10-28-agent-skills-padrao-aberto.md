---
titulo: "Agent Skills virou padrão aberto: as regras do seu time podem morar num lugar só"
titulo_seo: "Agent Skills: padrão aberto para as regras do seu time"
meta_description: "A Anthropic doou o Agent Skills à Linux Foundation e mais de 70 plataformas leem o formato. Veja quais regras do seu time .NET vale a pena escrever."
slug: agent-skills-padrao-aberto
data: 2026-10-28
categoria: ia
resumo: "A Anthropic doou o padrão Agent Skills para a Agentic AI Foundation, da Linux Foundation, o mesmo caminho do MCP. Com mais de 70 plataformas lendo o mesmo formato, dá para escrever as convenções do time uma vez e servir a qualquer agente. O cuidado é tratar skill como código."
palavra_chave: "Agent Skills"
palavras_secundarias: ["SKILL.md", "agentes de código", "Agentic AI Foundation", "convenções de código", "Claude Code"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7521367322062872576/"
---

No dia 22 de outubro, a Anthropic anunciou que vai doar o padrão Agent Skills para a Agentic AI Foundation (AAIF), fundação da Linux Foundation. O MCP fez o mesmo caminho. Na prática, o formato deixa de pertencer a uma empresa.

Li o anúncio pensando menos na fundação e mais numa pergunta prática. Onde ficam hoje as regras de como o meu time escreve código?

## O que foi anunciado

Segundo o [post da Anthropic](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation), a doação inclui o padrão, o nome e o logo, a organização no GitHub e o domínio agentskills.io. A AAIF foi cofundada no ano passado pela Anthropic, pela Block e pela OpenAI, e já cuida do MCP.

Desde que o padrão foi publicado, em dezembro de 2025, mais de 70 plataformas de agentes passaram a ler skills, entre elas ChatGPT, Cursor, GitHub Copilot e VS Code. São cerca de 1 milhão de skills publicadas e quase 280 milhões de instalações.

A manutenção fica com engenheiros da Anthropic, do Google, da OpenAI e de outras empresas, que participam como pessoas, não como representantes das empresas. O roadmap proposto, ainda não fechado, tem três itens: releases versionados, um processo formal de propostas e um guia de segurança para quem escreve e instala skills.

Para quem não usou ainda: uma skill é uma pasta com um arquivo SKILL.md que ensina o agente a fazer uma tarefa específica ou a trabalhar num domínio. Pode vir acompanhada de scripts e material de referência.

## O problema que skill resolve

O erro mais comum que vejo em agente de código não é de sintaxe. É o agente não saber como a gente faz as coisas aqui.

Ele escreve um teste correto, mas com outro padrão de nome. Cria uma migration que funciona, mas sem o cuidado que o time combinou para tabela grande. Loga o objeto inteiro de uma requisição, com dado pessoal dentro. Nada disso quebra o build. Tudo isso volta na revisão.

Essas regras costumam estar espalhadas: numa página de wiki que ninguém abre, em comentários de PR antigos e, principalmente, na cabeça das pessoas mais experientes do time. O dev novo aprende por tentativa e erro. O agente, nem isso: cada sessão começa do zero.

Skill é um lugar para escrever esse "jeito da casa" de forma que o agente leia na hora em que precisa. Com o padrão aberto, a mesma pasta serve ao Claude Code, ao Copilot ou ao Cursor. O time não precisa reescrever as regras cada vez que troca de ferramenta ou que um dev prefere outra.

## O que eu colocaria em skill num time .NET

Eu começaria pelas regras que mais aparecem em comentário de revisão.

- Testes: como nomear, como organizar arrange/act/assert, qual biblioteca de fake usar, o que é teste de unidade e o que é de integração.
- Migrations: quando separar mudança de esquema e de dados, como tratar tabela grande, o que nunca fazer em produção.
- Contratos de API: versionamento, formato de erro, paginação, idempotência em operação que mexe com dinheiro.
- Log e dado sensível: o que nunca pode aparecer em log, como mascarar documento e conta.
- Eventos: como nomear, o que vai no payload, como lidar com mensagem repetida.

Repare que nenhuma delas é sobre C#. O agente já sabe C#. O que ele não sabe é a decisão que o time tomou.

Isso ajuda gente também. Uma regra escrita para a máquina entender costuma ficar mais clara para qualquer pessoa. O dev que chega ao time pode ler as mesmas skills e entender, em uma tarde, o que levaria semanas de revisão para aprender.

## Skill também é código

O que me preocupa é outra coisa. Skill desatualizada ensina errado, e ensina com confiança.

Se o time muda o padrão de log e esquece de atualizar a skill, o agente vai continuar aplicando a regra velha em todo PR. Pior do que não ter regra escrita é ter a regra errada escrita num lugar que todo mundo consulta.

Por isso eu trataria skill como qualquer outro código do repositório:

- Versionada junto com o projeto, não numa pasta pessoal.
- Com dono: alguém responde quando a regra muda.
- Revisada em PR, como o resto.
- Pequena e focada: uma skill por assunto, em vez de um manual de 40 páginas.

E tem a questão de segurança. Como a skill pode trazer scripts, instalar uma skill de terceiros é parecido com instalar um pacote: você está rodando código de outra pessoa dentro do seu ambiente. O próprio roadmap reconhece isso ao prever um guia de segurança. Até ele sair, eu só instalaria skill de fora depois de ler o conteúdo, como faria com qualquer dependência nova.

## O que ainda não sei

Releases versionados ainda estão só no roadmap, e isso é um ponto aberto. Se a especificação mudar, skills escritas hoje podem precisar de ajuste. Para regras internas do time, o risco é pequeno, porque o conteúdo principal é texto. Para quem pensa em distribuir skills mais elaboradas, vale acompanhar.

Também não está claro como cada ferramenta vai interpretar a mesma skill. Padrão comum não garante comportamento igual. Eu testaria a mesma skill em mais de um agente antes de assumir que funciona em todos.

Mesmo com essas dúvidas, acho que a direção está certa. O MCP resolveu como o agente acessa ferramentas; faltava um formato comum para o que o time espera dele. A primeira skill que eu escreveria seria a de log e dado sensível, porque é a regra que mais custa quando alguém esquece.

E você: se escrevesse uma única skill para o agente do seu time, qual regra da casa ela ensinaria?

Fonte: [Anthropic, "Donating Agent Skills to the Agentic AI Foundation" (22/10/2026)](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation)
