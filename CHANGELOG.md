# Changelog

## v1.0.0 - 2026-10-14

### Changed
- Repositório consolidado: reúne as automações `bacula-log-archiver`, `nf-archiver` (antes `gmail-nf-archiver`) e `chamados-archiver` (antes `gmail-chamados-archiver`), uma pasta por automação.
- IDs de pastas do Drive, e-mails de remetentes e fornecedores substituídos por placeholders; os valores reais ficam apenas nos projetos do Apps Script.
- `fornecedores.config.gs` virou `fornecedores.config.example.gs`.

### Notes
- Cada automação continua sendo um projeto Apps Script independente, com seus próprios gatilhos.
- Histórico de versões de cada automação: ver o CHANGELOG da respectiva pasta, quando existir.
