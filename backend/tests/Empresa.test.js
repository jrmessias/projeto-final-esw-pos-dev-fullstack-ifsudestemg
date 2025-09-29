const Empresa = require("../src/empresa/Empresa");

describe("Empresa", () => {
    let empresa;

    beforeEach(() => {
        empresa = criarEmpresaValida();
    });

    afterEach(() => {
        empresa = null;
    });

    // beforeAll(() => {
    // });
    //
    // afterAll(() => {
    // });

    const criarEmpresaValida = (dadosParaSobrescrever = {}) => {
        const dadosPadroes = {
            razaoSocial: "Minha Empresa LTDA",
            nomeFantasia: "Minha Empresa",
            cnpj: "12345678000199",
            email: "contato@empresa.com",
            telefone: "11999999999"
        };

        const empresa = {...dadosPadroes, ...dadosParaSobrescrever};
        return new Empresa(empresa.razaoSocial, empresa.nomeFantasia, empresa.cnpj, empresa.email, empresa.telefone);
    };

    // Criação
    it("Criar uma empresa com os atributos corretos", () => {
        expect(empresa.razaoSocial).toBe("Minha Empresa LTDA");
        expect(empresa.nomeFantasia).toBe("Minha Empresa");
        expect(empresa.cnpj).toBe("12345678000199");
        expect(empresa.email).toBe("contato@empresa.com");
        expect(empresa.telefone).toBe("11999999999");
    });

    describe('Validação dos dados da empresa', () => {
        describe('Validação da razão social', () => {
            it.each([
                {razaoSocial: ""},
                {razaoSocial: "1"},
                {razaoSocial: "22"}
            ])('Deve lançar erro se a razão social for $razaoSocial', ({razaoSocial}) => {
                expect(() => criarEmpresaValida({razaoSocial}))
                    .toThrow("A razão social deve conter pelo menos 3 caracteres.");
            });
        });

        describe('Validação do nome fantasia', () => {
            it.each([
                {nomeFantasia: ""},
                {nomeFantasia: "1"},
            ])('Deve lançar erro se o nome fantasia for $nomeFantasia', ({nomeFantasia}) => {
                expect(() => criarEmpresaValida({nomeFantasia}))
                    .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.");
            });
        });

        describe('Validação do CNPJ', () => {
            it.each([
                {cnpj: ""},
                {cnpj: "0123456789012"},
                {cnpj: "012345678901212"},
                {cnpj: "abcdefghojk123"},
            ])('Deve lançar erro se o CNPJ for $cnpj', ({cnpj}) => {
                expect(() => criarEmpresaValida({cnpj}))
                    .toThrow("O CNPJ deve conter 14 dígitos numéricos.");
            });
        });

        describe('Validação do e-mail', () => {
            it.each([
                {email: ""},
                {email: "nomeempresa.com.br"},
            ])('Deve lançar erro se o e-mail for $email', ({email}) => {
                expect(() => criarEmpresaValida({email}))
                    .toThrow("O e-mail informado é inválido.");
            });
        });

        describe('Validação do telefone', () => {
            it.each([
                {telefone: ""},
                {telefone: "123456789"},
                {telefone: "123123123123"},
                {telefone: "abcdefghij"},
            ])('Deve lançar erro se o telfone for $telefone', ({telefone}) => {
                expect(() => criarEmpresaValida({telefone}))
                    .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
            });
        });
    });

    // Alteração com sucesso
    it("Alterar telefone corretamente", () => {
        empresa.alterarTelefone("11888888888");

        expect(empresa.telefone).toBe("11888888888");
    });

    it("Alterar e-mail corretamente", () => {
        empresa.alterarEmail("novoemail@empresa.com");

        expect(empresa.email).toBe("novoemail@empresa.com");
    });

    it("Alterar razão social corretamente", () => {
        empresa.alterarRazaoSocial("Minha Empresa LTDA - Alterada");

        expect(empresa.razaoSocial).toBe("Minha Empresa LTDA - Alterada");
    });

    it("Alterar nome fantasia corretamente", () => {
        empresa.alterarNomeFantasia("Minha Empresa - Alterada");

        expect(empresa.nomeFantasia).toBe("Minha Empresa - Alterada");
    });

    it("Reativar uma empresa corretamente", () => {
        empresa.inativar();
        empresa.reativar();
        expect(empresa.ativa).toBe(true);
    });

    // Alteração com erro
    describe('Validar alteração do telefone', () => {
        it.each([
            {telefone: ""},
            {telefone: "11222222"},
            {telefone: "112222222222"},
            {telefone: "abcdefghij"},
        ])('Deve lançar erro se o telefone for $telefone', ({telefone}) => {
            expect(() => empresa.alterarTelefone({telefone}))
                .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        });

        empresa = criarEmpresaValida();
        expect(() => empresa.alterarTelefone("11999999999"))
            .toThrow("O novo telefone deve ser diferente do atual.");

        empresa.inativar();
        expect(() => empresa.alterarTelefone("1133333333"))
            .toThrow("Não é possível alterar o telefone de uma empresa inativa.");
    });

    describe("Validar alteração do e-mail", () => {
        it.each([
            {email: ""},
            {email: "novoemail.com.br"},
            {email: "novoemail.combr"},
            {email: "novoemail"},
        ])('Deve lançar erro se o e-mail for $email', ({email}) => {
            expect(() => empresa.alterarEmail({email}))
                .toThrow("O e-mail informado é inválido.");
        });

        empresa = criarEmpresaValida();
        expect(() => empresa.alterarEmail("contato@empresa.com"))
            .toThrow("O novo e-mail deve ser diferente do atual.");

        empresa.inativar();
        expect(() => empresa.alterarEmail("contatos@empresa.com"))
            .toThrow("Não é possível alterar o e-mail de uma empresa inativa.");
    });

    describe("Validar alteração de razão social", () => {
        expect(() => empresa.alterarRazaoSocial(""))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.");
        expect(() => empresa.alterarRazaoSocial("a"))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.");
        expect(() => empresa.alterarRazaoSocial("bb"))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.");
    //describe("Validar alteração de razão social", () => {
        // it.each([
        //     {razaoSocial: ""},
        //     {razaoSocial: "a"},
        //     {razaoSocial: "bb"},
        // ])('Deve lançar erro se a razão social for $razaoSocial', ({razaoSocial}) => {
        //     expect(() => empresa.alterarRazaoSocial({razaoSocial}))
        //         .toThrow("A razão social deve conter pelo menos 3 caracteres.");
        // });

        empresa = criarEmpresaValida();
        expect(() => empresa.alterarRazaoSocial("Minha Empresa LTDA"))
            .toThrow("A nova razão social deve ser diferente da atual.");

        empresa.inativar();
        expect(() => empresa.alterarRazaoSocial("Minha Empresa LTDA - Alterada"))
            .toThrow("Não é possível alterar a razão social de uma empresa inativa.");
    });

    describe("Validar alteração de nome fantasia", () => {
        expect(() => empresa.alterarNomeFantasia(""))
            .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.");
        expect(() => empresa.alterarNomeFantasia("a"))
            .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.");
    // describe("Validar alteração do nome fantasia", () => {
    //     it.each([
    //         {nomeFantasia: ""},
    //         {nomeFantasia: "a"},
    //         {nomeFantasia: "0"},
    //     ])('Deve lançar erro se o nome fantasia for $nomeFantasia', ({nomeFantasia}) => {
    //         expect(() => empresa.alterarNomeFantasia({nomeFantasia}))
    //             .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.");
    //     });

        empresa = criarEmpresaValida();
        expect(() => empresa.alterarNomeFantasia("Minha Empresa"))
            .toThrow("O novo nome fantasia deve ser diferente do atual.");

        empresa.inativar();
        expect(() => empresa.alterarNomeFantasia("Minha Empresa LTDA - Alterada"))
            .toThrow("Não é possível alterar o nome fantasia de uma empresa inativa.");
    });

    //
    it("Lançar erro se inativar uma empresa inativa", () => {
        empresa.inativar();
        expect(() => empresa.inativar())
            .toThrow("A empresa já está inativa.");
    });

    it("Lançar erro se reativar uma empresa ativa", () => {
        expect(() => empresa.reativar())
            .toThrow("A empresa já está ativa.");
    });

    test.todo("Empresa"); // Proposital
});
