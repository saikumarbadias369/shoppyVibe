const userService=require('../services/user.services')
const jwtProvider = require('../config/jwtProvider.js')


const getUserProfile=async(req,res)=>{

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).send({ error: 'token not found...' })
        }

        const userId = jwtProvider.getUserIdFromToken(token)
console.log("userId>",userId)
        const user = await userService.findUserById(userId)
        console.log(user)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(500).send(({ error: error.message }))
    }
}

module.exports={getUserProfile}