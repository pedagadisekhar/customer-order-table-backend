const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    customerid:{
        type:String
    },
    productid:{
        type:String
    },
    productname:{
        type:String
    },
    quantity:{
        type:Number
    }
})

module.exports = mongoose.model("order",orderSchema)