const express=require("express")
const router=express.Router()

const cartItemController=require('../controller/cartItem.controller.js')
const authendicate=require('../middleware/authendicate.js')

router.put('/:id',authendicate,cartItemController.updateCartItem)
router.delete('/:id',authendicate,cartItemController.removeCartItem)

module.exports=router