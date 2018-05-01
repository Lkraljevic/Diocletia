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
  
    this.addItem = function(model, size, quantity) {
  
      // HardCode 
      // size = {
      //   l: [20.2, 20.3, 50.6, 20.3],
      //   r: [20.2, 20.3, 50.6, 20.3],
      //   m: 'cm' || 'inch'
      // }
      //quantity = 1;
  
  
      var item = {
        code: model.code,
        id: this.guid(),
        n: model.name,
        q: quantity, 
        s: size,
        c: model.currentTheme,
        p: model.sale_price
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
      this.updateDOM();
    }
  
    this.updateTotal = function() {
  
      var subtotal = 0;
      this.items.forEach(function(item){
        subtotal += item.p.price * Number(item.q);
        subtotal = Number(subtotal.toPrecision(2));
      });
      this.amount.details.subtotal = subtotal; 
      this.amount.total =  this.amount.details.subtotal + this.amount.details.tax + this.amount.details.shipping;
  
      this.saveCart();
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
      var dim = 'D_l:'+item.s.l.toString()+'D_r:'+item.s.r.toString();
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
  
    this.orderToString = function() {
      var description = 'Order description:  \n';
      var that = this;
      this.items.forEach(function(item) {
        description += item.n +' '+item.id+'\n';
        description +=  'Colors: \n Left: ' + item.c.l.toString() + '\n';
        description +=  'Right: ' + item.c.r.toString() + '\n';
        description +=  'Dimensions: \n Left: ' + item.s.l.toString() + item.s.m+ '\n';
        description +=  'Right: ' + item.s.r.toString() + item.s.m+  '\n';
      });
      return description;
    }
  
    // This will create PayPal payment object 
    this.createPaymentObject = function() {
      // {
      //     transactions: [{
      //       amount: cart.amount,
      //       item_list: { items: cart.itemsToString() }
      //     }]
      // }
      var payment = {
          transactions: [{
            amount: this.amount,
            item_list: {
              items: this.itemsToString()
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
        if(this.items.size)
          cart_notification.classList.remove('empty-cart');
        else
        cart_notification.classList.add('empty-cart');
      }

      var items = [];
      this.items.forEach(function(item){
        items.push(item);
      });

      // HARD CORE SELECTOR
      var listHTML = Handlebars.templates["cart"]({items, amount: this.amount });
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
});


  
  
  //import {M1_config} from 'modelConfig';



