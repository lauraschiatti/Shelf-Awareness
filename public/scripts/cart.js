$(document).ready(function() {
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
         <span class="text">Shopping cart</span>
         <span class="badge badge-secondary badge-pill">${total.items}</span>
       </h4>
       <div class="list-group">
     `);

     for (let i = 0; i < books.length; i++) {
       let book = books[i];
       $('#cartItems').append(`
         <div class="list-group-item">
           <div class="row">
             <div class="col-4">
               <img src="${book.cover}" alt="Book image" style="width:50%; height:100%"/>
             </div>
             <div class="col-5">
               <h6 class="my-0">${book.title}</h6>
               <small class="text-muted">by ${book.author.name}</small>
             </div>
             <div class="col-3">
               <p class="text-muted">Price: ${book.price.total}&euro;</p>
               <br />
               <p class="text-muted">Quantity: ${book.quantity}</p>
             </div>
           </div>
         </div>
       `);
     }

     $('#cartItems').append(`</div>`);

     $('#cartOverview').append(`
       <h4 class="d-flex justify-content-between align-items-center mb-3">
         <span class="text">Overview</span>
       </h4>
       <div class="list-group">
         <div class="list-group-item">
           <h3 class="d-flex justify-content-between align-items-center mb-3">
             <span class="text">Cart subtotal:</span>
             <span class="">${total.value}&euro;</span>
           </h3>
         </div>
         <div class="list-group-item text-center">
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
