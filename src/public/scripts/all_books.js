$(document).ready(function() {
  fetch('v2/books')
    .then(function(response) {
      response.json()
        .then(function(json) {
          $("#books_header").append(`<div class="row pb-4">
                <div class="col-sm-8">
                    <h4 class="text-primary mb-0"><strong>Books </strong></h4>
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

            $("#books").append(listItem);
          }

          $("#related_info_books").append(`<ol class="list-unstyled">
              <li><a href="/index.html"> <i class="fa fa-angle-double-left"></i> Return to <span style="text-decoration: underline">home </span></a></li>
            </ol>`);

        });
    });
});
