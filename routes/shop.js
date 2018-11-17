const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

// .render() 是 express 提供的 method
// 而且他會找 default templating engine (在 app.js 已經定義好了)
// 且定義 views 在 views 資料夾下，所以也不用去建立路徑到那個檔案
// 也不用寫副檔名 (.pug) 因為定義 pug 是 default templating engine

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
    // layout: false 不使用 layout 如果前面有設定這邊預設是 true
  });
  // 傳送物件包含 key: name 比較好去 reference
});

module.exports = router;
