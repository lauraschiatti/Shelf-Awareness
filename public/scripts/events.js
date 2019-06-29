import {getDate} from './time.js';

$(document).ready(function() {
  fetch('v2/events')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {

              let {
                  location,
                  id,
                  held_on,
                  book,
                  author
              } = json[i];
              var date = getDate(held_on);

              $("#all-events").append(`<li class="col-md-12 m-1 thumb-list">
                <div class="col-md-3">
                   <a class="pull-left mb-3" href="pages/event.html?id=${id}">
                      <img class="rounded book-cover" src="${book.cover}" alt="cover">
                   </a>
                </div>
                <div class="col-md-9">
                    <small class="text-primary" > ${date}</small>
                    <p class="font-italic"><i class="fa fa-map-marker"></i> ${location}</p>
                    <p>by ${author.name}</p>
                    <a href="pages/event.html?id=${id}">Read more</a>
                </div>
              </li>`);

          }
        });
    });
});
