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
});

$(document).on("click","#signOut", function(){
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
