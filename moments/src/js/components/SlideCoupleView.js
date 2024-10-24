import imageSourcesList from '../constants/imageSourcesList';
import SlideView from './SlideView';

class SlideCoupleView extends SlideView {
  constructor(viewWidth, id = 'couple') {
    super(viewWidth, 'couple');
    this.viewWidth = viewWidth;
    this.id = id;
  }

  createElement() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-slide');
    wrapper.classList.add('slide');
    wrapper.classList.add('slide_hidden');
    wrapper.classList.add(`${this.id}`);
    wrapper.setAttribute('id', `${this.id}`);
    wrapper.innerHTML = `

    <div class="slide__content slide-content">
      <div class="slide-content__wrapper js-set-size">
        <div class="slide-content__img-box images">
          <div class="image-box images__main-img">
            <img
              src=${imageSourcesList.coupleSrc}
              alt=""
              class="images__main couple"
            />
          </div>
          <div
            class="image-box image-box_absolute images__coffee-img"
          >
            <img
              src=${imageSourcesList.coupleCoffeeSrc}
              alt=""
              class="images__coffee coffee-image"
            />
          </div>
          <div
            class="image-box image-box_absolute images__hand-img"
          >
            <img
              src=${imageSourcesList.coupleHands}
              alt=""
              class="images__hands hand-image"
            />
          </div>
          <div class="slide-content__tooltip-block tooltip-block man-tooltip">
            <div
              class="js-gtm-event tooltip-block__tooltip-icon tooltip-icon"
              data-tooltip="pair-man"
              data-event="cup-pair"></div>
            <div class="tooltip-block__tooltip tooltip" id="pair-man">
              <div class="tooltip__text">
                <ul class="tooltip-list">
                  <li class="tooltip-list__item">
                    Капучино&nbsp;классический&nbsp;350&nbsp;мл
                  </li>
                  <li class="tooltip-list__item">
                    Американо&nbsp;300&nbsp;мл
                  </li>
                </ul>
              </div>
              <div class="tooltip__close-icon tooltip-icon" data-tooltip="pair-man">
                <span class="close"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="slide-content__popup man-popup text-popup">
          Гуляли по&nbsp;Питеру, любовались осенним городом, взяли
          с&nbsp;собой
          <a
            href="https://spb.t2.ru/minutes-management/bushe"
            class="js-gtm-event link text-popup__link"
            target="_blank"
            data-event="conv_bushe"
            >кофе буше за&nbsp;минуты t2</a
          >
        </div>
        <div class="slide-content__popup woman-popup text-popup">
          Мне с&nbsp;тобой так&nbsp;тепло
        </div>


      </div>
    </div>

    `;
    return wrapper;
  }
}

export default SlideCoupleView;
