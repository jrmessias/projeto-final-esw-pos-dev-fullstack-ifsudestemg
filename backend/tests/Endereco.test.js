const Pessoa = require('../src/pessoa/Pessoa');
const Endereco = require("../src/endereco/Endereco");
const axios = require('axios');

jest.mock('axios');

describe("Endereço", () => {
    let endereco;

    beforeEach(() => {
        endereco = criarEnderecoValido();
    });

    afterEach(() => {
        endereco = null;
    });

    const criarEnderecoValido = (dadosParaSobrescrever = {}) => {
        const dadosPadroes = {
            cpf: "12345678900",
            cep: "89900000",
            logradouro: "Olavo Bilac",
            numero: "738",
            bairro: "São Jorge",
            complemento: "Casa",
        };
        const endereco = {...dadosPadroes, ...dadosParaSobrescrever};
        return new Endereco(endereco.cpf, endereco.cep, endereco.logradouro, endereco.numero, endereco.bairro, endereco.complemento);
    };

    // Criação
    it('Criar endereço com os dados corretos', () => {
        expect(endereco.cpf).toBe('12345678900');
        expect(endereco.cep).toBe('89900000');
        expect(endereco.logradouro).toBe("Olavo Bilac");
        expect(endereco.numero).toBe('738');
        expect(endereco.bairro).toBe('São Jorge');
        expect(endereco.complemento).toBe('Casa');
    });

    describe('Validação do CPF', () => {
        expect(() => criarEnderecoValido({cpf: ""}))
            .toThrow("CPF não informado.");

        it.each([
            {cpf: "123456789000"},
            {cpf: "1234567890"},
            {cpf: "abcdefghojk"}
        ])('Deve gerar erro se o CPF for $cpf', ({cpf}) => {
            expect(() => criarEnderecoValido({cpf}))
                .toThrow("O CPF deve conter 11 dígitos numéricos.");
        });
    });

    describe('Validação do Logradouro na criação', () => {
        expect(() => criarEnderecoValido({logradouro: ""}))
            .toThrow("Logradouro não informado.");
    });

    describe('Validação do Número na criação', () => {
        expect(() => criarEnderecoValido({numero: ""}))
            .toThrow("Número não informado.");
    });

    describe('Validação do Bairro na criação', () => {
        expect(() => criarEnderecoValido({bairro: ""}))
            .toThrow("Bairro não informado.");
    });

    describe('Validação do CEP', () => {
        expect(() => criarEnderecoValido({cep: ""}))
            .toThrow("CEP não informado.");
        it.each([
            {cep: "8990000"},
            {cep: "899000000"},
            {cep: "abcdefghojk"}
        ])('Deve gerar erro se o CEP for $cep', ({cep}) => {
            expect(() => criarEnderecoValido({cep}))
                .toThrow("O CEP deve conter 8 dígitos numéricos.");
        });
    });

    // Alteração não permitida
    it('Não pode alterar o CPF', () => {
        expect(() => endereco.alterarCpf({cpf: "12345678901"}))
            .toThrow("Não é permitido alterar o CPF do endereço.");
    });

    // Alteração
    it("Deve gerar erro se novo logradouro é inválido ou igual ao atual", () => {
        expect(() => endereco.alterarLogradouro(""))
            .toThrow("Logradouro não informado.");
        expect(() => endereco.alterarLogradouro("Olavo Bilac"))
            .toThrow("O novo logradouro deve ser diferente do atual.");
    });

    it("Deve gerar erro se novo número é inválido ou igual ao atual", () => {
        expect(() => endereco.alterarNumero(""))
            .toThrow("Número não informado.");
        expect(() => endereco.alterarNumero("738"))
            .toThrow("O novo número deve ser diferente do atual.");
    });

    it("Deve gerar erro se novo complemento é inválido ou igual ao atual", () => {
        expect(() => endereco.alterarComplemento(""))
            .toThrow("Complemento não informado.");
        expect(() => endereco.alterarComplemento("Casa"))
            .toThrow("O novo complemento deve ser diferente do atual.");
    });

    it("Deve gerar erro se novo bairro é inválido ou igual ao atual", () => {
        expect(() => endereco.alterarBairro(""))
            .toThrow("Bairro não informado.");
        expect(() => endereco.alterarBairro("São Jorge"))
            .toThrow("O novo bairro deve ser diferente do atual.");
    });

    // Sucesso
    it("Altera o logradouro corretamente", () => {
        endereco.alterarLogradouro("Santos Dumont")
        expect(endereco.logradouro).toBe('Santos Dumont');
    });

    it("Altera o número corretamente", () => {
        endereco.alterarNumero("732")
        expect(endereco.numero).toBe('732');
    });

    it("Altera o complemneto corretamente", () => {
        endereco.alterarComplemento("Edifício")
        expect(endereco.complemento).toBe('Edifício');
    });

    it("Altera o bairro corretamente", () => {
        endereco.alterarBairro("São Luis")
        expect(endereco.bairro).toBe('São Luis');
    });

    describe("Buscar CEP", () => {
        afterEach(() => {
            jest.clearAllMocks();
        })

        it.each([
            {cep: "89900000", municipio: "São Miguel do Oeste", uf: "SC"},
            {cep: "89910000", municipio: "Descanso", uf: "SC"},
        ])("Deve buscar o municipio e estado correto para o CEP $cep", async ({cep, municipio, uf}) => {
            axios.get.mockResolvedValue({data: {localidade: municipio, uf: uf}})
            const municipioUf = await endereco.buscarMunicipio(cep);

            expect(municipioUf.municipio).toBe(municipio);
            expect(municipioUf.uf).toBe(uf);
            expect(endereco.municipio).toBe(municipio);
            expect(endereco.uf).toBe(uf);
        });

        it("Deve gerar erro ao informar CEP inválido", async () => {
            axios.get.mockResolvedValue({data: {erro: true}})
            await expect(() => endereco.buscarMunicipio("00000000"))
                .rejects // Aguarda a promise ser rejeitada
                .toThrow("CEP inválido."); // Mensagem de erro
        });
    });

    test.todo("Endereço"); // Proposital
});
