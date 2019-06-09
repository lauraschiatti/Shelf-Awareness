 $(document).ready(function() {
   $.urlParam = function(name) {
     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
     return results[1] || 0;
   }

   var id = $.urlParam('id');

   fetch('v2/books/' + id).then(function(response) {
     return response.json();
   }).then(function(json) {
     let {
       id,
       title,
       cover,
       abstract,
       author,
       genre,
       price,
       status,
       interview
     } = json;

     $("#book").append(
       `<div class="col-xs-10 col-md-10 col-lg-8 offset-lg-2 main mt-5">
            <div class="row">
                <div class="card-body pb-5">
                    <div class="row pb-4">
                        <div class="col-sm-8 border-right">
                            <h4 class="text-dark mb-0">${title}</h4>
                            <p>by <a href="pages/author.html?id=${author.id}">${author.name}</a></p>

                            <h4 class="text-primary"> $ ${price.value} ${price.currency} </h4>

                            <p class="text-success text-uppercase"> ${status} </p>
                        </div>
                        <div class="col-sm-4">
                            <img src="${cover}" class="rounded mx-auto d-block img-fluid" style="width:70%;" />
                        </div>
                    </div>


                    <h5><strong>Abstract</strong></h5>
                    <p class="text-justify font-weight-light">${abstract}</p>

                    <h5><strong>Genre</strong></h5>
                    <p class="text-justify font-weight-light">${genre}</p>

                    <h5><strong>Interview</strong></h5>
                    <p class="text-justify font-weight-light">${interview}</p>

                    <hr>

                    <div class="row">
                        <form id="addToCartForm">
                            <div class="col-sm-5">
                                <dl>
                                    <dt>Quantity: </dt>
                                    <dd>
                                        <select class="form-control form-control-sm" id="quantity" style="width:70px;">
                                            <option value="1"> 1 </option>
                                            <option value="2"> 2 </option>
                                            <option value="3"> 3 </option>
                                        </select>
                                    </dd>
                                </dl>
                            </div>
                            <div class="col-sm-7">
                                <button id="bookId" value="${id}" hidden></button>
                                <button class="btn btn-outline-danger" id="addToCart" type="submit"><i class="fa fa-shopping-cart"></i> Add to cart </button>
                            </div>
                        </form>
                    </div>

                    <hr>

                    <small class="font-weight-light" id="bookReviewButton" >
                        <a nohref onClick="reviewCreate();" style="text-decoration: underline" class="font-italic text-success"><i class="fa fa-pencil-square-o"></i> Review this product</a>
                        <br>
                        Share your thoughts with other customers
                    </small>
                  </div>

            </div>
        </div>`);

     $("#related_info").append(`<h5>Related info</h5>
        <ol class="list-unstyled mb-1">
          <li><a href="pages/similar_books.html?id=${id}"> <i class="fa fa-check-square"></i> Similar books to ${title}</a></li>
          <li><a href="pages/events_by_book.html?id=${id}"> <i class="fa fa-calendar-check-o"></i> Book signing events</a></li>
        </ol>`);
     $("#booksByGenre").append(`<ol class="list-unstyled mb-1">
          <li><a href="pages/all_books_by_genre.html?genre=${genre}&id=${id}&title=${title}"> <i class="fa fa-book"></i> All books by genre ${genre}</a></li>
        </ol> `);
   });
 });

 function reviewCreate() {
   var user = getLoggedInUser();

    if (user != undefined) {
      $('#bookReviewButton').empty();
      $('#reviewsDiv').empty();
      $('#controls').empty();
      $('#customerReviews').empty();
      $('#customerReviews').append(`<h4 class="text-danger h3-header text-center">What do you think about the book?</h4>`);
      $('#reviewsDiv').append(`
           <form id="reviewForm" class="form-review">
             <div class="input-group input-group-lg mb-3">
               <textarea rows="4" cols="50" id="inputReview" class="form-control" placeholder="Enter review here" required ></textarea>
             </div>
             <br>
             <button class="btn btn-lg btn-primary btn-block" style = "width: 50%;" id="reviewSubmit" type="button">Submit</button>
           </form>`);
    } else {
       window.location= "/pages/login.html";
    }

   return false;
 };

 $(document).on("click", "#reviewSubmit", function(e) {
   e.preventDefault();
   var comment = document.getElementById("inputReview").value;
   var user = getLoggedInUser();
   $.urlParam = function(name) {
     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
     return results[1] || 0;
   }

   var id = $.urlParam('id');
   var ok = true;
   if (comment == "") {
     ok = false;
   }
   if (user != undefined) {
     if (ok) {
       $.ajax({
           url: "v2/reviews/create",
           contentType: "application/json",
           dataType: "text",
           type: "POST",
           data: JSON.stringify({
             "userId": user.id,
             "comment": comment,
             "bookId": id
           }),
           success: function(data) {
             var message = data;
             if (message == "OK") {
               $('#bookReviewButton').append(`
                      <a nohref onClick="reviewCreate();" style = "text-decoration: underline; color: #D10024"  class="font-italic"><i class="fa fa-pencil-square-o"></i> Review this product</a>
                      <br>
                      Share your thoughts with other customers`);
               loadReviews(id);
             }
           },
           error: function(request, status, errorThrown) {
             toastr.warning("You are not logged in");
           }
       });
   } else {
    window.location= "/pages/login.html";
   }

 }
 });
