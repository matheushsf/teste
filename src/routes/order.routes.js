const { Router } = require('express')
const {validationResult, check } = require('express-validator');
const  { cpf } = require('cpf-cnpj-validator'); 
const { createConnection } = require('typeorm')
const { Order } = require('../../entity/order/Order.js')

const orderRouter = Router()

const onConnected = (connection) => {

    orderRouter.get('/', async(req, res)=>{
        let userRepository = connection.getRepository(Order)
        try{
             const data = await userRepository.find()

            console.log(await userRepository)
            res.send(data)
        }catch(erro){
            console.log(erro)
            res.send(erro)
        }
    })

    orderRouter.post('/', async (request, response) => {
        await check('email').isEmail().withMessage('Campo EMAIL ausente ou com formato errado. Exemplo: teste@gmail.com').run(request);
        await check('nome').isLength({ min: 3 }).withMessage('Campo NOME ausente ou com o formato errado. É necessário no minimo 3 letras.').run(request);
        await check('cpf').custom(value => cpf.isValid(value)).withMessage('Campo CPF ausente ou com o formato errado.').run(request);
        await check('cep').custom(value => {
            const pattern =  /^[0-9]{5}-[0-9]{3}$/
            return pattern.test(value)
        }).withMessage('Campo CEP ausente ou com o formato errado. Exemplo: 00000-000').run(request);
        
        await check('frete').custom(value => typeof value == "number").withMessage('Campo FRETE ausente ou com o formato errado. É necessário ser do tipo NUMBER!').run(request)
        await check('valor').custom(value => typeof value == "number").withMessage('Campo VALOR ausente ou com o formato errado. É necessário ser do tipo NUMBER!').run(request)
        
        await check('itens.*.sku').isString().withMessage('Campo SKU ausente ou com o formato errado. É necessário ser do tipo STRING').run(request)
        await check('itens.*.descricao').isString().withMessage('Campo descricao ausente ou com o formato errado. É necessário ser do tipo STRING').run(request)
        await check('itens.*.valor').custom(value => typeof value == "number").withMessage('Campo VALOR ausente ou com o formato errado. É necessário ser do tipo NUMBER').run(request)
        await check('itens.*.quantidade').custom(value =>{
            if(!Number. isInteger(value) || typeof value == "string"){
                return false
            }else {
                return true
            }
        }).withMessage('Campo QUANTIDADE ausente ou com o formato errado. É necessário ser do tipo NUMBER').run(request)
    
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array()});
        }else{
            const user = new Order(request.body.nome, request.body.email, request.body.cpf,request.body.cep, request.body.frete, request.body.valor, request.body.itens)
            await userRepository.save(user)

            res.send(user)
        }
    })
}



createConnection()
    .then(onConnected)
    .catch((error) => console.log(error))

module.exports = orderRouter