import {
  getDate
} from './time.js';

$(document).ready(function() {
  var allParams = window.location.href.split("?")[1];
  var idParam = allParams.split("&")[0];
  var titleParam = allParams.split("&")[1];
  var id = idParam.split("=")[1];
  var title = titleParam.split("=")[1];
  title = title.replace(/%20/g, " ");
  title = title.replace(/%27/g, "'");

  fetch('v2/events/byBook/' + id)
    .then(function(response) {
      response.json()
        .then(function(json) {
          $("#events_by_book_header").append(`
              <div class="row pb-4">
                <div class="col-sm-12">
                  <h4 class="text-primary mb-0">Book signing events <i class="fa fa-angle-double-left"></i> <i class="fa fa-book"></i> ${title} <i class="fa fa-angle-double-right"></i></h4>
                </div>
              </div>
              `);
          $("#related_info").append(`
              <ol class="list-unstyled">
                <li><a href="pages/book.html?id=${id}"> <i class="fa fa-angle-double-left"></i> Return to ${title}</a></li>
              </ol>
              `);

          for (let i = 0; i < json.length; i++) {
            let {
              location,
              id,
              held_on,
              book,
              author
            } = json[i];
            var date = getDate(held_on);

            $("#events-by-book").append(`<li class="col-md-12 m-1 thumb-list">
              <div class="col-md-3">
                 <a class="pull-left mb-3">
                    <img class="rounded" src="${book.cover}" alt="cover" style="width: 130px; height: 160px">
                 </a>
              </div>
              <div class="col-md-9">
                  <small class="text-primary" > ${date}</small>
                  <p><small class=""><i class="fa fa-map-marker"></i> ${location}</small></p>
                  <p>by <span class="font-italic">${author.name}</span></p>
              </div>
            </li>`);

          }
        });
    });
});
