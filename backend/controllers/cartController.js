const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("product");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const orderQuantity = Number(quantity);
    if (product.stock < orderQuantity) {
      return res.status(400).json({
        message: "Not enough stock available",
      });
    }

    let cartItem = await Cart.findOne({
      user: req.user._id,
      product: productId,
    });

    if (cartItem) {
      cartItem.quantity += orderQuantity;
      product.stock -= orderQuantity;
      await Promise.all([cartItem.save(), product.save()]);

      return res.status(200).json({
        message: "Cart Updated",
        cartItem,
      });
    }

    cartItem = await Cart.create({
      user: req.user._id,
      product: productId,
      quantity: orderQuantity,
    });

    product.stock -= orderQuantity;
    await product.save();

    res.status(201).json({
      message: "Item Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cartItem = await Cart.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    const product = await Product.findById(cartItem.product);
    if (product) {
      product.stock += cartItem.quantity;
      await product.save();
    }

    await cartItem.remove();

    res.status(200).json({
      message: "Item Removed From Cart",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};