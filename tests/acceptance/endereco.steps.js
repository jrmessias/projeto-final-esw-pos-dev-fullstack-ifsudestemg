const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const puppeteer = require('puppeteer');

const feature = loadFeature(path.join(__dirname, '../features/endereco.feature'));

defineFeature(feature, (test) => {
    let browser, page;

    const url = 'http://127.0.0.1:4026/frontend/endereco.html'

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            defaultViewport: null,
            args: ['--start-maximized', '--disable-cache']
        });

        page = await browser.newPage();
        await page.goto(url);
    })

    afterAll(async () => {
        await browser.close();
    })

    test("Cadastrar endereço com sucesso", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de endereço", async () => {
            const titulo = await page.title();
            expect(titulo).toBe("Cadastro de Endereço");
        });
        when('preencher o formulário de cadastro de endereço com os dados válidos', async () => {
            await page.$eval('#cpf', el => el.value = '12345678901');
            await page.$eval('#logradouro', el => el.value = 'Trav Amazonas');
            await page.$eval('#numero', el => el.value = '100');
            await page.$eval('#bairro', el => el.value = 'Liberdade');
            await page.$eval('#complemento', el => el.value = 'Casa');
        });
        and(/^informar um CEP válido "(.*)"$/, async (cep) => {
            await page.$eval('#cep', (el, value) => el.value = value, cep);
        });
        and('clicar em Buscar localidade', async () => {
            await page.click('#btn-busca-cep');
        });
        and(/^o município será "(.*)"$/, async (municipio) => {
            const mensagem = await page.$eval('#municipio', el => el.value);
            expect(mensagem).toBe(municipio);
        });
        and(/^a UF será "(.*)"$/, async (uf) => {
            const mensagem = await page.$eval('#uf', el => el.value);
            expect(mensagem).toBe(uf);
        });
            and('clicar em Salvar', async () => {
                await page.click('#btn-salvar');
            });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-success', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar endereço com CEP inválido", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de endereço", async () => {
            const titulo = await page.title();
            expect(titulo).toBe("Cadastro de Endereço");
        });
        when('preencher o formulário de cadastro de endereço com os dados válidos', async () => {
            await page.$eval('#cpf', el => el.value = '12345678901');
            await page.$eval('#logradouro', el => el.value = 'Trav Amazonas');
            await page.$eval('#numero', el => el.value = '100');
            await page.$eval('#bairro', el => el.value = 'Liberdade');
            await page.$eval('#complemento', el => el.value = 'Casa');
        });
        and(/^informar o CEP inválido "(.*)"$/, async (cep) => {
            await page.$eval('#cep', (el, value) => el.value = value, cep);
        });
        and('clicar em Buscar localidade', async () => {
            await page.click('#btn-busca-cep');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-error', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })
});
