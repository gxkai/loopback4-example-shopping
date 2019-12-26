const apiUrl = 'http://localhost:3000';

const api = {
  getProducts(cb) {
    const url = apiUrl + '/products';
    $.get(url, cb);
  },

  getProduct(id, cb) {
    const url = apiUrl + '/products/' + id;
    $.get(url, cb);
  }

}
