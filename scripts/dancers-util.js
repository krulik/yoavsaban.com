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
        ${renderMoreBlock(dancer.more)}
      </blockquote>
    </li>`;
}

function renderMoreBlock(more) {
  return more.length ? `
    <div class="Dancers-more js-more" aria-label="עוד"><!--
      ${renderMore(more)}
    --></div>
  ` : '';
}

function renderMore(more) {
  return more.map(p => `
    --><p>${p}</p><!--
  `).join('');
}

function getImage(dancerImage) {
  return dancerImage ? imagesUtil.getSmallUrl(dancerImage) : 'images/generic_couple.png';
}
