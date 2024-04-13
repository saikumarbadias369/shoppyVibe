const express=require("express");
const cors=require("cors");

console.log('before connecting1')
const authRoutes=require('./routes/auth.route.js')

const app= express()
console.log('before connecting3')
app.use(express.json())
app.use(cors())
console.log('before connecting2')
app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api",status:true})   
})

console.log('before connecting4')
app.use('/auth',authRoutes)

//loss400/auth/login
const userRouter=require('./routes/user.route.js')
app.use('/api/users',userRouter)
console.log('before connecting5')
const cartRouter=require('./routes/cart.route.js')
app.use('/api/cart',cartRouter)

const cartItemRouter=require('./routes/cartItem.route.js')
app.use('/api/cart_items',cartItemRouter)

const   productRouter=require('./routes/product.route.js')
app.use('/api/products',productRouter)

module.exports=app;

