const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');
const adminMiddle = require('../middleware/adminMiddle');

router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product', isAuth, adminMiddle, adminController.postAddProduct);

router.get('/products', isAuth, adminController.getProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post( '/edit-product', adminMiddle, isAuth, adminController.postEditProduct);

router.delete('/product/delete/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
