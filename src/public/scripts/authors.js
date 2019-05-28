$(document).ready(function() {
  // fetch('v2/users/loggedInUser')
  //   .then(function(response) {
  //     response.json()
  //       .then(function(data) {
  //         var user = data;
  //         if (user != undefined) {
  //           $('#login').empty();
  //           $('#loggedIn').empty();
  //           $('#loggedIn').append('<a class="btn btn-default btn-sm ml-3" id="loggedIn">' + user.name + '</a>');
  //           $('#login').append('<a class="btn btn-default btn-sm ml-3" id="signOut"><i class="fa fa-sign-in"></i> Sign out</a>');
  //         }
  //       });
  //   });

  fetch('v2/authors')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {
            let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');
            let {
              name,
              id,
              picture
            } = json[i];
            listItem.innerHTML =
              `<div class="card mb-4">
                  <div style = "width: 50em; height: 20em; ">
                  <a class="text-dark" href="pages/author-page.html?id=${id}">
                    <img class="card-header" src="` + picture + `" alt="Card image cap" style="max-width: 100%;max-height: 100%;" >
                  </a>
                  </div>
                  <div class="card-body">
                   <p class="card-title"><a class="text-dark" href="/pages/author-page.html?id=`+ id + `">${name }</a></p>
                </div>`;
            $("#authors-list").append(listItem);
          }
        });
    });
});

// $(document).on("click", "#signOut", function(e) {
//   e.preventDefault();
//   fetch('v2/users/logoutUser')
//     .then(function(response) {
//       response.json()
//         .then(function(data) {
//           var user = data;
//           if (user.loggedin == false) {
//             window.location = "/index.html";
//           }
//         });
//     });
// });
