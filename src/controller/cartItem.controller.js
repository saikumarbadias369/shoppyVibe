const cartItemService=require('../services/cartItem.services')

const updateCartItem=async(req,res)=>{
    const user=req.user
    try {
        console.log("req.params.i>"+req.params.id)
   
        const updateCartItem=await cartItemService.updateCartItem(user._id,req.params.id,req.body)
        console.log("updateCartItem>>"+updateCartItem)
        return res.status(200).send(updateCartItem)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}

const removeCartItem=async(req,res)=>{
    const user=req.user
    try {
    await cartItemService.removeCardItem(user._id,req.params.id,)
        return res.status(200).send({message:'cart Item removed succesfully'})
    } catch (error) {
     
        res.status(500).send({error:error.message})
    }
}
module.exports={updateCartItem,removeCartItem}