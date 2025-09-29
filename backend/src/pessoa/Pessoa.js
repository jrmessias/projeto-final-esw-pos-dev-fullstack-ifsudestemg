class Pessoa {
    constructor(nome, cpf, dataNascimento, email, telefone) {
        if (!nome || nome.length < 3) {
            throw new Error("O nome deve conter pelo menos 3 caracteres.");
        }

        if (!cpf || (cpf).length > 11 || (cpf).length < 11 || !/^\d{11}$/.test(cpf)) {
            throw new Error("O CPF deve conter 11 dígitos numéricos.");
        }

        if (!(dataNascimento instanceof Date) || isNaN(dataNascimento)) {
            throw new Error("A data de nascimento deve ser uma data válida.");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("O e-mail informado é inválido.");
        }

        if (!/^\d{10,11}$/.test(telefone)) {
            throw new Error("O telefone deve conter 10 ou 11 dígitos numéricos.");
        }

        this.nome = nome;
        this._cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.telefone = telefone;
    }

    get cpf(){
        return this._cpf;
    }

    alterarTelefone(telefone) {
        if (!/^\d{10,11}$/.test(telefone)) {
            throw new Error("O telefone deve conter 10 ou 11 dígitos numéricos.");
        }

        this.telefone = telefone;
    }

    alterarEmail(email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("O e-mail informado é inválido.");
        }

        if (this.email === email) {
            throw new Error("O e-mail informado é igual ao atual.");
        }

        this.email = email;
    }

    alterarCpf(novoCpf) {
        throw new Error("Não é permitido alterar o CPF da pessoa.");
    }
}

module.exports = Pessoa;
