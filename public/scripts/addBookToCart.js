$(document).on("click", "#addToCart", function(e) {
  e.preventDefault();
  var bookId = parseInt(document.getElementById("bookId").value);
  var quantity = parseInt(document.getElementById("quantity").value);

  $.post('v2/cart/addBook', {
    bookId: bookId,
    quantity: quantity
  }, function(data, status) {
    
  })
});
