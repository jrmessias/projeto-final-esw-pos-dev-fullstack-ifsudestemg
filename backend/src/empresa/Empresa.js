class Empresa {
    constructor(razaoSocial, nomeFantasia, cnpj, email, telefone) {
        if (!razaoSocial || razaoSocial.length < 3) {
            throw new Error("A razão social deve conter pelo menos 3 caracteres.");
        }

        if (!nomeFantasia || nomeFantasia.length < 2) {
            throw new Error("O nome fantasia deve conter pelo menos 2 caracteres.");
        }

        if (!cnpj || !/^\d{14}$/.test(cnpj)) {
            throw new Error("O CNPJ deve conter 14 dígitos numéricos.");
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("O e-mail informado é inválido.");
        }

        if (!telefone || !/^\d{10,11}$/.test(telefone)) {
            throw new Error("O telefone deve conter 10 ou 11 dígitos numéricos.");
        }

        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this._cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
        this._ativa = true;
    }

    get cnpj() {
        return this._cnpj;
    }

    get ativa() {
        return this._ativa;
    }

    alterarTelefone(telefone) {
        if (!telefone || !/^\d{10,11}$/.test(telefone)) {
            throw new Error("O telefone deve conter 10 ou 11 dígitos numéricos.");
        }

        if (!this.ativa) {
            throw new Error("Não é possível alterar o telefone de uma empresa inativa.");
        }

        if (this.telefone === telefone) {
            throw new Error("O novo telefone deve ser diferente do atual.");
        }

        this.telefone = telefone;
    }

    alterarEmail(email) {
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error("O e-mail informado é inválido.");
        }

        if (!this.ativa) {
            throw new Error("Não é possível alterar o e-mail de uma empresa inativa.");
        }

        if (this.email === email) {
            throw new Error("O novo e-mail deve ser diferente do atual.");
        }

        this.email = email;
    }

    alterarRazaoSocial(novaRazao) {
        if (!novaRazao || novaRazao.length < 3) {
            throw new Error("A razão social deve conter pelo menos 3 caracteres.");
        }

        if (!this.ativa) {
            throw new Error("Não é possível alterar a razão social de uma empresa inativa.");
        }

        if (novaRazao === this.razaoSocial) {
            throw new Error("A nova razão social deve ser diferente da atual.");
        }

        this.razaoSocial = novaRazao;
    }

    alterarNomeFantasia(novoNome) {
        if (!novoNome || novoNome.length < 2) {
            throw new Error("O nome fantasia deve conter pelo menos 2 caracteres.");
        }

        if (!this.ativa) {
            throw new Error("Não é possível alterar o nome fantasia de uma empresa inativa.");
        }

        if (this.nomeFantasia === novoNome) {
            throw new Error("O novo nome fantasia deve ser diferente do atual.");
        }

        this.nomeFantasia = novoNome;
    }

    inativar() {
        if (!this.ativa) {
            throw new Error("A empresa já está inativa.");
        }

        this._ativa = false;
        this.dataInativacao = new Date();
    }

    reativar() {
        if (this.ativa) {
            throw new Error("A empresa já está ativa.");
        }

        this._ativa = true;
        delete this.dataInativacao;
    }
}

module.exports = Empresa;
