class Funcionario {
    constructor(cpf, cnpj, dataAdmissao, cargo, salario) {
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.dataAdmissao = dataAdmissao;
        this.cargo = cargo;
        this.salario = salario;
    }

    alterarSalario(salario) {
        this.salario = salario;
    }

    incrementarSalario(incremento) {
        this.salario += incremento;
    }

    decrementarSalario(decremento) {
        this.salario -= decremento;
    }

    alterarCargo(cargo) {
        this.cargo = cargo;
    }

    demitir() {
        this.salario = 0;
        this.cargo = null;
        this.dataDemissao = new Date();
    }
}

module.exports = Funcionario;
