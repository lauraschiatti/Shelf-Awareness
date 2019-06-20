$(document).ready(function() {
  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  }

  var author_id = $.urlParam('id');

  fetch('v2/books/byAuthor/' + author_id)
    .then(function(response) {
      response.json()
        .then(function(json) {
          $("#books_by_author_header").append(`<div class="row pb-4">
                <div class="col-sm-8">
                    <h4 class="text-primary mb-0">Books by Author <i class="fa fa-angle-double-left"></i> <i class="fa fa-book"></i> ${json[0].author.name} <i class="fa fa-angle-double-right"></i></h4>
                </div>
            </div>`);

          for (let i = 0; i < json.length; i++) {

            let {
              id,
              title,
              cover,
              author,
              genre
            } = json[i];

              $("#books-by-author").append(`<li class="col-md-12 m-1 thumb-list">
                <div class="col-md-3">
                   <a class="pull-left mb-3">
                      <img class="rounded" src="${cover}" alt="cover" style="width: 130px; height: 160px">
                   </a>
                </div>
                <div class="col-md-9">
                    <p><span class="badge badge-success"> ${genre}</span></p>
                    <p class="font-weight-bold"><a class="text-dark" href="pages/book.html?id=${id}">${title}</a></p>
                </div>
              </li>`);

              $("#related_info").append(`<ol class="list-unstyled">
                  <li><a href="pages/author.html?id=${author_id}"> <i class="fa fa-angle-double-left"></i> Return to <span style="text-decoration: underline">${author.name} </span></a></li>
                </ol>`);
          }
        });
    });
});