$(document).ready(function() {
  fetch('v2/users/loggedInUser')
    .then(function(response) {
      response.json()
        .then(function(data) {
          var user = data;
          if (user != undefined) {
            $('#login').empty();
            $('#loggedIn').empty();
            $('#loggedIn').append('<a class="btn btn-default btn-sm ml-3" id="loggedIn">' + user.name + '</a>');
            $('#login').append('<a class="btn btn-default btn-sm ml-3" id="signOut"><i class="fa fa-sign-in"></i> Sign out</a>');
          }
        });
    });
var authorId = window.location.href.split("=")[1];
alert(url);
  fetch('v2/authors/'+ authorId)
    .then(function(response) {
      response.json()
        .then(function(json) {
            let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');
            let {
              name,
              bio,
              picture
            } = json[i];
            listItem.innerHTML =
              `<div class="card mb-4">
                  <div style = "width: 50em; height: 20em; ">
                    <img class="card-header" src="` + picture + `" alt="Card image cap" style="max-width: 100%;max-height: 100%;" >
                  </div>
                  <div class="card-body">
                   <p class="card-title"><a class="text-dark" href="/pages/authors/author-page.html?id=`+ id + `">${name }</a></p>
                </div>`;
            $("#books-list").append(listItem);

        });
    });
});

$(document).on("click", "#signOut", function(e) {
  e.preventDefault();
  fetch('v2/users/logoutUser')
    .then(function(response) {
      response.json()
        .then(function(data) {
          var user = data;
          if (user.loggedin == false) {
            window.location = "/index.html";
          }
        });
    });
});
