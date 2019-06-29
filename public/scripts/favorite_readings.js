$(document).ready(function() {
  fetch('v2/books/favorite')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {

              let {
                  id,
                  title,
                  cover,
                  author,
                  genre
              } = json[i];

              $("#favorite-readings").append(`<li class="col-md-12 m-1 thumb-list">
                <div class="col-md-3">
                   <a class="pull-left mb-3">
                      <img class="rounded book-cover" src="${cover}" alt="cover">
                   </a>
                </div>
                <div class="col-md-9">
                    <p><span class="badge badge-success"> ${genre}</span></p>
                    <h5 class="text-danger" > ${title}</h5>
                    <p class="font-italic">by ${author.name}</p>
                    <a href="pages/book.html?id=${id}">Read more</a>
                </div>
              </li>`);
          }
        });
    });
});
