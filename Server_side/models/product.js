const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    productType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    partNo:{
        type:Number,
        required:true
    }
})

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;