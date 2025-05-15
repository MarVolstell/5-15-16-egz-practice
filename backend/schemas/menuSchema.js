const mongoose = require('mongoose')
const itemSchema = require('./itemSchema')


const menuSchema = mongoose.Schema({
    pavadinimas: {
        type: String,
        required: true
    },
    patiekalai: [itemSchema]
})

module.exports = menuSchema