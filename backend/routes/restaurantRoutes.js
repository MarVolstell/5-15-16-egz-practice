const Router = require('express').Router()
const restaurantController = require('../controllers/restaurantController')
const {protect} = require ('../controllers/authController')

Router.route('/')
.get(restaurantController.getRestaurants)
.post(protect, restaurantController.createRestaurant)

Router.route('/:id')
.get(restaurantController.getRestaurant)
.patch(protect, restaurantController.updateRestaurant)
.delete(protect, restaurantController.deleteRestaurant)



module.exports = Router