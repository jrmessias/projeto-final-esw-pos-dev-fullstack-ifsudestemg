const Empresa = require("../src/empresa/Empresa");

describe("Empresa", () => {
    let empresa;

    beforeEach(() => {
        empresa = criarEmpresaValida();
    });

    afterEach(() => {
        empresa = null;
        // console.log(`Empresa: ${empresa}`);
        // Uso de Mock
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

    it("Deve criar uma empresa com os atributos corretos", () => {
        expect(empresa.razaoSocial).toBe("Minha Empresa LTDA");
        expect(empresa.nomeFantasia).toBe("Minha Empresa");
        expect(empresa.cnpj).toBe("12345678000199");
        expect(empresa.email).toBe("contato@empresa.com");
        expect(empresa.telefone).toBe("11999999999");
    });

    it('Deve lançar erro se os dados para empresa estão incorretos', () => {
        expect(() => criarEmpresaValida({razaoSocial: ""}))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.")
        expect(() => criarEmpresaValida({razaoSocial: "1"}))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.")
        expect(() => criarEmpresaValida({razaoSocial: "22"}))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.")

        expect(() => criarEmpresaValida({nomeFantasia: ""}))
            .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.")
        expect(() => criarEmpresaValida({nomeFantasia: "1"}))
            .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.")

        expect(() => criarEmpresaValida({cnpj: ""}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => criarEmpresaValida({cnpj: "0123456789012"}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => criarEmpresaValida({cnpj: "012345678901212"}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => criarEmpresaValida({cnpj: "abcdefghojk123"}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")

        expect(() => criarEmpresaValida({email: ""}))
            .toThrow("O e-mail informado é inválido.")
        expect(() => criarEmpresaValida({email: "nomeempresa.com.br"}))
            .toThrow("O e-mail informado é inválido.")

        expect(() => criarEmpresaValida({telefone: ""}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.")
        expect(() => criarEmpresaValida({telefone: "123456789"}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.")
        expect(() => criarEmpresaValida({telefone: "123123123123"}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.")
        expect(() => criarEmpresaValida({telefone: "abcdefghij"}))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.")
    });

    it("Deve alterar o telefone corretamente", () => {
        empresa.alterarTelefone("11888888888");

        expect(empresa.telefone).toBe("11888888888");
    });

    it("Deve lançar erro se a alteração de telefone não ocorrer", () => {
        expect(() => empresa.alterarTelefone("11222222"))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        expect(() => empresa.alterarTelefone("112222222222"))
            .toThrow("O telefone deve conter 10 ou 11 dígitos numéricos.");
        expect(() => empresa.alterarTelefone("11999999999"))
            .toThrow("O novo telefone deve ser diferente do atual.");
        empresa.inativar();
        expect(() => empresa.alterarTelefone("1133333333"))
            .toThrow("Não é possível alterar o telefone de uma empresa inativa.");
    });

    it("Deve alterar o email corretamente", () => {
        empresa.alterarEmail("novoemail@empresa.com");

        expect(empresa.email).toBe("novoemail@empresa.com");
    });

    it("Deve lançar erro se a alteração de email não ocorrer", () => {
        expect(() => empresa.alterarEmail(""))
            .toThrow("O e-mail informado é inválido.");
        expect(() => empresa.alterarEmail("novoemail.com.br"))
            .toThrow("O e-mail informado é inválido.");
        expect(() => empresa.alterarEmail("contato@empresa.com"))
            .toThrow("O novo e-mail deve ser diferente do atual.");
        empresa.inativar();
        expect(() => empresa.alterarEmail("contatos@empresa.com"))
            .toThrow("Não é possível alterar o e-mail de uma empresa inativa.");
    });

    it("Deve alterar a razão social corretamente", () => {
        empresa.alterarRazaoSocial("Minha Empresa LTDA - Alterada");

        expect(empresa.razaoSocial).toBe("Minha Empresa LTDA - Alterada");
    });

    it("Deve lançar erro se a alteração de razao social não ocorrer", () => {
        expect(() => empresa.alterarRazaoSocial(""))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.");
        expect(() => empresa.alterarRazaoSocial("a"))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.");
        expect(() => empresa.alterarRazaoSocial("bb"))
            .toThrow("A razão social deve conter pelo menos 3 caracteres.");

        expect(() => empresa.alterarRazaoSocial("Minha Empresa LTDA"))
            .toThrow("A nova razão social deve ser diferente da atual.");

        empresa.inativar();
        expect(() => empresa.alterarRazaoSocial("Minha Empresa LTDA - Alterada"))
            .toThrow("Não é possível alterar a razão social de uma empresa inativa.");
    });

    it("Deve alterar o nome fantasia corretamente", () => {
        empresa.alterarNomeFantasia("Minha Empresa - Alterada");

        expect(empresa.nomeFantasia).toBe("Minha Empresa - Alterada");
    });

    it("Deve lançar erro se a alteração de nome fantasia não ocorrer", () => {
        expect(() => empresa.alterarNomeFantasia(""))
            .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.");
        expect(() => empresa.alterarNomeFantasia("a"))
            .toThrow("O nome fantasia deve conter pelo menos 2 caracteres.");

        expect(() => empresa.alterarNomeFantasia("Minha Empresa"))
            .toThrow("O novo nome fantasia deve ser diferente do atual.");

        empresa.inativar();
        expect(() => empresa.alterarNomeFantasia("Minha Empresa LTDA - Alterada"))
            .toThrow("Não é possível alterar o nome fantasia de uma empresa inativa.");
    });

    it("Deve lançar erro se inativar uma empresa inativa", () => {
        empresa.inativar();
        expect(() => empresa.inativar())
            .toThrow("A empresa já está inativa.");
    });

    it("Deve lançar erro se reativar uma empresa ativa", () => {
        expect(() => empresa.reativar())
            .toThrow("A empresa já está ativa.");
    });

    it("Deve reativar uma empresa corretamente", () => {
        empresa.inativar();
        empresa.reativar();
        expect(empresa.ativa).toBe(true);
    });
});
