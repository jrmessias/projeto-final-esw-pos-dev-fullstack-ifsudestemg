  # language: pt
    Funcionalidade: Cadastro de pessoa
      Como usuário do sistema
      Eu quero cadastrar uma pessoa
      Para gerenciar as pessoas no sistema

      Contexto:
        Dado que o usuário acessa o formulário de cadastro de pessoa

      Cenário: Cadastrar pessoa com sucesso
        Quando preencher o formulário de cadastro de pessoa com os dados válidos
        E clicar em Salvar
        Então o sistema deve exibir a mensagem "Pessoa cadastrada com sucesso"

      Cenário: Erro ao cadastrar pessoa com CPF já existente
        Quando preencher o formulário de cadastro de pessoa com um CPF já existente
        E clicar em Salvar
        Então o sistema deve exibir a mensagem "CPF já cadastrado"

      Cenário: Erro ao cadastrar pessoa com dados inválidos
        Quando preencher o formulário de cadastro de pessoa com dados inválidos
        E clicar em Salvar
        Então o sistema deve exibir a mensagem "Dados inválidos"
