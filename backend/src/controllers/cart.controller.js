import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export const addToCart = async (req, res) => {
  const productId = req.params.productId;
  const variantId = req.params.variantId;

  const quantity = req.body.quantity || 1;

  const product = await productModel.findOne({
    _id: productId,
    "variants._id": variantId,
  });

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  const stock = await stockOfVariant(productId, variantId);

  const cart =
    (await cartModel.findOne({ user: req.user._id })) ||
    (await cartModel.create({ user: req.user._id }));

  const isProductAlreadyInCart = cart.items.some(
    (item) =>
      item.product._id.toString() === productId &&
      item.variantId.toString() === variantId,
  );

  if (isProductAlreadyInCart) {
    const quantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    ).quantity;
    if (quantityInCart + quantity > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${quantityInCart} items in your cart`,
        success: false,
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": quantity } },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
    });
  }

  if (quantity > stock) {
    return res.status(400).json({
      success: false,
      message: `Only ${stock} items left in stock`,
    });
  }

  cart.items.push({
    product: productId,
    variant: variantId,
    quantity,
    price: product.price,
  });

  await cart.save();

  return res.status(200).json({
    message: "Product added to cart successfully",
    success: true,
  });
};

export const getCart = async (req, res) => {
  const userId = req.user._id;

  let cart = await cartModel
    .findOne({
      user: userId,
    })
    .populate("items.product");

  if (!cart) {
    cart = await cartModel.create({
      user: userId,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    cart,
  });
};

export const incrementQuantity = async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await cartModel.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const stock = await stockOfVariant(productId, variantId);

    const itemQuantityInCart =
      cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant?.toString() === variantId,
      )?.quantity || 0;

    if (itemQuantityInCart + 1 > stock) {
      return res.status(400).json({
        message: `Only ${stock} items left in stock. and you already have ${itemQuantityInCart} items in your cart`,
        success: false,
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      { $inc: { "items.$.quantity": 1 } },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const decrementQuantity = async (req, res) => {
  try {
    const { productId, variantId } = req.params;

    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const cart = await cartModel.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const stock = await stockOfVariant(productId, variantId);

    const decrementQuantityInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant?.toString() === variantId,
    )?.quantity;

    if (decrementQuantityInCart - 1 < 1) {
      return res.status(400).json({
        success: false,
        message: "Quanttity cannot be less than 1",
      });
    }

    await cartModel.findOneAndUpdate(
      {
        user: req.user._id,
        "items.product": productId,
        "items.variant": variantId,
      },
      {
        $inc: {
          "items.$.quantity": -1,
        },
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Cart item quantity decremented successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};
