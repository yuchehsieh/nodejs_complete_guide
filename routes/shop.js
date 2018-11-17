const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  res.render('shop');
  // .render() 是 express 提供的 method
  // 而且他會找 default templating engine (在 app.js 已經定義好了)
  // 且定義 views 在 views 資料夾下，所以也不用去建立路徑到那個檔案
  // 也不用寫副檔名 (.pug) 因為定義 pug 是 default templating engine
});

module.exports = router;
