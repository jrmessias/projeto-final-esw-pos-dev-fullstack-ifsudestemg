const axios = require("axios");

class Endereco {
    constructor(cpf, cep, logradouro, numero, bairro, complemento) {
        if (!cpf) {
            throw new Error("CPF não informado.");
        }

        if ((cpf).length > 11 || (cpf).length < 11 || !/^\d{11}$/.test(cpf)) {
            throw new Error("O CPF deve conter 11 dígitos numéricos.");
        }

        if (!cep) {
            throw new Error("CEP não informado.");
        }

        if ((cep).length > 8 || (cep).length < 8 || !/^\d{8}$/.test(cep)) {
            throw new Error("O CEP deve conter 8 dígitos numéricos.");
        }

        if (!logradouro) throw new Error("Logradouro não informado.");

        if (!numero) throw new Error("Número não informado.");

        if (!bairro) throw new Error("Bairro não informado.");

        this.cpf = cpf;
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
    }

    async buscarMunicipio(cep) {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if(data.erro) throw new Error("CEP inválido.");

        const uf = data.uf;
        const municipio = data.localidade;

        this._uf = uf;
        this._municipio = municipio;

        return { uf, municipio };
    }

    get uf(){
        return this._uf;
    }

    get municipio(){
        return this._municipio;
    }

    alterarCpf(cpf) {
        throw new Error("Não é permitido alterar o CPF do endereço.");
    }

    alterarCEP(cep) {

    }

    alterarLogradouro(logradouro) {
        if (!logradouro) throw new Error("Logradouro não informado.");

        if (this.logradouro === logradouro) {
            throw new Error("O novo logradouro deve ser diferente do atual.");
        }

        this.logradouro = logradouro;
    }

    alterarNumero(numero) {
        if (!numero) throw new Error("Número não informado.");

        if (this.numero === numero) {
            throw new Error("O novo número deve ser diferente do atual.");
        }

        this.numero = numero;
    }

    alterarComplemento(complemento) {
        if (!complemento) throw new Error("Complemento não informado.");

        if (this.complemento === complemento) {
            throw new Error("O novo complemento deve ser diferente do atual.");
        }

        this.complemento = complemento;
    }

    alterarBairro(bairro) {
        if (!bairro) throw new Error("Bairro não informado.");

        if (this.bairro === bairro) {
            throw new Error("O novo bairro deve ser diferente do atual.");
        }

        this.bairro = bairro;
    }
}

module.exports = Endereco;
