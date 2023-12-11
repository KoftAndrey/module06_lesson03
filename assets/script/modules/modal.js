const callbackBtn = document.querySelector('.header__button');
const modalOverlay = document.querySelector('.modal-overlay');
const modalForm = document.querySelector('.modal-form');
const nameInput = document.querySelector('input[name=title]');
const phoneInput = document.querySelector('.modal-form__block > input[name=phone]');

new Inputmask('A|a{22}', {placeholder: ' '}).mask(nameInput);
new Inputmask('+7 (999)-999-99-99').mask(phoneInput);


const openModal = () => modalOverlay.classList.add('modal-overlay_visible');
const closeModal = () => modalOverlay.classList.remove('modal-overlay_visible');

const justValidate = new JustValidate('.modal-form');
justValidate
    .addField('input[name=title]', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваше имя',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Не короче 2 символов',
      },
    ])
    .addField('input[name=phone]', [
      {
        rule: 'required',
        errorMessage: 'Укажите ваше телефон',
      },
    ])
    .onSuccess(event => {
      const target = event.target;
      axios.post('https://jsonplaceholder.typicode.com/posts', {
        name: target.title.value,
        tel: target.phone.value,
      })
          .then(response => {
            target.reset();
            closeModal();
          })
          .catch(err => {
            console.warn('Ошибка:', err);
          });
    });

const modalControl = (callbackBtn, modalOverlay) => {
  callbackBtn.addEventListener('click', openModal);

  modalOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === modalOverlay || target.classList.contains('modal-form__close_svg')) {
      closeModal();
    }
  });
};
/*
const formControl = form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const userData = Object.fromEntries(formData);

    form.reset();
    closeModal();
  });
};
*/
modalControl(callbackBtn, modalOverlay);
// formControl(modalForm);
