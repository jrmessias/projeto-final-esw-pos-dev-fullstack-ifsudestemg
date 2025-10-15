const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const puppeteer = require('puppeteer');

const feature = loadFeature(path.join(__dirname, '../features/empresa.feature'));

defineFeature(feature, (test) => {
    let browser, page;

    const url = 'http://127.0.0.1:5500/frontend/empresa.html'

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

    test("Cadastrar empresa com sucesso", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de empresa", async () => {
            const titulo = await page.title();
            expect(titulo).toBe("Cadastro de Empresa");
        });
        and('preencher o formulário de cadastro de empresa com os dados válidos', async () => {
            // await page.$eval("#form", form => form.reset());
            await page.$eval('#razao_social', el => el.value = 'Minha Empresa LTDA');
            await page.$eval('#nome_fantasia', el => el.value = 'Minha Empresa');
            await page.$eval('#cnpj', el => el.value = '12.345.678/0001-90');
            await page.$eval('#email', el => el.value = 'email@dominio.com');
            await page.$eval('#telefone', el => el.value = '11999999999');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            // await page.waitForSelector('#msg-success', {visible: true});
            const mensagem = await page.$eval('#msg-success', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar empresa com CNPJ já existente", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de empresa", async () => {
            const titulo = await page.title();
            await page.$eval('#razao_social', el => el.value = '');
            await page.$eval('#nome_fantasia', el => el.value = '');
            await page.$eval('#cnpj', el => el.value = '');
            await page.$eval('#email', el => el.value = '');
            await page.$eval('#telefone', el => el.value = '');
            expect(titulo).toBe("Cadastro de Empresa");
        });
        and('preencher o formulário de cadastro de empresa com um CNPJ já existente', async () => {
            // await page.$eval("#form", form => form.reset());
            await page.$eval('#razao_social', el => el.value = 'Minha Empresa LTDA');
            await page.$eval('#nome_fantasia', el => el.value = 'Minha Empresa');
            await page.$eval('#cnpj', el => el.value = '12.345.678/0001-00');
            await page.$eval('#email', el => el.value = 'email@dominio.com');
            await page.$eval('#telefone', el => el.value = '11999999999');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-error', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar empresa com dados inválidos", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de empresa", async () => {
            const titulo = await page.title();
            await page.$eval('#razao_social', el => el.value = '');
            await page.$eval('#nome_fantasia', el => el.value = '');
            await page.$eval('#cnpj', el => el.value = '');
            await page.$eval('#email', el => el.value = '');
            await page.$eval('#telefone', el => el.value = '');
            expect(titulo).toBe("Cadastro de Empresa");
        });
        and('preencher o formulário de cadastro de empresa com dados inválidos', async () => {
            // await page.$eval("#form", form => form.reset());
            // await page.$eval('#razao_social', el => el.value = '');
            // await page.$eval('#nome_fantasia', el => el.value = '');
            // await page.$eval('#cnpj', el => el.value = '');
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
