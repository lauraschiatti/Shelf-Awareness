$(document).ready(function() {
  // getUser();
  // getAuthor();
  var authorId = window.location.href.split("=")[1];
  fetch('v2/authors/' + authorId).then(function(response) {
    return response.json();
  }).then(function(json) {
    let {
      name,
      bio,
      picture
    } = json[0];
    $("#author").append(`<div class="row justify-content-md-center">
            <div class="card m-5 col-xs-11 col-md-8">
                <div class="card-body p-5">
                    <div class="row pb-4">
                        <div class="col-sm-8 border-right">
                            <h4 class="text-dark mb-0">${name}</h4>
                        </div>
                        <div class="col-sm-4">
                            <img src="${picture}" class="rounded mx-auto d-block img-fluid" style="width:70%;">
                        </div>
                    </div>

                    <dl >
                        <dt>Biography</dt>
                        <dd class="text-justify"><small class="font-weight-light">${bio}</small></dd>
                    </dl>
                </div>
            </div>
        </div>`);
  });
});

// function getUser(){
//   fetch('v2/users/loggedInUser')
//     .then(function(response) {
//       response.json()
//         .then(function(data) {
//           var user = data;
//           if (user != undefined) {
//             $('#login').empty();
//             $('#loggedIn').empty();
//             $('#loggedIn').append('<a class="btn btn-default btn-sm ml-3" id="loggedIn">' + user.name + '</a>');
//             $('#login').append('<a class="btn btn-default btn-sm ml-3" id="signOut"><i class="fa fa-sign-in"></i> Sign out</a>');
//           }
//         });
//     });
// }

// function getAuthor() {
//   var authorId = window.location.href.split("=")[1];
//   fetch('v2/books/' + authorId).then(function(response) {
//     return response.json();
//   }).then(function(json) {
//     let {
//       name,
//       bio,
//       picture
//     } = json;
//     $("#book").append(`<div class="row justify-content-md-center">
//             <div class="card m-5 col-xs-11 col-md-8">
//                 <div class="card-body p-5">
//                     <div class="row pb-4">
//                         <div class="col-sm-8 border-right">
//                             <h4 class="text-dark mb-0">${name}</h4>
//                         </div>
//                         <div class="col-sm-4">
//                             <img src="${picture}" class="rounded mx-auto d-block img-fluid" style="width:70%;">
//                         </div>
//                     </div>
//
//                     <dl >
//                         <dt>Biography</dt>
//                         <dd class="text-justify"><small class="font-weight-light">${bio}</small></dd>
//                     </dl>
//                 </div>
//             </div>
//         </div>`);
//   });
// }
//
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
