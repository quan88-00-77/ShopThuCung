const express = require('express');
const router = express.Router();
const {getAllProductInCart,addToCart,deleteProductInCart} = require('../controllers/cart');

//get để hiện thị trang
router.get('/', getAllProductInCart);
router.post('/add', addToCart);
router.delete('/remove',deleteProductInCart);


module.exports = router;