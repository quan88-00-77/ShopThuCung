const express = require('express');
const router = express.Router();
const {getLoginPage,login,logout} = require('../controllers/login');

//get để hiện thị trang
router.get('/', getLoginPage);
//post để xử lý dữ liệu
router.post('/auth', login);
router.get('/logout', logout);


module.exports = router;