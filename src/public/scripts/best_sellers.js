$(document).ready(function() {
  fetch('v2/books/bestSellers')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {
            let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');

            let {
              id,
              book_id,
              title,
              cover,
              author,
              genre
            } = json[i];

            listItem.innerHTML =
              `<div class="card m-3">
                        <!--Card image-->
                        <div class="view">
                            <img src="${cover}" class="card-img-top" alt="photo" style="height: 200px; width: 140px">
                        </div>

                        <!--Card content-->
                        <div class="card-body">
                            <small class="text-primary"> ${genre}</small>
                            <small class="card-title"><a class="text-dark" href="pages/book.html?id=${book_id}">${title}</a></small>
                            <p class="card-subtitle"><small class="font-italic">${author.name}</small></p>
                        </div>
                    </div>`;

            $("#best_sellers").append(listItem);
          }
          //
          // $("#related_info_books").append(`<ol class="list-unstyled">
          //     <li><a href="/index.html"> <i class="fa fa-angle-double-left"></i> Return to <span style="text-decoration: underline">home </span></a></li>
          //   </ol>`);

        });
    });
});
