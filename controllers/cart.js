const Cart = require("../models/cart");
const Product = require("../models/product");

const getAllProductInCart = async (req, res) => {
  try {
    const carts = await Cart.find();

    const productsInCart = await Product.aggregate([
      {
        $lookup: {
          from: "carts",
          localField: "_id",
          foreignField: "idProduct",
          as: "cart",
        },
      },
      {
        $unwind: "$cart",
      },
      {
        $project: {
          idCart: "$cart._id",
          _id: 1,
          name: 1,
          image: 1,
          price: 1,
          quantity: "$cart.quantity",
          total: "$cart.total",
        },
      },
    ]);

    res.render("./page/cart", {
      products: productsInCart,
      layout: "layout/layoutNoSlider.ejs",
    });
  } catch (error) {
    res.send({ message: error });
  }
};

const addToCart = async (req, res) => {
  const { idProduct, quantity } = req.body;

  try {
    const hasProduct = await Cart.findOne({ idProduct: idProduct.trim() });
    const product = await Product.findById(idProduct.trim());
    if (hasProduct) {
      const newQuantity = hasProduct.quantity + Number(quantity);
        const newTotal = newQuantity * product.price;
      await Cart.findOneAndUpdate(
        { idProduct: idProduct.trim() },
        { quantity: newQuantity,
          total: newTotal }
      );
      req.flash("success_msg", "Thêm sản phẩm vào giỏ hàng thành công");
      res.redirect(`/product/${idProduct}`);
    } else {
      const total = product.price * Number(quantity);
      const newCart = new Cart({
        quantity: Number(quantity),
        total: total,
        idProduct: idProduct.trim(),
      });
      await newCart.save();
      req.flash("success_msg", "Thêm sản phẩm vào giỏ hàng thành công");
      res.redirect(`/product/${idProduct}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteProductInCart = async (req, res) => {
    const { idCart } = req.body;
    try {
        await Cart.findByIdAndDelete(idCart);
        req.flash("success_msg", "Xóa sản phẩm thành công");
        res.redirect("/cart");
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAllProductInCart, addToCart,deleteProductInCart };
