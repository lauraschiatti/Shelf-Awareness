$(document).ready(function() {
  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  }

  var id = $.urlParam('id');

  fetch('v2/books/' + id).then(function(response) {
    return response.json();
  }).then(function(json) {
    let {
      id,
      title,
      cover,
      abstract,
      author,
      genre,
      price,
      status,
      interview
    } = json;

    $("#similar_books_header").append(`
        <div class="row pb-4">
          <div class="col-sm-8">
              <h4 class="text-primary mb-0"><strong>Similar books to </strong> <i class="fa fa-angle-double-left"></i> <i class="fa fa-book"></i> ${title} <i class="fa fa-angle-double-right"></i></h4>
          </div>
      </div>
    `);
    $("#related_info").append(`
        <ol class="list-unstyled">
          <li><a href="pages/book.html?id=${id}"> <i class="fa fa-angle-double-left"></i> Return to <span style="text-decoration: underline" ">${title}</span></a></li>
        </ol>
    `);
  }).then(function(json) {
      fetch('v2/books/' + id + '/similarBooks')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
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
                            <small class="text-primary"> ${genre}</small>
                            <small class="card-title"><a class="text-dark" href="pages/book.html?id=${id}">${title}</a></small>
                            <p class="card-subtitle"><small class="font-italic">${author.name}</small></p>
                        </div>
                    </div>`;

            $("#similar_books").append(listItem);
          }
    });
  });
});