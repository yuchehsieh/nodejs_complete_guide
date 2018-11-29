const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const db = require('./util/database');

const app = express();

// 註冊新的 templating engine（對於沒有自動安裝的 engine）
// expressHbs() 會傳回 view engine 所需要的東西再把它指定到 handlebars 使用
/* ====================================================== */

// 使用 handlebars 的 layouts 必須到 .engine 這邊更改東西
// 預設就是 layouts, 所以也可以寫 ({ layoutsDir: 'views', ... })
// app.engine(
//   'hbs',
//   expressHbs({
//     layoutsDir: 'views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs'
//   })
// );
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(2000);

// 等同於：
// const server = http.createServer(app);
// server.listen(2000);
