$(document).ready(function() {
  fetch('v2/books')
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

              $("#all-books").append(`<li class="col-md-12 m-1 thumb-list">
                <div class="col-md-3">
                   <a class="pull-left mb-3" href="pages/book.html?id=${id}">
                      <img class="rounded" src="${cover}" alt="cover" style="width: 140px; height: 190px">
                   </a>
                </div>
                <div class="col-md-9">
                    <small class="text-primary" > ${genre}</small>
                    <p class="font-italic">${title}</p>
                    <p>by ${author.name}</p>
                    <a href="pages/book.html?id=${id}">Read more</a>
                </div>
              </li>`);
          }

        });
    });
});
