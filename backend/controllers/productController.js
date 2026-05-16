const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      stock,
      image,
    } = req.body;

    const product = await Product.create({
      title,
      description,
      price,
      stock,
      image:
        image ||
        "https://via.placeholder.com/400x400?text=No+Image",
    });

    res.status(201).json({
      message: "Product Created",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Updated",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};