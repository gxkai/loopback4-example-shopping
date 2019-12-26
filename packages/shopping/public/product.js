const productTemplate = `
<div class="card" style="width: 18rem;">
  <img src="#IMAGE#" class="card-img-top product-img" alt="#NAME#">
  <div class="card-body">
    <h5 class="card-title">#NAME#</h5>
    <h5>$#PRICE#</h5>
    <p class="card-text description">#DETAILS#</p>
    <div class="action-buttons">
      <a href="#" class="btn btn-primary disabled">Add to Cart</a>
    </div>
  </div>
</div>
`;

$(function () {

  const id = location.href.split('?id=')[1];
  api.getProduct(id, function (product) {
    if (product) {
      const productHtml = productTemplate.replace(/#NAME#/ig, product.name)
                          .replace(/#PRICE#/ig, product.price)
                          .replace(/#IMAGE#/ig, product.image)
                          .replace(/#DESCRIPTION#/ig, product.description)
                          .replace(/#DETAILS#/ig, product.details)
                          .replace(/#ID#/ig, product.productId);
      $('#products').append(productHtml);
    }
  });

});
