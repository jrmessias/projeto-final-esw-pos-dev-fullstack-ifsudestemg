const Pessoa = require('../src/pessoa/Pessoa');
const Funcionario = require("../src/funcionario/Funcionario");

describe("Pessoa", () => {
    let pessoa;

    beforeEach(() => {
        pessoa = criarPessoaValida();
    });

    afterEach(() => {
        pessoa = null;
    });

    const criarPessoaValida = (dadosParaSobrescrever = {}) => {
        const dadosPadroes = {
            nome: 'João Silva',
            cpf: '12345678900',
            dataNascimento: new Date('2010-04-26'),
            email: 'email@empresa.com',
            telefone: '11987654321'
        };
        const pessoa = {...dadosPadroes, ...dadosParaSobrescrever};
        return new Pessoa(pessoa.nome, pessoa.cpf, pessoa.dataNascimento, pessoa.email, pessoa.telefone);
    };

    // Criação
    it('Criar pessoa com os atributos corretos', () => {
        expect(pessoa.nome).toBe('João Silva');
        expect(pessoa.cpf).toBe('12345678900');
        expect(pessoa.dataNascimento).toEqual(new Date('2010-04-26'));
        expect(pessoa.email).toBe('email@empresa.com');
        expect(pessoa.telefone).toBe('11987654321');
    });

    describe('Validação do nome', () => {
        it.each([
            { nome: "Jo" },
            { nome: "" }
        ])('Deve gerar erro se o nome for $nome', ({ nome }) => {
            expect(() => criarPessoaValida({ nome }))
                .toThrow("O nome deve conter pelo menos 3 caracteres.");
        });
    });

    describe('Validação do CPF', () => {
        it.each([
            { cpf: "" },
            { cpf: "123456789000" },
            { cpf: "1234567890" },
            { cpf: "abcdefghojk" }
        ])('Deve gerar erro se o CPF for $cpf', ({ cpf }) => {
            expect(() => criarPessoaValida({ cpf }))
                .toThrow("O CPF deve conter 11 dígitos numéricos.");
        });
    });

    it('Validação da data de nascimento', () => {
        expect(() => criarPessoaValida({dataNascimento: new Date('20100425')}))
            .toThrow("A data de nascimento deve ser uma data válida.");
    });

    it('Validação do e-mail', () => {
        expect(() => criarPessoaValida({email: "emailempresa.com"}))
            .toThrow("O e-mail informado é inválido.");
    });

    describe('Validação do telefone', () => {
        it.each([
            { telefone: "99999999" },
            { telefone: "999999999999" },
            { telefone: "abcdefghijk" }
        ])('Deve gerar erro se o telefone for $telefone', ({ telefone }) => {
            expect(() => criarPessoaValida({ telefone }))
                .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        });
    });

    // Alteração não permitida
    it('Não pode alterar o CPF', () => {
        expect(() => pessoa.alterarCpf({cpf: "12345678901"}))
            .toThrow("Não é permitido alterar o CPF da pessoa.");
    });

    // Alteração com sucesso
    it('Alterar e-mail corretamente', () => {
        pessoa.alterarEmail('novo@email.com');

        expect(pessoa.email).toBe('novo@email.com');
    });

    it('Alterar telefone corretamente', () => {
        pessoa.alterarTelefone("8888888888")

        expect(pessoa.telefone)
            .toBe("8888888888")
    });

    // Alterações com erros
    it('Não altera o e-mail, se inválido', () => {
        expect(() => pessoa.alterarEmail('novoempresa.com'))
            .toThrow("O e-mail informado é inválido.")
        expect(() => pessoa.alterarEmail('email@empresa.com'))
            .toThrow("O e-mail informado é igual ao atual.")
    });

    describe('Validação ao alterar o telefone', () => {
        it.each([
            { telefone: "888888888" },
            { telefone: "999999999999" },
            { telefone: "abcdefgh" }
        ])('Deve gerar erro se o telefone for $telefone', ({ telefone }) => {
            expect(() => pessoa.alterarTelefone({ telefone }))
                .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        });
    });

    test.todo("Pessoa"); // Proposital
});
