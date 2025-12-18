const express = require("express");
const Cart = require("../models/cart");
const Product = require("../models/product");
const { protect } = require("../middlewares/authMiddleware");

const route = express.Router();

const getCart = async (user, guestId) => {
  if (user) {
    return await Cart.findOne({ user });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  } else {
    return null;
  }
};

//route for adding item in cart
route.post("/", async (req, res) => {
  try {
    const { productId, size, color, quantity, guestId, user } = req.body;
  
    const product = await Product.findById(productId);
    const cart = await getCart(user, guestId);

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.color === color &&
          p.size === size &&
          p.productId.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;

      } else {
        cart.products.push({
          name: product.name,
          image: product.images[0].url,
          quantity,
          color,
          size,
          productId,
          price: product.price,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      const updatedCart = await cart.save();
      
      return res.status(200).json( updatedCart);
    } else {
      
      const cart = {
        user: user ? user : undefined,
        guestId: user? undefined: (guestId? guestId: `guestNO${new Date().getTime()}`),
        products: [
          {
            name: product.name,
            image: product.images[0].url,
            quantity,
            color,
            size,
            productId,
            price: product.price,
          },
        ],
        totalPrice: quantity * product.price,
      };
      const makingCart = await Cart.create(cart);

      return res.status(200).json( makingCart);
    }
  } catch (err) {
    return res.status(500).json({ message: `Server Error1: ${err}` });
  }
});

//route for updating item in cart
route.put("/", async (req, res) => {
  
  try {
    const { productId, color, size, user, guestId, quantity } = req.body;
    const cart = await getCart(user, guestId);

    if (!cart) {
      return res.status(404).json({ message: "cart not exist" });
    }

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.color === color &&
        p.size === size
    );

    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1);
      }

      cart.totalPrice = cart.products.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      const updatedCart = await cart.save();

      return res
        .status(200)
        .json( updatedCart );
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    return res.status(500).json({ message: `Server Error: ${err}` });
  }
});

// route for deleting cart item from cart
route.delete("/", async (req, res) => {
  try {
    const { productId, color, size, user, guestId } = req.body;

    const cart = await getCart(user, guestId);

    if (!cart) {
      return res.status(404).json({ message: "cart doesn't not exist!" });
    }

    const productIndex = cart.products.findIndex(
      (product) =>
        product.productId.toString() === productId &&
        product.color === color &&
        product.size === size
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }

    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const updatedCart = await cart.save();

    return res.status(200).json( updatedCart );
  } catch (err) {
    return res.status(500).json({ message: `Product not found ${err}` });
  }
});

//route for get cart items
route.get("/", async (req, res) => {
  try {
    const { user, guestId } = req.query;
    const cart = await getCart(user, guestId);

    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Cart didn't found!!" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Server Error:  ${err}` });
  }
});

//route for merging guest cart and loggedin user cart
route.post("/merge", protect, async (req, res) => {
  try {
    const { guestId } = req.body;

    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ user: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(404).json({ message: "Guest Cart is empty" });
      }

      if (userCart) {
        guestCart.products.forEach((item) => {
          const productIndex = userCart.products.findIndex(
            (p) =>
              p.productId.toString() === item.productId.toString() &&
              p.color === item.color &&
              p.size === item.size
          );

          if (productIndex > -1) {
            if (item.quantity > 0) {
              userCart.products[productIndex].quantity += item.quantity;
            }
          } else {
            {
              userCart.products.push(item);
            }
          }
        });

        userCart.totalPrice = userCart.products.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );

        const cart = await userCart.save();
        try {
          const deletedCart = await Cart.findOneAndDelete({ guestId });
          return res.status(200).json(cart)
        } catch (err) {
            return res.status(500).json({message : `Server Error: ${err}`})
        }
        
      } else {
        guestCart.user = req.user._id;
        guestCart.guestId = undefined;

        const cart = await guestCart.save();
        return res.status(200).json(cart);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({message : `Serevr Error: ${err}`})
  }
});

module.exports = { cartRoute: route };
