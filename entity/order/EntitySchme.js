const Order = require('./Order')
const { EntitySchema } = require('typeorm')

module.export = new EntitySchema({
    name: "Order",
    target: Order,
    columns:{
        cpf: {
            primary: true,
            type: "varchar"
        },
        nome:{
            type: "varchar"
        },
        email:{
            type:"varchar"
        },
        cep:{
            type:"varchar"
        },
        frete:{
            type: "int"
        },
        valor:{
            type: "int"
        }
    }
})