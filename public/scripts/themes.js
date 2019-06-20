$(document).ready(function() {
  fetch('v2/themes')
    .then(function(response) {
      response.json()
        .then(function(json) {
          for (let i = 0; i < json.length; i++) {
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

              $("#all-themes").append(`<li class="media col-xs-12 m-3">
                 <div class="col-xs-12 col-md-11 col-lg-9 p-3">
                   <a class="pull-left mb-3">
                      <img class="rounded thumb" src="${img_src}" alt="img_theme">
                   </a>
                   <h4><span class="badge badge-${badge_type}"> ${theme}</span></h4>
                   <a href="pages/all_books_by_theme.html?theme=${theme}&id=${id}">See books</a>
                 </div>
              </li>`);
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
