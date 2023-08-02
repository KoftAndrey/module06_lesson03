// DOM элементы
const header = document.querySelector('header');
const overlay = document.querySelector('.nav-overlay');
const headerContainer = document.querySelector('.header__container');
const menuBtn = document.querySelector('.header__menu-button');
const logo = document.querySelector('.header__logo');
const navigation = document.querySelector('.header__navigation');
const headerBtn = document.querySelector('.header__button-wrapper');

// Анимация
const easeInOut = time => 0.5 * (1 - Math.cos(Math.PI * time));

// Анимация появления меню
const dropAnimation = (duration) => {
  let startAnimation = NaN;

  requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration;


    navigation.style.opacity = easeInOut(progress);
    if (window.innerWidth < 601) headerBtn.style.opacity = easeInOut(progress);
    overlay.style.backgroundColor = `rgba(0,0,0, ${easeInOut(progress) * 0.7})`;

    if (progress < 1) requestAnimationFrame(step);
  });
};

// Анимация скрытия меню
const closeAnimation = (duration, openMenu) => {
  let startAnimation = NaN;

  requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration;

    navigation.style.opacity -= easeInOut(progress);
    if (window.innerWidth < 601) headerBtn.style.opacity -= easeInOut(progress);
    overlay.style.backgroundColor = `rgba(0,0,0, ${0.7 - (easeInOut(progress) * 0.7)})`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      headerContainer.append(navigation);
      logo.after(navigation);
      header.append(headerContainer);

      header.classList.remove('header_active');
      overlay.classList.remove('nav-overlay_visible');
      headerContainer.classList.remove('header__container_active');
      navigation.classList.remove('header__navigation_visible');
      headerBtn.classList.remove('header__button-wrapper_visible');

      menuBtn.addEventListener('click', openMenu);
    }
  });
};

// Открытие меню
const openMenu = () => {
  overlay.append(headerContainer);

  header.classList.add('header_active');
  headerContainer.classList.add('header__container_active');
  menuBtn.classList.add('header__menu-button_close');
  navigation.classList.add('header__navigation_visible');
  headerBtn.classList.add('header__button-wrapper_visible');
  overlay.classList.add('nav-overlay_visible');

  menuBtn.removeEventListener('click', openMenu);

  dropAnimation(400);
};


// Закрытие меню
const closeMenu = () => {
  menuBtn.classList.remove('header__menu-button_close');
  closeAnimation(600, openMenu);
};

// Добавление отслеживания событий
const menuControl = () => {
  menuBtn.addEventListener('click', openMenu);

  overlay.addEventListener('click', e => {
    const target = e.target;
    if (target === overlay ||
        target.classList.contains('header__menu-button') ||
        target.classList.contains('header__menu-button-line')) {
      closeMenu();
    }
  });
};

menuControl();

