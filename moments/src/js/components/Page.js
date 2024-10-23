import MOBILE from '../constants/dimensions';
import Swiper from '../vendor/swiper.min';
import options from '../constants/swiperOptions';
import SliderView from './SliderView';
import SlideCoupleView from './SlideCoupleView';
import SlideManView from './SlideManView';
import SlideStudentView from './SlideStudentView';
import ModalView from './ModalView';

class Page {
  constructor(element, GTM) {
    this.slider = null;
    this.slidesArray = [];
    this.viewWidth = document.documentElement.clientWidth;
    this.GTM = GTM;
    this.element = element;
    this.nextBtn = null;
    this.prevBtn = null;
    this.swiper = null;
    this.modalIcon = null;
    this.modal = null;
    this.controls = null;
    this.sliderNextButton = null;
    this.activeSlide = null;
    this.activeSlideContent = null;
    document.addEventListener('girlPopupIsShown', () => {
      this.modalIcon.classList.add('shown');
    });
  }

  init() {
    this.showMainScreen();
    this.addEventListeners();
  }

  renderSlider() {
    this.slidesArray = [
      new SlideCoupleView(this.viewWidth),
      new SlideManView(this.viewWidth),
      new SlideStudentView(this.viewWidth),
      new ModalView(this.viewWidth),
    ];
    this.slider = new SliderView(this.slidesArray);
    this.element.innerHTML = String(this.slider.render());
    this.controls = document.querySelector('.swiper-controls');
    this.nextBtn = document.querySelector('.swiper-button-next');
    this.prevBtn = document.querySelector('.swiper-button-prev');
  }

  addEventListeners() {
    this.modalIcon.addEventListener('click', () => {
      this.openModal();
    });
    window.addEventListener('resize', () => {
      this.showMainScreen();
    });
  }

  showMainScreen() {
    this.renderSlider();
    const wrapper = document.querySelector('.swiper-wrapper');
    this.slidesArray.forEach((slide) => {
      wrapper.append(slide.render());
    });
    const loader = document.querySelector('.loader');

    const hiddenList = document.querySelectorAll('.hidden');
    this.modalIcon = document.querySelector('.modal-icon');
    this.modal = document.querySelector('.modal');
    loader.addEventListener('animationend', () => {
      this.GTM.handleDataLayerPush(loader.id);
      loader.remove();
      hiddenList.forEach((element) => {
        element.classList.remove('hidden');
        element.classList.add('visible');
      });
      if (this.viewWidth < MOBILE) {
        this.renderForMobile();
      } else {
        this.modal.classList.add('modal-hidden');
        this.GTM.handleDataLayerPush(this.slider.id);
        this.handleDesktopScreen();
      }
    });
  }

  /**
 * @param {string} type
 * @param {any} [detail]
 * @return {boolean}
 */
  notify(type, detail = null) {
    const cancelable = true;
    const bubbles = true;
    const event = new CustomEvent(type, { detail, cancelable, bubbles });
    return document.dispatchEvent(event);
  }

  renderForMobile() {
    this.createSlider();
    this.activeSlide = document.querySelector('.swiper-slide-active');
    const fixedText = document.querySelector('.fixed-text_mobile');

    this.handleActiveSlide();

    this.animateActiveSlide();
    this.setDataEventsOnControls();
    this.GTM.handleDataLayerPush(this.activeSlide.id);
    setTimeout(() => {
      this.controls.classList.add('displayed');
    }, 3000);
    this.swiper.on('slideNextTransitionStart', () => {
      if (this.activeSlide.id === 'girl') {
        this.notify('modal');
        fixedText.classList.remove('visible');
        fixedText.classList.add('hidden');
      }
    });
    this.swiper.on('slideNextTransitionEnd', () => {
      this.notify('isPrevios');
      this.handleActiveSlide();
      if (this.activeSlide.id === 'girl') {
        fixedText.classList.remove('hidden');
        fixedText.classList.add('visible');
      }

      this.animateActiveSlide();
      this.setDataEventsOnControls();

      this.GTM.handleDataLayerPush(this.activeSlide.id);
    });

    this.swiper.on('slideChangeTransitionEnd', () => {
      this.notify('isPrevios');
    });
    this.swiper.on('slideChangeTransitionStart', () => {
      this.hideControls();
    });
  }

  hidePopups() {
    const popupList = this.activeSlide.querySelectorAll('.main-image__popup');
    if (popupList) {
      popupList.forEach((popup) => {
        popup.classList.remove('opened');
      });
    }
  }

  setDataEventsOnControls() {
    this.prevBtn.setAttribute('data-event', `pointer-left-${this.activeSlide.id}`);
    this.nextBtn.setAttribute('data-event', `pointer-right-${this.activeSlide.id}`);
  }

  hideControls() {
    this.controls.classList.remove('displayed');
    setTimeout(() => {
      this.controls.classList.add('displayed');
    }, 3000);
  }

  handleActiveSlide() {
    this.activeSlide = document.querySelector('.swiper-slide-active');
    this.activeSlideContent = this.activeSlide.querySelector('.slide__content');
  }

  createSlider() {
    if (this.viewWidth < MOBILE) {
      this.swiper = new Swiper('.swiper-container', options);
      this.swiper.init();
    } else {
      this.destroySlider();
    }
  }

  handleDesktopScreen() {
    const slides = document.querySelectorAll('.slide_hidden');
    for (let i = 0; i < slides.length - 1; i += 1) {
      slides[0].classList.remove('slide_hidden');
      slides[0].classList.add('slide_visible');
      const activeSlideContent = slides[0].querySelector('.slide__content');
      activeSlideContent.classList.add('animated');
    }
  }

  animateActiveSlide() {
    this.activeSlide.classList.remove('slide_hidden');
    this.activeSlide.classList.add('slide_visible');
    this.activeSlideContent?.classList.add('animated');
  }

  openModal() {
    this.modalIcon.classList.remove('animated');
    this.modal.classList.remove('modal-hidden');
    this.modal.classList.remove('slide_hidden');
  }

  destroySlider() {
    this.swiper.destroy();
  }
}

export default Page;
