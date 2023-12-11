const express = require('express');
const router = express.Router();
const {
    getAllProduct,
    getDetailProduct,
    getCreateProductPage,
    getEditProductPage,createProduct,
    getManagerProduct,
    editProduct,
    deleteProduct
} = require('../controllers/product');

//get để hiện thị trang
router.get('/', getAllProduct);
router.get('/product/create', getCreateProductPage);
router.get('/product/manager', getManagerProduct);
router.get('/product/edit/:idProduct', getEditProductPage);
router.get('/product/:idProduct', getDetailProduct);
// post để thực hiện thao tác
router.post('/product/create', createProduct);
router.delete('/product/delete', deleteProduct);
router.put('/product/edit', editProduct);

module.exports = router;