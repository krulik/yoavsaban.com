/* globals Velocity, Headroom */
/* jshint -W083, -W098, -W116 */

'use strict';

// var carousel = document.querySelector('.js-swipe');
// carousel.setAttribute('dir', 'ltr');
// var mySwipe = new Swipe(carousel, {
//   startSlide: 0,
//   speed: 400,
//   auto: false,
//   draggable: true,
//   continuous: true,
//   disableScroll: false,
//   stopPropagation: false,
//   callback: function (index, elem, dir) { },
//   transitionEnd: function (index, elem) { }
// });

// var prev = document.querySelector('.js-swipe-prev');
// var next = document.querySelector('.js-swipe-next');

// prev.addEventListener('click', mySwipe.prev);
// next.addEventListener('click', mySwipe.next);


const nav = document.querySelector('.MainNav');
const element = document.querySelector('.Hero-element');
const hero = document.querySelector('.Hero');

const headroom = new Headroom(nav);
headroom.init();

const navLinks = nav.querySelectorAll('.MainNav-list a');
for (const navLink of navLinks) {
  navLink.addEventListener('click', e => {
    e.preventDefault();
    const selector = e.target.getAttribute('href');
    scrollToTarget(document.querySelector(selector));
    requestAnimationFrame(() => {
      document.location.hash = selector;
    });
  });
}
window.addEventListener('scroll', e => {
  requestAnimationFrame(() => {
    const percent = window.scrollY / document.documentElement.clientHeight;
    Velocity(hero, {
      blur: percent*10
    }, {
      duration: 0,
      delay: 0
    });
    Velocity(element, {
      top: `-${percent*1000}px`,
      blur: percent*0.5
    }, {
      duration: 0,
      delay: 0
    });
  });
});

function scrollToTarget(target) {
  Velocity(target, 'scroll', {
    duration: 600,
    delay: 0,
    easing: 'ease',
    offset: -125
  });
}

document.addEventListener('click', hide);
document.addEventListener('keyup', e => {
	if (e.key === 'Escape') hide(e);
	if (isImageOpen() && e.key.startsWith('Arrow')) {
		const num = document.location.hash.replace('#img-', '');
		const func = e.key.endsWith('Right') ? add : e.key.endsWith('Left') ? substract : noop;
		document.location.hash = document.location.hash.replace(num, func(Number(num), 1));
	}
});

function hide(e) {
	if (isImageOpen() && isClickedOutside(e)) {
		requestAnimationFrame(() => document.location.hash = '#id-gallery');
	}
}

function noop() {}
function add(a, b) { return a + b; }
function substract(a, b) { return a - b; }
function isImageOpen() { return document.location.hash.startsWith('#img-'); }
function isClickedOutside(e) { return !isImage(e.target); }
function isImage(element) { return element.tagName ==='IMG' && element.closest('[id^=img-]') !== null; }
