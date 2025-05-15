const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true, 'name required']
    },
    password:{
        type: String,
        required:[true, 'absolutely need a password'],
        minlength: 6
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

module.exports = mongoose.model('User', userSchema)
