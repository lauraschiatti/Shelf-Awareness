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

    $("#event").append(`<div class="row justify-content-md-center">
            <div class="card mb-5 mt-5 col-xs-11 col-md-8">
                <div class="card-body p-5">
                    <div class="row">
                        <div class="col-sm-6 border-right">
                            <h4 class="text-primary"> ${location} </h4>

                            <p class="text-success text-uppercase"> ${date}  at ${time}</p>

                            <a href="pages/book.html?id=${book.id}"> <i class="fa fa-book"></i> About this book</a>

                        </div>
                        <div class="col-sm-6">
                            <a href="pages/book.html?id=${book.id}">
                                <img src="${book.cover}" class="mx-auto d-block img-fluid" style="height: 200px" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
  });
});
