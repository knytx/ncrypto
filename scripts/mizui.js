// Navbar Functions
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const main = document.getElementById('main-content');

function openMobileNavbar() {
  navbar.classList.add('opened');
  main.classList.add("no-scroll");
  navbarToggle.setAttribute('aria-expanded', 'true');
}

function closeMobileNavbar() {
  navbar.classList.remove('opened');
  main.classList.remove("no-scroll");
  navbarToggle.setAttribute('aria-expanded', 'false');
}

navbarToggle.addEventListener('click', () => {
  if (navbar.classList.contains('opened')) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});

var dropdownButtons = document.querySelectorAll('.dropdown-btn');
dropdownButtons.forEach(function (btn) {
  btn.addEventListener("click", toggle.bind(this, btn.id));
})

function toggle(id) {
  var sideNav = document.querySelectorAll('.dropmenu-' + id);
  sideNav.forEach(function (el) {
    if (!el.classList.contains('dropmenu-open')) {
      el.classList.add('dropmenu-open');
    } else {
      el.classList.remove('dropmenu-open');
    }
  })
}

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
    searchBox.style.display = "none";
  }
}