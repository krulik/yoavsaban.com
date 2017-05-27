/* globals Velocity, Headroom */
/* jshint -W083, -W098, -W116 */

'use strict';

// TODO
// --------------------------------------------------------------
// Links active state flash
// Vector images
// Hero image jump on scroll

// Gallery
// - hide on scroll
// - swipe
// - image loading

// Dancers
// - Mask images

// Menu
// - Height should be like mix cloud
// - Black border like mix cloud
// - Nav close timing
// - Horizontal padding like section
// - Vertical padding like section


// Contact
// - More space below title
// - Less space between icon labels

// Swipe
// --------------------------------------------------------------
// const carousel = document.querySelector('.js-swipe');
// carousel.setAttribute('dir', 'ltr');
// const mySwipe = new Swipe(carousel, {
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

// Dancers
// --------------------------------------------------------------
forEach(document.querySelectorAll('.js-more'), more => {
  hideEl(more);
  var moreTrigger = document.createElement('a');
  moreTrigger.href = '';
  moreTrigger.textContent = more.getAttribute('aria-label');
  more.insertAdjacentElement('afterend', moreTrigger);
  moreTrigger.addEventListener('click', e => {
    e.preventDefault();
    showEl(more);
    hideEl(moreTrigger);
  });
});

function forEach(arrayLike, fn) {
  return [].forEach.call(arrayLike, fn);
}

function hideEl(el) {
  el.setAttribute('hidden', 'hidden');
}

function showEl(el) {
  el.removeAttribute('hidden');
}

// Mix
// --------------------------------------------------------------
forEach(document.querySelectorAll('.js-lazy-mix'), loadLazyMix);

function loadLazyMix(el) {
  el.innerHTML = `<iframe src="${el.dataset.src}" height="${el.dataset.height}" frameborder="0"></iframe>`;
}

// Gallery
// --------------------------------------------------------------
forEach(document.querySelectorAll('.js-lazy-image'), loadLazyImage);
document.addEventListener('click', hide);
document.addEventListener('keyup', e => {
	if (e.key === 'Escape') hide(e);
	if (isImageOpen() && e.key.startsWith('Arrow')) {
		const num = document.location.hash.replace('#img-', '');
		const func = e.key.endsWith('Right') ? add : e.key.endsWith('Left') ? substract : noop;
		document.location.hash = document.location.hash.replace(num, func(Number(num), 1));
	}
});

function loadLazyImage(el) {
  var src = el.dataset.src;
  var img = document.createElement('img');
  img.addEventListener('load', e => {
    el.insertAdjacentElement('afterend', img);
    el.parentNode.removeChild(el);
  });
  img.src = src;
  img.className = el.className;
}

function hide(e) {
	if (isImageOpen() && isClickedOutside(e)) {
		requestAnimationFrame(() => document.location.hash = '#id-gallery');
	}
}

function noop() {}
function add(a, b) { return a + b; }
function substract(a, b) { return a - b; }
function isImageOpen() { return document.location.hash.startsWith('#img-'); }
function isClickedOutside(e) {
  return !isImage(e.target) && !isImageControl(e.target);
}
function isClickedImage(e) {
  return isImage(e.target);
}
function isImageControl(element) { return element.closest('svg') !== null || element.classList.contains('Gallery-next') || element.classList.contains('Gallery-prev'); }
function isImage(element) { return element.tagName ==='IMG' && element.closest('[id^=img-]') !== null; }
