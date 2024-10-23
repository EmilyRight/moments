import MOBILE from '../constants/dimensions';
import imageSourcesList from '../constants/imageSourcesList';
import SlideView from './SlideView';

class SlideManView extends SlideView {
  constructor(viewWidth, id = 'man') {
    super(viewWidth, 'man');
    this.viewWidth = viewWidth;
    this.id = id;

    document.addEventListener('couplePopupIsShown', () => {
      if (this.viewWidth >= MOBILE) {
        this.animateSelf();
      }
    });
  }

  createElement() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-slide');
    wrapper.classList.add('slide');
    wrapper.classList.add(`${this.id}`);
    wrapper.classList.add('slide_hidden');
    wrapper.setAttribute('id', `${this.id}`);
    wrapper.innerHTML = `

      <div class="slide__content slide-content">
        <div class="slide-content__wrapper js-set-size">
          <div class="slide-content__img-box images">
            <div class="image-box images__main-img">
              <img
                src=${imageSourcesList.manSrc}
                alt=""
                class="images__main man"
              />
            </div>
            <div
              class="image-box image-box_absolute images__phone-img"
            >
              <img
                src=${imageSourcesList.manPhone}
                alt=""
                class="images__phone phone-image"
              />
            </div>
            <div class="image-box image-box_absolute images__dog-img">
              <img
                src=${imageSourcesList.manDogTail}
                alt=""
                class="images__dog dog-image"
              />
            </div>
            <div
              class="image-box image-box_absolute images__hand-img"
            >
              <img
                src=${imageSourcesList.manHand}
                alt=""
                class="images__hand hand-image"
              />
            </div>
          </div>
          <div class="slide-content__popup text-popup">
          <a
          href="https://spb.t2.ru/minutes-management/bushe"
          class="js-gtm-event link text-popup__link"
          target="_blank"
          data-event="conv_present"
          >Подарил кофе</a
          >
           гостю в&nbsp;очереди.
            Это просто: надо всего-то показать QR-код бариста.
            Сейчас еще маме код на&nbsp;кофе в&nbsp;мессенджере перешлю. Здорово, когда можно спонтанно делиться теплом!
          </div>
          <div
            class="slide-content__tooltip-block tooltip-block man-tooltip"
          >
            <div
              class="js-gtm-event tooltip-block__tooltip-icon tooltip-icon"
              data-tooltip="smartphone"
              data-event="smartphone"></div>
            <div
              class="tooltip-block__tooltip tooltip"
              id="smartphone"
            >
              <div class="tooltip__text">
                <ul class="tooltip-list">
                  <li class="tooltip-list__item">Подвешенный&nbsp;кофе</li>
                </ul>
              </div>
              <div class="tooltip__close-icon tooltip-icon" data-tooltip="smartphone">
                <span class="close"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

    `;
    return wrapper;
  }
}
export default SlideManView;
