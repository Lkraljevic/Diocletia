function Cart() {
  
    // Save items and amount to locale storage
    this.items =  new Map();
    this.amount = {
      total: 0,
      currency: 'EUR',
      details: {
        subtotal: 0,
        tax: 0,
        shipping: 0
      }
    };

    this.discount = {
      code: '',
      value: 0,
      quantity: 0,
      totalDiscount: 0
    },
    
    this.addItem = function(model, size, quantity) {
      var sale_price;
      if(model.sale_price && model.sale_price.price > model.sale_price.promo_price )
        sale_price = {
          price: model.sale_price.promo_price,
          currency: 'EUR'
        }
      else 
        sale_price = {
          price: model.sale_price.price,
          currency: 'EUR'
        }
      

      var item = {
        code: model.code,
        id: this.guid(),
        n: model.name,
        q: quantity, 
        s: size,
        c: model.currentTheme,
        p: sale_price
      }
  
      this.items.set(item.id,item);
      console.log(this.items);
      this.updateTotal();
      this.updateDOM();
    }
  
    this.removeItem = function(item_id) {
      this.items.delete(item_id);
      this.updateTotal();
      this.updateDOM();
    }
  
    this.updateItem = function(item_id, update) {
      
      var item = Object.assign(this.items.get(item_id), update);
      this.items.set(item_id,item);
      console.log(this.items);
      this.updateTotal();
      this.updateDiscount();
      //this.updateDOM();
    }
  
    this.updateTotal = function() {
  
      var subtotal = 0;
      this.items.forEach(function(item){
        subtotal += item.p.price * Number(item.q);
        subtotal = Number(parseFloat(subtotal).toFixed(2));
      });

      this.amount.details.subtotal = subtotal; 
      this.amount.total =  this.amount.details.subtotal + this.amount.details.tax + this.amount.details.shipping;
      

      this.saveCart();
    }

    this.updateDiscount = function(discount) {
    
      var that = this;
      if(!discount)
        discount = this.discount;
      
        if(!discount.value || !discount.code || !discount.quantity) return;
        
      this.discount = {
        totalDiscount: Math.min(this.items.size,discount.quantity)*discount.value,
        value: discount.value,
        code: discount.code,
        quantity: discount.quantity
      }

      this.updateDOM();
  
    }

  
    // Save Object to localstorage
    this.saveCart = function() {
      var cart_items = [];
      this.items.forEach(function(item){cart_items.push(item)})
      localStorage.setItem('cart_items', JSON.stringify(cart_items));
      localStorage.setItem('cart_amount', JSON.stringify(this.amount));
    }
    // Load Object object localstorage
    this.loadCart = function() {
      if (typeof(Storage) !== "undefined") {
        var that = this;
        var cart_items = localStorage.getItem('cart_items');
        if(cart_items) {
          cart_items = JSON.parse(cart_items);
          cart_items.forEach(function(item){
            that.items.set(item.id,item);
          });
        }
        var amount = localStorage.getItem('cart_amount', JSON.stringify(this.amount));
        if(amount)
          that.amount = JSON.parse(amount);
      } else {
          return [];
      }
  
      this.updateDOM();
    }
  
    this.clearCart = function() {
      this.items =  new Map();
      this.amount = {
        total: 0,
        currency: 'EUR',
        details: {
          subtotal: 0,
          tax: 0,
          shipping: 0
        }
      };
      this.saveCart();
      this.loadCart();
    }
  
  
    // Save order to server
    this.saveOrderDB = function(confirmData) {
      var that = this;
  
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
        }
        that.clearCart();
      };
  
      var cart_items = [];
      that.items.forEach(function(item){cart_items.push(item)});
  
      var data = {
        order: {
          amount: that.amount,
          items: cart_items
        }
      }
  
      if(confirmData) 
        data = Object.assign(data, confirmData);
  
  
      console.log(data);
  
      xhttp.open("POST", "https://diocletia.hr/test_ajax.php", true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.send(JSON.stringify(data));
    }
  
  
    // PREPARE PAYMENT
  
    this.generateItemSKU = function(item_id) {
      var item = this.items.get(item_id);
      var dim = 'D:';

      if(item.s.size_number) dim += 'N:'+ item.s.size_number;
      if(item.s.size1 || item.s.size2 || item.s.size3 || item.s.size4 || item.s.size5)
        size_string += 'CSi:'+ (item.s.size1||'-') + ':'+ (item.s.size2||'-') + ':'+ (item.s.size3||'-') + ':'+ (item.s.size4||'-') + ':'+ (item.s.size5||'-');
      
        var col = 'C_l:'+item.c.l.toString()+'C_r:'+item.c.r.toString();

  
      return dim+col;
    }
  
    this.itemsToString = function() {
       var items = [];
       var that = this;
        this.items.forEach(function(item) {
          var t = {}
          t.name = item.n;
          t.quantity = item.q;
          t.currency = item.p.currency;
          t.price = item.p.price;
          t.description = 'DIOCLETIA UNIQUE',
          t.sku = that.generateItemSKU(item.id), // 'Custom colors',//that.generateItemSKU(item.id)
          items.push(t);
        });
        return items;
    }
  
    // this.orderToString = function() {
    //   var description = 'Order description:  \n';
    //   var that = this;
    //   this.items.forEach(function(item) {
    //     description += item.n +' '+item.id+'\n';
    //     description +=  'Colors: \n Left: ' + item.c.l.toString() + '\n';
    //     description +=  'Right: ' + item.c.r.toString() + '\n';
    //     description +=  'Dimensions: \n Left: ' + item.s.l.toString() + item.s.m+ '\n';
    //     description +=  'Right: ' + item.s.r.toString() + item.s.m+  '\n';
    //   });
    //   return description;
    // }
  
    // This will create PayPal payment object 
    this.createPaymentObject = function() {
      // {
      //     transactions: [{
      //       amount: cart.amount,
      //       item_list: { items: cart.itemsToString() }
      //     }]
      // }
      
      var total = parseFloat(this.amount.total + this.discount.value).toFixed(2);
      var subtotal = parseFloat(this.amount.details.subtotal + this.discount.value).toFixed(2)
      var items = this.itemsToString();
      if(this.discount.value) 
        items.push({
          name: 'Promo',
          quantity: 1,
          currency: this.amount.currency,
          price: this.discount.value,
          description: 'Promo',
          sku: this.discount.code
        })
      var payment = {
          transactions: [{
            amount: {
              total: total,
              currency: this.amount.currency,
              details: {
                subtotal: subtotal,
                tax: this.amount.details.tax,
                shipping: this.amount.details.shipping
              }
            },
            item_list: {
              items: items
            },
            //description: this.orderToString(),
            //soft_descriptor: 'DIOCLETIA_UNIQUE',
          }]
      }
      
  
      return payment;
    }
    // To be removed
  
    this.updateDOM = function() {

      /* UPDATE CART NOTIFICATION */
      var cart_notification = document.getElementById('cart-notification');
      if(cart_notification) {
        cart_notification.dataset.cart = this.items.size;
        if(this.items.size) {
          cart_notification.classList.remove('empty-cart');
          cart_notification.classList.add('new-item');
        }
        else {
          cart_notification.classList.add('empty-cart');
          cart_notification.classList.remove('new-item');
        }
      }

      var items = [];
      this.items.forEach(function(item){
        items.push(item);
      });

      // HARD CORE SELECTOR
      var listHTML = Handlebars.templates["cart"]({items, amount: this.amount, discount: this.discount });
       document.getElementById('cart-table').innerHTML = listHTML;
      
    }
  
  
  this.guid = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  

  this.currentCart = this.loadCart();
    
}







