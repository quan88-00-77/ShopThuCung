const express = require('express');
const router = express.Router();
const {getRegisterPage,register} = require('../controllers/register');

//get để hiện thị trang
router.get('/', getRegisterPage);
//post để xử lý dữ liệu
router.post('/auth', register);


module.exports = router;