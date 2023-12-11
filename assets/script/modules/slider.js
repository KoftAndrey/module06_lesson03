const swiper = new Swiper('.reviews__slider', {
  loop: true,
  slidesPerView: 1,
  mousewheel: true,
  keyboard: true,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: '.reviews__arrow-next',
    prevEl: '.reviews__arrow-prev',
  },
});
