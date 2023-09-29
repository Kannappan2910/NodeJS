const express = require('express');
const router = express.Router();
const {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductTypeById,
  deleteProductTypeById,
} = require('../controllers/productTypeContoller');
const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', upload.single('image'), createProductType);

router.get('/getAll', getAllProductTypes);

router.get('/getbyId/:id', getProductTypeById);

router.put('/update/:id', updateProductTypeById);

router.delete('/delete/:id', deleteProductTypeById);

module.exports = router;
