const lerp = (x, y, a) => x * (1 - a) + y * a;

this.pagePaths = ["/", "/games", "/software", "/contact"];
this.pages = {
  "/": document.querySelector('[data-page="home"]'),
  "/games/": document.querySelector('[data-page="games"]'),
  "/software/": document.querySelector('[data-page="software"]'),
  "/contact/": document.querySelector('[data-page="contact"]'),
};

current_page = pages["/"];
current_page.style.opacity = "1";
// console.log("current_page", current_page);

for (const link of document.querySelectorAll("._text")) {
  link.addEventListener("click", updatePage, false);
}

function updatePage(event) {
  event.preventDefault();
  window.history.pushState(null, "", event.target.href);
  this.pagePaths.includes(window.location.pathname)
    ? this.switchPage(window.location.pathname)
    : this.switchPage("/");
}

function switchPage(path) {
  fadeout(current_page);
  fadein(pages[path]);
  current_page = pages[path];
}

function fadeout(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function fadein(element) {
  var op = 0.1; // initial opacity
  element.style.display = "block";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}
