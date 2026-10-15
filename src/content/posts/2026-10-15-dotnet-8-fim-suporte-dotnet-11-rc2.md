---
titulo: ".NET 11 RC2 saiu, mas a data que importa é 10 de novembro"
titulo_seo: "Fim do suporte .NET 8: migrar para .NET 10 ou para o 11?"
meta_description: ".NET 8 e .NET 9 saem de suporte em 10/11. A versão final do .NET 11 sai na mesma semana. Veja por que migrar para o .NET 10 agora e como planejar."
slug: dotnet-8-fim-suporte-dotnet-11-rc2
data: 2026-10-15
categoria: desenvolvimento
resumo: "O .NET 11 RC2 chegou com licença para produção. Mas a data que deveria estar no quadro do time é 10/11/2026, quando o .NET 8 e o .NET 9 saem de suporte no mesmo dia. Por que eu migraria para o .NET 10 agora e deixaria o 11 para depois."
palavra_chave: "fim do suporte .NET 8"
palavras_secundarias: [".NET 11 RC2", "migração .NET 10", ".NET LTS e STS", "política de suporte .NET", "NuGet idade mínima de pacote"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7516467953538658305/"
---

O .NET 11 RC2 saiu na terça, 13 de outubro, com licença "go-live": a Microsoft diz que dá para usar em produção. É o tipo de notícia que faz todo mundo abrir o changelog.

Só que a data que deveria estar no quadro do time é outra: 10 de novembro de 2026. Nesse dia, o .NET 8 e o .NET 9 saem de suporte, juntos.

## O que saiu no RC2

O [anúncio do RC2](https://devblogs.microsoft.com/dotnet/dotnet-11-rc-2/) lista, entre outras coisas:

- leitura incremental de CBOR;
- APIs experimentais de ML-KEM composto e HPKE, a parte de criptografia pós-quântica;
- mensagens de DataAnnotations formatadas com argumentos próprios de cada atributo;
- concorrência inicial de HTTP/2 configurável;
- virtualização do QuickGrid, no ASP.NET Core, deixando de ser experimental;
- avaliação de wildcards mais rápida no MSBuild;
- idade mínima de publicação de pacotes configurável pelo CLI do NuGet.

O post traz basicamente os títulos. Os detalhes estão nas notas completas e nas páginas de novidades do C# 15 e do EF Core. Não há data de GA no texto; pela [página de suporte da Microsoft](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core), o lançamento será na .NET Conf, de 10 a 13 de novembro.

## A data que importa: 10 de novembro

Pela mesma página de suporte, o .NET 8 (LTS) e o .NET 9 (STS) terminam o suporte em 10/11/2026. Os dois já estão em fase de manutenção, recebendo só correções de segurança.

O .NET 9 terminaria antes, em 12 de maio de 2026. Mas em setembro de 2025 a Microsoft [aumentou o suporte das versões STS para 24 meses](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/), e o fim dele caiu no mesmo dia do .NET 8.

Repare na coincidência: o .NET 11 vai ser lançado na mesma semana em que o .NET 8 deixa de receber correções. Quem deixar a migração para novembro vai escolher versão no meio do evento de lançamento.

## Por que isso pesa mais em sistema financeiro

Runtime sem suporte não para de funcionar no dia 11. A aplicação continua no ar. O que acaba é a correção de segurança.

Em sistema que mexe com dinheiro ou com dado pessoal, isso vira pergunta de auditoria, de pentest e de cliente. "Rodamos uma versão sem correções, mas está funcionando" não é uma resposta que alguém queira dar.

Já passei por algumas trocas de versão do .NET, e a parte difícil quase nunca foi o código. Foi descobrir tudo o que depende da versão: imagem de container, runtime da nuvem, pipeline, pacote antigo que ninguém lembra por que está ali.

## .NET 10 ou .NET 11?

Tem um detalhe aqui que muda a conversa. Pela regra da Microsoft, versões pares são LTS, com 3 anos de suporte, e ímpares são STS, agora com 24 meses. O .NET 10 é LTS e vai até 14/11/2028. O .NET 11 é ímpar, portanto STS, e pela regra de 24 meses o fim dele deve ficar perto do fim do .NET 10. A data exata ainda não foi publicada.

Ou seja: tempo de suporte deixou de ser o grande argumento para escolher entre os dois. O argumento agora é maturidade.

O .NET 10 está disponível há quase um ano e já acumulou correções. O .NET 11 vira versão final na semana do prazo. Migrar às pressas para uma versão lançada naquela semana é somar dois riscos: o da troca e o da versão nova.

A minha escolha seria:

- .NET 8 para .NET 10 agora;
- .NET 11 num branch de teste, para entender o que muda;
- a decisão de ir para o 11 ou esperar a próxima LTS fica para 2027, com calma.

## O que vale olhar no RC2 mesmo assim

Duas coisas me chamaram atenção, mesmo sem pressa de adotar.

**Idade mínima de publicação no NuGet.** Pelo título, dá para configurar pelo CLI uma idade mínima para os pacotes publicados. Muitos ataques de cadeia de suprimentos dependem de alguém instalar a versão maliciosa logo depois que ela é publicada. Esperar alguns dias antes de aceitar uma versão nova é uma defesa simples. Vale ler as notas para ver como funciona antes de ligar.

**Criptografia pós-quântica.** As APIs de ML-KEM composto e HPKE ainda são experimentais. Não é para produção, mas é um bom momento para mapear onde o sistema usa troca de chaves e criptografia assimétrica, porque essa migração também vai chegar.

## Checklist curto de 8 para 10

1. Inventário: quais serviços ainda estão no 8 ou no 9, em que imagem base e em que runtime de nuvem. Confirme que o runtime gerenciado do seu provedor já aceita o .NET 10.
2. Atualizar `TargetFramework`, a versão do SDK no `global.json` e as imagens do pipeline.
3. Pacotes: achar dependência sem versão compatível antes de começar.
4. Ler a lista de breaking changes do .NET 9 e do .NET 10, já que você vai pular uma versão.
5. Rodar os testes de integração, não só os unitários. Serialização, datas e criptografia são onde costuma aparecer surpresa.
6. Subir aos poucos, serviço por serviço, com volta rápida se algo der errado.

## Limites

Este texto é sobre ter runtime com suporte, não sobre segurança completa. Trocar a versão não corrige dependência vulnerável nem configuração errada. E a data de fim do .NET 11 ainda não está publicada; a estimativa acima vem da regra geral da Microsoft.

Se o .NET 8 ainda está em produção aí, o RC2 é só um lembrete. Não é surpresa: LTS tem três anos de suporte, e o .NET 8 completa três anos agora.

Fonte: [Announcing .NET 11 Release Candidate 2, .NET Blog (13/10/2026)](https://devblogs.microsoft.com/dotnet/dotnet-11-rc-2/) · [Política de suporte do .NET](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core)
