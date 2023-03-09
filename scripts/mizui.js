// Navbar Functions
const navbar = document.getElementById("navbar");
const navbarToggle = document.getElementById("navbar-toggle");

// Toggle Navbar Menu 
navbarToggle.addEventListener("click", () => {
  if (navbar.classList.contains("opened")) {
    // Close Mobile Navbar
    navbar.classList.remove("opened");
    navbarToggle.setAttribute("aria-expanded", "false");
  } else {
    // Open Mobile Navbar
    navbar.classList.add("opened");
    navbarToggle.setAttribute("aria-expanded", "true");
  }
});

// Add Background to Navbar when scrolling down below certain limit.
window.addEventListener("scroll", () => {
  if (window.scrollY >= 80) {
    navbar.classList.add("navbar-bg")
  } else {
    navbar.classList.remove("navbar-bg")
  }
})

// Alert dismissible
const alertBar = document.getElementById("alert-closable");
const alertClose = document.getElementById("alert-close");

alertClose.addEventListener("click", () => {
  if (!alertBar.classList.contains("hide")) {
    alertBar.classList.add("hide");
  }
});

// Search close

let searchBox = document.querySelector(".search-box");

window.onclick = function (e) {
  if (e.target == searchBox) {
    searchBox.style.display = "none";
  }
};

window.onkeyup = function (e) {
  if (e.keyCode === 27) {
    searchBox.style.display = "none";
  }
};