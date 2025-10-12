const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const Endereco = require('../../backend/src/endereco/Endereco');
const Pessoa = require('../../backend/src/pessoa/Pessoa');

// setDefaultLanguage('pt');

const feature = loadFeature(path.join(__dirname, '../features/endereco.feature'));

// defineFeature(feature, (test) => {
//     test("Cadastrar empresa com sucesso", () => {
//         given("quando preencher o formulário de cadastro de empresa com os dados válidos", () => {
//         });
//         and('clicar em "Salvar"', () => {
//         });
//         when('Então o sistema deve exibir a mensagem "Empresa cadastrada com sucesso"', () => {
//         });
//     })
// });
