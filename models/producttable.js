const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productid:{
        type:String
    },
    producttype:{
        type:String
    },
    productname:{
        type:String
    },
    productprice:{
        type:String
    },
    availablequantity:{
        type:String
    }
})

module.exports = mongoose.model("product",productSchema)