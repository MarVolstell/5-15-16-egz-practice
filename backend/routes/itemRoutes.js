const itemController = require('../controllers/itemController')
const Router = require('express').Router()
const {protect} = require ('../controllers/authController')

//this was a bad idea
Router.route('/:restaurantId/:menuId')
.post(protect, itemController.createItem)

Router.route('/:restaurantId/:menuId/:itemId')
.patch(protect, itemController.updateItem)
.delete(protect, itemController.deleteItem)

module.exports = Router