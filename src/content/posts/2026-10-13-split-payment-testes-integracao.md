---
titulo: "Split payment em teste: o imposto vai entrar no fluxo do pagamento"
titulo_seo: "Split payment em teste: o imposto entra no pagamento"
meta_description: "Split payment entra em teste com PSPs em 15/10. Veja os quatro informes do escopo e as perguntas de integração para responder antes de 2027. Confira."
slug: split-payment-testes-integracao
data: 2026-10-13
categoria: regulatorio
resumo: "Em 15 de outubro, a Receita Federal e o Comitê Gestor do IBS começam a testar a integração da plataforma do split payment com prestadores de pagamento. Ainda sem efeito real, mas o desenho já mostra que tipo de integração vem aí: orientada a eventos, presa à liquidação e com o fisco no meio do caminho."
palavra_chave: "split payment"
palavras_secundarias: ["reforma tributária", "IBS e CBS", "plataforma pública do split payment", "integração de pagamentos", "PSP"]
linkedin: "https://www.linkedin.com/feed/update/urn:li:share:7515749052672671744/"
---

Na quinta-feira, 15 de outubro, a Receita Federal e o Comitê Gestor do IBS (CGIBS) começam os testes de integração da Plataforma Pública do Split Payment com os primeiros prestadores de serviços de pagamento. Nenhum centavo de imposto vai ser separado de verdade agora. Mas o desenho da integração já está na mesa.

Li o comunicado e o escopo dos testes e saí com a impressão de que muita gente ainda trata o split payment como assunto do contador. Para quem constrói sistema de pagamento, é integração. E das mais sensíveis.

## O que começa na quinta

Segundo o [Comsefaz](https://comsefaz.org.br/novo/split-payment-entra-em-fase-de-testes-a-partir-de-15-de-outubro-saiba-o-que-muda/), os testes acontecem em ambiente controlado e têm caráter exclusivamente técnico. Nenhuma transação será processada em definitivo pelo split payment, e os PSPs participantes não estarão sujeitos a penalidades. O objetivo é verificar a comunicação entre sistemas, achar falhas e ajustar antes do uso efetivo.

O primeiro grupo de PSPs foi indicado pelas entidades do setor à Confederação Nacional das Instituições Financeiras (CNF), com prazo até 2 de outubro. Os demais poderão se inscrever a partir de 16 de novembro, direto com a Receita e o CGIBS; os formulários saem em 13 de novembro.

A previsão é usar o mecanismo no segundo semestre de 2027, de forma gradual e facultativa, começando pelas operações entre empresas (B2B). O pagamento do consumidor pessoa física não muda nesse primeiro momento.

## O que entra no escopo dos testes

O [comunicado da Receita](https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11388), publicado em 9 de outubro, lista quatro informes que podem ser testados:

- **Transação Iniciada:** boleto, Pix Dinâmico e Pix Automático.
- **Transação Atualizada:** boleto e Pix Dinâmico.
- **Baixa, exceto por pagamento:** boleto, Pix Dinâmico e Pix Automático.
- **Informe Preliminar de Pagamento:** boleto, Pix Dinâmico, Pix Automático, Pix Estático, TED e TEF.

Contratos, campos, validações e respostas estão no Manual de Integração e no OpenAPI da versão liberada para o teste. Segundo o [Portal Contábeis](https://www.contabeis.com.br/noticias/79626/receita-e-cggibs-aprovam-procedimentos-para-o-split-payment/) (24/09), a Receita e o CGIBS aprovaram seis documentos técnicos: Manual de Operações, Manual de Integração, Documento OpenAPI, Manual de Tempos, Manual de Redes e Manual de Segurança.

## Por que isso é integração, e não papelada

O mecanismo separa a parcela de IBS e CBS na liquidação financeira, e o fornecedor recebe o valor líquido. Quando estiver valendo, essa parcela não fica disponível para o fornecedor usar.

Isso muda o lugar do tributo no sistema. Hoje, para quem desenvolve, imposto costuma ser cálculo, nota e declaração, feitos antes ou depois do pagamento. Com o split, uma parte do fluxo de liquidação passa a envolver um sistema externo, do fisco.

Um detalhe me parece importante: a plataforma pública não executa as regras de cálculo dos tributos. Ela recebe eventos, valida e registra. Ou seja, é um ponto de comunicação. A lista de informes confirma: transação iniciada, atualizada, baixada, paga. É um fluxo de eventos com estado, igual a muitos que já rodam em fila dentro das empresas, só que agora com o fisco como destinatário.

## As perguntas que eu faria lendo a OpenAPI

Quem já passou por adequação regulatória num módulo de integrações conhece o padrão: a primeira versão da documentação é o começo da conversa, não o fim. Por isso, antes de escrever código, eu iria atrás de quatro respostas.

**Ordem e duplicidade.** O que acontece se o informe de transação atualizada chegar antes do de transação iniciada? E se o PSP reenviar um informe depois de um timeout, sem saber se o primeiro foi aceito? Sem uma chave de idempotência clara, o reenvio vira duplicidade.

**Indisponibilidade.** Se a plataforma estiver lenta ou fora, o pagamento espera, segue ou falha? Existe um Manual de Tempos e um Manual de Redes no pacote; é lá que eu procuraria os prazos e o comportamento esperado antes de decidir onde entra o circuit breaker e o que fica em fila para reenvio.

**Conciliação.** O split exige ligar três coisas: a operação, o documento fiscal e o pagamento. O próprio Comsefaz diz que a vinculação entre documento fiscal eletrônico e transação financeira é fundamental. Quando os três não baterem, quem corrige, e em qual sistema?

**Versão.** Os testes usam a versão "desta liberação" do manual e da OpenAPI. Vai haver outras. Contrato versionado e validação automática contra o esquema no pipeline evitam descobrir a mudança em produção.

## O que dá para fazer agora, mesmo fora do primeiro grupo

Quem não está entre os primeiros PSPs pode se inscrever a partir de 16 de novembro, e o uso real só começa em 2027. Não é motivo para esperar.

- Ler os seis documentos, em especial Integração, OpenAPI e Tempos.
- Mapear os eventos do próprio fluxo de pagamento para os quatro informes e anotar onde não há correspondência.
- Isolar a integração com a plataforma numa camada própria, separada da regra de negócio, para que a mudança de versão não se espalhe pelo sistema.
- Guardar cada informe enviado com identificador, resposta e horário. Na hora de conciliar, esse registro vale mais do que qualquer log.

## Os limites desta conversa

O teste de outubro não é implantação. Não há recolhimento, não há efeito financeiro e não há penalidade. A adoção prevista é gradual, facultativa e começa pelo B2B em 2027. As respostas para as perguntas acima podem estar nos manuais; não dá para afirmar o que eles dizem sem lê-los. E as notícias não definem quem será obrigado a usar o mecanismo, então qualquer plano depende de acompanhar as próximas normas.

O que já dá para dizer é que o imposto vai passar pelo mesmo caminho do dinheiro. Em sistema financeiro, tudo que entra nesse caminho precisa ser tratado como integração crítica desde o primeiro teste.

Fonte: [Comsefaz, 09/10/2026](https://comsefaz.org.br/novo/split-payment-entra-em-fase-de-testes-a-partir-de-15-de-outubro-saiba-o-que-muda/) · [comunicado da Receita Federal via CRC-SP, 09/10/2026](https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11388) · [Portal Contábeis, 24/09/2026](https://www.contabeis.com.br/noticias/79626/receita-e-cggibs-aprovam-procedimentos-para-o-split-payment/)
