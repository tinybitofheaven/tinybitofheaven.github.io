import { gsap } from "gsap";

console.log("Script loaded!");

// const lerp = (x, y, a) => x * (1 - a) + y * a;

const pagePaths = ["/", "/games/", "/software/", "/contact/"];
const pages = {
  "/": document.querySelector('[data-page="home"]'),
  "/games/": document.querySelector('[data-page="games"]'),
  "/software/": document.querySelector('[data-page="software"]'),
  "/contact/": document.querySelector('[data-page="contact"]'),
};

pagePaths.forEach((path) => {
  pages[path].style.opacity = "0";
  pages[path].style.display = "none";
});

let current_page = pages["/"];
current_page.style.opacity = "1";
current_page.style.display = "block";

for (const link of document.querySelectorAll("._text")) {
  link.addEventListener("click", updatePage, false);
}
window.addEventListener("popstate", () => {
  updateView();
});

function updateView() {
  const t = window.location.pathname;
  pagePaths.includes(t) ? switchPage(t) : switchPage("/");
}

function updatePage(event) {
  event.preventDefault();
  document.querySelector(".selected").classList.remove("selected");
  event.target.parentElement.classList.add("selected");
  window.history.pushState(null, "", event.target.href);
  pagePaths.includes(window.location.pathname)
    ? switchPage(window.location.pathname)
    : switchPage("/");
}

function switchPage(path) {
  hidePage(current_page);
  showPage(pages[path]);
  current_page = pages[path];
}

function hidePage(page) {
  gsap.to(page, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      page.style.display = "none";
    },
  });
}

function showPage(page) {
  (page.style.display = "block"),
    gsap.fromTo(
      page,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.9,
      }
    );
}

// function fadeout(element) {
//   var op = 1; // initial opacity
//   var timer = setInterval(function () {
//     if (op <= 0.1) {
//       clearInterval(timer);
//       element.style.display = "none";
//     }
//     element.style.opacity = op;
//     element.style.filter = "alpha(opacity=" + op * 100 + ")";
//     op -= op * 0.1;
//   }, 50);
// }

// function fadein(element) {
//   var op = 0.1; // initial opacity
//   element.style.display = "block";
//   var timer = setInterval(function () {
//     if (op >= 1) {
//       clearInterval(timer);
//     }
//     element.style.opacity = op;
//     element.style.filter = "alpha(opacity=" + op * 100 + ")";
//     op += op * 0.1;
//   }, 10);
// }
