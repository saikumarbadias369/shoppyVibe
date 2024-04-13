const express=require("express")
const router=express.Router()
const userController =require("../controller/user.controller")

router.get('/profile',userController.getUserProfile)

module.exports=router;