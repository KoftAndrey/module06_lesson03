const accHead = document.querySelectorAll('.faq__head');
const accBody = document.querySelectorAll('.faq__body');

accHead.forEach((head, index) => {
  head.addEventListener('click', () => {
    for (let i = 0; i < accHead.length; i += 1) {
      if (index === i) {
        accBody[i].style.height =
        accBody[i].classList.contains('faq__body_active') ?
        '' : `${accBody[i].scrollHeight}px`;
        accBody[i].classList.toggle('faq__body_active');
        accHead[i].classList.toggle('faq__head_active');
      } else {
        accBody[i].classList.remove('faq__body_active');
        accHead[i].classList.remove('faq__head_active');
        accBody[i].style.height = '';
      }
    }
  });
});
