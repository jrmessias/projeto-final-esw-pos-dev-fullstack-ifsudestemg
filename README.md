
![Logo](frontend/img/logo.png)

# Projeto final - Engenharia de Software - Pós-graduação Full Stack - IF Sudeste MG

Esta aplicação é uma simulação de cadastro de pessoa, cadastro de empresa, funcionário (associação de pessoa com empresa) e endereço (associação de pessoa com endereço).

## Autores
- [@jrmessias](https://www.github.com/jrmessias) Israel Aparecido Messias Junior

## Versões
Versão utilizada do Node.js: 24.7.0
* Especificada nos arquivos .node-version e .nvmrc

## Stack utilizada
**Front-end:**
- Node.js
- Http server
- Jest
- Puppeteer
- Bootstrap

**Back-end:**
- Node.js
- Express
- Jest
- Axios

## Documentação
Este projeto possui duas pastas sendo:

backend: classes e testes unitários e de integração.

frontend: interface gráfica e testes de aceitação.

## Instalação

Instale o projeto com npm em cada pasta, conforme orientações abaixo:

Na pasta do backend:
```bash
  cd backend
  npm install
```
 É necessário voltar a pasta anterior `cd..` (Linux) ou `cd ..` (Windows) e depois entrar na pasta do frontend:
```bash
  cd frontend
  npm install
```

## Pré-visualização
 
Para iniciar o frontend, via terminal, dentro da pasta frontend, rode o seguinte comando: `npm start`

Será aberto o projeto nos seguintes endereços:

- http://[ip]:5500
- http://127.0.0.1:5500
- http://localhost:5500

Para acessar o frontend, adicione `frontend` ao final do endereço, ficando assim:

- http://[ip]:5500/frontend
- http://127.0.0.1:5500/frontend
- http://localhost:5500/frontend

> Foi utilizada a mesma porta da extensão Live Server do Visual Studio Code.

## Testes

> É necessário estar executando a **Pré-visualização** para executar os testes de aceitação.

*Para executar os testes, execute o seguinte comando:*

**Na pasta `backend`:**

`npm run test` ou  `npm run test:coverage`

> Será criado um arquivo test-report.html na pasta `backend`, contendo o relatório dos testes.

**Na pasta `frontend`:**

`npm run test:acceptance` ou  `npm run test:acceptance:coverage`

> Será criado um arquivo test-report.html na pasta `frontend`, contendo o relatório dos testes.
