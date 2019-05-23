// Fetching data over HTTP with NodeJS using node-fetch.
$(document).ready ( function(){
  fetch('v2/users/loggedInUser')
  .then(function(response){
      response.json()
      .then(function(data) {
        var user = data;
        if(user!=undefined){
          $('#login').empty();
          $('#loggedIn').empty();
          $('#loggedIn').append('<a class="btn btn-default btn-sm ml-3" id="loggedIn">'+user.name+'</a>');
          $('#login').append('<a class="btn btn-default btn-sm ml-3" id="signOut"><i class="fa fa-sign-in"></i> Sign out</a>');
        }
      });
  });

  fetch('v2/books').then(function(response) {
      return response.json();
  }).then(function(json) {
    for(let i = 0; i< json.length; i++) {
        let listItem = document.createElement("div");
        listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');

        let { id, title, cover, author, genre, price } = json[i];
        listItem.innerHTML =
            `<div class="card mb-4">
                  <img class="card-img-top" src="https://picsum.photos/200/150/?random" alt="Card image cap">
                  <div class="card-body">
                   <small class="text-primary"> ${genre}</small>
                   <p class="card-title"><a class="text-dark" href="pages/show-book.html?id=${id}">${title}</a></p>
                   <p class="card-subtitle"><small class="font-italic">${author.name}</small></p>

                   <div class="card-footer">
                       <div class="row text-center">
                           <div class="col-xs-6">
                            <small class="text-muted">$ ${price.value} ${price.currency}</small>
                           </div>
                           <div class="col-xs-6">
                            <a class="btn btn-primary pull-right btn-sm ml-3" href="cart.html">
                                <i class="fa fa-shopping-cart"></i> Cart
                            </a>
                           </div>
                       </div>
                       </div>
                  </div>
                </div>`;

        $("#books-list").append(listItem);
    }
  });
});

$(document).on("click","#signOut", function(e){
    e.preventDefault();
    fetch('v2/users/logoutUser')
    .then(function(response){
      response.json()
      .then(function(data) {
        var user = data;
        if(user.loggedin==false){
          window.location="/index.html";
        }
      });
    });
});

