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

// Whatsapp
// --------------------------------------------------------------
// if (typeof IntersectionObserver !== 'undefined') {
//   let whatsappButton = document.querySelector('.Whatsapp');
//   let observer = new IntersectionObserver((entries) => {
//     entries.forEach(ent => {
//       if (ent.isIntersecting) {
//         whatsappButton.classList.add('is-hidden');
//       } else {
//         whatsappButton.classList.remove('is-hidden');
//       }
//     })
//   });

//   observer.observe(document.querySelector('.Contact'));
// }

// Video
// --------------------------------------------------------------
let cl = cloudinary.Cloudinary.new({cloud_name: 'dmib180cu'});
const CLIP_URL = 'https://res.cloudinary.com/dmib180cu/video/upload/c_scale,vc_auto,w_1024/v1564144711/clip_m50wec.mp4';
let play = document.querySelector('.js-play');
let close = document.querySelector('.js-close');
let video = document.querySelector('.js-video');
let videoActual = document.querySelector('video');

if (!isMobile()) {
  setupVideo();
}

function setupVideo() {
  videoActual.src = CLIP_URL;
  videoActual.addEventListener('canplaythrough', e => {
    videoActual.removeAttribute('hidden');
    window.addEventListener('scroll', onScrollFadeOut);
    play.addEventListener('click', onVideoOpen);
    close.addEventListener('click', onVideoClose);
  });
}

function onVideoOpen(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.target.closest('.js-close')) {
    return;
  }
  setFullVideo();
  ga('send', 'event', 'Video', 'play');
  window.removeEventListener('scroll', onScrollFadeOut);
  window.addEventListener('scroll', onScrollSmall);
}

function onScrollFadeOut(e) {
  // TODO shouldn't happen
  if (video.classList.contains('is-small')) {
    window.removeEventListener('scroll', onScrollFadeOut);
    return;
  }
  let opacity = 1 - window.scrollY / 2000;
  if (opacity < 0) {
    videoActual.pause();
    return;
  } else if (videoActual.paused) {
    videoActual.play();
  }
  videoActual.style.opacity = 1 - window.scrollY / 2000;
}

function onScrollSmall(e) {
  if (isMobile()) {
    return;
  }
  setSmallVideo();
  if (window.scrollY === 0) {
    video.classList.add('is-snap');
    setFullVideo();
    setTimeout(() => {
      video.classList.remove('is-snap');
    }, 500);
  }
}
function setFullVideo() {
  video.classList.remove('Hero');
  video.classList.add('Video');
  video.classList.add('is-full');
  video.classList.remove('is-small');
  videoActual.muted = false;
  videoActual.controls = true;
}

function setSmallVideo() {
  video.classList.remove('is-full');
  video.classList.add('is-small');
}

function onVideoClose(e) {
  videoActual.muted = true;
  videoActual.controls = false;
  video.classList.remove('Video');
  video.classList.add('Hero');
  video.classList.remove('is-full');
  video.classList.remove('is-small');
  window.removeEventListener('scroll', onScrollSmall);
  window.addEventListener('scroll', onScrollFadeOut);
}

// Scroll
// --------------------------------------------------------------
let navList = document.querySelector('.MainNav-list');
let navToggle = document.querySelector('.MainNav-toggle');
let scrollToLinks = document.querySelectorAll('.js-scrollTo');
for (let scrollToLink of scrollToLinks) {
  scrollToLink.addEventListener('click', e => {
    e.preventDefault();
    navList.classList.remove('is-open');
    let scrollTo = e.currentTarget.getAttribute('href');
    let selector = `[name=${scrollTo.replace('#', '')}]`;
    let target = document.querySelector(selector);
    scrollToTarget(target).then(() => {
      requestAnimationFrame(() => {
        document.location.hash = scrollTo;
      });
    });
  });
}
// Mobile Menu
navToggle.addEventListener('click', onMobileMenuOpen);

function onClickAnywhere(e) {
  if (
    e.target.closest('.MainNav-list') ||
    e.target.closest('.MainNav-toggle')
  ) {
    return;
  }
  if (navList.classList.contains('is-open')) {
    closeMobileMenu();
  }
}

function closeOnScroll(e) {
  if (navList.classList.contains('is-open')) {
    closeMobileMenu();
  }
}

function onMobileMenuOpen(e) {
  e.preventDefault();
  if (navList.classList.contains('is-open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function openMobileMenu() {
  navList.classList.add('is-open');
  setTimeout(() => {
    window.addEventListener('scroll', closeOnScroll);
    document.addEventListener('click', onClickAnywhere);
  }, 1000);
}

function closeMobileMenu() {
  navList.classList.remove('is-open');
  window.removeEventListener('scroll', closeOnScroll);
  document.removeEventListener('click', onClickAnywhere);
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
  let style = window.getComputedStyle(el.closest('.Music-mix'));
  if (style.getPropertyValue('display') !== 'none') {
    el.innerHTML = `<iframe src='${el.dataset.src}' height='${
      el.dataset.height
    }' frameborder='0'></iframe>`;
  }
}

// Gallery
// --------------------------------------------------------------
forEach(document.querySelectorAll('.js-lazy-image'), loadLazyImage);
document.addEventListener('click', hide);
document.addEventListener('keyup', e => {
  if (e.key === 'Escape') hide(e);
  if (isImageOpen() && e.key.startsWith('Arrow')) {
    let num = document.location.hash.replace('#img-', '');
    let func = e.key.endsWith('Right')
      ? add
      : e.key.endsWith('Left')
      ? substract
      : noop;
    document.location.hash = document.location.hash.replace(
      num,
      func(Number(num), 1)
    );
  }
});

function loadLazyImage(el, i) {
  let src = el.dataset.src;
  let img = document.createElement('img');
  img.addEventListener('load', e => {
    requestAnimationFrame(() => {
      el.insertAdjacentElement('afterend', img);
      el.parentNode.removeChild(el);
      img.removeAttribute('width');
      img.removeAttribute('height');
    });
  });
  img.src = src;
  img.width = 80;
  img.height = 80;
  img.className = el.className;
}

function hide(e) {
  if (isImageOpen() && isClickedOutside(e)) {
    requestAnimationFrame(() => (document.location.hash = '#id-gallery'));
  }
}

function noop() {}
function add(a, b) {
  return a + b;
}
function substract(a, b) {
  return a - b;
}
function isImageOpen() {
  return document.location.hash.startsWith('#img-');
}
function isClickedOutside(e) {
  return !isImage(e.target) && !isImageControl(e.target);
}
function isClickedImage(e) {
  return isImage(e.target);
}
function isImageControl(element) {
  return (
    element.closest('svg') !== null ||
    element.classList.contains('Gallery-next') ||
    element.classList.contains('Gallery-prev')
  );
}
function isImage(element) {
  return element.tagName === 'IMG' && element.closest('[id^=img-]') !== null;
}

function isMobile() {
  return window.innerWidth < 800;
}
