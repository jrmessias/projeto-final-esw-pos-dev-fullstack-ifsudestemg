const {defineFeature, loadFeature} = require('jest-cucumber');
const path = require('path');
const puppeteer = require('puppeteer');

const feature = loadFeature(path.join(__dirname, '../features/funcionario.feature'));

defineFeature(feature, (test) => {
    let browser, page;

    const url = 'http://127.0.0.1:5500/frontend/funcionario.html'

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

    test("Cadastrar funcionário com sucesso", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de funcionário", async () => {
            const titulo = await page.title();
            expect(titulo).toBe("Cadastro de Funcionário");
        });
        and('preencher o formulário de cadastro de funcionário com os dados válidos', async () => {
            await page.$eval('#cpf', el => el.value = '12345678900');
            await page.$eval('#cnpj', el => el.value = '12.345.678/0001-00');
            await page.$eval('#data_admissao', el => el.value = '26/04/2010');
            await page.$eval('#matricula', el => el.value = '321654');
            await page.$eval('#cargo', el => el.value = 'Programador');
            await page.$eval('#salario', el => el.value = '1000000');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-success', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar funcionário já existente", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de funcionário", async () => {
            const titulo = await page.title();
            await page.$eval('#cpf', el => el.value = '');
            await page.$eval('#cnpj', el => el.value = '');
            await page.$eval('#data_admissao', el => el.value = '');
            await page.$eval('#matricula', el => el.value = '');
            await page.$eval('#cargo', el => el.value = '');
            await page.$eval('#salario', el => el.value = '');
            expect(titulo).toBe("Cadastro de Funcionário");
        });
        and('preencher o formulário de cadastro de funcionário com um CPF já existente', async () => {
            await page.$eval('#cpf', el => el.value = '12345678901');
            await page.$eval('#cnpj', el => el.value = '12.345.678/0001-00');
            await page.$eval('#data_admissao', el => el.value = '26/04/2010');
            await page.$eval('#matricula', el => el.value = '321654');
            await page.$eval('#cargo', el => el.value = 'Programador');
            await page.$eval('#salario', el => el.value = '1000000');
        });
        and('clicar em Salvar', async () => {
            await page.click('#btn-salvar');
        });
        when(/^o sistema deve exibir a mensagem "(.*)"$/, async (mensagemEsperada) => {
            const mensagem = await page.$eval('#msg-error', el => el.textContent);
            expect(mensagem).toBe(mensagemEsperada);
        });
    })

    test("Erro ao cadastrar funcionário com dados inválidos", ({given, and, when}) => {
        given("que o usuário acessa o formulário de cadastro de funcionário", async () => {
            const titulo = await page.title();
            await page.$eval('#cpf', el => el.value = '');
            await page.$eval('#cnpj', el => el.value = '');
            await page.$eval('#data_admissao', el => el.value = '');
            await page.$eval('#matricula', el => el.value = '');
            await page.$eval('#cargo', el => el.value = '');
            await page.$eval('#salario', el => el.value = '');
            expect(titulo).toBe("Cadastro de Funcionário");
        });
        and('preencher o formulário de cadastro de funcionário com dados inválidos', async () => {
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
