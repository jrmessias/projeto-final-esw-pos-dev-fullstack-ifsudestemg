# language: pt
Funcionalidade: Busca de localizadade por CEP
  Como usuário do sistema
  Eu quero buscar localidade válida usando CEP
  Para facilitar o preenchimento de formulários

  Cenário: Buscar localidade válida por CEP
    Dado que o usuário acessa o formulário de cadastro de pessoa
    E preencheu o formulário de cadastro de pessoa
    Quando informar o CEP "89900000"
    E clica em Buscar localidade
    Então o sistema deve buscar a localidade
    E o município será "São Miguel do Oeste"
    E a UF será "SC"

  Cenário: Erro ao buscar localidade por CEP inválido
    Dado que o usuário acessa o formulário de cadastro de pessoa
    E preencheu o formulário de cadastro de pessoa
    Quando informar o CEP "00000000"
    E clica em Buscar localidade
    Então o sistema deve retornar "CEP não encontrado"
