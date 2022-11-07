const express = require("express")
const app = express()


const mongoose = require("mongoose")
const customer = require("./models/customer")
const order = require("./models/order")
const product = require("./models/producttable")

mongoose.connect("mongodb+srv://todolist:todolist@cluster0.7fz99q2.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>{console.log("connected to db")}
).catch((e)=>{console.log("error",e)})

app.use(express.json())

app.post("/customer", async(req,res)=>{
   // const {customerid,customername,email} = req.body
    try {
        const user = await customer.create(req.body)
    
       
        res.json({
            message:"data added succesfully",
            user
        })
    } catch (error) {
        res.send({
            message:error.message
        })
    }
  
    
})

app.get("/customer", async(req,res)=>{
    try {
        const data = await customer.find({})
    res.send(data)
    } catch (error) {
        res.send(error)
    }
    
})


app.post("/product",(req,res)=>{
    const newitem = new product (req.body)
    newitem.save().then(
        ()=>{res.status(201).send(newitem)}
    ).catch((e)=>{
        res.status(404).send(e)
    })
})

app.get("/product",async(req,res)=>{
    try {
        const data = await product.find({})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.get("/product/electronics",async(req,res)=>{
    try {
        const data = await product.find({producttype:"electronics"})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.get("/product/furniture",async(req,res)=>{
    try {
        const data = await product.find({producttype:"furniture"})
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

app.post("/order",async(req,res)=>{
    try {
        const {customerid,productid,productname,quantity} = req.body
        const alldata = await product.findOne({productname:productname})
        if(quantity<alldata.availablequantity){
            const neworder = await order.create(req.body)
            let remainingstock = alldata.availablequantity-quantity
            let id = alldata.id
            const update = await product.findByIdAndUpdate({id:id,availablequantity:remainingstock})
            const updatestock = await product.findOne({productname:productname})
            return res.json({status:"item is in stock",message:"order placed"})
        }else{
            return res.json({status:"out of stock",message:"sorry"})
        }

    } catch (error) {
        res.send(error)
    }
})

app.get("/",(req,res)=>{
    res.send("hello")
})
 app.listen(3000,()=>console.log("server running on 3000"))