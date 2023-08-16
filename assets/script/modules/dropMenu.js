// DOM элементы
const overlay = document.querySelector('.nav-overlay');
const menuBtn = document.querySelector('.header__menu-button');
const navigation = document.querySelector('.header__navigation-clone');
const callBtn = document.querySelector('.header__button-clone');
const callBtnWrapper = document.querySelector('.header__button-wrapper');

// Анимация
const animationFunc = (duration, phase, func) => {
  let startAnimation = NaN;

  requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration;

    let opacityValue;
    let backgroundValue;
    if (phase === 'open') {
      opacityValue = progress;
      backgroundValue = Math.round(progress * 7) / 10;
    }
    if (phase === 'close') {
      opacityValue = 1 - progress;
      backgroundValue = 0.7 - (progress * 0.7);
    }

    navigation.style.opacity = opacityValue;
    callBtnWrapper.style.opacity = opacityValue;
    overlay.style.backgroundColor = `rgba(0,0,0, ${backgroundValue})`;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      func();
    }
  });
};

// func при открытии
const openFunc = () => {
  navigation.style.opacity = 1;
  callBtnWrapper.style.opacity = 1;
};

// func при закрытии
const closeFunc = () => {
  navigation.style.opacity = 0;
  callBtnWrapper.style.opacity = 0;

  overlay.classList.remove('nav-overlay_visible');
  navigation.classList.remove('header__navigation-clone_visible');
  callBtnWrapper.classList.remove('header__button-wrapper_visible');
  callBtn.classList.remove('header__button-clone_visible');
};

// Открытие меню
const openMenu = () => {
  menuBtn.classList.add('header__menu-button_close');
  navigation.classList.add('header__navigation-clone_visible');
  callBtnWrapper.classList.add('header__button-wrapper_visible');
  callBtn.classList.add('header__button-clone_visible');
  overlay.classList.add('nav-overlay_visible');

  menuBtn.removeEventListener('click', openMenu);

  animationFunc(300, 'open', openFunc);
};

// Закрытие меню
const closeMenu = () => {
  menuBtn.classList.remove('header__menu-button_close');
  animationFunc(300, 'close', closeFunc);

  menuBtn.removeEventListener('click', closeMenu);
  menuBtn.addEventListener('click', openMenu);
};

// Добавление отслеживания событий
const menuControl = () => {
  menuBtn.addEventListener('click', () => {
    openMenu();
    menuBtn.addEventListener('click', closeMenu);
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay ||
        e.target.classList.contains('header__navigation-clone-link')) {
      closeMenu();
    }
  });
};

menuControl();

