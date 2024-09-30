const tabLinks = document.querySelectorAll(".tab-links");
const tabContents = document.querySelectorAll(".tab-contents");

tabLinks.forEach((link) => {
  link.addEventListener("click", function () {
    tabLinks.forEach((tabLink) => {
      tabLink.classList.remove("active-link");
    });
    tabContents.forEach((content) => {
      content.style.display = "none";
    });

    this.classList.add("active-link");

    const tabContentId = this.textContent.toLowerCase();

    document.getElementById(tabContentId).style.display = "block";
  });
});

document.querySelectorAll(".services-list div").forEach((service) => {
  service.addEventListener("mouseenter", () => {
    gsap.to(service, {
      background: "linear-gradient(270deg, #DF8908 10%, #B415ff 100%)",
      y: -20,
      duration: 0.8,
    });
  });

  service.addEventListener("mouseleave", () => {
    gsap.to(service, {
      background: "#262626",
      y: 3,
      duration: 0.8,
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const workImages = document.querySelectorAll(".work img");

  workImages.forEach((image) => {
    image.addEventListener("mouseenter", function () {
      gsap.to(this, { scale: 1.3, duration: 0.5 });
    });

    image.addEventListener("mouseleave", function () {
      gsap.to(this, { scale: 1, duration: 0.5 });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const workItems = document.querySelectorAll(".work");

  workItems.forEach((work) => {
    const image = work.querySelector("img");
    const layer = work.querySelector(".layer");

    work.addEventListener("mouseenter", function () {
      gsap.to(image, { scale: 1.1, duration: 0.8 });
      gsap.to(layer, { height: "100%", duration: 0.8, ease: "power2.out" });
    });

    work.addEventListener("mouseleave", function () {
      gsap.to(image, { scale: 1, duration: 0.8 });
      gsap.to(layer, { height: 0, duration: 0.8, ease: "power2.out" });
    });
  });
});
const btn = document.querySelector(".btn");

btn.addEventListener("mouseenter", () => {
  gsap.to(btn, {
    background: "linear-gradient(45deg, #DF8908 10%, #B415ff 100%)",
    duration: 0.5,
  });
});

btn.addEventListener("mouseleave", () => {
  gsap.to(btn, {
    background: "#080808",
    duration: 0.3,
  });
});

const icons = document.querySelectorAll(".social-icons a");

icons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    gsap.to(icon, { color: "#B415ff", duration: 0.3 });
  });

  icon.addEventListener("mouseleave", () => {
    gsap.to(icon, { color: "#ababab", duration: 0.3 });
  });
});

const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");
const closeBtn = document.querySelector(".close");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

document.body.addEventListener("click", (event) => {
  if (!navLinks.contains(event.target) && !burger.contains(event.target)) {
    burger.classList.remove("active");
    navLinks.classList.remove("active");
  }
});

closeBtn.addEventListener("click", () => {
  burger.classList.remove("active");
  navLinks.classList.remove("active");
});

gsap.from(".nav-links", {
  opacity: 0,
  duration: 9,
  ease: "power1.out",
  yoyo: true,
});

gsap.from(".name", {
  opacity: 0,
  duration: 9,
  ease: "power1.out",
  yoyo: true,
});

const tl = gsap.timeline();
tl.add(() => {}, "+=2.2");

const text = "Hi, I'm Ankita";
text.split("").forEach((char, index) => {
  tl.to(".header-text h1 span", {
    textContent: text.slice(0, index + 1),
    ease: "power1.inOut",
    duration: 0.2,
  });
});
tl.yoyo(true);
tl.play();
