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
// let carousel = document.querySelector('.js-swipe');
// carousel.setAttribute('dir', 'ltr');
// let mySwipe = new Swipe(carousel, {
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

// let prev = document.querySelector('.js-swipe-prev');
// let next = document.querySelector('.js-swipe-next');

// prev.addEventListener('click', mySwipe.prev);
// next.addEventListener('click', mySwipe.next);

// Analytics
// --------------------------------------------------------------
// https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
// https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications
// https://developers.google.com/analytics/devguides/collection/analyticsjs/screens
// https://developers.google.com/analytics/devguides/collection/analyticsjs/events

// Video
// --------------------------------------------------------------
let play = document.querySelector('.js-play');
let close = document.querySelector('.js-close');
let video = document.querySelector('.js-video');
let videoActual = document.querySelector('video');
let navBtnSelector = document.querySelector(".MainNav-toggle");
let navSelector = document.querySelector(".MainNav-list");
play.addEventListener('click', e => {
  e.preventDefault();
  e.stopImmediatePropagation();
  setFullVideo();
  videoActual.play();
  ga('send', 'event', 'Video', 'play');
	window.addEventListener('scroll', onScroll);
});
close.addEventListener('click', e => {
  closeVideo();
});
function onScroll(e) {
  setScrollVideo();
  if (window.scrollY === 0 && !video.classList.contains('is-hidden')) {
    video.classList.add('is-snap');
    setTimeout(() => {
      video.classList.remove('is-snap');
    }, 500);
    setFullVideo();
  }
}
function setFullVideo() {
  video.classList.add('is-full');
  video.classList.remove('is-hidden');
  video.classList.remove('is-scroll');
}
function closeVideo() {
  video.classList.add('is-hidden');
	setTimeout(() => {
		video.classList.remove('is-full');
    video.classList.remove('is-scroll');
    window.removeEventListener('scroll', onScroll);
	}, 500);
}
function setScrollVideo() {
  video.classList.add('is-scroll');
	video.classList.remove('is-full');
}

// Scroll
// --------------------------------------------------------------
let scrollToLinks = document.querySelectorAll('.js-scrollTo');
for (let scrollToLink of scrollToLinks) {
  scrollToLink.addEventListener('click', e => {
    e.preventDefault();
    navSelector.classList.remove('isOpen');
    let scrollTo = e.currentTarget.getAttribute('href');
    let selector = `[name=${scrollTo.replace('#', '')}]`;
    let target = document.querySelector(selector);
    scrollToTarget(target)
      .then(() => {
        requestAnimationFrame(() => {
          document.location.hash = scrollTo;
        });
      });
  });
}


document.addEventListener("click", function(event) {
if (event.target.closest(".MainNav-list")) return;
if(event.target.closest(".MainNav-toggle")) return;
if(event.target.closest(".MainNav")) return;
if(navSelector.classList.contains("isOpen")) {
  navSelector.classList.remove('isOpen');
}
});


navBtnSelector.addEventListener('click' , (e) => {
  e.preventDefault();
  if(navSelector.classList.contains("isOpen")) {
    navSelector.classList.remove('isOpen');
  } else {
    navSelector.classList.add('isOpen');
  }
});


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
  let moreTrigger = document.createElement('a');
  moreTrigger.classList.add('Dancers-more-trigger');
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
		let num = document.location.hash.replace('#img-', '');
		let func = e.key.endsWith('Right') ? add : e.key.endsWith('Left') ? substract : noop;
		document.location.hash = document.location.hash.replace(num, func(Number(num), 1));
	}
});

function loadLazyImage(el) {
  let src = el.dataset.src;
  let img = document.createElement('img');
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
