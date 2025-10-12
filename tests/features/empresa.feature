# language: pt
  Funcionalidade: Cadastro de Empresa
    Como usuário do sistema
    Eu quero cadastrar uma empresa
    Para gerenciar as empresas no sistema

    Contexto:
      Dado que o usuário acessa o formulário de cadastro de empresa

    Cenário: Cadastrar empresa com sucesso
      Quando preencher o formulário de cadastro de empresa com os dados válidos
      E clicar em Salvar
      Então o sistema deve exibir a mensagem "Empresa cadastrada com sucesso"


