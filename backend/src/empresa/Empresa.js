class Empresa{
    constructor(razaoSocial, nomeFantasia, cnpj, email, telefone){
        this.razaoSocial = razaoSocial;
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.email = email;
        this.telefone = telefone;
    }

    alterarTelefone(telefone){
        this.telefone = telefone;
    }

    alterarEmail(email){
        this.email = email;
    }
}

module.exports = Empresa;
