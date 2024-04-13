const Category = require('../models/category.model')
const Product = require('../models/product.model.js')



async function createProduct(reqDate) {

    console.log('reqDate>' + reqDate.topLavelCategory)
    let topLevel = await Category.findOne({ name: reqDate.topLavelCategory })
    console.log('topLevel>' + topLevel)
    if (!topLevel) {
        topLevel = new Category({
            name: reqDate.topLavelCategory,
            level: 1
        })
        await topLevel.save()
    }


    let secondLevel = await Category.findOne({ name: reqDate.secondLavelCategory, parentCategory: topLevel._id })

    if (!secondLevel) {
        secondLevel = new Category({
            name: reqDate.secondLavelCategory,
            parentCategory: topLevel._id,
            level: 2
        })
        await secondLevel.save()
    }


    let thireLevel = await Category.findOne({ name: reqDate.thirdLavelCategory, parentCategory: secondLevel._id })

    if (!thireLevel) {
        thireLevel = new Category({
            name: reqDate.thirdLavelCategory,
            parentCategory: secondLevel._id,
            level: 3
        })
        await thireLevel.save()
    }

    const product = new Product({
        title: reqDate.title,
        color: reqDate.color,
        description: reqDate.description,
        discountedPrice: reqDate.discountedPrice,
        discountPercent: reqDate.discountPercent,
        imageUrl: reqDate.imageUrl,
        brand: reqDate.brand,
        price: reqDate.price,
        sizes: reqDate.sizes,
        discountPersent: reqDate.discountPersent,
        quantity: reqDate.quantity,
        category: thireLevel._id
    })

    await product.save()
    return product
}



async function findProductById(id) {
    const product = await Product.findById(id).populate('category').exec()
    if (!product) {
        throw new Error('product not found with id : ' + id)
    }
    return product

}


async function getAllProducts(reqQuery) {
    let { category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize,search } = reqQuery
    console.log('------------')
    console.log(category, color, size, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize,search)

    try {
        pageSize = pageSize || 10;
        let query = Product.find().populate('category')
        if(search){
            // const regexPattern = new RegExp(search, "i")
            const regexPattern =search.split(" ").map(word => `\\b${word}\\b`).join("|");
            query = query.where('title').regex(regexPattern);
         
        }
        if (category) {
            const existCategory = await Category.findOne({ name: category })
            console.log('existCategory1')
            if (existCategory) {
                query = query.where('category').equals(existCategory._id)
                console.log('existCategory2')
            } else if(!(search)){
                console.log('existCategory2else')
                return { content: [], currentPage: 1, totalPages: 0 }
            }
        }

    
        if (color) {
            const colorSet = new Set(color.split(',').map(color => color.trim().toLowerCase()))

            const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join('|'), 'i') : null

            query = query.where("color").regex(colorRegex);
        }
        console.log(minPrice, maxPrice)
        if (minPrice && maxPrice) {
            query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
            console.log('existCategory4')
        }

        if (minDiscount) {
                query = query.where('discountPersent').gt(minDiscount)
            }

            if (stock) {
                    if (stock == 'in_stock') {
                        query = query.where('quantity').gt(0)
                    
                    }
                    else if (stock == 'out_of_stock') {
                        query =  query.where('quantity').lte(0)
                   
                    }
        
                }

       if (size) {
            const sizesSet = new Set(size)
            query = query.where('size').in([...sizesSet])
            console.log("ou----------t")
        }

        if (sort) {
            const sortDirection = sort === 'price_high' ? -1 : 1;
            query = query.sort({ discountedPrice: sortDirection })
        }


        const totalProducts = await Product.countDocuments(query)
        const skip = (pageNumber - 1) * pageSize
        console.log('query>1' + query)
        query = query.skip(skip).limit(pageSize)
        console.log('query>' + query)
        const products = await query.exec();
        console.log('query>2' + query)

        const totalPages = Math.ceil(totalProducts / pageSize)
        console.log('existCategory10')
        return { content: products, currentPage: pageNumber, totalPages }

        // if (color) {
        //     const colorSet = new Set(color.split(',').map(color => color.trim().toLowerCase()))

        //     const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join('|'), 'i') : null

        //     query = query.where("color").regex(colorRegex);
        // }
        // if (sizes) {
        //     const sizesSet = new Set(sizes)
        //     query = query.where('sizes.name').in([...sizesSet])

        // }
        // console.log('existCategory3')
        // if (minPrice && maxPrice) {
        //     query =await query.where('discountedPrice').gte(minPrice).lte(maxPrice);
        //     console.log('existCategory4')
        // }
        // console.log('query33>'+query)
        // if (minDiscount) {
        //     query = query.where('discountPercent').gt(minDiscount)
        // }
        // if (stock) {
        //     if (stock == 'in_stock') {
        //         query = query.where('quantity').gt(0)
        //     }
        //     else if (stock == 'out_of_stock') {
        //         query =  query.where('quantity').gt(1)
        //     }

        // }

        // if (sort) {
        //     const sortDirection = sort === 'price_high' ? -1 : 1;
        //     query = query.sort({ discountedPrice: sortDirection })
        // }

        // const totalProducts = await Product.countDocuments(query)
        // const skip = (pageNumber - 1) * pageSize
        // console.log('query>1'+query)
        // query = query.skip(skip).limit(pageSize)
        // const products = await query.exec();
        // console.log('query>2'+query)

        // const totalPages = Math.ceil(totalProducts / pageSize)
        // console.log('existCategory10')
        // return { content: products, currentPage: pageNumber, totalPages }
    } catch (error) {
        console.log("error>"+error.message)
    }


}


async function createMultipleProducts(products) {
    const productlist = []
    for (let product of products) {
        // console.log(product)
        if (product.topLavelCategory && product.secondLavelCategory && product.thirdLavelCategory) {
            const check = createProduct(product)
            productlist.push(await check)
        }

    }

    return productlist
}
module.exports = { createProduct, findProductById, getAllProducts, createMultipleProducts }