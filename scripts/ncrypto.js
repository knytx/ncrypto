function initializeNCRYPTO() {
    let tabPanel = document.getElementsByClassName("tab-panel");
    for (let index = 0; index < tabPanel.length; index++) {
        tabPanel[index].style.display = "none";
    }

    let defaultSectionButton = document.getElementById("defaultSection");
    defaultSectionButton.click();
}

function openAboutSection(event, sectionName) {
    let tabPanel = document.getElementsByClassName("tab-panel");
    for (let index = 0; index < tabPanel.length; index++) {
        tabPanel[index].style.display = "none";
    }

    let tabLinks = document.getElementsByClassName("tab-links");
    for (let index = 0; index < tabLinks.length; index++) {
        tabLinks[index].className = tabLinks[index].className.replace(" active btn-active", "");
    }

    document.getElementById(sectionName).style.display = "block";
    event.currentTarget.className += " active btn-active";
}


// {# <script>
//     if ('serviceWorker' in navigator) {
//         // sw.js can literally be empty, but must exist
//         // navigator.serviceWorker.register('/sw.js');6
//         window.addEventListener('load', function () {
//             navigator.serviceWorker.register('/sw.js').then(function (registration) {
//                 // Registration was successful
//                 console.log('ServiceWorker registration successful with scope: ', registration
//                     .scope);
//             }, function (err) {
//                 // registration failed :(
//                 console.log('ServiceWorker registration failed: ', err);
//             });
//         });
//     }
// </script> #}

initializeNCRYPTO();