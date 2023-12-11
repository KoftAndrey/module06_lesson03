const dateInput = document.querySelector('input[name=date]');
const timeSelect = document.querySelector('.book__input-time');
const dateWrapper = document.querySelector('.book__day-wrapper');
let selectedId = null;

const placeholder = 'Время';
const options = [
  {id: '1', value: '10:00'},
  {id: '2', value: '12:00'},
  {id: '3', value: '14:00'},
  {id: '4', value: '17:30'},
];

const createOptions = arr => arr.map(i => `<li class="time-select__option" data-type="option" data-id=${i.id}>${i.value}</li>`);

// Выбор времени
const createSelect = (el, placeholder, optionsData) => {
  const liArr = createOptions(optionsData);

  el.classList.add('time-select');
  el.insertAdjacentHTML('beforeend',
      `<div class="time-select__backdrop" data-type="backdrop"></div>
      <div class="time-select__input">
        <span class="time-select__input-text" data-type="value">${placeholder}</span>
        <span class="time-select__input-icon">
          <svg class="time-select__input-icon" xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="none">
          <path class="time-select__input-icon" d="M10.5 15L1.40673 3.75L19.5933 3.75L10.5 15Z" fill="#211E1E"/>
          </svg>
        </span>
      </div>
      <div class="time-select__dropdown">
        <ul class="time-select__options">${liArr.join('')}</ul>
      </div>
      <select class="time-select__select" name="time" required></select>`);
};

const openSelect = el => {
  el.classList.add('time-select_open');
  el.children[0].classList.add('time-select__backdrop_open');
  el.children[1].lastElementChild.classList.add('time-select__input-icon_open');
  el.children[2].classList.add('time-select__dropdown_open');
};

const closeSelect = el => {
  el.classList.remove('time-select_open');
  el.children[0].classList.remove('time-select__backdrop_open');
  el.children[1].lastElementChild.classList.remove('time-select__input-icon_open');
  el.children[2].classList.remove('time-select__dropdown_open');
};

const checkOpen = el => el.classList.contains('time-select_open');

const toggleOpen = el => (checkOpen(el) ? closeSelect(el) : openSelect(el));

const selectOption = (el, optionsArr, selected, id, target) => {
  const value = el.querySelector('[data-type=value]');
  selected = id;
  const current = optionsArr.find(i => i.id === selected);
  value.textContent = current.value;
  closeSelect(el);
  el.querySelectorAll('[data-type=option]')
      .forEach(i => i.classList.remove('time-select__option_active'));
  target.classList.add('time-select__option_active');
};

const setControls = (el, optionsArr, selected) => {
  el.addEventListener('click', ({target}) => {
    if (target.classList.contains('time-select__input') ||
    target.classList.contains('time-select__input-text') ||
    target.classList.contains('time-select__input-icon')
    ) {
      toggleOpen(el);
    } else if (target.dataset.type === 'option') {
      const {id} = target.dataset;
      selectOption(el, optionsArr, selected, id, target);
    } else if (target.dataset.type === 'backdrop') {
      closeSelect(el);
    }
  });
};

const createTimeSelect = el => {
  createSelect(el, placeholder, options);
  setControls(el, options, selectedId);
};

createTimeSelect(timeSelect);


// Выбор даты ==================================================================
const showDay = (date, month) => {
  const resDate = date > 9 ? date + '' : '0' + date;
  const resMonth = (month + 1) > 9 ? (month + 1) + '' : '0' + (month + 1);
  return `${resDate}.${resMonth}`;
};

const picker = datepicker(dateInput, {
  formatter: (input, date, instance) => {
    const value = showDay(date.getDate(), date.getMonth());
    input.value = value;
  },
  startDay: 1,
  customDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
  customMonths: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  startDate: new Date(),
  maxDate: new Date(Date.now() + (6.048e+8 * 4)),
  minDate: new Date(),
  showAllDates: true,
  disableYearOverlay: true,
});
