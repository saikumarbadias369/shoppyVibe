const Cart =require('../models/cart.model.js')
const Product =require('../models/product.model.js')
const CartItem = require('../models/cartItem.model.js')

const createCart=async(user)=>{
try{
    const cart=new Cart({user})
    const createCart=await cart.save()
    return createCart
}
catch(error){
    throw new Error(error.message)
}
}

// { 
//     id:"products1",
//     url: 'https://rukminim1.flixcart.com/image/150/150/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70', 
//     detailUrl: 'https://rukminim1.flixcart.com/image/416/416/kapoo7k0/electric-kettle/p/6/s/pigeon-favourite-original-imafs7xhj5uwgrh4.jpeg?q=70',
//     title: {
//         shortTitle: 'Home & Kitchen',
//         longTitle: 'Pigeon FAVOURITE Electric Kettle  (1.5 L, Silver, Black)'
//     }, 
//     price: {
//         mrp: 1195,
//         cost: 625,
//         discount: '47%'
//     },
//     description: 'This electric kettle from Pigeon will soon become a travelers best friend, a hostelite saviour and an answer to all the midnight cravings. With this handy appliance, you can boil water and use it to make instant noodles, packet soup, coffee and green tea.',
//     discount: 'Extra 10% Off', 
//     tagline: 'Deal of the day' 
// },


async function findUserCart(userId){
    try{
        let cart=await Cart.findOne({user:userId})
        console.log("cart>", cart._id)
        let cartItems=await CartItem.find({cart:cart._id})//.populate(Product)
        cart.cartItems=cartItems
    console.log("cartItems>>",cart.cartItems)
        let totalPrice=0;
        let totalDiscountedPrice=0
        let totalItem=0

        for (const cartItem of cart.cartItems){
            totalPrice+=cartItem.price
            totalDiscountedPrice+=cartItem.discountedPrice
            totalItem+=cartItem.quantity
        }
        cart.totalPrice=totalPrice;
        cart.totalDiscountedPrice=totalDiscountedPrice;
        cart.totalItems=totalItem
        cart.discount=totalPrice-totalDiscountedPrice
        

        return cart;
    }catch(error){

        throw new Error(error.message)
    }

}

async function addCartItem(userId,req){
    try{

    const cart=await Cart.findOne({user:userId})
    const product=await Product.findById(req.productId)
    console.log("product>",product)
    console.log("cart>",cart)
    const ispresent=await CartItem.findOne({cart:cart._id,product:product._id,userId})

console.log('product>>'+product)

    console.log("ispresent>",ispresent)
    if(!ispresent){
        const cartItem=new CartItem({
            products:product._id,
            product:product,
            cart:cart._id,
            quantity:1,
            userId,
            price:product.price,
            size:req.size,
            discountedPrice:product.discountedPrice
        })
        const createdCartItem=await cartItem.save();
        console.log(createdCartItem)
        console.log("cart.cartItems>>",cart.cartItems)
        cart.cartItems.push(createdCartItem)
        // cart.cari
        await cart.save()
       
        return cart
    }
    }catch(error){
        throw new Error(error.message)
    }
}


module.exports={createCart,findUserCart,addCartItem}