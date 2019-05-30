$(document).ready(function() {
  var user = getLoggedInUser();
  var bookId = window.location.href.split("=")[1];
  loadReviews(bookId);
});


function loadReviews(bookId) {
  fetch('v2/reviews/byBook/' + bookId)
    .then(function(response) {
      response.json()
        .then(function(json) {
          if(json.length==0){
            $('#reviewsDiv').empty();
            $('#reviewsDiv').append(`  <p class="p-3">No reviews</p>`);
          } else if(json.length==1){
            let {comment,date,name} = json[0];
            $('#reviewsDiv').empty();
            $('#reviewsDiv').append(` <div class="item carousel-item pb-5 active" id="0">
              <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
              <p class="p-3">${comment}</p>
            <p><b class="text-success text-uppercase">${name}, </b>   ${date.split("T")[0]}</p>
            </div>`);
          } else{
            let {comment,date,name} = json[0];
            $('#reviewsDiv').empty();
            $('#reviewsDiv').append(` <div class="item carousel-item pb-5 active" id="0">
              <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
              <p class="p-3">${comment}</p>
            <p><b class="text-success text-uppercase">${name}, </b>   ${date.split("T")[0]}</p>
            </div>`);
            for (let i = 1; i < json.length; i++) {
              let {
                comment,
                date,
                name,
                bookId
              } = json[i];
              $('#reviewsDiv').append(` <div class="item carousel-item pb-5 " id="${i}">
                <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
                <p class="p-3">${comment}</p>
              <p><b class="text-success text-uppercase">${name}, </b>  ${date.split("T")[0]}</p>
              </div>`);
            }
          }
        });
    });
}

function getLoggedInUser() {
  fetch('v2/users/loggedInUser')
    .then(function(response) {
      response.json()
        .then(function(data) {
          return data;
        });
    });
}
