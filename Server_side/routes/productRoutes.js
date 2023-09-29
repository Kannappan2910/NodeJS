const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    searchProducts
} = require('../controllers/productController');
const multer = require('multer')

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createProduct);


router.get('/getAll', getAllProducts);

router.get('/getbyId/:id', getProductById);

router.get('/filterbyTitle',searchProducts)

router.put('/update/:id', updateProductById);

router.delete('/delete/:id', deleteProductById);

module.exports = router;
