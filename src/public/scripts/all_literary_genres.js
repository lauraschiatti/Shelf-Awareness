$(document).ready(function() {
  fetch('v2/genres')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {
            let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');
            let {
              genre,
              title,
              id
            } = json[i];
            if (genre == "Fiction") {
              listItem.innerHTML =
                `<div class="card m-3">
                          <!--Card image-->
                          <div class="view">
                              <img src="assets/img/fiction.png" class="card-img-top" alt="photo" style="height: 200px">
                          </div>

                          <!--Card content-->
                          <div class="card-body">
                              <small class="text-primary"> ${genre}</small>
                              <small class="card-title"><a class="text-dark" href="pages/books_genre.html?genre=${genre}&id=${id}&title=${title}">See books</a></small>
                          </div>
                      </div>`;

              $("#all_literary_genres").append(listItem);
            } else if (genre == "Horror") {
              listItem.innerHTML =
                `<div class="card m-3">
                          <!--Card image-->
                          <div class="view">
                              <img src="assets/img/horror.png" class="card-img-top" alt="photo" style="height: 200px">
                          </div>

                          <!--Card content-->
                          <div class="card-body">
                              <small class="text-primary"> ${genre}</small>
                              <small class="card-title"><a class="text-dark" href="pages/books_genre.html?genre=${genre}&id=${id}&title=${title}">See books</a></small>
                          </div>
                      </div>`;

              $("#all_literary_genres").append(listItem);
            } else if (genre == "Adventure") {
              listItem.innerHTML =
                `<div class="card m-3">
                          <!--Card image-->
                          <div class="view">
                              <img src="assets/img/adventure.png" class="card-img-top" alt="photo" style="height: 200px">
                          </div>

                          <!--Card content-->
                          <div class="card-body">
                              <small class="text-primary"> ${genre}</small>
                              <small class="card-title"><a class="text-dark" href="pages/books_genre.html?genre=${genre}&id=${id}&title=${title}">See books</a></small>
                          </div>
                      </div>`;

              $("#all_literary_genres").append(listItem);
            }else if (genre == "Fantasy") {
              listItem.innerHTML =
                `<div class="card m-3">
                          <!--Card image-->
                          <div class="view">
                              <img src="assets/img/fantasy.png" class="card-img-top" alt="photo" style="height: 200px">
                          </div>

                          <!--Card content-->
                          <div class="card-body">
                              <small class="text-primary"> ${genre}</small>
                              <small class="card-title"><a class="text-dark" href="pages/books_genre.html?genre=${genre}&id=${id}&title=${title}">See books</a></small>
                          </div>
                      </div>`;

              $("#all_literary_genres").append(listItem);
            } else {
              listItem.innerHTML =
                `<div class="card m-3">
                          <!--Card image-->
                          <div class="view">
                              <img src="assets/img/genres.png" class="card-img-top" alt="photo" style="height: 200px">
                          </div>

                          <!--Card content-->
                          <div class="card-body">
                              <small class="text-primary"> ${genre}</small>
                              <small class="card-title"><a class="text-dark" href="pages/books_genre.html?genre=${genre}&id=${id}&title=${title}">See books</a></small>
                          </div>
                      </div>`;

              $("#all_literary_genres").append(listItem);
            }

          }

        });
    });
});
