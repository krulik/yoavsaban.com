'use strict';

const imagesUtil = require('./images-util');

module.exports = {
  renderDancer
};

function renderDancer(dancer) {
  return `
    <li>
      <span><img src="${getImage(dancer.image)}" alt="" /></span>
      <blockquote>
        <cite aria-hidden="${!dancer.title ? 'true' : 'false'}">${dancer.title}</cite>
        <div><!--
          --><p>${dancer.lead}</p><!--
        --></div>
        <div class="Dancers-more js-more" aria-label="עוד"><!--
          ${renderMore(dancer.more)}
        --></div>
      </blockquote>
    </li>`;
}

function renderMore(more) {
  return more.map(p => `
    --><p>${p}</p><!--
  `).join('');
}

function getImage(dancerImage) {
  return dancerImage ? imagesUtil.getSmallUrl(dancerImage) : 'images/generic_couple.png';
}
