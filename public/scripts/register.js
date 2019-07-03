$(document).on("click", "#registerSubmit", function(e) {
  e.preventDefault();
  var name = document.getElementById("inputName").value;
  var email = document.getElementById("inputEmail").value;
  var password = document.getElementById("inputPassword").value;
  var address = document.getElementById("inputAddress").value;
  var creditcard = document.getElementById("inputCreditcard").value;
  var ok = true;
  if (name == "") {
    ok = false;
    $("#registerMessage").empty();
    $("#registerMessage").append('<p>Name cannot be empty</p>');
  }
  if (email == "") {
    ok = false;
    $("#registerMessage").empty();
    $("#registerMessage").append('<p>Email cannot be empty</p>');
  }
  if (password == "") {
    ok = false;
    $("#registerMessage").empty();
    $("#registerMessage").append('<p>Password cannot be empty</p>');
  }
  if (address == "") {
    ok = false;
    $("#registerMessage").empty();
    $("#registerMessage").append('<p>Address cannot be empty</p>');
  }
  if (creditcard == "") {
    ok = false;
    $("#registerMessage").empty();
    $("#registerMessage").append('<p>Credit card cannot be empty</p>');
  }
  if (ok) {

    $.post('v2/user/register', {
      name: name,
      email: email,
      password: password,
      address: address,
      creditcard: creditcard
    }, function(data, status) {
      var user = data[0];
      if(data.name=="error"){
        $("#registerMessage").empty();
        $("#registerMessage").append('<p>Registration unsuccessful. </p>');
      }
      else if (status == "success") {
        window.location = "/index.html";
      }else {
        $("#registerMessage").empty();
        $("#registerMessage").append('<p>Registration unsuccessful. </p>');
      }

    })
    // $.ajax({
    //   url: "v2/user/register",
    //   contentType: "application/json",
    //   dataType: "text",
    //   type: "POST",
    //   data: JSON.stringify({
    //     "name": name,
    //     "email": email,
    //     "password": password,
    //     "address": address,
    //     "creditcard": creditcard
    //
    //   }),
    //   success: function(data) {
    //     var user = data;
    //     if (user == "NOK") {
    //       $("#registerMessage").empty();
    //       $("#registerMessage").append('<p>Please eneter all the fields correctly. </p>');
    //       // }else if(user=="EXISTS"){
    //       //     $("#registerMessage").empty();
    //       //     $("#registerMessage").append('<p>User already exists. </p>');
    //     } else if (user == "OK") {
    //       toastr.success("Registration successful");
    //       window.location = "/index.html";
    //     }
    //   }
    //
    // });
  }


});
