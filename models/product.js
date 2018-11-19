const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    products.push(this);
  }
  // this 就是被這個 class 實作出來的物件
  // 正是要儲存進陣列的東西

  static fetchAll() {
    return products;
  }
};
