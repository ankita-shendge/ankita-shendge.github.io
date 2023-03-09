// javascript for tab
let tab = document.querySelector(".tab-form");
let tabHeader = document.querySelector(".tab-header");
let tabHeaderElements = tab.querySelectorAll(".tab-header > button");
let tabbody = document.querySelector(".tab-body");
let tabbodyElements = tab.querySelectorAll(".tab-body > div");

for (let i = 0; i < tabHeaderElements.length; i++) {
  tabHeaderElements[i].addEventListener("click", function () {
    tabHeader.querySelector(".active").classList.remove("active");
    tabHeaderElements[i].classList.add("active");
    tabbody.querySelector(".active").classList.remove("active");
    tabbodyElements[i].classList.add("active");
  });
}
