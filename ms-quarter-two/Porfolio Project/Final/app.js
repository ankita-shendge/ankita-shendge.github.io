const nav_btn = document.querySelector(".hamburger");
const mobile_menu = document.querySelector(".mobile-nav");

nav_btn.addEventListener("click", function () {
  nav_btn.classList.toggle("is-active");
  mobile_menu.classList.toggle("is-active");
});

// horizontal carousel

const next = document.getElementById("next");
const previous = document.getElementById("previous");
const images = document.querySelector(".images-container");

const first_card_clone = images.children[0].cloneNode(true);

const last_card_clone =
  images.children[images.children.length - 1].cloneNode(true);

images.insertBefore(last_card_clone, images.children[0]);

images.appendChild(first_card_clone);
images.style.transitionDuration = "0.0s";
images.style.transform = "translateX(-350px)";

let current_card = 0;

next.addEventListener("click", () => {
  if (current_card < images.children.length - 1) {
    current_card++;
    images.style.transitionDuration = "0.5s";
    images.style.transform = `translateX(-${current_card * 350}px)`;
  }
  if (current_card === images.children.length - 1) {
    images.style.transitionDuration = "0.0s";
    images.style.transform = `translate(-350px)`;
  } else {
    return;
  }
});

previous.addEventListener("click", () => {
  if (current_card > 0) {
    current_card--;
    images.style.transitionDuration = "0.5s";
    images.style.transform = `translateX(-${current_card * 350}px)`;
  } else {
    return;
  }
});

// lunch and dinner section

const next2 = document.getElementById("next2");
const previous2 = document.getElementById("previous2");

const images2 = document.querySelector(".images-container2");

const first_card_clone2 = images2.children[0].cloneNode(true);

const last_card_clone2 =
  images2.children[images2.children.length - 1].cloneNode(true);

images2.insertBefore(last_card_clone2, images2.children[0]);

images2.appendChild(first_card_clone2);
images2.style.transitionDuration = "0.0s";
images2.style.transform = "translateX(-350px)";

let current_card2 = 0;

next2.addEventListener("click", () => {
  if (current_card2 < images2.children.length - 1) {
    current_card2++;
    images2.style.transitionDuration = "0.5s";
    images2.style.transform = `translateX(-${current_card2 * 350}px)`;
  }
  if (current_card2 === images2.children.length - 1) {
    images2.style.transitionDuration = "0.0s";
    images2.style.transform = `translate(-350px)`;
  } else {
    return;
  }
});

previous2.addEventListener("click", () => {
  if (current_card2 > 0) {
    current_card2--;
    images2.style.transitionDuration = "0.5s";
    images2.style.transform = `translateX(-${current_card2 * 350}px)`;
  } else {
    return;
  }
});

// Dessert section

const next3 = document.getElementById("next3");
const previous3 = document.getElementById("previous3");

const images3 = document.querySelector(".images-container3");

const first_card_clone3 = images3.children[0].cloneNode(true);

const last_card_clone3 =
  images3.children[images3.children.length - 1].cloneNode(true);

images3.insertBefore(last_card_clone3, images3.children[0]);

images3.appendChild(first_card_clone3);
images3.style.transitionDuration = "0.0s";
images3.style.transform = "translateX(-350px)";

let current_card3 = 0;

next3.addEventListener("click", () => {
  if (current_card3 < images3.children.length - 1) {
    current_card3++;
    images3.style.transitionDuration = "0.5s";
    images3.style.transform = `translateX(-${current_card3 * 350}px)`;
  }
  if (current_card3 === images3.children.length - 1) {
    images3.style.transitionDuration = "0.0s";
    images3.style.transform = `translate(-350px)`;
  } else {
    return;
  }
});

previous3.addEventListener("click", () => {
  if (current_card3 > 0) {
    current_card3--;
    images3.style.transitionDuration = "0.5s";
    images3.style.transform = `translateX(-${current_card3 * 350}px)`;
  } else {
    return;
  }
});
