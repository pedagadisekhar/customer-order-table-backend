const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    customerid:{
        type:String
    },
    customername:{
        type:String
    },
    email:{
        type:String
    }
})

module.exports = mongoose.model("customer",customerSchema)