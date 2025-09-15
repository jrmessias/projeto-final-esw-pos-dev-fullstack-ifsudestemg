class Pessoa {
    constructor(nome, cpf, dataNascimento, email, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.telefone = telefone;
    }

    alterarTelefone(telefone) {
        this.telefone = telefone;
    }

    alterarEmail(email) {
        this.email = email;
    }
}

module.exports = Pessoa;
