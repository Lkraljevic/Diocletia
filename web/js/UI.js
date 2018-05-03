const basePath = '/web';


/* Mobile navigation @Dražen Barić */
var clicked = false;
var icon = document.getElementsByClassName('nav-mobile__icon')[0];
var menu = document.getElementsByClassName('menu')[0];
var header = document.getElementsByTagName('header')[0];
var hTitle = document.getElementsByClassName('header__title')[0]

icon.addEventListener('click', function () {
    if (clicked) {
        icon.classList.remove('nav-mobile__icon--active')
        menu.classList.remove('menu--visible')
    } else {
        icon.classList.add('nav-mobile__icon--active')
        menu.classList.add('menu--visible')
    }
    clicked = !clicked;
});



/* Toggle Cart */
var cart_btn = document.getElementById('cart-btn');
cart_btn.onclick = showCart;

var cart_controls = document.querySelectorAll('.cart__controls a');
cart_controls.forEach(function (anchor) {
    anchor.onclick = hideCart;
});

function hideCart() {
    var cart_notification = document.getElementById('cart-notification');
    if (cart_notification)
        cart_notification.classList.remove('new-item');

    var cart_modal = document.getElementById('cart-modal');
    if (cart_modal)
        cart_modal.classList.add('modal-hidden');
}
function showCart() {
    var cart_notification = document.getElementById('cart-notification');
    if (cart_notification)
        cart_notification.classList.remove('new-item');

    var cart_modal = document.getElementById('cart-modal');
    if (cart_modal)
        cart_modal.classList.remove('modal-hidden');
}


/* Sticky Header */

window.onscroll = function () {
    onScroll()
};

var header = document.querySelector('header');
var headerTitle = document.querySelectorAll('.header__title')[0];
var logo = document.querySelectorAll('.logo')[0];
var topBG = document.querySelectorAll('.top-background')[0];
var desktopNav = document.querySelectorAll('.container.nav--desktop')[0];


function onScroll() {
    // This 100 refers to min height of header before we remove sticky
    var range = 200;

    if (logo && desktopNav)
        if (window.pageYOffset >= header.offsetHeight - 100) {
            logo.classList.remove('sticky');
            desktopNav.classList.remove('sticky');
        } else {
            logo.classList.add('sticky');
            desktopNav.classList.add('sticky');
        }

    if (topBG) {
        if (window.pageYOffset >= header.offsetHeight + 150) topBG.classList.remove('sticky');
        else topBG.classList.add('sticky');
    }

    if (headerTitle) {
        offset = header.offsetHeight / 2,
            calc = 1 - (window.pageYOffset - offset + range) / range;
        headerTitle.style.opacity = calc;

        if (calc > 1) headerTitle.style.opacity = 1;
        else if (calc < 0) headerTitle.style.opacity = 0;
    }

}



/* DIV AS LINKS */
/* This will be used on all pages except models page */

var M1link = document.getElementById("model-I-href");
if (M1link)
    M1link.onclick = function () {
        window.location = "./models/#model-I";
        return false;
    }
var M2link = document.getElementById("model-II-href");
if (M2link)
    M2link.onclick = function () {
        window.location = "./models/#model-II";
        return false;
    }
var M3link = document.getElementById("model-III-href");
if (M3link)
    M3link.onclick = function () {
        window.location = "./models/#model-III";
        return false;
    }
var M4link = document.getElementById("model-IV-href");
if (M4link)
    M4link.onclick = function () {
        window.location = "./models/#model-IV";
        return false;
    }

/* NAVIGATION */

/* TO Products JUST SCROLL */
// var productsNavFooter = document.getElementById('products_nav_footer');
// var productsNavHeaderD = document.getElementById('products_nav_header_d');
// var productsNavHeaderM = document.getElementById('products_nav_header_m');
// if (productsNavHeaderD) {
//     productsNavHeaderD.onclick = function () {
//         var target = document.getElementById('choose-model');
//         if (target) {
//             var scroll = new SmoothScroll();
//             scroll.init({ offset: 0 })
//             scroll.animateScroll(target);
//         }
//     }
// }
// if (productsNavHeaderM) {
//     productsNavHeaderM.onclick = function () {
//         var target = document.getElementById('choose-model');
//         if (target) {
//             var scroll = new SmoothScroll();
//             scroll.init({ offset: 0 })
//             scroll.animateScroll(target);
//         }
//     }
// }
// if (productsNavFooter) {
//     productsNavFooter.onclick = function () {
//         var target = document.getElementById('choose-model');
//         if (target) {
//             var scroll = new SmoothScroll();
//             scroll.init({ offset: 0 })
//             scroll.animateScroll(target);
//         }
//     }
// }

/* Size guide */



document.querySelectorAll('.size-guide-link').forEach(function(el){
    el.onclick = showSizeGuide;
});

// 1) Render size guide
var sizeGuideHTML = Handlebars.templates["size-guide"]();
var sizeModal = document.getElementById('size-modal');
if(sizeModal) {
    sizeModal.innerHTML = sizeGuideHTML;
    var guide_control = document.querySelectorAll('.guide__header .close-button');
    guide_control.forEach(function (el) {
        el.onclick = hideSizeGuide;
    });
}
   

function hideSizeGuide() {
    var size_modal = document.getElementById('size-modal');
    if (size_modal)
        size_modal.classList.add('modal-hidden');
}
function showSizeGuide() {

    var size_modal = document.getElementById('size-modal');
    if (size_modal)
        size_modal.classList.remove('modal-hidden');
}




function goToLocation(location) {
    return function() {
        if(window.location.pathname != basePath+location)
            window.location = basePath+location;
    }
}

function onClick(elementSelector, clickHandlert) {
    document.querySelectorAll(elementSelector).forEach(function(el){
        el.onclick = clickHandlert;
    });
}



// MENU 
onClick('.link-home', goToLocation('/'));
onClick('.link-about', goToLocation('/about/'));
onClick('.link-contact', goToLocation('/contact/'));


function scrollToProducts() {
    var target = document.getElementById('choose-model');
        if (target) {
            var scroll = new SmoothScroll();
            scroll.init({ offset: 0 })
            scroll.animateScroll(target);
        }
}

onClick('.link-products', scrollToProducts);



onClick('.apply-coupon', function(){
    var codeInput = document.getElementById('promo-code');
    if(!cart || !codeInput) return;
    cart.updateDiscount(validateCoupon(codeInput.value));
});



function validateCoupon(code) {
    var coupons = {
       'Test': {
           quantity:1,
           value: -89.9
        },
     }
     return {
       value: coupons[code].value,
       quantity:coupons[code].quantity,
       code: code
     }
   }