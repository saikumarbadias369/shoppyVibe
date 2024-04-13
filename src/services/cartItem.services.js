const userService=require('../services/user.services.js')
const CartItem =require('../models/cartItem.model.js')

async function updateCartItem(userId,cartItemId,cartitemDate){
    console.log("logging",">>",userId," ",cartItemId," "," ",cartitemDate.quantity)
    try{
const item=await findCartItemById(cartItemId)
console.log('updateIt>'+item)
if(!item){
    throw new Error('cart Item Not Found : ',cartItemId)
}
const user=await userService.findUserById(item.userId)
console.log('userUpda>'+user)
if(!user){
    throw new Error('user Not Found : ',userId)
}
if(user._id.toString()===userId.toString()){
    item.quantity=cartitemDate.quantity;
    item.price=item.quantity*item.product.discountedPrice
    const updatedCartItem=await item.save()
    return updatedCartItem
}
else{
    throw new Error("you can't update this Item")
}
    }catch(error){
console.log('error in upI>'+error.message)
  throw new Error(error.message)
    }
}



async function findCartItemById(cartItemId){
    const cartItem=await CartItem.findById(cartItemId)
    console.log('findCaItem>'+cartItem)
    if(cartItem){
        return cartItem
    }
    else{
    
        throw new Error('cart Item not Found with id : ',cartItem)
    }
}

async function removeCardItem(userId,cartItemId){
    console.log("userId>",userId)
  
    try{
        const cartItem=await findCartItemById(cartItemId)
        const user =await userService.findUserById(userId)

        if(user._id.toString()===cartItem.userId.toString()){
            console.log("cartItemId>",cartItem)
  await CartItem.findByIdAndDelete(cartItemId)
  
        }
    }
    catch(error){
        throw new Error(error.message)
    
    }
}

module.exports={updateCartItem,removeCardItem,findCartItemById}