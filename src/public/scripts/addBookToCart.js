$(document).on("click", "#addToCart", function(e) {
  e.preventDefault();
  var bookId = document.getElementById("bookId").value;
  console.log(typeof bookId);
  bookId = parseInt(bookId);
  console.log(typeof bookId);

  $.post('v2/cart/addBook', {
    bookId: bookId
  }, function(data, status) {
    // var user = data[0];
    // if (user == undefined) {
    //   $("#loginMessage").empty();
    //   $("#loginMessage").append('<p>User with email and password not found</p>');
    // } else {
    //   window.location = "/index.html";
    // }

  })
});
