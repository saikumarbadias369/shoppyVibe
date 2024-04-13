const express=require("express");
const cors=require("cors");

const authRoutes=require('./src/routes/auth.route.js')

const app= express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api",status:true})   
})


app.use('/auth',authRoutes)

//loss400/auth/login
const userRouter=require('./src/routes/user.route.js')
app.use('/api/users',userRouter)

const cartRouter=require('./src/routes/cart.route.js')
app.use('/api/cart',cartRouter)

const cartItemRouter=require('./src/routes/cartItem.route.js')
app.use('/api/cart_items',cartItemRouter)

const   productRouter=require('./src/routes/product.route.js')
app.use('/api/products',productRouter)

module.exports=app;

