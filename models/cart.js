const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    quantity:{
        type: Number,
    },
    total:{
        type: Number,
    },
    idProduct:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
}, {timestamps:true}   )

module.exports = mongoose.model('Cart', CartSchema)