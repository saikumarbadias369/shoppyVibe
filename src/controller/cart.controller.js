const cartService=require('../services/cart.services')

const finduserCart=async(req,res)=>{
   
const user=  req.user
console.log(user)
try {
    const cart=cartService.findUserCart(user._id)
    return res.status(200).send( await cart)
} catch (error) {
    return res.status(500).send({error:error.message})
}
}

const addItemToCatr=async(req,res)=>{
    const user=req.user
    try {
        const cartItem=await cartService.addCartItem(user._id,req.body)
    
        return res.status(200).send({cartItem,message:"Item Added to Cart"})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
    }
    module.exports={finduserCart,addItemToCatr}