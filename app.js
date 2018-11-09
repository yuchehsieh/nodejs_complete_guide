const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parser 要在全部的 route handler 之前
// bodyParser.urlencoded() 會自己 parse 完之後呼叫 next();
// 不能 parse 全部的東西
// json, file 那些的要用其他的 parser
/* ====================================================== */
// 設定 { extended: false }
// should be able to parse non-default features

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
  next();
});

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from express!!!</h1>');
});

app.listen(2000);

// 等同於：
// const server = http.createServer(app);
// server.listen(2000);
