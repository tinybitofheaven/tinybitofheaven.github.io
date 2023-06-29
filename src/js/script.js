import { gsap } from "gsap";

console.log("Script loaded!");

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
  link.addEventListener("mouseover", letterScramble, false);
}

for (const link of document.querySelectorAll("._link")) {
  link.addEventListener("mouseover", letterScramble, false);
}

document
  .querySelector(".siteHeader_title")
  .addEventListener("mouseover", letterScramble, false);

function letterScramble(event) {
  let iterations = 0;

  const interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          return event.target.dataset.value[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iterations >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iterations += 1 / 2;
  }, 30);
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

var container = document.querySelector(".screen");
var image = document.querySelector(".bg-img");
var rect = container.getBoundingClientRect();
var mouse = { x: 0, y: 0, moved: false };

document.onmousemove = (e) => {
  mouse.moved = true;
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
};

// Ticker event will be called on every frame
gsap.ticker.add(function () {
  if (mouse.moved) {
    parallaxIt(image, -30);
  }
  mouse.moved = false;
});

function parallaxIt(target, movement) {
  gsap.to(target, {
    x: ((mouse.x - rect.width / 2) / rect.width) * movement,
    y: ((mouse.y - rect.height / 2) / rect.height) * movement,
    duration: 0.5,
  });
}
