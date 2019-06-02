$(document).ready(function() {
    $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }
    var id = $.urlParam('id');

    fetch('v2/authors/' + id).then(function(response) {
        return response.json();
    }).then(function(json) {
        let {
            name,git
            bio,
            picture
        } = json[0];

        $("#books_by_author").append(
            `<div class="col-xs-10 col-md-10 col-lg-8 offset-lg-2 main mt-5">
            <div class="row">          
                <div class="card-body pb-5">                      
                    <div class="row pb-4">
                        <div class="col-sm-8">
                            <h4 class="text-primary mb-0"><strong>Author </strong> <i class="fa fa-angle-double-left"></i>${name} <i class="fa fa-angle-double-right"></i></h4>
                        </div>
                    </div>
        
             
                    <h5 class="font-weight-light"> <i class="fa fa-book"></i> His books</h5>
                    
                    <div class="card-group">
                        <div class="card m-3">
                            <!--Card image-->
                            <div class="view">
                                <img src="${picture}" class="card-img-top" alt="photo" style="height: 200px">
                            </div>
                    
                            <!--Card content-->
                            <div class="card-body">
                                <small class="text-primary"> Genre</small>
                                <h5 class="card-title">Title</a></h5>
                                <a href="pages/book.html?id=1"> <i class="fa fa-plus"></i> Book details</a>
                            </div>
                        </div>
                        <div class="card m-3">
                            <!--Card image-->
                            <div class="view">
                                <img src="${picture}" class="card-img-top" alt="photo" style="height: 200px">
                            </div>
                    
                            <!--Card content-->
                            <div class="card-body">
                                <small class="text-primary"> Genre</small>
                                <h5 class="card-title">Title</a></h5>
                                <a href="pages/book.html?id=1"> <i class="fa fa-plus"></i> Book details</a>
                            </div>
                        </div>
                        <div class="card m-3">
                            <!--Card image-->
                            <div class="view">
                                <img src="${picture}" class="card-img-top" alt="photo" style="height: 200px">
                            </div>
                    
                            <!--Card content-->
                            <div class="card-body">
                                <small class="text-primary"> Genre</small>
                                <h5 class="card-title">Title</a></h5>
                                <a href="pages/book.html?id=1"> <i class="fa fa-plus"></i> More details</a>
                            </div>
                        </div>
                    </div>
                    
                  </div>       
                  
                </div>
            </div>
        </div>`);

        $("#related_info").append(`<ol class="list-unstyled">
          <li><a href="pages/author.html?id=${id}"> <i class="fa fa-angle-double-left"></i> Return to ${name}</a></li>
        </ol>`);

    });
});