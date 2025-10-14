#  # language: pt
#  Funcionalidade: Cadastrar Endereço
#    Como um usuário do sistema
#    Eu quero cadastrar um endereço para uma pessoa
#    Para armazenar informações de localização
#
#    Contexto:
#      Dado que o usuário acessa o formulário de cadastro de endereço
#
#    Cenário: Cadastrar endereço com sucesso
#      Quando preencher o formulário de cadastro de endereço com os dados válidos
#      E informar um CEP válido "89900000"
#      E clicar em Bucar localidade
#      Então o sistema deve buscar a localidade
#      E o município será "São Miguel do Oeste"
#      E a UF será "SC"
#      E clicar em Salvar
#      Então o sistema deve exibir a mensagem "Endereço cadastrado com sucesso"
#
#    Cenário: Erro ao cadastrar endereço com CEP inválido
#      Quando preencher o formulário de cadastro de endereço com um CEP inválido
#      E informar o CEP "00000000"
#      E clica em Buscar localidade
#      Então o sistema deve retornar "CEP não encontrado"
