const  productServices=require('../services/product.services')

const   createProduct=async(req,res)=>{
    try {
        const product=await productServices.createProduct(req.body)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const   createMultipleProducts=async(req,res)=>{
    try {
        
        const product=await productServices.createMultipleProducts(req.body)
        return res.status(201).send({message:"products created successfully",products:product})
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const   findProductById=async(req,res)=>{
    console.log("product>>",req.params.id)
    try {
        const product=await productServices.findProductById(req.params.id)

        console.log("product>>",product)
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const   getAllProducts=async(req,res)=>{
    try {
       
        const product=await productServices.getAllProducts(req.query)
     
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


module.exports={createProduct,findProductById,getAllProducts,createMultipleProducts}