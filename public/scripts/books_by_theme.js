$(document).ready(function() {
  var allParams = window.location.href.split("?")[1];
  var themeIdParam = allParams.split("&")[1];
  var themeParam = allParams.split("&")[0];
  var id = themeIdParam.split("=")[1];
  var theme = themeParam.split("=")[1];

  fetch('v2/books/byTheme/' + id)
    .then(function(response) {
      response.json()
        .then(function(json) {
          $("#books_by_theme_header").append(`<div class="row pb-4">
                <div class="col-sm-8">
                    <h4 class="text-primary mb-0">Theme <i class="fa fa-angle-double-left"></i> <i class="fa fa-book"></i> ${theme} <i class="fa fa-angle-double-right"></i></h4>
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


              $("#books-by-theme-list").append(`<li class="col-md-12 m-1 thumb-list">
                <div class="col-md-3">
                   <a class="pull-left mb-3">
                      <img class="rounded book-cover" src="${cover}" alt="cover">
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
              <li><a href="pages/all_themes.html"> <i class="fa fa-angle-double-left"></i> Return to all themes</span></a></li>
            </ol>`);

        });
    });
});
