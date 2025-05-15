const orderController = require('../controllers/orderController')
const Router = require('express').Router()
const {protect} = require ('../controllers/authController')

Router.route('/')
.get(protect, orderController.getOrders)
.post(orderController.createOrder)

Router.route('/:id')
.patch(protect, orderController.changeOrderStatus)

module.exports = Router