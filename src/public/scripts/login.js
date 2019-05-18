$(document).on("click","#loginSubmit", function(){
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;
  $.post('v2/user/login', {
    email: email,
    password: password
  }, function(data,status){
      var user = data[0];
      if(user==undefined){
        $("#loginMessage").empty();
        $("#loginMessage").append('<p>User with email and password not found</p>');
      } else{
        window.location = "/index.html";
      }

     }
  )
});
