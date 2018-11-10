const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// parser 要在全部的 route handler 之前
// bodyParser.urlencoded() 會自己 parse 完之後呼叫 next();
// 不能 parse 全部的東西
// json, file 那些的要用其他的 parser
/* ====================================================== */
// 設定 { extended: false }
// should be able to parse non-default features

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found !!!</h1>');
});

app.listen(2000);

// 等同於：
// const server = http.createServer(app);
// server.listen(2000);
