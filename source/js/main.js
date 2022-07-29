import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------
  const navMain = document.querySelector('.navigation');
  const navToggle = document.querySelector('.navigation__toggle');
  const header = document.querySelector('.header');
  const navLink = navMain.querySelectorAll('.navigation__link');
  const body = document.querySelector('.body');

  navMain.classList.remove('navigation--opened');
  navMain.classList.add('navigation--closed');
  header.classList.remove('header--nojs');

  function outsideEvtListener(event) {
    const target = event.target;
    if (!target.closest('.navigation') && !target.closest('.navigation__toggle')) {
      navMain.classList.remove('navigation--opened');
      navMain.classList.add('navigation--closed');
      navToggle.classList.toggle('navigation__toggle--closed');
      document.removeEventListener('click', outsideEvtListener);
    }
  }

  navToggle.addEventListener('click', function () {
    if (navMain.classList.contains('navigation--closed')) {
      navToggle.classList.toggle('navigation__toggle--closed');
      navMain.classList.remove('navigation--closed');
      navMain.classList.add('navigation--opened');
      body.classList.add('scroll-lock');
      document.addEventListener('click', outsideEvtListener);
    } else {
      navToggle.classList.toggle('navigation__toggle--closed');
      navMain.classList.remove('navigation--opened');
      navMain.classList.add('navigation--closed');
      document.removeEventListener('click', outsideEvtListener);
    }
  });

  navLink.forEach((link) => link.addEventListener('click', function () {
    navToggle.classList.toggle('navigation__toggle--closed');
    navMain.classList.remove('navigation--opened');
    navMain.classList.add('navigation--closed');
    body.classList.remove('scroll-lock');
    document.removeEventListener('click', outsideEvtListener);
  }));

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
