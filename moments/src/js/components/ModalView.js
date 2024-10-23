import MOBILE from '../constants/dimensions';
import imageSourcesList from '../constants/imageSourcesList';
import linksList from '../constants/linksList';

class ModalView {
  constructor(viewWidth) {
    this.htmlComponent = document.createDocumentFragment();
    this.id = 'modal';
    this.viewWidth = viewWidth;
    this.htmlComponent.append(this.createElement());
    this.renderedSlide = this.htmlComponent.querySelector(`.${this.id}`);
    this.closeIcon = this.htmlComponent.querySelector('.close-icon');
    this.copyIcon = this.htmlComponent.querySelector('.copy-icon');
    this.copyTooltip = this.htmlComponent.querySelector('.copy-tooltip');
    this.okIcon = this.htmlComponent.querySelector('.share__icon_ok');
    this.vkIcon = this.htmlComponent.querySelector('.share__icon_vk');
    this.glassPic = this.htmlComponent.querySelector('.footer-glass');
    this.closeIcon?.addEventListener('click', () => {
      this.closeModal();
    });
    if (this.viewWidth > MOBILE) {
      this.renderedSlide.addEventListener('click', (event) => {
        if (!event.target.closest('.modal-box')) {
          this.closeModal();
        }
      });
    }
    document.addEventListener('modal', () => {
      this.glassPic?.classList.add('animated');
    });
    this.copyIcon?.addEventListener('click', () => this.copyLink());
    this.shareWithSocialMedia();
  }

  shareWithSocialMedia() {
    const shareOptions = {
      url: window.location.href,
    };

    this.vkIcon?.addEventListener('click', () => {
      this.vkIcon.href = `http://vk.com/share.php?url=${shareOptions.url}`;
    });
    this.okIcon?.addEventListener('click', () => {
      this.okIcon.href = `https://connect.ok.ru/offer?url=${shareOptions.url}`;
    });
  }

  closeModal() {
    const icon = document.querySelector('.modal-icon');
    icon.classList.add('animated');
    this.renderedSlide.classList.add('modal-hidden');
    this.renderedSlide.classList.add('slide_hidden');
  }

  handleClosingModal() {
    const closeModalIcon = document.querySelector('.modal__close-icon');
    closeModalIcon.addEventListener('click', () => {
      this.closeModal();
    });
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        this.copyTooltip.classList.add('opened');
        setTimeout(() => {
          this.copyTooltip.classList.remove('opened');
        }, 2000);
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  }

  render() {
    return this.htmlComponent;
  }

  getCurrentYear() {
    return new Date().getFullYear().toString();
  }

  createElement() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-slide');
    wrapper.classList.add('slide');
    wrapper.classList.add(`${this.id}`);
    wrapper.classList.add('slide_hidden');
    wrapper.setAttribute('id', `${this.id}`);
    const getCurrentYear = this.getCurrentYear();
    wrapper.innerHTML = `
      <div class="popup-modal">
        <div class="modal-box" id="modal-box">
          <div class="modal__container">
            <div class="modal-box__header">
              <a
                href="https://t2.ru"
                class="logo logo--white js-gtm-event"
                data-event="logo"
              >
                <img src=${imageSourcesList.logoSrc} alt="t2" />
              </a>
              <h2 class="modal-box__title">
                Больше теплых моментов с&nbsp;t2
              </h2>
              <div class="js-gtm-event modal-box__close-icon close-icon" data-event="close">
                <span class="close"></span>
              </div>
            </div>

            <div class="modal-box__body modal-body">
              <p class="modal-body__text">
                Меняем все доступные вам минуты и&nbsp;ГБ&nbsp;&mdash; включенные в&nbsp;тариф, приобретенные
                или перенесенные от&nbsp;другого оператора&nbsp;&mdash; на&nbsp;кофе буше, а&nbsp;еще&nbsp;&mdash;
                на&nbsp;смартфоны, гаджеты и&nbsp;сервисы.<br/>
                С&nbsp;t2&nbsp;теплее.
              </p>
              <div class="modal-body__buttons buttons">
                <a
                  href="https://q.t2.ru/tariffs"
                  class="js-gtm-event btn"
                  data-event="conv_connect"
                  target="_blank"
                >
                  Подключиться
                </a>
              <a
                  href="https://spb.t2.ru/minutes-management/bushe"
                  class="js-gtm-event btn btn_transparent"
                  data-event="conv_change-final"
                  target="_blank"
                >
                  К&nbsp;обмену
                </a>


              </div>
            </div>
          </div>

          <div class="modal-box__footer footer">
            <div class="footer__share-block share">
              <p class="share__text">Поделиться с&nbsp;друзьями</p>
              <ul class="share__links-list links">
                <li
                  class="links__item share__copy-link copy-icon js-gtm-event"
                  data-event="share_link">
                    <img src=${imageSourcesList.copyLinkSrc} alt="" />
                </li>
                <li class="links__item">
                  <a
                  class="js-gtm-event share__icon_vk"
                  href=""
                  target="_blank"
                  data-event="share_vk"
                  >
                    <img src=${imageSourcesList.vkLinkSrc} alt="" />
                  </a>
                </li>
                <li class="links__item">
                  <a
                  class="js-gtm-event share__icon_ok"
                  href=""
                  target="_blank"
                  data-event="share_ok"
                  >
                    <img src=${imageSourcesList.okLinkSrc} alt="" />
                  </a>
                </li>
                <li class="links__item copy-tooltip">
                  Ссылка скопирована
                </li>
              </ul>
            </div>
            <div class="footer__image-area">
              <div class="footer__image footer__coffee">
                <img src=${imageSourcesList.footerSrc} alt="" />
               </div>
              <div class="footer__image footer__image_absolute footer-steam">
                <img src=${imageSourcesList.footerSteamSrc} alt="" />
              </div>
              <div class="footer__image footer__image_absolute footer-glass">
                <img src=${imageSourcesList.footerGlassSrc} alt="" />
              </div>

            </div>
            <div class="footer__box-content">
              <div class="footer__copyrights copyrights">
                18+ &copy; t2 Россия, <span class="current-year">${getCurrentYear}</span>.
              </div>
              <div class="footer__rules rules">
                <a
                  href=${linksList.conditions}
                  target="_blank"
                  class="text-link js-gtm-event"
                  data-event="rules-link"
                  data-section="section-footer"
                  >Подробное&nbsp;описание</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return wrapper;
  }
}

export default ModalView;
