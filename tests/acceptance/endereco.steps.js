const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const Endereco = require('../../backend/src/endereco/Endereco');
const Pessoa = require('../../backend/src/pessoa/Pessoa');

// setDefaultLanguage('pt');

const feature = path.join(__dirname, '../features/endereco.feature');

defineFeature(feature, (test) => {

    test("Buscar localidade válida por CEP", () => {
        given("que o usuário acessa o formulário de cadastro de pessoa", () => {

        });
        and("preencheu o formulário de cadastro de pessoa", () => {
        });
        when('informar o CEP "89900000"', () => {
        });
        and("clica em Buscar localidade", () => {
        });
        then('o sistema deverá buscar a localidade', () => {
        });
        and('o município será "São Miguel do Oeste"', () => {
        });
        and('a UF será "SC"', () => {
        });

    })
});
