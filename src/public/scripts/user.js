var currentUser ;

function getUser() {
  fetch('v2/users/loggedInUser')
    .then(function(response) {
      // if(response.status=)
      response.json()

        .then(function(data) {
          // alert(data.status);
          if(data.error=="no active user"){
            toastr.warning("You are not logged in");
          } else{
            var user = data[0];
            currentUser = user;
          }
        })
        .catch(err => {
          toastr.error("You are not logged in");
        });

    }).catch(err => {
      toastr.error("You are not logged in");
    });
}


export function getCartId() {
    getUser();
    return currentUser;
}
