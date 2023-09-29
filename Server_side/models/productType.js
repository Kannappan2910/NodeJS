const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
    typeName: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        require: true
    }
})

const ProductType = mongoose.model('ProductType', productTypeSchema);
module.exports = ProductType;