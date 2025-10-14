const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const Empresa = require('../../backend/src/empresa/Empresa');

const feature = loadFeature(path.join(__dirname, '../features/empresa.feature'));

defineFeature(feature, (test) => {
    let empresa;
    const data = {
        razaoSocial: "Minha Empresa LTDA",
        nomeFantasia: "Minha Empresa",
        cnpj: "12345678000199",
        email: "contato@empresa.com",
        telefone: "11999999999"
    };

    beforeEach(() => {
        empresa = new Empresa(data.razaoSocial, data.nomeFantasia, data.cnpj, data.email, data.telefone);
    })

    test("Cadastrar empresa com sucesso", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de empresa", () => {
            expect(empresa).toBeDefined();
        });
        and('preencher o formulário de cadastro de empresa com os dados válidos', ()=>{
            expect(empresa).toMatchObject(data)
        });
        and('clicar em Salvar', () => {
            mensagem = "Empresa cadastrada com sucesso"
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, (mensagemEsperada) => {
            expect(mensagem).toBe(mensagemEsperada);
        });
    })
});
