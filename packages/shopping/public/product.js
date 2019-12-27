const productTemplate = `
<div class="container">
  <div class="row">
    <div class="col-md">
      <img src="#IMAGE#" class="card-img-top" alt="#NAME#">
    </div>
    <div class="col-sm">
      <div class="container" id="product-header">
        <div class="row">
          <div class="col col-8">
            <h3 class="card-title">#NAME#</h3>
            <h5>$#PRICE#</h5>
          </div>
          <div class="col col-3">
            <a href="#" class="btn btn-primary disabled">Add to Cart</a>
          </div>
        </div>
      </div>
      <p class="card-text details">#DETAILS#</p>
    </div>
  </div>
</div>
`;

$(function () {
  const id = getProductId();
  if (id) {
    api.getProduct(id, function (product) {
      if (product) {
        const productHtml = productTemplate.replace(/#NAME#/ig, product.name)
                            .replace(/#PRICE#/ig, product.price)
                            .replace(/#IMAGE#/ig, product.image)
                            .replace(/#DESCRIPTION#/ig, product.description)
                            .replace(/#DETAILS#/ig, product.details)
                            .replace(/#ID#/ig, product.productId);
        $('#product').append(productHtml);
      }
    });
  } else {
    alert('Product ID missing');
  }
});
