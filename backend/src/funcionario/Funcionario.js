class Funcionario {
    constructor(cpf, cnpj, dataAdmissao, cargo, salario) {
        if (!cpf) {
            throw new Error("CPF não informado.");
        }

        if ((cpf).length > 11 || (cpf).length < 11 || !/^\d{11}$/.test(cpf)) {
            throw new Error("O CPF deve conter 11 dígitos numéricos.");
        }

        if (!cnpj) {
            throw new Error("CNPJ não informado.");
        }

        if ((cnpj).length > 14 || (cnpj).length < 14 || !/^\d{14}$/.test(cnpj)) {
            throw new Error("O CNPJ deve conter 14 dígitos numéricos.");
        }

        if (!(dataAdmissao instanceof Date) || isNaN(dataAdmissao)) {
            throw new Error("A data de admissão deve ser uma data válida.");
        }

        const hoje = new Date();
        if (dataAdmissao > hoje) {
            throw new Error("A data de admissão não pode ser futura.");
        }

        if (!cargo || cargo.length < 2) {
            throw new Error("O cargo deve conter pelo menos 2 caracteres.");
        }

        if (isNaN(salario) || salario <= 0) {
            throw new Error("O salário deve ser maior que zero.");
        }

        this._cpf = cpf;
        this.cnpj = cnpj;
        this.dataAdmissao = dataAdmissao;
        this.cargo = cargo;
        this.salario = salario;
        this._ativo = true;
    }

    get cpf(){
        return this._cpf;
    }

    get ativo(){
        return this._ativo;
    }

    alterarCpf(novoCpf) {
        throw new Error("Não é permitido alterar o CPF do funcionário.");
    }

    alterarCnpj(cnpj) {
        if (!cnpj) {
            throw new Error("CNPJ não informado.");
        }

        if ((cnpj).length > 14 || (cnpj).length < 14 || !/^\d{14}$/.test(cnpj)) {
            throw new Error("O CNPJ deve conter 14 dígitos numéricos.");
        }

        this.cnpj = cnpj;
    }

    alterarSalario(salario) {
        if (isNaN(salario) || salario <= 0) {
            throw new Error("O novo salário deve ser maior que zero.");
        }

        if (!this.ativo) {
            throw new Error("Não é possível alterar salário de funcionário demitido.");
        }

        this.salario = salario;
    }

    incrementarSalario(incremento) {
        if (isNaN(incremento) || incremento <= 0) {
            throw new Error("O incremento deve ser maior que zero.");
        }
        if (!this.ativo) {
            throw new Error("Não é possível incrementar salário de funcionário demitido.");
        }

        this.salario += incremento;
    }

    decrementarSalario(decremento) {
        if (isNaN(decremento) || decremento <= 0) {
            throw new Error("O decremento deve ser maior que zero.");
        }
        if (!this.ativo) {
            throw new Error("Não é possível decrementar salário de funcionário demitido.");
        }
        if ((this.salario - decremento) <= 0) {
            throw new Error("O salário não pode ficar zero ou negativo.");
        }

        this.salario -= decremento;
    }

    alterarCargo(cargo) {
        if (!cargo || cargo.length < 2) {
            throw new Error("O novo cargo deve conter pelo menos 2 caracteres.");
        }
        if (!this.ativo) {
            throw new Error("Não é possível alterar cargo de funcionário demitido.");
        }
        if (this.cargo === cargo) {
            throw new Error("O novo cargo deve ser diferente do atual.");
        }

        this.cargo = cargo;
    }

    demitir() {
        if (!this.ativo) {
            throw new Error("Funcionário já está demitido.");
        }

        this.salario = 0;
        this.cargo = null;
        this.dataDemissao = new Date();
        this._ativo = false;
    }
}

module.exports = Funcionario;
