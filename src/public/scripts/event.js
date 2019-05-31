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
        var date = /[0-9]{4}-[0-9]{2}-[0-9]{2}/.exec(held_on);

        $("#book").append(`<div class="row justify-content-md-center">
            <div class="card m-5 col-xs-11 col-md-8">
                <div class="card-body p-5">
                    <div class="row pb-4">
                        <div class="col-sm-8 border-right">
                            <h4 class="text-dark mb-0">${book.title}</h4>
                            <p>by <a href="#">${author.name}</a></p>

                            <h4 class="text-primary"> $ ${location} </h4>

                            <p class="text-success text-uppercase"> ${date} </p>
                        </div>
                        <div class="col-sm-4">
                            <img src="${book.cover}" class="rounded mx-auto d-block img-fluid" style="width:70%;">
                        </div>
                    </div>

                    <dl >
                        <dt>Abstract</dt>
                        <dd class="text-justify"><small class="font-weight-light">${book.abstract}</small></dd>
                        <dt>Genre</dt>
                        <dd><small class="font-weight-light">${book.genre}</small></dd>
                        <dt>Interview</dt>
                        <dd><q class="font-weight-light">${book.interview}</q></dd>
                    </dl>

                    <hr>
                    <div class="row">
                        <div class="col-sm-5">
                            <dl>
                                <dt>Quantity: </dt>
                                <dd>
                                    <select class="form-control form-control-sm" style="width:70px;">
                                        <option> 1 </option>
                                        <option> 2 </option>
                                        <option> 3 </option>
                                    </select>
                                </dd>
                            </dl>
                        </div>
                        <div class="col-sm-7">
                            <a href="#" class="btn btn-outline-danger"> <i class="fa fa-shopping-cart"></i> Add to cart </a>
                        </div>
                    </div>

                    <hr>

                    <small class="font-weight-light">
                        <a href="#" class="font-italic"><i class="fa fa-pencil-square-o"></i> Review this product</a>
                        <br>
                        Share your thoughts with other customers
                    </small>
                </div>
            </div>
        </div>`);
    });
});
