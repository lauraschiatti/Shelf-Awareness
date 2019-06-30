$(document).ready(function() {

  fetch('v2/users/loggedInUser')
    .then(function(response) {
      // if(response.status=)
      response.json()
    .then(function(data) {
            var user = data[0];
            currentUser = user;
            if (user != undefined) {
              fetch('v2/cart').then(function(response) {
                return response.json();
              }).then(function(json) {
                let {
                  total,
                  books
                } = json;

                clearCartInfo();

                if (total == undefined) {
                    total = { 'items': 0, 'value': "0.00", 'currency': "eur" };
                    books = { 'length': 0 };
                }

                fillCartInfo(total, books);
              });
            } else {
              $('#cartPageDiv').empty();
              $('#cartPageDiv').append('<p>You must be authorized to access this page</p>');
            }


    })
    .catch(err => {
          // toastr.error("You are not logged in");
        });

    }).catch(err => {
      // toastr.error("You are not logged in");
    });

 });

 $(document).on("click", "#purchaseBooks", function(e) {
   e.preventDefault();

   $.post('v2/cart/purchaseBooks', {}, function(data, status) {
       clearCartInfo();
       total = { 'items': 0, 'value': "0.00", 'currency': "eur" };
       books = { 'length': 0 };
       fillCartInfo(total, books);
       toastr.success("Books purchased!");
   })

 });

 function clearCartInfo() {
     $("#cartOverview").empty();
     $("#cartItems").empty();
 }

 function fillCartInfo(total, books) {
     $('#cartItems').append(`
       <h4 class="d-flex justify-content-between align-items-center mb-3">
         <p class="text">Shopping cart</p>
         <p class="badge badge-secondary badge-pill">${total.items}</p>
       </h4>
       <div class="list-group">
     `);

     for (let i = 0; i < books.length; i++) {
       let book = books[i];

       $('#cartItems').append(`
         <div class="list-group-item">
           <div class="row">
             <div class="col-3 d-none d-md-block">
               <img class="rounded" src="${book.cover}" alt="cover" style="width: 90px;">
             </div>
             <div class="col-9">
               <h5 class="my-0 text-muted"> <a href="pages/book.html?id=${book.book_id}" style="color: #6c757d!important">${book.title}</a></h5>
               <p class="text-muted">by ${book.author.name}</p>

               <h4><span class="badge badge-danger font-weight-light"> Price: ${book.price.total}&euro;</span></h4>
               <h4><span class="badge badge-secondary font-weight-light">Quantity: ${book.quantity}</span></span></h4>
             </div>
           </div>
         </div>
       `);
     }

     $('#cartItems').append(`</div>`);

     $('#cartOverview').append(`
       <h4 class="d-flex justify-content-between align-items-center mb-3">
         <span class="text text-danger">Overview</span>
       </h4>
       <div class="list-group">
         <div class="list-group-item">
           <h4 class="d-flex justify-content-between align-items-center mb-3">
             <p>Cart subtotal:</p>
             <p>${total.value}&euro;</p>
           </h4>
           <form id="purchaseBooksForm">
             <button class="btn btn-outline-danger" id="purchaseBooks" type="submit">
               <i class="fa fa-shopping-cart"></i> Purchase
             </button>
           </form>
         </div>
       </div>
     `);

      if (total.items == 0) $("#purchaseBooks").attr('disabled', true);
 }
