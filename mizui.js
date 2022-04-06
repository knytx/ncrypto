// Navbar Functions
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');

function openMobileNavbar() {
  navbar.classList.add('opened');
  navbarToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileNavbar() {
  navbar.classList.remove('opened');
  navbarToggle.setAttribute('aria-expanded', 'false');
}

navbarToggle.addEventListener('click', () => {
  if (navbar.classList.contains('opened')) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});


// Alert dismissible
const alertBar = document.getElementById('alert-closable');
const alertClose = document.getElementById('alert-close');

alertClose.addEventListener('click', () => {
  if (!alertBar.classList.contains('hide')) {
    alertBar.classList.add('hide');
  }
});


// Search close

let searchBox = document.querySelector(".search-box");

window.onclick = function (e) {
  if (e.target == searchBox) {
    searchBox.style.display = "none"
  }
}

window.onkeyup = function (e) {
  if (e.keyCode === 27) {
    searchBox.style.display="none";
  }
 }