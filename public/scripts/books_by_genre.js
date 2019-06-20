$(document).ready(function() {
  // $.urlParam = function(name){
  //     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  //     return results[1] || 0;
  // }
  var allParams = window.location.href.split("?")[1];
  var bookParam = allParams.split("&")[1];
  var genreParam = allParams.split("&")[0];
  var titleParam = allParams.split("&")[2];
  var id = bookParam.split("=")[1];
  var genre = genreParam.split("=")[1];
  var title = titleParam.split("=")[1];

  fetch('v2/books/byGenre/' + genre)
    .then(function(response) {
      response.json()
        .then(function(json) {
          $("#books_by_genre_header").append(`<div class="row pb-4">
                <div class="col-sm-8">
                    <h4 class="text-primary mb-0">Genre <i class="fa fa-angle-double-left"></i> <i class="fa fa-book"></i> ${json[0].genre} <i class="fa fa-angle-double-right"></i></h4>
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

              $("#books-by-genre-list").append(`<li class="col-md-12 m-1 thumb-list">
                <div class="col-md-3">
                   <a class="pull-left mb-3">
                      <img class="rounded" src="${cover}" alt="cover" style="width: 130px; height: 160px">
                   </a>
                </div>
                <div class="col-md-9">
                    <p><span class="badge badge-success"> ${genre}</span></p>
                    <p class="font-weight-bold"><a class="text-dark" href="pages/book.html?id=${id}">${title}</a></p>
                    <p class="card-subtitle"><a class="font-italic" href="pages/author.html?id=${author.id}">${author.name}</a></p>
                </div>
              </li>`);
          }

          $("#related_info").append(`<ol class="list-unstyled">
              <li><a href="pages/all_literary_genres.html"> <i class="fa fa-angle-double-left"></i> Return to all literary genres</span></a></li>
            </ol>`);

        });
    });
});