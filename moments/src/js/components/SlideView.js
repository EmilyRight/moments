class SlideView {
  /**
 * @param {number} viewWidth
 * @param {string} id
 */
  constructor(viewWidth, id) {
    this.htmlComponent = document.createDocumentFragment();
    this.id = id;
    this.htmlComponent.append(this.createElement());
    this.viewWidth = viewWidth;

    this.renderedSlide = this.htmlComponent.querySelector(`.${this.id}`);
    this.animatedContent = this.htmlComponent.querySelector('.slide__content');
    this.popupList = Array.from(this.htmlComponent.querySelectorAll('.text-popup'));
    this.tooltipIconsList = Array.from(this.htmlComponent.querySelectorAll('.tooltip-icon'));
    this.tooltipCloseIconsList = Array.from(this.htmlComponent.querySelectorAll('.tooltip__close-icon'));
    this.tooltipList = Array.from(this.htmlComponent.querySelectorAll('.tooltip'));

    this.animatedContent.addEventListener('animationend', () => {
      this.showPopup();
      setTimeout(() => {
        this.notify(`${this.id}PopupIsShown`);
      }, 1000);
    });
    this.tooltipIconsList.forEach((icon) => {
      icon.addEventListener('click', () => this.showTooltip(icon));
    });

    document.addEventListener('isPrevios', () => {
      this.hidePopup();
    });
  }

  animateSelf() {
    this.renderedSlide.classList.remove('slide_hidden');
    this.renderedSlide.classList.add('slide_visible');
    this.animatedContent?.classList.add('animated');
  }

  /**
   * @param {HTMLElement} icon
   */
  showTooltip(icon) {
    this.tooltipList.forEach((tooltip) => {
      if (tooltip.id === icon.dataset.tooltip) {
        if (!tooltip.classList.contains('opened')) {
          tooltip.classList.add('opened');
        } else {
          tooltip.classList.remove('opened');
        }
      }
    });
  }

  /**
   * @param {HTMLElement} element
   * @param {number} delay
   */
  createAnimation(element, delay) {
    const animation = new KeyframeEffect(
      element,
      [
        { opacity: 0, offset: 0 },

        { opacity: 1, offset: 1 },
      ],
      {
        duration: 1500,
        fill: 'forwards',
        easing: 'linear',
        delay,
        iterations: 1,
        direction: 'normal',
      }, // keyframe options
    );
    return new Animation(animation, document.timeline);
  }

  showPopup() {
    this.popupList.forEach((popup, index) => {
      this.popupAnimation = this.createAnimation(popup, index);
      popup.classList.add('opened');
      this.popupAnimation.ready.then(() => {
        this.popupAnimation.play();
      });
    });
  }

  hidePopup() {
    this.popupList.forEach((popup) => {
      if (this.popupAnimation) {
        this.popupAnimation.cancel();
        popup.classList.remove('opened');
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

  render() {
    return this.htmlComponent;
  }
}

export default SlideView;
