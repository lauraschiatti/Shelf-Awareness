$(document).ready(function() {
  var user = getLoggedInUser();
  var bookId = window.location.href.split("=")[1];
  loadReviews(bookId);
});

function loadReviews(bookId) {
  // var mainDiv = $(document).getElementById("mainDiv").value;
  // $('#mainDiv').empty();
  // $('#mainCont').append(`<div class="carousel-inner">
  //     <div class="item carousel-item pb-5 active">
  //         <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
  //         <p class="p-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec turpis vel, semper malesuada ante. Idac bibendum scelerisque non non purus. Suspendisse varius nibh non aliquet.</p>
  //         <p><b class="text-success text-uppercase">Antonio Moreno, </b>  May 23/2019</p>
  //     </div>
  //     <div class="item carousel-item pb-5">
  //         <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
  //         <p class="p-3">Vestibulum quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Utmtc tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio.</p>
  //         <p><b class="text-success text-uppercase">Antonio Moreno, </b>  May 23/2019</p>
  //     </div>
  //     <div class="item carousel-item pb-5">
  //         <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
  //         <p class="p-3">Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsan tincidunt. Phasellus risus risus, volutpat vel tellus ac, tincidunt fringilla massa. Etiam hendrerit dolor eget rutrum.</p>
  //         <p><b class="text-success text-uppercase">Antonio Moreno, </b>  May 23/2019</p>
  //     </div>
  //     <div class="item carousel-item pb-5">
  //         <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
  //         <p class="p-3">Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsan tincidunt. Phasellus risus risus, volutpat vel tellus ac, tincidunt fringilla massa. Etiam hendrerit dolor eget rutrum.</p>
  //         <p><b class="text-success text-uppercase">Antonio Moreno, </b>  May 23/2019</p>
  //     </div>
  //     <div class="item carousel-item pb-5">
  //         <div class="img-box"><img src="https://picsum.photos/120/200/?random" alt=""></div>
  //         <p class="p-3">Phasellus vitae suscipit justo. Mauris pharetra feugiat ante id lacinia. Etiam faucibus mauris id tempor egestas. Duis luctus turpis at accumsan tincidunt. Phasellus risus risus, volutpat vel tellus ac, tincidunt fringilla massa. Etiam hendrerit dolor eget rutrum.</p>
  //         <p><b class="text-success text-uppercase">Antonio Moreno, </b>  May 23/2019</p>
  //     </div>
  // </div>`);
  fetch('v2/reviews/byBook/' + bookId)
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {
            let {
              comment,
              date,
              name,
              bookId
            } = json[i];
            $('#mainDiv').append(`<div class="media text-muted pt-3">
          <svg class="bd-placeholder-img mr-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: 32x32">
            <title>Hejjj</title>
            <rect width="100%" height="100%" fill="#007bff" /><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
          </svg>
          <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
            <strong class="d-block text-gray-dark">@${name}</strong>
            ${comment}
          </p>
        </div>`);
          }
          // $('#cont').append(mainDiv);
        });
      });
  }




      //
      //             $('#myCarousel').empty();
      //             // var list = $('<ol class="carousel-indicators"></ol>');
      //             var firstItem = $(`<li data-target="#myCarousel" data-slide-to="0" class= "active"></li>`);
      //             // var allReviewsDiv = $(`<div class="carousel-inner"></div>`);
      //             for (let i = 1; i < json.length; i++) {
      //               var listItem = $(`<li data-target="#myCarousel" data-slide-to="${i}"></li>`);
      //               $('#indicators').append(listItem);
      //             }
      //             for (let i = 0; i < json.length; i++) {
      //               let {comment,date,user,bookId} = json[i];
      //               $('#myCarousel').append('<p class="p-3">${comment}</p><p><b class="text-success text-uppercase">${user.name}, </b>  May 23/2019</p>');
      //             }
      //             $('#myCarousel').append(`<!-- Carousel controls -->
      //   <a class="carousel-control left carousel-control-prev" href="#myCarousel" data-slide="prev">
      //     <i class="fa fa-angle-left"></i>
      //   </a>
      //   <a class="carousel-control right carousel-control-next" href="#myCarousel" data-slide="next">
      //     <i class="fa fa-angle-right"></i>
      //   </a>`);



function getLoggedInUser() {
  fetch('v2/users/loggedInUser')
    .then(function(response) {
      response.json()
        .then(function(data) {
          return data;
        });
    });
}
