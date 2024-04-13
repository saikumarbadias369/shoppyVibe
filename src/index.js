const express=require("express");
const cors=require("cors");

const authRoutes=require('./routes/auth.route.js')

const app= express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api",status:true})   
})


app.use('/auth',authRoutes)

const userRouter=require('./routes/user.route.js')
app.use('/api/users',userRouter)

const cartRouter=require('./routes/cart.route.js')
app.use('/api/cart',cartRouter)

const cartItemRouter=require('./routes/cartItem.route.js')
app.use('/api/cart_items',cartItemRouter)

const   productRouter=require('./routes/product.route.js')
app.use('/api/products',productRouter)

module.exports=app;