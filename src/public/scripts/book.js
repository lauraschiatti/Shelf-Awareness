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
      title,
      cover,
      abstract,
      author,
      genre,
      price,
      status,
      interview
    } = json;

    $("#book").append(`
        <div class="col-xs-12">
          <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Books</a></li>
                <li class="breadcrumb-item" aria-current="page"><a href="#">${genre}</a></li>
              </ol>
          </nav>
        </div>
    
        <div class="row">          
            <div class="card-body p-5">
             
                <div class="row pb-4">
                    <div class="col-sm-8 border-right">
                        <h4 class="text-dark mb-0">${title}</h4>
                        <p>by <a href="#">${author.name}</a></p>

                        <h4 class="text-primary"> $ ${price.value} ${price.currency} </h4>

                        <p class="text-success text-uppercase"> ${status} </p>
                    </div>
                    <div class="col-sm-4">
                        <img src="${cover}" class="rounded mx-auto d-block img-fluid" style="width:70%;" />
                    </div>
                </div>

                <dl >
                    <dt>Abstract</dt>
                    <dd class="text-justify"><small class="font-weight-light">${abstract}</small></dd>
                    <dt>Genre</dt>
                    <dd><small class="font-weight-light">${genre}</small></dd>
                    <dt>Interview</dt>
                    <dd><q class="font-weight-light">${interview}</q></dd>
                </dl>

                <hr>
                <div class="row">
                    <div class="col-sm-5">
                        <dl>
                            <dt>Quantity: </dt>
                            <dd>
                                <select class="form-control form-control-sm" style="width:70px;">
                                    <option> 1 </option>
                                    <option> 2 </option>
                                    <option> 3 </option>
                                </select>
                            </dd>
                        </dl>
                    </div>
                    <div class="col-sm-7">
                        <a href="#" class="btn btn-outline-danger"> <i class="fa fa-shopping-cart"></i> Add to cart </a>
                    </div>
                </div>

                <hr>

                <small class="font-weight-light" id="bookReviewButton" >
                  <a nohref onClick="reviewCreate();" style = "text-decoration: underline; color: #D10024"  class="font-italic"><i class="fa fa-pencil-square-o"></i> Review this product</a>
                  <br>
                  Share your thoughts with other customers
                </small>
          </div>
        </div>`);
  });
});

function reviewCreate() {
  $('#bookReviewButton').empty();
  $('#reviewsDiv').empty();
  $('#controls').empty();
  $('#customerReviews').empty();
  $('#customerReviews').append(`<h3 class="text-danger h3-header" style = "text-align: left; margin-left: 175px;">What did you think about this book?</h3>`);
  $('#reviewsDiv').append(`
        <form id="reviewForm" class="form-review">
          <div class="input-group input-group-lg mb-3">
            <textarea rows="4" cols="50" id="inputReview" class="form-control" placeholder="Enter review here" required ></textarea>
          </div>
          <br>
          <button class="btn btn-lg btn-primary btn-block" style = "width: 50%;" id="reviewSubmit" type="button">Submit</button>
        </form>`);
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
      }

    });
  }
});
// function getLoggedInUser() {
//   fetch('v2/users/loggedInUser')
//     .then(function(response) {
//       response.json()
//         .then(function(data) {
//           return data;
//         });
//     });
// }
