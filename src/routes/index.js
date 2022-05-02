const { Router } = require('express')
const orderRouter = require('./order.routes')

const routes = Router()

routes.use('/order', orderRouter)

module.exports = routes