const express=require("express")
const router=express.Router()

const productController=require('../controller/product.controller.js')
const authendicate=require('../middleware/authendicate.js')

router.get('/',productController.getAllProducts)
router.get('/id/:id',productController.findProductById)
router.post('/creates',authendicate,productController.createMultipleProducts)

module.exports=router