const Product = require('../models/product');
const ProductType = require('../models/productType');
const { uploadToS3 } = require('../common/fileUpload')


const createProduct = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image found' });
    }

    try {
        const imageUrl = await uploadToS3(req.file);
        console.log(imageUrl, 'uuuu')

        const { title, price, productType, category, partNo } = req.body;
        const product = new Product({ title, price, productType, category, imageUrl, partNo });

        await product.save();

        return res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Error uploading and saving data' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProductById = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send('deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const searchProducts = async (req, res) => {
    try {

        const query = Object.values(req.query)[0];

        if (!query) {
            return res.status(400).json({ error: 'Query parameter not provided' });
        }
        const filter = {};
        if (query) {

            const searchRegex = new RegExp(query, 'i');
            filter.$or = [
                { title: searchRegex },
            ];
        }

        const products = await Product.find(filter)
            .populate('productType');

        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error searching for products' });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    searchProducts
};
