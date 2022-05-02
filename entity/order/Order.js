
module.export = class Order {
    constructor(nome, email, cpf, cep, frete, valor, itens){
        this.nome = nome
        this.email = email
        this.cpf =  cpf
        this.cep = cep
        this.frete = frete
        this.valor = valor
        this.itens = itens
    }
}

