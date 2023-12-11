const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    price:{
        type: Number,
    },
    image:{
        type: String,
    },
    detail:{
        type: String,
    },
    quantity:{
        type: Number,
    }
}, {timestamps:true}   )

module.exports = mongoose.model('Product', ProductSchema)