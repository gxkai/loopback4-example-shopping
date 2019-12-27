const apiUrl = 'http://localhost:3000';
const homePage = apiUrl + '/shoppy.html';
const itemsPerPage = 4;

function getCurrentPageNumber() {
  const temp = location.href.split('?page=');
  if (temp.length > 1) {
    return temp[1].split('&')[0];
  } else {
    return 1;
  }
}

function getProductId() {
  const temp = location.href.split('?id=');
  if (temp.length > 1) {
    return temp[1].split('&')[0];
  }
}

function addPagination() {
  $.get(apiUrl + '/products/count', function (result) {
    const totalPages = Math.ceil(result.count / itemsPerPage);
    const currentPageNumber = getCurrentPageNumber();

    let pages = '';
    for (let i =0; i < totalPages; i++) {
      const pageNumber = i + 1;
      if (currentPageNumber == pageNumber) {
        pages += `<li class="page-item"><a class="page-link">${pageNumber}</a></li>`;
      } else {
        pages += `<li class="page-item"><a class="page-link" href="${homePage}?page=${pageNumber}">${pageNumber}</a></li>`;
      }
    }
    $('#pagination').append(pages);
  });
}

const api = {
  getProducts(cb, skip = 0, limit = 4) {
    const url = apiUrl + `/products?filter[skip]=${skip}&filter[limit]=${limit}`;
    $.get(url, cb);
  },

  getProduct(id, cb) {
    const url = apiUrl + '/products/' + id;
    $.get(url, cb);
  }

}
