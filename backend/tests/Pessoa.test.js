const Pessoa = require('../src/pessoa/Pessoa');

describe("Produto", () => {
    let pessoa;

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

    it('Deve criar uma pessoa com os atributos corretos', () => {
        pessoa = criarPessoaValida();

        expect(pessoa.nome).toBe('João Silva');
        expect(pessoa.cpf).toBe('12345678900');
        expect(pessoa.dataNascimento).toEqual(new Date('2010-04-26'));
        expect(pessoa.email).toBe('email@empresa.com');
        expect(pessoa.telefone).toBe('11987654321');
    });

    it('Deve lançar erro se o nome da pessoa conter menos de 3 caracteres', () => {
        expect(() => criarPessoaValida({nome: "Jo"}))
            .toThrow("O nome deve conter pelo menos 3 caracteres.")
        expect(() => criarPessoaValida({nome: ""}))
            .toThrow("O nome deve conter pelo menos 3 caracteres.")
    });

    it('Deve lançar erro se a data de nascimento for inválida', () => {
        expect(() => criarPessoaValida({dataNascimento: new Date('20100425')}))
            .toThrow("A data de nascimento deve ser uma data válida.");
    });

    it('Deve lançar erro se o e-mail for inválido', () => {
        expect(() => criarPessoaValida({email: "emailempresa.com"}))
            .toThrow("O e-mail informado é inválido.");
    });

    it('Deve lançar erro se o telefone for inválido', () => {
        expect(() => criarPessoaValida({telefone: "99999999"}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        expect(() => criarPessoaValida({telefone: "999999999999"}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        expect(() => criarPessoaValida({telefone: "abcdefghijk"}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
    });

    it('Deve lançar erro se o CPF da pessoa não for preenchido ou preenchido de forma incorreta', () => {
        expect(() => criarPessoaValida({cpf: ""}))
            .toThrow("CPF não informado.")
        expect(() => criarPessoaValida({cpf: "123456789000"}))
            .toThrow("O CPF deve conter 11 dígitos numéricos.")
        expect(() => criarPessoaValida({cpf: "1234567890"}))
            .toThrow("O CPF deve conter 11 dígitos numéricos.")
        expect(() => criarPessoaValida({cpf: "abcdefghojk"}))
            .toThrow("O CPF deve conter 11 dígitos numéricos.")
    });

    it('Deve alterar o email corretamente', () => {
        pessoa = criarPessoaValida();
        pessoa.alterarEmail('novo@email.com');

        expect(pessoa.email).toBe('novo@email.com');
    });

    it('E-mail informado é invalido, não altera o e-mail', () => {
        pessoa = criarPessoaValida();

        expect(()=>pessoa.alterarEmail('novoempresa.com'))
            .toThrow("O e-mail informado é inválido.")
        expect(()=>pessoa.alterarEmail('email@empresa.com'))
            .toThrow("O e-mail informado é igual ao atual.")
        expect(pessoa.email).toBe('email@empresa.com');
    });

    it('Não deve alterar o telefone se informado um dado inválido', () => {
        pessoa = criarPessoaValida();

        expect(()=>pessoa.alterarTelefone("888888888"))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        expect(()=>pessoa.alterarTelefone("999999999999"))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        expect(()=>pessoa.alterarTelefone("abcdefgh"))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
    });

    it('Deve alterar o telefone corretamente', () => {
        pessoa.alterarTelefone("8888888888")

        expect(pessoa.telefone)
            .toBe("8888888888")
    });

    it('Não pode altera o CPF', () => {
        pessoa = criarPessoaValida();

        expect(()=>pessoa.alterarCpf({cpf: "12345678901"}))
            .toThrow("Não é permitido alterar o CPF da pessoa.");
    });
});
