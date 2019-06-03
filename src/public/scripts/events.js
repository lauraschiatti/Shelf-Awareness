import {
  getDate
} from './time.js';

$(document).ready(function() {
  fetch('v2/events')
    .then(function(response) {
        response.json()
    .then(function(json) {
        for (let i = 0; i < json.length; i++) {

        let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');
            let {
              location,
              id,
              held_on,
              book,
              author
            } = json[i];
            // var date = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(held_on);
            var date = getDate(held_on);

            // TODO: change column held_on to timestamp? or check if the time of the event can be explicitly stated this way
            listItem.innerHTML =
                `<div class="card mb-3">
                  <!--Card image-->
                  <div class="view">
                    <a href="pages/event.html?id=${id}">
                      <img src="${book.cover}" class="card-img-top" alt="photo" style="height: 200px">
                    </a>
                  </div>

                  <!--Card content-->
                  <div class="card-body">
                    <!--Title-->
                    <small class="text-primary" > ${date}</small>
                    <p><small class=""><i class="fa fa-map-marker"></i> ${location}</small></p>
                    <small class="card-subtitle " style="color: #007bff;"> by ${author.name}</small>
                  </div>

                </div>`;
            $("#events-list").append(listItem);
          }
        });
    });
});
