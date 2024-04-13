const User = require("../models/user.model")
const bcrypt=require('bcrypt')
const jwtProvider =require('../config/jwtProvider.js')

const createUser=async(userData)=>{
        try{
            let {firstName,lastName,password,email,mobile}=userData
            const isUserExest=await User.findOne({email})
            if(isUserExest){
                throw new Error("user already exest with this email : ",email);
                 
            }
            password=await bcrypt.hash(password,9)
            const user=await  User.create({firstName,lastName,password,email,mobile})
            console.log("created user",user)
            return user;
        }catch(error){
            throw new Error(error.message)
        }
}



const findUserById=async(userId)=>{
    try{
        const user=User.findById(userId)
        if(!user){
            throw new Error("user not found with id :",userId)
           
        }
        return  user
        
    }
    catch(error){
        throw new Error(error.message)
    }
}

const getUserByEmail=async(email)=>{
    try{
        const user=await User.findOne({email})
        if(!user){
            throw new Error("user not found with email :",email)
            
        }
        return user
    }
    catch(error){
        throw new Error(error.message)
    }
}


const getUserProfileByToken= async(token)=>{
    try{
        const userId=jwtProvider.getUserIdFromToken(token)
        const user=await findUserById(userId)
        if(!user){
            throw new Error("user not found with id :",userId)
            
        }
        return user 
    }catch(error){
        throw new Error(error.message)

    }
    
}
module.exports={createUser,getUserByEmail,findUserById,getUserProfileByToken}