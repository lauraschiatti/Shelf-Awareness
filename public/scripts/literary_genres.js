$(document).ready(function() {
  fetch('v2/genres')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {

              let {
                  genre,
                  title,
                  id
              } = json[i];

              let img_src, badge_type;

              switch (i % 4) {
                  case 0: badge_type = "primary"; break;
                  case 1: badge_type = "success"; break;
                  case 2: badge_type = "danger"; break;
                  case 3: badge_type = "warning"; break;
              }

              switch (genre) {
                  case "Fiction": img_src = "assets/img/fiction.png"; break;
                  case "Horror": img_src = "assets/img/horror.png"; break;
                  case "Adventure": img_src = "assets/img/adventure.png"; break;
                  case "Fantasy": img_src = "assets/img/fantasy.png"; break;
                  default: img_src = "assets/img/genres.png";
              }

              $("#all-literary-genres").append(`<li class="media col-xs-12 m-3">
                 <div class="col-xs-12 col-md-11 col-lg-9 p-3">
                   <a class="pull-left mb-3">
                      <img class="rounded" src="${img_src}" alt="..." style="width: 130px; height: 120px;">
                   </a>
                   <h4><span class="badge badge-${badge_type}"> ${genre}</span></h4>
                   <a href="pages/all_books_by_genre.html?genre=${genre}&id=${id}&title=${title}">See books</a>
                 </div>
              </li>`);

          }
        });
    });
});
