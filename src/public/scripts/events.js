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
            var date = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(held_on);
            // TODO: change column held_on to timestamp? or check if the time of the event can be explicitly stated this way
            listItem.innerHTML =
                `<div class="card mb-4">
                    <div class="card-footer">
                        <div class="row text-center">
                            <div class="col-xs-6">
                               <i class="fa fa-map-marker"></i>
                               <small class="text-dark">${location}</small>
                            </div>
                        </div>
                    </div>
                    <div style = "width: 50em; height: 20em; " >
                      <a class="text-dark" href="pages/event-page.html?id=${id}">
                          <img class="card-header" src="${book.cover}" alt="Card image cap" style="max-width: 100%;max-height: 100%;" >
                      </a>
                    </div>
                    <div class="card-body">
                         <small class="text-primary" > ${date}</small>
                         <p class="card-title"><a class="text-dark" href="pages/show-event.html?id=${id}">${book.title}</a></p>
                         <p class="card-subtitle"><small class="font-italic">${author.name}</small></p>
                    </div>
                </div>`;
            $("#events-list").append(listItem);
          }
        });
    });
});
