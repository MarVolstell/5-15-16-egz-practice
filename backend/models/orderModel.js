const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    patiekalai: {
        type: [String],
        required: [true, "Negali buti uzsakymas be patiekalo"]
    },
    kiekis: {
        type: [Number],
        required: [true, "Turi buti patiekalu kiekis"]
    },
    email: {
        type: String,
        required: [true]
    },
    telNumeris: {
        type: String,
        required:[true]
    },
    statusas:{
        type: String,
        enum: ["Laukiama", "Patvirtinta", "Atšaukta"],
        default: "Laukiama"
    }
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order