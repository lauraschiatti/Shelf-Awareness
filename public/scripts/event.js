import {
  getDate,
  getTime
} from './time.js';

$(document).ready(function() {
  $.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
  }

  var id = $.urlParam('id');

  fetch('v2/events/' + id).then(function(response) {
    return response.json();
  }).then(function(json) {
    let {
      location,
      held_on,
      book,
      author
    } = json;
    var date = getDate(held_on);
    var time = getTime(held_on);

    $("#event").append(`
        <div class="row justify-content-md-center">
            <div class="card mb-5 mt-5 col-xs-12 col-md-10">
                
                <nav class="breadcrumb mt-4">
                  <a class="breadcrumb-item text-black" href="pages/all_events.html">Events</a>
                  <span class="breadcrumb-item active">Book signing</span>
                </nav>
                
                <br>
                
                <div class="card-body p-4">
                    <div class="row">
                        <div class="col-xs-12 col-md-6 mb-4">
                            <h4 class="text-primary"> ${location} </h4>

                            <p class="text-success text-uppercase"> ${date}  at ${time}</p>

                            <a href="pages/book.html?id=${book.id}"> <i class="fa fa-book"></i> About this book</a>

                        </div>
                        <div class="col-xs-12 col-md-6">
                            <a href="pages/book.html?id=${book.id}">
                                <img src="${book.cover}" class="mx-auto d-block img-fluid rounded" style="height: 200px" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
  });
});