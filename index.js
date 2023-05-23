'use strict';

///////////////////////////////////////
// Modal window

//All elements selection
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollToFeatures = document.querySelector(".btn--scroll-to");
const sectionFeatures = document.querySelector("#section--1");
const navLinksEl = document.querySelector(".nav__links");
const navAEl = document.querySelector(".nav__link");
const nav = document.querySelector(".nav");
//Tabbed container selectors
const tabbedConatinerEl = document.querySelector(".operations__tab-container");
const tabsList = document.querySelector(".operations__tab-container").children
const contentList = document.getElementsByClassName("operations__content");
const headerEl = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");











const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});







//Scroll to feature section smoothly
scrollToFeatures.addEventListener("click",()=>{

  const sectionFeaturesTopOffset = sectionFeatures.getBoundingClientRect();
  
  // window.scrollTo({
  //   Left:0,
  //   top: sectionFeaturesTopOffset.y + window.scrollY,
  // behavior: "smooth"}) // you need to include current scroll value as well becuase the distance is calculated relative to the viewport.
  sectionFeatures.scrollIntoView({behavior: "smooth"})//Modern way to do scrolling here the relative is features elemwnt itself.
})






//Naviagtion links to different sections scrolling smoothly
navLinksEl.addEventListener("click",(e)=>{
  e.preventDefault()
  if(e.target.classList.contains("nav__link")){//This is important because user might click little bit outside of the nav links which will nkt yeild sectionId hence no scrolling
  const sectionId = e.target.getAttribute("href");//To get the exact value of href or any links use getAttribute
  const targetEl = document.querySelector(sectionId);
  
  targetEl.scrollIntoView({behavior: "smooth"})
  
  }
})//Tip: You dont need to have event handlers attached to child elements if you want to take advantage of bubbling.Every event is tracked by javascript no mattaer if you attach a event handler or not.

//Tabbed container

tabbedConatinerEl.addEventListener("click",(e)=>{
  console.log(tabsList[0].classList.contains("operations__tab--active"));
  
  let customDataValue,currentClickedElement,currentActiveContent;
  
  for (let i = 0; i < tabsList.length; i++) {
    console.log(tabsList[i].classList.contains("operations__tab--active"));
    tabsList[i].classList.remove("operations__tab--active");
    

contentList[i].classList.remove("operations__content--active");
   
    
  }
  
  

  
  
  currentClickedElement = e.target;
  customDataValue= currentClickedElement.getAttribute("data-tab");
  currentClickedElement.classList.add("operations__tab--active");
  currentActiveContent = document.querySelector(`.operations__content--${customDataValue}`);
  currentActiveContent.classList.add("operations__content--active");
 // currentActiveContent.style.display = "grid";
  
  
  
  
})


//For navlinks disappearing animation
const handleHover = function(e,opacity) {
console.log(this);  //If we use this keyword with bind the value of this is going to be the first argument ot can be objects or even values.
if (e.target.classList.contains('nav __link')) {
const link = e.target;
const siblings = link.closest('nav'). querySelectorAll('nav__link');
const logo = link.closest('.nav'). querySelector('img');                     
siblings.forEach(el => {
if (el !== link) el.style.opacity = opacity;
});
logo.style.opacity = opacity;
};

}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));


const stopAt = nav.getBoundingClientRect().height;
//Using intersection observer api
const callback = function (entries,observer) {
  
  
   entries.forEach((ent)=>{
    if (!ent.isIntersecting){
      nav.classList.add("sticky");
    }else{
     nav.classList.remove("sticky")}
   })
  
}
const options = {
  root: null,
  threshold: 0,
  rootMargin: `${stopAt}px`
  
}



const observer = new IntersectionObserver(callback,options);
observer.observe(headerEl);


//sections animations 

console.log(allSections)
//Having a common observer for all sections
const sectionObserver = new IntersectionObserver(shifter,{
  root: null,
  threshold: 0.1
})

// allSections.forEach((item)=>{
//   item.classList.add('section--hidden');
//   sectionObserver.observer(item)
// })



function shifter(entries,observer) {
  allSections.forEach((item)=>{
    item.classList.remove('section--hidden');
})

}










