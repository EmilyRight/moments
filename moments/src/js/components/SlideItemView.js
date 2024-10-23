class SlideItemView {
  constructor() {
    this.tooltipIconsList = null;
    this.tooltipList = null;
    this.popupList = null;
    this.delay = null;
    this.renderedSlide = null;
    this.animatedContent = null;
    this.popupAnimation = null;
  }

  setElements(animatedContent, popupList, tooltipIconsList, tooltipList, renderedSlide) {
    this.tooltipIconsList = tooltipIconsList;
    this.tooltipList = tooltipList;
    this.popupList = popupList;
    this.delay = null;
    this.animatedContent = animatedContent;
    this.renderedSlide = renderedSlide;
  }

  addEventListeners() {
    this.animatedContent.addEventListener('animationend', () => {
      this.showPopup();
    });
    this.tooltipIconsList.forEach((icon) => {
      icon.addEventListener('click', () => {
        this.tooltipList.forEach((tooltip) => {
          if (tooltip.id === icon.dataset.tooltip) {
            if (!tooltip.classList.contains('opened')) {
              tooltip.classList.add('opened');
            } else {
              tooltip.classList.remove('opened');
            }
          }
        });
      });
    });
  }

  removeEventListeners() {
    this.animatedContent.removeEventListener('animationend', this.showPopup.bind(this));
    this.tooltipIconsList.forEach((icon) => {
      icon.removeEventListener('click', this.showTooltip.bind(this));
    });
  }

  showTooltip() {
    if (this.tooltip.classList.contains('opened')) {
      this.tooltip.classList.remove('opened');
    }
    this.tooltip.classList.add('opened');
  }

  showPopup() {
    this.popupList.forEach((popup) => {
      this.popupAnimation = this.createAnimation(popup);
      if (this.renderedSlide.classList.contains('swiper-slide-active')) {
        popup.classList.add('opened');
      } else {
        popup.classList.remove('opened');
      }
    });
  }

  createAnimation(element) {
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
        iterations: 1,
        direction: 'normal',
      }, // keyframe options
    );
    return new Animation(animation, document.timeline);
  }
}

export default SlideItemView;
