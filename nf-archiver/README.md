# 📦 Gmail NF Archiver

<div align="left">

![Status](https://img.shields.io/badge/status-production-2ea44f?style=flat-square)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=flat-square&logo=google&logoColor=white)
![Gmail](https://img.shields.io/badge/Gmail-AI%20Label%20Workflow-EA4335?style=flat-square&logo=gmail&logoColor=white)
![Google Drive](https://img.shields.io/badge/Google%20Drive-Hierarchical%20Archive-34A853?style=flat-square&logo=googledrive&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

</div>

Arquivador automático de notas fiscais recebidas por e-mail. O fluxo processa mensagens com label específica no Gmail, classifica anexos, organiza no Drive por data/fornecedor e registra log de auditoria.

---

## 🧭 Fluxograma do processo

```mermaid
flowchart TD
    A[Início: gatilho diário] --> B[Busca e-mails com label "Notas Fiscais TI"]
    B --> C{Há anexos?}
    C -- Não --> D[Próxima mensagem]
    C -- Sim --> E[Identifica fornecedor pelo dicionário]
    E --> F[Cria/obtém pastas Ano > Mês > Fornecedor]
    F --> G{Arquivo é NF ou imagem de NF?}
    G -- Sim --> H[Salva como NF_yyyy-mm-dd_fornecedor.ext]
    G -- Não --> I[Salva em _anexos como ANEXO_...]
    H --> J[Registra linha no log de auditoria]
    I --> J
    J --> K[Remove label e arquiva thread]
    K --> L[Salva log em _logs/log_execucao_yyyy-mm-dd_hh-mm.txt]
    L --> M[Fim]
```

---

## 🗂️ Estrutura de pastas no Google Drive

```text
Notas Fiscais TI/
├── 2026/
│   └── 03 - Março/
│       ├── Fornecedor_A/
│       │   ├── NF_2026-03-14_Fornecedor_A.pdf
│       │   ├── NF_2026-03-14_Fornecedor_A.xml
│       │   └── _anexos/
│       │       └── ANEXO_2026-03-14_Fornecedor_A_boleto.pdf
│       ├── Fornecedor_B/
│       │   └── NF_2026-03-14_Fornecedor_B.pdf
│       └── Fornecedor_C/
│           └── NF_2026-03-14_Fornecedor_C.xml
└── _logs/
    └── log_execucao_2026-03-14_08-00.txt
```

---

## 📋 Log de auditoria (destaque)

Cada execução gera um arquivo em `_logs/` com rastreabilidade completa (tipo, fornecedor, remetente e nome final do arquivo).

### Exemplo real de formato

```text
Data       | Tipo   | Fornecedor       | E-mail Remetente              | Arquivo
====================================================================================================
2026-03-14 | NF     | Fornecedor_A        | faturamento@fornecedor-a.com.br     | NF_2026-03-14_Fornecedor_A.pdf
2026-03-14 | NF     | Fornecedor_A        | faturamento@fornecedor-a.com.br     | NF_2026-03-14_Fornecedor_A.xml
2026-03-14 | ANEXO  | Fornecedor_A        | faturamento@fornecedor-a.com.br     | ANEXO_2026-03-14_Fornecedor_A_boleto.pdf
2026-03-14 | NF     | Fornecedor_B   | faturamento@fornecedor-b.com.br | NF_2026-03-14_Fornecedor_B.pdf
```

---

## 🧩 Dicionário de fornecedores modular

Agora o mapeamento foi separado para facilitar manutenção:

- `nf_archiver.gs`: fluxo principal
- `fornecedores.config.example.gs`: modelo do dicionário por e-mail e por domínio (no Apps Script, salve como `fornecedores.config`)

Trecho de estrutura do novo arquivo de configuração:

```javascript
var FORNECEDORES_CONFIG = {
  porEmail: {
    "financeiro@fornecedor-c.com.br": "Fornecedor_C"
  },
  porDominio: {
    "fornecedor-a.com.br": "Fornecedor_A"
  }
};
```

Para incluir fornecedor novo, edite apenas o arquivo `fornecedores.config` no seu projeto do Apps Script. Os valores reais ficam só lá, nunca no repositório.

---

## ⚙️ Configuração rápida

1. Criar projeto no Google Apps Script.
2. Adicionar `nf_archiver.gs` e criar `fornecedores.config` a partir de `fornecedores.config.example.gs` (com os seus fornecedores).
3. Substituir `CONFIG.PASTA_RAIZ_ID` (hoje `SEU_ID_DE_PASTA_NO_DRIVE`) pelo ID da sua pasta e ajustar `CONFIG.MARCADOR_GMAIL`.
4. Autorizar permissões (Gmail e Drive).
5. Criar gatilho diário para `arquivarNotasFiscais`.

---

## 👤 Autor

**Fernando S. De Santana Júnior**

