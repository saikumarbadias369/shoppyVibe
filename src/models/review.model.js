const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    }, user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    }, createdAt: {
        type: Date,
        default: Date.now
    }

})

const Review=mongoose.Schema("reviews",reviewSchema)

model.exports=Review