const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

// .render() 是 express 提供的 method
// 而且他會找 default templating engine (在 app.js 已經定義好了)
// 且定義 views 在 views 資料夾下，所以也不用去建立路徑到那個檔案
// 也不用寫副檔名 (.pug) 因為定義 pug 是 default templating engine

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.post('/create-order', shopController.postOrder);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getChechout);

module.exports = router;
