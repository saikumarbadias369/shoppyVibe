const userService=require('../services/user.services.js')
const jwtProvider =require('../config/jwtProvider.js')
const cartService=require('../services/cart.services.js')
const bcrypt=require("bcrypt")

const register=async(req,res)=>{
    try{
        console.log("req.body",req.body)
        const user=await userService.createUser(req.body);
        const jwt=jwtProvider.generateToken(user._id)
        await cartService.createCart(user)
        return res.status( 200).send({jwt,message:"register success"})
    }
    catch(error){
        return res.status(500).send({error:error.message})
    }
}


const login=async(req,res)=>{
    const{password,email}=req.body
    console.log(password," >",email)
    try{
        const user=await userService.getUserByEmail(email)
        console.log(">",user)
        if(!user){
            return res.status(404).send({message:"user not found with email :",user})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        console.log("isPasswordValid>",isPasswordValid)
        if(!isPasswordValid){
            return res.status(404).send({message:"invalid password:"})
            
        }

        const jwt=jwtProvider.generateToken(user._id)
           return res.status(200).send({jwt,message:"login success"})
    }
    catch(error){
        return res.status(500).send({error:error.message})
    }
  
}




module.exports={register,login}