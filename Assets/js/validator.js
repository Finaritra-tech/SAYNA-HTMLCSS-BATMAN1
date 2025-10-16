// Récupérer les éléments
const popupbox = document.getElementById("popupbox");
const confirmer = document.getElementById("show");

// Afficher le popup
confirmer.addEventListener("click", function () {
  popupbox.style.display = "block"; // Afficher le popup
});

//enlever le popup
popupbox.addEventListener("click", function () {
  popupbox.style.display = "none"; // Enlever le popup
});
