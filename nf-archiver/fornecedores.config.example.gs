// ============================================================
// Configuração modular do dicionário de fornecedores (EXEMPLO)
//
// Como usar: no projeto do Apps Script, crie um arquivo chamado
// `fornecedores.config` com este conteúdo e troque os valores de
// exemplo pelos seus fornecedores reais. Não versione os valores reais.
// ============================================================

var FORNECEDORES_CONFIG = {
  // Por e-mail exato
  porEmail: {
    "financeiro@fornecedor-a.com.br": "Fornecedor_A",
    "cobranca@fornecedor-b.com.br": "Fornecedor_B"
  },

  // Por domínio
  porDominio: {
    "fornecedor-c.com.br": "Fornecedor_C",
    "fornecedor-d.com.br": "Fornecedor_D"
  }
};

function obterMapaFornecedores() {
  var mapa = {};
  var config = (FORNECEDORES_CONFIG && typeof FORNECEDORES_CONFIG === "object") ? FORNECEDORES_CONFIG : {};
  var porEmail = (config.porEmail && typeof config.porEmail === "object") ? config.porEmail : {};
  var porDominio = (config.porDominio && typeof config.porDominio === "object") ? config.porDominio : {};

  for (var email in porEmail) {
    mapa[email] = porEmail[email];
  }

  for (var dominio in porDominio) {
    mapa[dominio] = porDominio[dominio];
  }

  return mapa;
}
