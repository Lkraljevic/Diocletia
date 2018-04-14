//import {M1_config} from 'modelConfig';

function Model (modelEl, modelConfig) {

  this.modelEl = modelEl;

  this.name = modelConfig.name;
  this.sale_price = modelConfig.sale_price;
  this.nr_strips = modelConfig.nr_strips;
  
  this.themes = modelConfig.themes;

  
  this.currentTheme =  JSON.parse(JSON.stringify(this.themes.default))
  this.activeStrip = null;
  this.activeColor = null;


  this.changeTheme = function(theme) {
    this.currentTheme = JSON.parse(JSON.stringify(theme));
    this.updateDOM();
  }

  this.changeColor = function() { 

    if(this.activeStrip && this.activeColor){
        var data = this.extractID(this.activeStrip.id);
        this.currentTheme[data.side][data.index] = this.activeColor;
        this.updateDOM();
      }
  }

  this.updateDOM = function updateDOM() {
    var that = this;
    this.stripsEl.forEach(function(el) {
      data = that.extractID(el.id);
      el.classList.forEach(function(className) {
        if(className != 'strips')
        el.classList.remove(className)
      });
      el.classList.add(that.colorParser(that.currentTheme[data.side][data.index]));
      
    })
    //this.activeStrip = null;
    this.setActiveStrip(null);
    this.activeColor = null;
  }

  this.initStrips = function(modelEl) { 
    var that = this;
    this.stripsEl = [];
    modelEl.querySelectorAll('.strips').forEach(
      function(el) {
        that.stripsEl.push(el);
        el.onclick = function(data) {
          that.setActiveStrip(this);
        }
    })
  }

  this.setActiveStrip = function(strip) {
    
    if(strip) {
      strip.classList.add('active');
      this.modelEl.classList.add('focused')
    } else 
    this.modelEl.classList.remove('focused');

    if(this.activeStrip && this.activeStrip != strip)
      this.activeStrip.classList.remove('active')

    this.activeStrip = strip;
    console.log(this.activeStrip);
    this.changeColor();
  }

  this.setActiveColor = function(color) {
    this.activeColor = color;
    console.log(this.activeColor);
    this.changeColor();
  }

  this.extractID = function(id) {
    var data = id.split('.');
    return {
      side : data[0] == 1 ?'l':'r',
      index : data[1]-1,
    }
  }

  this.colorParser = function(colors_code) {
    if(!Array.isArray(colors_code))
      colors_code = [colors_code];
    var config = {
         'r1':'red',
         'g1':'green_light',
         'g2':'green_dark' ,
         'o1':'orange',
         'y1':'yellow',
         'c1':'crimson',
         'c2':'cyclamen',
         'p1':'purple'
       } 

     var colors_name = colors_code.map(function(color_code) {
          if (config[color_code]) return config[color_code];
          else return 'default';
     });
     if (colors_name.length > 1) return colors_name;
     else return colors_name[0];
  }

  this.initStrips(modelEl);
  this.changeTheme(this.currentTheme);

}



/* 
  To be change !
  Add event listeners to colort palete (click, touch...)
   Call: model.setActiveColor(color)

*/
function ColorPicker (model) {
  // Available colors: 
  // "red", "green_light", "green_dark", "orange", "yellow", "crimson", "cyclamen", "purple"
  c_red.onclick = function(e) {
    model.setActiveColor("r1");
  };
  c_green_light.onclick = function(e) {
    model.setActiveColor("g1");
    
  };
  c_green_dark.onclick = function(e) {
    model.setActiveColor("g2");
    
  };
  c_orange.onclick = function(e) {
    model.setActiveColor("o1");
    
  };
  c_yellow.onclick = function(e) {
    model.setActiveColor("y1");
    
  };
  c_crimson.onclick = function(e) {
    model.setActiveColor("c1");
    
  };
  c_cyclamen.onclick = function(e) {
    model.setActiveColor("c2");
    
  };
  c_purple.onclick = function(e) {
    model.setActiveColor("p1");
    
  };

}


M1_config = {
  nr_strips: 7,
  sale_price: {
    price: 0.01,
    currency: 'EUR'
  },
  name: 'Model 1',
  themes: {
    "default": {
      l: ['g2', 'g2', 'g2', 'y1', 'o1', 'c2', 'c2'],
      r: ['g1', 'g1', 'g1', 'o1', 'y1', 'c1', 'c1']
    },
    "test2": {
      l: ['g2', 'g2', 'g2', 'g2', 'g2', 'g2', 'g2'],
      r: ['r1', 'r1', 'r1', 'r1', 'r1', 'r1', 'r1']
    },
    "test3": {
      l: ['r1', 'r1', 'r1', 'r1', 'r1', 'r1', 'r1'],
      r: ['g2', 'g2', 'g2', 'g2', 'g2', 'g2', 'g2']
    }
  }
}



function Cart(cartEl) {

  this.cartEl = cartEl;

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
    size = {
      l: [20.2, 20.3, 50.6, 20.3],
      r: [20.2, 20.3, 50.6, 20.3],
      m: 'cm' || 'inch'
    }
    quantity = 1;


    var item = {
      id: guid(),
      n: model.name,
      q:1, 
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


  // Save order to server
  this.saveOrderDB = function(confirmData) {
    var that = this;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
      }
    };

    var cart_items = [];
    that.items.forEach(function(item){cart_items.push(item)})

    var data = {
      order: {
        amount: that.amount,
        items: cart_items
      }
    }

    xhttp.open("POST", "https://diocletia.hr/test_ajax.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send('order='+JSON.stringify({x:2}));
  }


  // PREPARE PAYMENT

  this.generateItemSKU = function(item_id) {
    var item = this.items.get(item_id);
    var dim = 'l:'+item.s.l.toString()+'r:'+item.s.r.toString()+item.s.m;
    var col = 'l:'+item.c.l.toString()+'r:'+item.c.r.toString();

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
        t.description = that.generateItemSKU(item.id),
        t.sku = item.id, // 'Custom colors',//that.generateItemSKU(item.id)
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
    if(!this.cartEl) return;

    var that = this;
    that.cartEl.innerHTML = '';
    var amountEl = document.createElement('div');
    amountEl.innerText = that.amount.total + that.amount.currency;
    that.cartEl.appendChild(amountEl);


    var itemsEl = []; 
    this.items.forEach(function(item, index) {
      var element = document.createElement('div');
      var image = document.createElement('img');
      
      var iname = document.createElement('div');
      iname.innerText = item.n;
      
      var quantity = document.createElement('input');
      quantity.type = 'number';
      quantity.value = item.q;
      quantity.onchange = function(e) {
        that.updateItem(item.id, {q:quantity.value});
      }

      var remove = document.createElement('button');
      remove.innerText = 'Remove';
      //remove.dataset.id =  index;
      remove.onclick = function() {
        that.removeItem(item.id);
      }
    

      element.appendChild(image);
      element.appendChild(iname);
      element.appendChild(quantity);
      element.appendChild(remove);

      itemsEl.push(element);
    });

    
    itemsEl.forEach(function(item){
      that.cartEl.appendChild(item);
    })
  }

  this.currentCart = this.loadCart();
  
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}



