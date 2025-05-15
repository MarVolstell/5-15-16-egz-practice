//what the f*** am i doing
const Router = require('express').Router()
const menuController = require('../controllers/menuController')
const {protect} = require ('../controllers/authController')

Router.route('/:id')
.post(protect, menuController.createMenu)

Router.route('/:restaurantId/:menuId')
.patch(protect, menuController.updateMenu)
.delete(protect, menuController.deleteMenu)

module.exports = Router