$(document).ready(function() {
    fetch('v2/authors')
        .then(function(response) {
            response.json()
                .then(function(json) {
                    for (let i = 0; i < json.length; i++) {
                        let listItem = document.createElement("div");
                        listItem.setAttribute('class', 'col-lg-4 col-md-6 col-sm-6 col-xs-6');
                        let {
                            name,
                            id,
                            picture
                        } = json[i];
                        listItem.innerHTML =
                            `<div class="card mb-3">

                              <!--Card image-->
                              <div class="view">
                                <a href="pages/author.html?id=${id}">
                                  <img src="${picture}" class="card-img-top" alt="photo" style="height: 200px">
                                </a>
                              </div>

                              <!--Card content-->
                              <div class="card-body">
                                <!--Title-->
                                <h5 class="card-text">${name}</h5>
                                <a href="pages/author.html?id=${id}" class="card-link">More</a>
                              </div>

                            </div>`;
                        $("#authors-list").append(listItem);
                    }
                });
        });
});
