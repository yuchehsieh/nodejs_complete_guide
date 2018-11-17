const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parser 要在全部的 route handler 之前
// bodyParser.urlencoded() 會自己 parse 完之後呼叫 next();
// 不能 parse 全部的東西
// json, file 那些的要用其他的 parser
/* ====================================================== */

// 設定 { extended: false }
// should be able to parse non-default features
/* ====================================================== */

// express.static 提供權限去讀檔案，通常是 public 資料夾
// 如果 request 進來包含 .css .js 或者 images
// 他會去找 public 資料夾下的檔案，等同於已經在 public
// 所以 .html 的 <link> 不用寫 '/public'
// 【BTW】可以註冊很多 static 資料夾

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(2000);

// 等同於：
// const server = http.createServer(app);
// server.listen(2000);