window.addEventListener("load", function(){
  cart = new Cart();

  paypal.Button.render({
    env: 'production', // Or 'sandbox'

    client: {
        sandbox:    'AYZxI2ZTNoLuUiJS8mwsaHtRg55xFZiYwE4DabAU8YaWhH3TSLbBy350Z6juZOwyNntmMweZ-iomFHBJ',
        production: 'AQfw7Tgyco8BlzVhCXTmhxrs_93hYpR4XQHrV5P9DB8lMd_YcazupdzC2XCT3H-0_jonZZGcc7-TeNyn'
    },
    style: {
      label: 'buynow',
      fundingicons: true, // optional
      branding: true, // optional
      size:  'medium', // small | medium | large | responsive
      shape: 'rect',   // pill | rect
      color: 'silver'   // gold | blue | silver | black
    },

    payment: function(data, actions) {
      var that = this;
      return actions.payment.create({
          payment: cart.createPaymentObject()
      });
    },

    onAuthorize: function(data, actions) {
        console.log(data);
        console.log(actions);
        return actions.payment.execute().then(function(payment) {
          if(payment) {
            cart.saveOrderDB(payment);
            hideCart();
          }
            

            // The payment is complete!
            // You can now show a confirmation message to the customer
        });
    },

    onCancel: function(data, actions) {
        console.log(data);
        console.log(actions);
    }


  }, '#paypal-button');


});





// Create real cart 
// Discount struct 
// {
//   value: 21
//   type: model.code||'all',
//   quantity: ''
// }