$(document).ready(function() {
  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  }
  var id = $.urlParam('id');

  fetch('v2/authors/' + id).then(function(response) {
    return response.json();
  }).then(function(json) {
    let {
      name,
      bio,
      picture
    } = json[0];

    $("#author").append(
      `<div class="col-xs-10 col-md-10 col-lg-8 offset-lg-2 main mt-5">
  
            <div class="row">
                <div class="card-body pb-5">
                    <div class="row pb-4">
                        <div class="col-sm-8 border-right">
                            <h4 class="text-primary mb-0">${name}</h4>
                        </div>
                        <div class="col-sm-4">
                            <img src="${picture}" class="rounded mx-auto d-block img-fluid" style="width:70%;" />
                        </div>
                    </div>


                    <h5><strong>Biography</strong></h5>
                    <p class="text-justify font-weight-light">${bio}</p>

                  </div>

                </div>
            </div>
        </div>`);

    $("#related_info").append(`<h5>Related info</h5>
        <ol class="list-unstyled mb-1">
          <li><a href="pages/books_by_author.html?id=${id}"> <i class="fa fa-book"></i> Books by ${name}</a></li>
        </ol>`);

  });
});