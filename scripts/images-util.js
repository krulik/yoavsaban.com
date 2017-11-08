'use strict';

// const SECRET = 'KBez3J8kaIfAr5kqKy5TfxfKP8s';
const SECRET = process.env.CLOUDINARY_SECRET;
// const API_KEY = '384956938248651';
const API_KEY = process.env.CLOUDINARY_API_KEY;
// const CLOUD_NAME = 'dmib180cu';
const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const cloudinaryOptions = {
  url: `https://${API_KEY}:${SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=500`
};

const BASE_URL = 'http://res.cloudinary.com/dmib180cu/image/upload';
const THUMB_OPTIONS = 'c_fill,g_auto,h_360,w_360';
const LARGE_OPTIONS = 'c_fill,g_auto,q_auto,h_768,w_1280';
const SMALL_OPTIONS = 'c_fill,g_auto,h_80,w_80';
const EXTENSION = 'jpg';

module.exports = {
  getSmallUrl: imageUrl => getFullUrl(imageUrl, SMALL_OPTIONS),
  cloudinaryOptions,
  mapCloudinary,
  renderThumb,
  renderLarge
};

function mapCloudinary(cloudinaryImage) {
  return cloudinaryImage.public_id;
}

function renderThumb(imageUrl, index) {
  return `
    <li>
      <a href="#img-${index}"><span class="js-lazy-image" data-src="${getFullUrl(imageUrl, THUMB_OPTIONS)}" alt=""></span></a>
    </li>
  `;
}

function renderLarge(imageUrl, index) {
  return `
    <div id="img-${index}" class="Gallery-overlay">
      <span class="Gallery-large js-lazy-image" data-src="${getFullUrl(imageUrl, LARGE_OPTIONS)}" alt=""></span>
      <a class="Gallery-next" href="#img-${index + 1}"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg></a>
      <a class="Gallery-prev" href="#img-${index - 1}"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg></a>
      <a class="Gallery-close" href="#gallery"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="45" height="45" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><polygon points="71.936,16.168 50.062,38.041 28.189,16.168 16.167,28.189 38.041,50.062 16.167,71.936 28.189,83.957    50.062,62.084 71.936,83.957 83.957,71.936 62.084,50.062 83.957,28.189  "/></g></svg></a>
    </div>
  `;
}

function getFullUrl(imageUrl, options) {
  return `${BASE_URL}/${options}/v1492985894/${imageUrl}.${EXTENSION}`;
}
