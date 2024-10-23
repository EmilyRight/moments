const options = {

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  mousewheel: true,
  grabCursor: true,
  slidesPerView: 'auto',
  spaceBetween: 36,
  loop: false,
  breakpoints: {
    768: {
      spaceBetween: 0,
    },
  },
};

export default options;
