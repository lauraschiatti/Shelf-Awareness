$(document).ready(function() {
  fetch('v2/themes')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {
            let listItem = document.createElement("div");
            listItem.setAttribute('class', 'col-sm-4 col-md-6 col-lg-4');
            let {
              theme,
              id
            } = json[i];
            let badge_type;
            switch (i % 4) {
                case 0: badge_type = "primary"; break;
                case 1: badge_type = "success"; break;
                case 2: badge_type = "danger"; break;
                case 3: badge_type = "warning"; break;
            }
            let img_src = getImage(theme);
            listItem.innerHTML =
              `<div class="card m-3">
                <!--Card image-->
                <div class="view">
                    <img src="${img_src}" class="card-img-top" alt="photo" style="height: 200px">
                </div>

                <!--Card content-->
                <div class="card-body">
                  <h4><span class="badge badge-${badge_type}"> ${theme}</span></h4>
                  <small class="card-title"><a class="text-dark" href="pages/all_books_by_theme.html?theme=${theme}&id=${id}">See books</a></small>
                </div>
              </div>`;

            $("#all_themes").append(listItem);
          }
        });
    });
});

function getImage(theme) {
    let img_src;
    switch (theme.toLowerCase()) {
        case "love": img_src = "assets/img/themes/love.jpeg"; break;
        case "war": img_src = "assets/img/themes/war.jpg"; break;
        case "revenge": img_src = "assets/img/themes/revenge.jpg"; break;
        case "betrayal": img_src = "assets/img/themes/betrayal.jpg"; break;
        case "survival": img_src = "assets/img/themes/survival.jpg"; break;
        case "grace": img_src = "assets/img/themes/grace.jpg"; break;
        case "isolation": img_src = "assets/img/themes/isolation.jpg"; break;
        case "childhood": img_src = "assets/img/themes/childhood.jpg"; break;
        case "forgiveness": img_src = "assets/img/themes/forgiveness.jpg"; break;
        case "treachery": img_src = "assets/img/themes/treachery.png"; break;
        case "peace": img_src = "assets/img/themes/peace.jpg"; break;
        case "magic": img_src = "assets/img/themes/magic.png"; break;
        case "mythology": img_src = "assets/img/themes/mythology.jpg"; break;
        case "sacrifice": img_src = "assets/img/themes/sacrifice.jpg"; break;
    }
    return img_src;
}
