const header = document.querySelector('header');
const overlay = document.querySelector('.nav-overlay');
const headerContainer = document.querySelector('.header__container');
const menuBtn = document.querySelector('.header__menu-button');
const logo = document.querySelector('.header__logo');
const navigation = document.querySelector('.header__navigation');
const dropMenu = document.querySelector('.drop-menu');

const openMenu = () => {
  dropMenu.append(navigation);
  overlay.append(headerContainer, dropMenu);

  headerContainer.classList.add('header__container_active');
  menuBtn.classList.add('header__menu-button_close');
  navigation.classList.add('header__navigation_visible');
  overlay.classList.add('nav-overlay_visible');

  menuBtn.removeEventListener('click', openMenu);
};

const closeMenu = () => {
  headerContainer.append(navigation);
  logo.after(navigation);
  header.append(headerContainer);

  headerContainer.classList.remove('header__container_active');
  menuBtn.classList.remove('header__menu-button_close');
  navigation.classList.remove('header__navigation_visible');
  overlay.classList.remove('nav-overlay_visible');

  menuBtn.addEventListener('click', openMenu);
};

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

