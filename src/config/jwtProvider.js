const jwt=require('jsonwebtoken')
require('dotenv').config()

const generateToken=(userId)=>{
    const token=jwt.sign({userId},process.env.stringKey,{expiresIn:"48h"})
    return token
}

const getUserIdFromToken=(token)=>{
    const decodeToken=jwt.verify(token,process.env.stringKey)
    return decodeToken.userId
}



module.exports={generateToken,getUserIdFromToken}