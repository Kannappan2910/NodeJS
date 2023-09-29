const ProductType = require('../models/productType');
const { uploadToS3 } = require('../common/fileUpload')

const createProductType = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: 'No image found' });
  }
  try {
    const imageUrl = await uploadToS3(req.file);
    const productType = await ProductType.create({ typeName: req.body.typeName, imageUrl: imageUrl });
    res.status(201).json(productType);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductTypeById = async (req, res) => {
  try {
    const productType = await ProductType.findById(req.params.id);
    if (!productType) {
      res.status(404).json({ error: 'Product Type not found' });
    } else {
      res.status(200).json(productType);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProductTypeById = async (req, res) => {
  try {
    const updatedProductType = await ProductType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProductType) {
      res.status(404).json({ error: 'Product Type not found' });
    } else {
      res.status(200).json(updatedProductType);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductTypeById = async (req, res) => {
  try {
    const deletedProductType = await ProductType.findByIdAndRemove(req.params.id);
    if (!deletedProductType) {
      res.status(404).json({ error: 'Product Type not found' });
    } else {
      res.status(204).send('successfully deleted');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductTypeById,
  deleteProductTypeById,
};
