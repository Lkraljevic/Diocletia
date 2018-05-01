/* Mobile navigation @Dražen Barić */
// var clicked = false;
// var icon = document.getElementsByClassName('nav-mobile__icon')[0];
// var menu = document.getElementsByClassName('menu')[0];
// var header = document.getElementsByTagName('header')[0];
// var hTitle = document.getElementsByClassName('header__title')[0]

// icon.addEventListener('click', function () {
//   if (clicked) {
//     icon.classList.remove('nav-mobile__icon--active')
//     menu.classList.remove('menu--visible')
//   } else {
//     icon.classList.add('nav-mobile__icon--active')
//     menu.classList.add('menu--visible')
//   }
//   clicked = !clicked;
// });



/* Toggle Cart */
var cart_btn = document.getElementById('cart-btn');
cart_btn.onclick = showCart;

var cart_controls = document.querySelectorAll('.cart__controls a');
cart_controls.forEach(function(anchor){
    anchor.onclick = hideCart;
});

function hideCart() {
    var cart_modal = document.getElementById('cart-modal');
    if(cart_modal)
        cart_modal.classList.add('modal-hidden');
} 
function showCart() {
    var cart_modal = document.getElementById('cart-modal');
    if(cart_modal)
        cart_modal.classList.remove('modal-hidden');
}


Handlebars.registerHelper('modelpreview', function() {
    var item = this;
    var svg_model = false; 
    switch(item.code) {
        case 'M1':
          svg_model = M1El.cloneNode(true);
        break;
        case 'M2':
          svg_model = M2El.cloneNode(true);
        break;
        case 'M3':
          svg_model = M3El.cloneNode(true);
        break;
        case 'M4':
          svg_model = M4El.cloneNode(true);
        break;
        default:
            svg_model = null;
    }
    
    if(!svg_model) return '';
    
    svg_model.querySelectorAll('.strips').forEach(function(el) {
        data = extractID(el.id);
        el.classList.forEach(function(className) {
            if (className != 'strips') el.classList.remove(className)
        });     
       el.classList.add(colorParser(item.c[data.side][data.index]));
    });    
  
    return new Handlebars.SafeString(svg_model.innerHTML);
});

Handlebars.registerHelper('modelTotal', function() {
    return this.p.price * this.q;
});


Handlebars.registerHelper('itemSize', function() {
    return this.p.price * this.q;
});





function colorParser(colors_code) {
    if (!Array.isArray(colors_code))
    colors_code = [colors_code];
    var config = {
        'r1': 'red',
        'g1': 'green_light',
        'g2': 'green_dark',
        'o1': 'orange',
        'y1': 'yellow',
        'c1': 'crimson',
        'c2': 'cyclamen',
        'p1': 'purple'
    }

    var colors_name = colors_code.map(function(color_code) {
        if (config[color_code]) return config[color_code];
        else return 'default';
    });
    if (colors_name.length > 1) return colors_name;
    else return colors_name[0];
}

function extractID(id) {
    var data = id.split('.');
    return {
        side: data[0] == 1 ? 'l' : 'r',
        index: data[1] - 1,
    }
}