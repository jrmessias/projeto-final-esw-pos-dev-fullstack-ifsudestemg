  # language: pt
  Funcionalidade: Cadastro de Funcionário
    Como usuário do sistema
    Eu quero cadastrar um funcionário a uma empresa
    Para gerenciar os funcionários da empresa

    Contexto:
      Dado que o usuário acessa o formulário de cadastro de funcionário

    Cenário: Cadastrar funcionário com sucesso
      Quando preencher o formulário de cadastro de funcionário com os dados válidos
      E clicar em Salvar
      Então o sistema deve exibir a mensagem "Funcionário cadastrado com sucesso"

    Cenário: Erro ao cadastrar funcionário já existente
      Quando preencher o formulário de cadastro de funcionário com um CPF já existente
      E clicar em Salvar
      Então o sistema deve exibir a mensagem "CPF já cadastrado"

    Cenário: Erro ao cadastrar funcionário com dados inválidos
      Quando preencher o formulário de cadastro de funcionário com dados inválidos
      E clicar em Salvar
      Então o sistema deve exibir a mensagem "Dados inválidos"
