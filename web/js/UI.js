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
    var cart_notification = document.getElementById('cart-notification');
    if(cart_notification)
      cart_notification.classList.remove('new-item');
        
    var cart_modal = document.getElementById('cart-modal');
    if(cart_modal)
        cart_modal.classList.add('modal-hidden');
} 
function showCart() {
    var cart_notification = document.getElementById('cart-notification');
    if(cart_notification)
      cart_notification.classList.remove('new-item');
      
    var cart_modal = document.getElementById('cart-modal');
    if(cart_modal)
        cart_modal.classList.remove('modal-hidden');
}


/* Sticky Header */

window.onscroll = function() {onScroll()};
  
  var header = document.querySelector('header');
  var headerTitle = document.querySelectorAll('.header__title')[0];
  var logo = document.querySelectorAll('.logo')[0];
  var topBG = document.querySelectorAll('.top-background')[0];
  var desktopNav = document.querySelectorAll('.container.nav--desktop')[0];
  
  
  function onScroll() {
    // This 100 refers to min height of header before we remove sticky
    var range = 200;

    if(logo && desktopNav)
    if(window.pageYOffset >= header.offsetHeight - 100) {
        logo.classList.remove('sticky');
        desktopNav.classList.remove('sticky');
    } else {
      logo.classList.add('sticky');
      desktopNav.classList.add('sticky');
    }

    if(topBG) {
        if(window.pageYOffset >= header.offsetHeight+150) topBG.classList.remove('sticky');
        else topBG.classList.add('sticky');
    }

    if(headerTitle) {
        offset = header.offsetHeight / 2,
        calc = 1 - (window.pageYOffset - offset + range) / range;
        headerTitle.style.opacity = calc;
          
        if (calc > 1) headerTitle.style.opacity = 1;
        else if ( calc < 0 ) headerTitle.style.opacity = 0;
    }
        
    
    
}



/* DIV AS LINKS */

var M1link = ocument.getElementById("model-I-href");
if(M1link)
M1link.onclick = function() {
    window.location = "./models/#model-I";
    return false;
}
var M2link = ocument.getElementById("model-II-href");
if(M2link)
M2link.onclick = function() {
    window.location = "./models/#model-II";
    return false;
}
var M3link = ocument.getElementById("model-III-href");
if(M3link)
M3link.onclick = function() {
    window.location = "./models/#model-III";
    return false;
}
var M4link = ocument.getElementById("model-IV-href");
if(M4link)
M4link.onclick = function() {
    window.location = "./models/#model-IV";
    return false;
}