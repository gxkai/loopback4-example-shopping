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

// Very very simple YML "parser"
function parseYml(string) {
  let parsed = '';
  let ul = false;
  string.split(/\n/g).forEach(para => {

    if (para.startsWith('-')) {
      parsed += '<ul>';
      para.split('-').forEach(li => {
        if (li) {
          parsed += '<li>' + li + '</li>';
        }
      });
      ul = true;
    } else if (ul) {
      parsed += '</ul>';
      parsed += '<p>' + para + '</p>';
      ul = false;
    } else {
      parsed += '<p>' + para + '</p>';
    }
  });
  return parsed;
}

function refreshLogInStatus() {
  const token = localStorage.getItem('shoppyToken');
  if (token) {
    api.me(token, function(user) {
      localStorage.setItem('shoppyUserName', user.name);
      localStorage.setItem('shoppyUserId', user.id);
      applyLoggedInUi(user);
    }, function(err) {
      applyLoggedOutUi();
    });
  } else {
    applyLoggedOutUi();
  }
}

function applyLoggedInUi(user) {
  $('#logIn, #signUp').hide();
  $('#user strong').text(user.name);
  $('#user, #logOut').show();
}

function applyLoggedOutUi() {
  $('#logIn, #signUp').show();
  $('#user, #logOut').hide();
}

function logOut() {
  localStorage.removeItem('shoppyToken');
  refreshLogInStatus();
}

function logIn() {
  const email = $('#logInEmail').val();
  const password = $('#logInPassword').val();
  api.logIn({email, password}, function(res) {
    const token = res.token;
    localStorage.setItem('shoppyToken', token);
    refreshLogInStatus();
    $('#logInModal').modal('toggle');
  }, function(xhr) {
    $('#logInTitle').text('Invalid credentials');
  });
  return false;
}

function signUp() {
  const firstName = $('#firstName').val();
  const lastName = $('#lastName').val();
  const email = $('#signUpEmail').val();
  const password = $('#signUpPassword').val();
  api.signUp({firstName, lastName, email, password}, function(res) {
    api.logIn({email, password}, function(res) {
      $('#signUpModal').modal('toggle');
      const token = res.token;
      localStorage.setItem('shoppyToken', token);
      refreshLogInStatus();
    }, function(err) {
      alert(err);
    });
  }, function(xhr) {
    $('#signUpTitle').text(xhr.responseJSON.error.message);
  });
  return false;
}

const api = {
  signUp(body, successCb, errCb) {
    const url = apiUrl + '/users';
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: successCb,
      error: errCb
    });
  },

  logIn(body, successCb, errCb) {
    const url = apiUrl + '/users/login';
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(body),
      contentType: 'application/json',
      success: successCb,
      error: errCb
    });
  },

  me(token, successCb, errCb) {
    const url = apiUrl + '/users/me';
    $.ajax({
      type: 'GET',
      url: url,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      success: successCb,
      error: errCb
    });
  },

  getProducts(cb, skip = 0, limit = 4) {
    const url = apiUrl + `/products?filter[skip]=${skip}&filter[limit]=${limit}`;
    $.get(url, cb);
  },

  getProduct(id, cb) {
    const url = apiUrl + '/products/' + id;
    $.get(url, cb);
  }
}

$(function () {
  $('#navBar').append(navBarTemplate);
  refreshLogInStatus();
});
