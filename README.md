# 📦 HAMA Apps Script Automations

Coleção de automações em Google Apps Script que movem e-mails do Gmail para o Google Drive de forma organizada e auditável, usadas na rotina de TI do HAMA.

| Automação | O que faz | Gatilho sugerido | Função principal |
|---|---|---|---|
| [`bacula-log-archiver`](bacula-log-archiver/) | Converte e-mails de log do Bacula em PDF monoespaçado, em pastas por data | Periódico (ex.: diário) | `salvarLogsBaculaComoPDFEstilizado` |
| [`nf-archiver`](nf-archiver/) | Arquiva notas fiscais recebidas por e-mail em `Ano/Mês/Fornecedor`, com log de auditoria | Diário | `arquivarNotasFiscais` |
| [`chamados-archiver`](chamados-archiver/) | Converte ordens de serviço (Rasptelles, Ksys, SMED) em PDF, em `Sistema/Ano/Mês` | A cada hora | `arquivarChamados` |

## Estrutura

```
hama-apps-script-automations/
├── bacula-log-archiver/   README · bacula-log-archiver.gs · docs/
├── nf-archiver/           README · nf_archiver.gs · fornecedores.config.example.gs
├── chamados-archiver/     README · chamados_archiver.gs · CONFIG.example.gs · CHANGELOG · docs/
├── CHANGELOG.md
└── LICENSE
```

## Como implantar uma automação

Cada pasta é um projeto Apps Script **independente**. Não junte os arquivos de duas automações no mesmo projeto: elas compartilham nomes globais (`CONFIG`, `MESES`, `obterOuCriarPasta`, `arquivoJaExiste`, `salvarLog`) e um sobrescreveria o outro sem aviso.

1. Crie um projeto novo em [script.google.com](https://script.google.com) para a automação desejada.
2. Cole os arquivos `.gs` da pasta correspondente.
3. Preencha a configuração (ID da pasta raiz do Drive, marcadores do Gmail, remetentes). Os valores aparecem como `SEU_ID_DE_PASTA_NO_DRIVE` ou como exemplos.
4. Autorize as permissões de Gmail e Drive.
5. Crie o gatilho indicado na tabela acima.

## Segurança e configuração

- Este repositório **não contém** IDs de pastas, e-mails nem fornecedores reais; tudo é placeholder.
- Mantenha os valores reais apenas no projeto do Apps Script (ou em arquivos `*.local.gs`, já ignorados pelo Git).
- Confira que as pastas do Drive de destino não estão compartilhadas como "qualquer pessoa com o link" e restrinja o acesso ao mínimo necessário.

## Autor

**Fernando S. De Santana Júnior**

## Licença

MIT. Ver [LICENSE](LICENSE).
