'use strict';

const request = require('request');
const fs = require('fs');

const SECRET = 'KBez3J8kaIfAr5kqKy5TfxfKP8s';
const API_KEY = '384956938248651';
const CLOUD_NAME = 'dmib180cu';
const cloudinaryOptions = {
  url: `https://${API_KEY}:${SECRET}@api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?max_results=500`
};

const baseUrl = 'http://res.cloudinary.com/dmib180cu/image/upload';
const thumbOptions = 'c_fill,g_auto,h_360,w_360';
const largeOptions = 'c_fill,g_auto,q_auto,h_768,w_1280';
const extension = 'jpg';
const indexUrl = 'src/index.html';
const templateUrl = 'src/index.template.html';

getJSON(cloudinaryOptions)
  .then(response => {
    console.log(response);
    processImages(response.resources);
  })
  .catch(error => {
    console.error(error);
  });

function processImages(images) {

  images = images.map(mapCloudinary);
  fs.readFile(templateUrl, 'utf8', (err, indexContent) => {
    let html = '';
    html = indexContent.replace('{{thumbs}}', reduceImages(images, renderThumb));
    html = html.replace('{{large}}', reduceImages(images, renderLarge));

    fs.writeFile(indexUrl, html, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

}

function mapCloudinary(cloudinaryImage) {
  return cloudinaryImage.public_id;
}

function reduceImages(images, renderer) {
  return images
    .map(renderer)
    .reduce((html, renderedHtml) => {
      return (html += renderedHtml);
    }, '');
}

function renderThumb(imageUrl, index) {
  return `
    <li>
      <a href="#img-${index}"><span class="js-lazy-image" data-src="${baseUrl}/${thumbOptions}/v1492985894/${imageUrl}.${extension}" alt=""></span></a>
    </li>
  `;
}

function renderLarge(imageUrl, index) {
  return `
    <div id="img-${index}" class="Gallery-overlay">
      <span class="Gallery-large js-lazy-image" data-src="${baseUrl}/${largeOptions}/v1492985894/${imageUrl}.${extension}" alt=""></span>
      <a class="Gallery-next" href="#img-${index + 1}"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg></a>
      <a class="Gallery-prev" href="#img-${index - 1}"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg></a>
      <a class="Gallery-close" href="#gallery"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="45" height="45" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;" xml:space="preserve"><g><polygon points="71.936,16.168 50.062,38.041 28.189,16.168 16.167,28.189 38.041,50.062 16.167,71.936 28.189,83.957    50.062,62.084 71.936,83.957 83.957,71.936 62.084,50.062 83.957,28.189  "/></g></svg></a>
    </div>
  `;
}


function getJSON(options) {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      if (response.statusCode !== 200) {
        return reject(response);
      }
      try {
        let json = JSON.parse(body);
        resolve(json);
      } catch (e) {
        reject(e);
      }
    });
  });
}
