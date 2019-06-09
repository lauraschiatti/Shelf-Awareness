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
            let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');

            let {
              id,
              title,
              cover,
              author,
              genre
            } = json[i];

            listItem.innerHTML =
              `<div class="card m-3">
                        <!--Card image-->
                        <div class="view">
                            <img src="${cover}" class="card-img-top" alt="photo" style="height: 200px">
                        </div>

                        <!--Card content-->
                        <div class="card-body">
                            <small class="text-primary"> Genre</small>
                            <small class="card-title"><a class="text-dark" href="pages/book.html?id=${id}">${title}</a></small>
                            <p class="card-subtitle"><small class="font-italic">${author.name}</small></p>
                        </div>
                    </div>`;

            $("#books-by-genre-list").append(listItem);
          }

          $("#related_info_genre").append(`<ol class="list-unstyled">
              <li><a href="pages/all_literary_genres.html"> <i class="fa fa-angle-double-left"></i> Return to all genres</a></li>
            </ol>`);

        });
    });
});