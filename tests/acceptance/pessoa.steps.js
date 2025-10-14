const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const puppeteer = require('puppeteer');

const feature = loadFeature(path.join(__dirname, '../features/pessoa.feature'));

defineFeature(feature, (test) => {
    let browser, page;

    const url = 'http://127.0.0.1:4026/frontend/pessoa.html'

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

    test("Cadastrar pessoa com sucesso", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de pessoa", async () => {
            const titulo = await page.title();
            expect(titulo).toBe("Cadastro de Pessoa");
        });
        and('preencher o formulário de cadastro de pessoa com os dados válidos', async () => {
            await page.$eval('#nome', el => el.value = 'João Silva');
            await page.$eval('#cpf', el => el.value = '12345678900');
            await page.$eval('#data_nascimento', el => el.value = '26/04/2010');
            await page.$eval('#email', el => el.value = 'email@empresa.com');
            await page.$eval('#telefone', el => el.value = '11987654321');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-success', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar pessoa com CPF já existente", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de pessoa", async () => {
            const titulo = await page.title();
            await page.$eval('#nome', el => el.value = '');
            await page.$eval('#cpf', el => el.value = '');
            await page.$eval('#data_nascimento', el => el.value = '');
            await page.$eval('#email', el => el.value = '');
            await page.$eval('#telefone', el => el.value = '');
            expect(titulo).toBe("Cadastro de Pessoa");
        });
        and('preencher o formulário de cadastro de pessoa com um CPF já existente', async () => {
            await page.$eval('#nome', el => el.value = 'João Silva');
            await page.$eval('#cpf', el => el.value = '12345678901');
            await page.$eval('#data_nascimento', el => el.value = '26/04/2010');
            await page.$eval('#email', el => el.value = 'email@empresa.com');
            await page.$eval('#telefone', el => el.value = '11987654321');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-error', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar pessoa com dados inválidos", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de pessoa", async () => {
            const titulo = await page.title();
            await page.$eval('#nome', el => el.value = '');
            await page.$eval('#cpf', el => el.value = '');
            await page.$eval('#data_nascimento', el => el.value = '');
            await page.$eval('#email', el => el.value = '');
            await page.$eval('#telefone', el => el.value = '');
            expect(titulo).toBe("Cadastro de Pessoa");
        });
        and('preencher o formulário de cadastro de pessoa com dados inválidos', async () => {
            // await page.$eval('#nome', el => el.value = '');
            // await page.$eval('#cpf', el => el.value = '');
            // await page.$eval('#data_nascimento', el => el.value = '');
            // await page.$eval('#email', el => el.value = '');
            // await page.$eval('#telefone', el => el.value = '');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-error', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })
});
