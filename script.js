'use strict';

///////////////////////////////////////
// Modal window

const modalWindow = document.querySelector('.modal-window');
const overlay = document.querySelector('.overlay');
const btnCloseModalWindow = document.querySelector('.btn--close-modal-window');
const btnsOpenModalWindow = document.querySelectorAll('.btn--show-modal-window');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const allLinks = document.querySelector('.nav__links');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const allSection = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');


//Modal window

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalWindow = function () {
  modalWindow.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModalWindow.forEach(button => button.addEventListener('click', openModalWindow));

btnCloseModalWindow.addEventListener('click', closeModalWindow);
overlay.addEventListener('click', closeModalWindow);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalWindow.classList.contains('hidden')) {
    closeModalWindow();
  }
});


// Scroll to page

btnScrollTo.addEventListener('click', function(e) {
  // const section1Coords = section1.getBoundingClientRect();
  // window.scrollTo({
  //   left: section1Coords.left + window.pageXOffset, 
  //   top: section1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'  
  // });
  section1.scrollIntoView({behavior: 'smooth'})
});


// Smooth page navigation

allLinks.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const href = e.target.getAttribute('href');
    document.querySelector(href).scrollIntoView({
      behavior: 'smooth'
    });
  } 
});


// вкладки

tabContainer.addEventListener('click', function(e) {
  const clickedButton = e.target.closest('.operations__tab');

  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clickedButton.classList.add('operations__tab--active');

  tabContents.forEach(content => content.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clickedButton.dataset.tab}`).classList.add('operations__content--active');
});


// Анимация потускнения в хедер

const navLinksHoverAnimation = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const linkOver = e.target;
    const siblingLinks = linkOver.closest('.nav__links').querySelectorAll('.nav__link');
    const logo = linkOver.closest('.nav').querySelector('img');
    const logoText = linkOver.closest('.nav').querySelector('.nav__text');
    
    siblingLinks.forEach(el => {
      if(el != linkOver) el.style.opacity = this;
    });
    logo.style.opacity = this;
    logoText.style.opacity = this;
  }
};


nav.addEventListener('mouseover', navLinksHoverAnimation.bind(0.4));

nav.addEventListener('mouseout', navLinksHoverAnimation.bind(1));

// Sticky navigation

const getStickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver
(getStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,  
});
headerObserver.observe(header);

// Section animation

const appearanceSection =function(entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  appearanceSection, {
    root: null,
    threshold: 0.2,
  }
);

allSection.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading for image

const loadImages = function(entries, observer) {
  const entry = entries[0];

  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imagesObserver = new IntersectionObserver(
  loadImages, {
    root: null,
    threshold: 0.8,
  }
);
lazyImages.forEach(image => imagesObserver.observe(image));
