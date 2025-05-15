const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    pavadinimas:{
        type: String,
        required: [true, "Patiekalas turi tureti pavadinima"]
    },
    aprašymas: {
        type: String
    },
    nuotrauka:{
        type:String
    },
}, {_id: true})


module.exports = itemSchema
