$(document).ready(function() {
  fetch('v2/authors')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {

            let {
              name,
              id,
              picture
            } = json[i];

            $("#all-authors").append(`<li class="media col-xs-12 m-3">
                <div class="col-xs-12 col-md-11 col-lg-10 p-3">
                   <a class="pull-left mb-3">
                      <img class="rounded thumb" src="${picture}" alt="author_pic">
                   </a>
                   <p class="font-italic">${name}</p>
                   <a href="pages/author.html?id=${id}">Read more</a>
                 </div>
              </li>`);
          }
        });
    });
});