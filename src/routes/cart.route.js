const express=require("express")
const router=express.Router()

const cartController=require('../controller/cart.controller.js')
const authendicate=require('../middleware/authendicate.js')

router.get('/',authendicate,cartController.finduserCart)
router.put('/add',authendicate,cartController.addItemToCatr)

module.exports=router