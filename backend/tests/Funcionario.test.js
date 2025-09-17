const Funcionario = require("../src/funcionario/Funcionario");

describe("Funcionário", () => {
    let funcionario;

    beforeEach(() => {
        funcionario = criarFuncionarioValido();
    });

    const criarFuncionarioValido = (dadosParaSobrescrever = {}) => {
        const dadosPadroes = {
            cpf: "12345678900",
            cnpj: "12345678000199",
            dataAdmissao: new Date("2020-04-26"),
            cargo: "Desenvolvedor",
            salario: 5000
        };

        const funcionario = {...dadosPadroes, ...dadosParaSobrescrever};
        return new Funcionario(funcionario.cpf, funcionario.cnpj, funcionario.dataAdmissao, funcionario.cargo, funcionario.salario);
    };

    it("Deve criar um funcionário com os atributos corretos", () => {
        expect(funcionario.cpf).toBe("12345678900");
        expect(funcionario.cnpj).toBe("12345678000199");
        expect(funcionario.dataAdmissao).toEqual(new Date("2020-04-26"));
        expect(funcionario.cargo).toBe("Desenvolvedor");
        expect(funcionario.salario).toBe(5000);
        expect(funcionario.dataDemissao).toBeUndefined();
    });

    it('Deve lançar erro se o CPF da pessoa não for preenchido ou preenchido de forma incorreta', () => {
        expect(() => criarFuncionarioValido({cpf: ""}))
            .toThrow("CPF não informado.")
        expect(() => criarFuncionarioValido({cpf: "123456789000"}))
            .toThrow("O CPF deve conter 11 dígitos numéricos.")
        expect(() => criarFuncionarioValido({cpf: "1234567890"}))
            .toThrow("O CPF deve conter 11 dígitos numéricos.")
        expect(() => criarFuncionarioValido({cpf: "abcdefghojk"}))
            .toThrow("O CPF deve conter 11 dígitos numéricos.")
    });

    it('Deve lançar erro se o CNPJ da empresa não for preenchido ou preenchido de forma incorreta', () => {
        expect(() => criarFuncionarioValido({cnpj: ""}))
            .toThrow("CNPJ não informado.")
        expect(() => criarFuncionarioValido({cnpj: "012345698732"}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => criarFuncionarioValido({cnpj: "123456789012345"}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => criarFuncionarioValido({cnpj: "abcdefghojklmn"}))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
    });

    it('Deve lançar erro se a data de admissão for inválida', () => {
        expect(() => criarFuncionarioValido({dataAdmissao: new Date('20100425')}))
            .toThrow("A data de admissão deve ser uma data válida.");

        const futuro = new Date();
        futuro.setDate(futuro.getDate() + 1);
        expect(() => criarFuncionarioValido({dataAdmissao: futuro}))
            .toThrow("A data de admissão não pode ser futura.");
    });

    it('Deve lançar erro se for informado cargo de forma errada', () => {
        expect(() => criarFuncionarioValido({cargo: ""}))
            .toThrow("O cargo deve conter pelo menos 2 caracteres.");
        expect(() => criarFuncionarioValido({cargo: "a"}))
            .toThrow("O cargo deve conter pelo menos 2 caracteres.");
    });

    it('Deve lançar erro se o salario informado for zerado ou não numérico', () => {
        expect(() => criarFuncionarioValido({salario: 0}))
            .toThrow("O salário deve ser maior que zero.");
        expect(() => criarFuncionarioValido({salario: "asfdasdf"}))
            .toThrow("O salário deve ser maior que zero.");
    });

    it('Não pode altera o CPF', () => {
        expect(() => funcionario.alterarCpf({cpf: "12345678901"}))
            .toThrow("Não é permitido alterar o CPF do funcionário.");
    });

    it('Deve alterar o CNPJ', () => {
        funcionario.alterarCnpj("12306547893641")
        expect(funcionario.cnpj)
            .toBe("12306547893641");
    });

    it('Deve lançar erro se o CNPJ for inválido na alteração', () => {
        expect(() => funcionario.alterarCnpj(""))
            .toThrow("CNPJ não informado.")
        expect(() => funcionario.alterarCnpj(null))
            .toThrow("CNPJ não informado.")
        expect(() => funcionario.alterarCnpj("012345698732"))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => funcionario.alterarCnpj("123456789012345"))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
        expect(() => funcionario.alterarCnpj("abcdefghojklmn"))
            .toThrow("O CNPJ deve conter 14 dígitos numéricos.")
    });

    it('Deve alterar o salário', () => {
        funcionario.alterarSalario(6000)
        expect(funcionario.salario)
            .toBe(6000);
    });

    it('Deve lançar erro se o salario informado for zerado, não numérico ou funcionário demitido, na alteração', () => {
        expect(() => funcionario.alterarSalario(0))
            .toThrow("O novo salário deve ser maior que zero.");
        expect(() => funcionario.alterarSalario(null))
            .toThrow("O novo salário deve ser maior que zero.");
        expect(() => funcionario.alterarSalario("asdfqwer"))
            .toThrow("O novo salário deve ser maior que zero.");
        funcionario.demitir();
        expect(() => funcionario.alterarSalario(6000))
            .toThrow("Não é possível alterar salário de funcionário demitido.");
    });

    it("Deve alterar o salário corretamente", () => {
        funcionario.alterarSalario(6000);
        expect(funcionario.salario)
            .toBe(6000);
    });

    it("Deve lançar erro se o incremento do salário for inválido ou funcionário está demitido", () => {
        expect(() => funcionario.incrementarSalario(0))
            .toThrow("O incremento deve ser maior que zero.");
        expect(() => funcionario.incrementarSalario("a"))
            .toThrow("O incremento deve ser maior que zero.");
        funcionario.demitir();
        expect(() => funcionario.incrementarSalario(500))
            .toThrow("Não é possível incrementar salário de funcionário demitido.");
    });

    it("Deve incrementar o salário corretamente", () => {
        funcionario.incrementarSalario(500);
        expect(funcionario.salario).toBe(5500);
    });

    it("Deve lançar erro se o decremento do salário for inválido, negativo ou funcionário está demitido", () => {
        expect(() => funcionario.decrementarSalario(0))
            .toThrow("O decremento deve ser maior que zero.");
        expect(() => funcionario.decrementarSalario("a"))
            .toThrow("O decremento deve ser maior que zero.");
        expect(() => funcionario.decrementarSalario(6000))
            .toThrow("O salário não pode ficar zero ou negativo.");
    });

    it("Deve lançar erro ao decrementar salário de funcionário demitido", () => {
        funcionario.demitir();
        expect(() => funcionario.decrementarSalario(500))
            .toThrow("Não é possível decrementar salário de funcionário demitido.");
    });

    it("Deve decrementar o salário corretamente", () => {
        funcionario.decrementarSalario(1000);
        expect(funcionario.salario).toBe(4000);
    });

    it("Deve lançar erro se novo cargo for inválido ou funcionário está demitido", () => {
        expect(() => funcionario.alterarCargo("a"))
            .toThrow("O novo cargo deve conter pelo menos 2 caracteres.");
        expect(() => funcionario.alterarCargo("Desenvolvedor"))
            .toThrow("O novo cargo deve ser diferente do atual.");
        funcionario.demitir();
        expect(() => funcionario.alterarCargo("Gerente"))
            .toThrow("Não é possível alterar cargo de funcionário demitido.");
    });

    it("Deve alterar o cargo corretamente", () => {
        funcionario.alterarCargo("Gerente");
        expect(funcionario.cargo).toBe("Gerente");
    });

    it("Deve demitir o funcionário zerando salário e removendo cargo", () => {
        funcionario.demitir();

        expect(funcionario.salario).toBe(0);
        expect(funcionario.cargo).toBeNull();
        expect(funcionario.dataDemissao).toBeInstanceOf(Date);
    });

    it("Deve demitir o funcionário zerando salário e removendo cargo", () => {
        funcionario.demitir()
        expect(() => funcionario.demitir())
            .toThrow("Funcionário já está demitido.");
    });
});
