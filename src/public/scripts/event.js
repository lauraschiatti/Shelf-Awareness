import { getDate, getTime } from './time.js';

$(document).ready(function() {
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    var id = $.urlParam('id');

    fetch('v2/events/' + id).then(function(response) {
        return response.json();
    }).then(function(json) {
        let { location, held_on, book, author } = json;
        var date = getDate(held_on);
        var time = getTime(held_on);

        $("#event").append(`<div class="row justify-content-md-center">
            <div class="card m-5 col-xs-11 col-md-8">
                <div class="card-body p-5">
                    <div class="row pb-5">
                        <div class="col-sm-6 border-right">
                            <h4 class="text-dark mb-0"><a class="text-dark" href="pages/show-book.html?id=${book.id}">${book.title}</a></h4>
                            <p>by <a href="pages/author-page.html?id=${author.id}">${author.name}</a></p>

                            <h4 class="text-primary"> ${location} </h4>

                            <p class="text-success text-uppercase"> ${date}  at ${time}</p>
                        </div>
                        <div class="col-sm-3">
                            <a href="pages/show-book.html?id=${book.id}">
                                <img src="${book.cover}" class="rounded mx-auto d-block img-fluid" style="" />
                            </a>
                        </div>
                        <div class="col-sm-3">
                            <a href="pages/author-page.html?id=${author.id}">
                            <img src="${author.picture}" class="rounded mx-auto d-block img-fluid" style="" />
                            </a>
                        </div>
                    </div>

                    <dl>
                        <dt>Abstract</dt>
                        <dd class="text-justify"><small class="font-weight-light">${book.abstract}</small></dd>
                        <dt>Genre</dt>
                        <dd><small class="font-weight-light">${book.genre}</small></dd>
                        <dt>Interview</dt>
                        <dd><q class="font-weight-light">${book.interview}</q></dd>
                    </dl>

                    <hr>

                    <dl >
                        <dt>About the author</dt>
                        <dd class="text-justify"><small class="font-weight-light">${author.bio}</small></dd>
                    </dl>
                </div>
            </div>
        </div>`);
    });
});
