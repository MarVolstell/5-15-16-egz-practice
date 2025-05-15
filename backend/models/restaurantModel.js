const mongoose = require('mongoose')
const menuSchema = require('../schemas/menuSchema')

const restaurantSchema = mongoose.Schema ({
    pavadinimas: {
        type: String,
        required: [true, 'Restoranas turi tureti pavadinima']
    },
    kodas:{
        type: String,
        required: [true, 'net nezinau ka tai reiskia. kas kodas???']
    },
    adresas: {
        type: String,
        required: [true, 'Restoranas turi tureti adresa']
    },
    meniu: [menuSchema],
    specializacija: {
        type: String
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant