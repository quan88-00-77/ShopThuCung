const Product = require("../models/product");

//get all product
const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (error) {
    console.log(error);
  }
};

const getDetailProduct = async (req, res, next) => {
  const { idProduct } = req.params;
  try {
    const product = await Product.findById(idProduct);
    res.render("./page/detailsProduct", {
      product,
      layout: "layout/layoutNoSlider.ejs",
    });
  } catch (error) {
    next();
  }
};

// ham render trang create product
const getCreateProductPage = async (req, res) => {
  try {
    res.render("createProduct", { layout: "layout/layoutNoSlider.ejs" });
  } catch (error) {
    console.log(error);
  }
};

const getEditProductPage = async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await Product.findById(idProduct);
    res.render("editProduct", { product, layout: "layout/layoutNoSlider.ejs" });
  } catch (error) {
    console.log(error);
  }
};

// ham them san pham
const createProduct = async (req, res) => {
  const {...products } = req.body;
  try {
    await Product.create(products);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getManagerProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.render("./page/managerProduct", {
      products,
      layout: "layout/layoutNoSlider.ejs",
    });
  } catch (error) {
    console.log(error);
  }
};

const editProduct = async (req, res) => {
  const { idProduct, ...products } = req.body;
  try {
      await Product.updateOne(
        {_id:idProduct.trim()},
        {
          $set: {
            ...products
          }
        },{upsert:true});
    res.redirect("/product/manager");
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { idProduct } = req.body;
  try {
    await Product.findByIdAndDelete(idProduct);
    res.redirect("/product/manager");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  getDetailProduct,
  getCreateProductPage,
  getEditProductPage,
  createProduct,
  getManagerProduct,
  editProduct,
  deleteProduct,
};
