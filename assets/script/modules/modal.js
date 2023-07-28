const callbackBtn = document.querySelector('.header__button');
const modalOverlay = document.querySelector('.modal-overlay');
const modalForm = document.querySelector('.modal-form');

const openModal = () => modalOverlay.classList.add('modal-overlay_visible');
const closeModal = () => modalOverlay.classList.remove('modal-overlay_visible');

const modalControl = (callbackBtn, modalOverlay) => {
  callbackBtn.addEventListener('click', openModal);

  modalOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === modalOverlay || target.classList.contains('modal-form__close_svg')) {
      closeModal();
    }
  });
};

const formControl = form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const userData = Object.fromEntries(formData);

    form.reset();
    closeModal();
  });
};

modalControl(callbackBtn, modalOverlay);

formControl(modalForm);
