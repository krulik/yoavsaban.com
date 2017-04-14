/* globals Velocity, Headroom */
/* jshint -W083, -W098, -W116 */

'use strict';

// TODO
// Gallery hide on scroll
// Gallery hide on mobile tap
// Gallery swipe
// Nav close timing

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

// Scroll
// --------------------------------------------------------------
const scrollToLinks = document.querySelectorAll('.js-scrollTo');
for (const scrollToLink of scrollToLinks) {
  scrollToLink.addEventListener('click', e => {
    e.preventDefault();
    const scrollTo = e.currentTarget.getAttribute('href');
    const selector = `[name=${scrollTo.replace('#', '')}]`;
    const target = document.querySelector(selector);
    scrollToTarget(target)
      .then(() => {
        requestAnimationFrame(() => {
          document.location.hash = scrollTo;
        });
      });
  });
}

function scrollToTarget(target) {
  return Velocity(target, 'scroll', {
    duration: 600,
    delay: 0,
    easing: 'ease'
  });
}

// Gallery
// --------------------------------------------------------------
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
