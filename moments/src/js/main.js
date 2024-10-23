import detectDevice from './helpers/detectDevice';
import { WOW } from './vendor/wow.min';
import videoTeaser from './helpers/videoTeaser';
import Page from './components/Page';
import GTMEvents from './helpers/gtmEvents';

/// /////// DocReady //////////
const GTM = new GTMEvents();

/**
 * @type {HTMLElement}
 */

let page;

/**
 * @type {Page}
 */

let pageView;

document.addEventListener('DOMContentLoaded', () => {
  detectDevice();
  videoTeaser();
  setPageHeight();
  page = document.querySelector('.page');
  pageView = new Page(page, GTM);
  const buttonMore = document.querySelector('.teaser-more');
  buttonMore.addEventListener('click', () => {
    GTM.handleDataLayerPush('teaser');
    pageView.init();
  });
  GTM.addEventListeners();
  new WOW().init();
});

document.addEventListener('mousewheel', () => {
  const teaser = document.querySelector('.teaser');
  if (teaser) {
    GTM.handleDataLayerPush('more', 'mouseweel');
    pageView.init();
  }
});
document.addEventListener('touchmove', () => {
  const teaser = document.querySelector('.teaser');
  if (teaser) {
    GTM.handleDataLayerPush('more', 'touchmove');
    pageView.init();
  }
});
window.addEventListener('resize', () => {
  setPageHeight();
});
window.addEventListener('orientationchange', () => {
  setPageHeight();
});

function setPageHeight() {
  const elements = document.querySelectorAll('.js-set-size');
  elements.forEach((el) => {
    el.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  });
}
