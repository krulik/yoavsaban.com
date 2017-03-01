var carousel = document.querySelector('.js-swipe');
carousel.setAttribute('dir', 'ltr');
var mySwipe = new Swipe(carousel, {
  startSlide: 0,
  speed: 400,
  auto: 3000,
  draggable: true,
  continuous: true,
  disableScroll: false,
  stopPropagation: false,
  callback: function (index, elem, dir) { },
  transitionEnd: function (index, elem) { }
});

var prev = document.querySelector('.js-swipe-prev');
var next = document.querySelector('.js-swipe-next');

prev.addEventListener('click', mySwipe.prev);
next.addEventListener('click', mySwipe.next);
