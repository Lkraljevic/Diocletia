var slides = document.querySelectorAll('.slider--small > div');
var next = document.querySelectorAll('.slider__icon.slider__icon--right')[0];
var prev = document.querySelectorAll('.slider__icon.slider__icon--left')[0];

if(next) 
next.onclick = function() {
    console.log('Next Slide')
    nextSlide();
    clearInterval(cycleInterval);
}
if(prev) 
prev.onclick = function() {
    console.log('Prev Slide')
    prevSlide();
    clearInterval(cycleInterval);
}

var startIndex = 0;
var endIndex = slides.length-1;
var currentIndex = 0;

function nextSlide() {
    if(currentIndex >= endIndex)
        currentIndex = 0;
    else
        currentIndex ++;
    updateSlide(currentIndex)
}

function prevSlide() {
    if(currentIndex <= startIndex)
        currentIndex = startIndex;
    else
        currentIndex --;

    updateSlide(currentIndex)
}

function updateSlide(index) {
    slides.forEach(function(el, i){
        if(i == index) el.classList.add('show');
        else el.classList.remove('show');
    });
}

function cycleBackgrounds() {
    
   var cycleInterval =  setInterval(function () {
        nextSlide();
    }, 5000);
    return cycleInterval;
};
 

var cycleInterval = cycleBackgrounds();