'use strict';

const fs = require('fs');
const request = require('request');
const imagesUtil = require('./images-util');
const dancersList = require('./dancers-list');
const dancersUtil = require('./dancers-util');
const indexUrl = 'src/index.html';
const templateUrl = 'src/index.template.html';

getJSON(imagesUtil.cloudinaryOptions)
  .then(response => {
    console.log(response);
    processTemplate(response.resources, dancersList);
  })
  .catch(error => {
    console.error(error);
  });

function processTemplate(imagesList, dancersList) {
  imagesList = imagesList
    .filter(imagesUtil.filter)
    .map(imagesUtil.mapCloudinary);

  fs.readFile(templateUrl, 'utf8', (err, indexContent) => {
    let html = '';
    html = indexContent.replace('{{thumbs}}', imagesList.map(imagesUtil.renderThumb).join(''));
    html = html.replace('{{large}}', imagesList.map(imagesUtil.renderLarge).join(''));
    html = html.replace('{{dancers}}', dancersList.map(dancersUtil.renderDancer).join(''));
    fs.writeFile(indexUrl, html, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
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
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
  });
}
