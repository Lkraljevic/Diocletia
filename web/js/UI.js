const basePath = '';


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

    // HAH FIX, to restore state of the cart and to hide request form
    var form = cartEL.querySelector('.cart_request_form');
    var body = cartEL.querySelector('.card__body');
    if(body) body.classList.remove('hidden');
    if(form) form.classList.add('hidden');


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

var header = document.querySelector('.sticky_header header');
var headerTitle = document.querySelectorAll('.sticky_header .header__title')[0];
var logo = document.querySelectorAll('.sticky_header .logo')[0];
var topBG = document.querySelectorAll('.sticky_header .top-background')[0];
var desktopNav = document.querySelectorAll('.sticky_header .container.nav--desktop')[0];


function onScroll() {
    // This 100 refers to min height of header before we remove sticky
    var range = 200;

    if (logo && desktopNav)
        if (window.pageYOffset >= header.offsetHeight - 80) {
            logo.classList.remove('sticky');
            desktopNav.classList.remove('sticky');
        } else {
            logo.classList.add('sticky');
            desktopNav.classList.add('sticky');
        }

    if (topBG) {
        if (window.pageYOffset >= header.offsetHeight + 35) topBG.classList.remove('sticky');
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
onClick('.link-terms', goToLocation('/terms/'));


onClick('.link-sizeguide', showSizeGuide);



onClick('.link-products', scrollToProducts);
function scrollToProducts() {
    var target = document.getElementById('choose-model');
        if (target) {
            var scroll = new SmoothScroll();
            scroll.init({ offset: 0 })
            scroll.animateScroll(target);
        } else {
            goToLocation('/#choose-model')();
        }
    
}


onClick('.apply-coupon', function(){
    var codeInput = document.getElementById('promo-code');
    if(!cart || !codeInput) return;
    if(codeInput.value)
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

onClick('#model-I-href', goToLocation('/models/#model-I'));
onClick('#model-II-href', goToLocation('/models/#model-II'));
onClick('#model-III-href', goToLocation('/models/#model-III'));
onClick('#model-IV-href', goToLocation('/models/#model-IV'));




/* MODAL */



closePopup = function () {
    var modal = document.getElementById('modal-popup');
    modal.style.display = "none";
}

openPopup = function (msg) {
    var modal = document.getElementById('modal-popup');
    if(modal) {
        modal.style.display = "block";

        var span = modal.querySelector("div.close");
        span.onclick = function() {
            modal.style.display = "none";
        }
        if(msg) {
            var p = modal.querySelector('p');
            p.innerHTML = msg;
        }
    }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('modal-popup');
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}




// CART SEND REQUEST

// Form buttons
// card-send-request
// cart-request-cancel
var cartEL = document.getElementById('cart-modal');
var request_cart_btn = document.getElementById('cart-sendRequest');

var cancelRequest = document.getElementById('cart-request-cancel');
if(cancelRequest)
 cancelRequest.onclick = function(e) {
    e.preventDefault();
    var form = cartEL.querySelector('.cart_request_form');
    var body = cartEL.querySelector('.card__body');
    if(body) body.classList.remove('hidden');
    if(form) form.classList.add('hidden');
}


var sendlRequest = document.getElementById('card-send-request');
if(sendlRequest)
    sendlRequest.onclick = function(e) {
    event.preventDefault();
    grecaptcha.execute();
}




request_cart_btn.onclick = function(){
    var form = cartEL.querySelector('.cart_request_form');
    var body = cartEL.querySelector('.card__body');
    if(body) body.classList.add('hidden');
    if(form) form.classList.remove('hidden');
}



var contact_submit = document.getElementById('contact_submit');

if(contact_submit)
contact_submit.onclick = function(event) {
    event.preventDefault();
    grecaptcha.execute();
}

function cart_onSubmitRequest(response) {
    var cartForm = document.forms['cart-form'];
    var name = cartForm["name"].value;
    var email = cartForm["email"].value;
    var subject = cartForm["subject"].value;
    var message = cartForm["message"].value;

    console.log({
        formData: { name,email,subject,message },
        response: response
    })

    var cart_items = [];
    cart.items.forEach(function(item){cart_items.push(item)});

    submitOrder({
        formData: { name,email,subject,message },
        response: response,
        order: {
            amount: cart.amount,
            items: cart_items
        }
    });
} 
 function submitOrder(data) {

    var that = this;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var responseText = JSON.parse(this.responseText);
        if(responseText.success) {
            cart.clearCart();
            alert('Request sent');
            var form = cartEL.querySelector('.cart_request_form');
            var body = cartEL.querySelector('.card__body');
            if(body) body.classList.remove('hidden');
            if(form) form.classList.add('hidden');
        }
      }
    };
    
    xhttp.open("POST", "https://diocletia.hr/save_request.php", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(data));
 }