
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


# Projeto final - Engenharia de Software - Pós-graduação Full Stack - IF Sudeste MG

Projeto final da disciplina de Engenharia de software no curso de Pós Graduação Latu Sensu em Desenvolvimento Full Stack no Instituto Federal Sudeste de Minas Gerais.




## Autores

- [@jrmessias](https://www.github.com/jrmessias) Israel Aparecido Messias Junior


## Stack utilizada

**Front-end:** React, Redux, TailwindCSS

**Back-end:** Node, Express


## Documentação

[Documentação](https://link-da-documentação)


## Instalação

Instale my-project com npm

```bash
  npm install my-project
  cd my-project
```

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_KEY`

`ANOTHER_API_KEY`


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Deploy

Para fazer o deploy desse projeto rode

```bash
  npm run deploy
```


## Documentação da API

#### Retorna todos os itens

```http
  GET /api/items
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/items/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### add(num1, num2)

Recebe dois números e retorna a sua soma.

