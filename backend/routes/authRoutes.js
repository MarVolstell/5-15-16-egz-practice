const Router = require('express').Router()
const authController = require('../controllers/authController')

Router.route('/register').post(authController.signup)
Router.route('/login').post(authController.login)

module.exports = Router