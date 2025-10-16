//Animation pour afficher la session du quizz
$(document).ready(function () {
  $("#btn_start").click(function () {
    $("#section3_game").slideDown(1000);
    $("#section2_game").slideUp(1000);
  });
});

$(document).ready(function () {
  $("#suivante").click(function () {
    $("#section3_game").fadeOut(1);
    $("#section3_game").fadeIn(1000);
    $("#quel").fadeIn(2000);
  });
});

let answersArray = []; // Tableau pour stocker la réponse correcte et les réponses incorrectes
let currentIndex = 0; // Index de la question actuelle
let quizData = []; // Stockera les questions du quiz

// Charger les questions depuis le fichier JSON
$.getJSON("Assets/json/quizz.json", function (data) {
  quizData = data.results; // Stocker toutes les questions
  afficherQuestion(); // Afficher la première question
}).fail(function () {
  console.error("Erreur de chargement du fichier JSON");
});

// Fonction pour afficher une question en fonction de currentIndex
function afficherQuestion() {
  if (currentIndex < quizData.length) {
    let questionData = quizData[currentIndex];

    let correctAnswer = questionData.answer;
    let incorrectAnswers = questionData.answers;

    let answersArray = [correctAnswer, ...incorrectAnswers];
    shuffleArray(answersArray); // Mélanger les réponses

    // Afficher la question
    $("#quel").text(questionData.question);

    // Afficher les réponses dans les spans
    $("#span1").text(answersArray[0]);
    $("#span2").text(answersArray[1]);
    $("#span3").text(answersArray[2]);
    $("#span4").text(answersArray[3]);
  } else {
    // Fin du quiz
    $("#quel").text("Fin du quiz !");
    // $("#answers span").text(""); // Effacer les réponses
    $("#suivante").prop("disabled", true); // Désactiver le bouton
  }
}

// Fonction pour passer à la question suivante
$("#suivante").click(function () {
  currentIndex++; // Passer à la question suivante
  afficherQuestion(); // Mettre à jour l'affichage
  $("#ordre").text(currentIndex + 1 + "/10"); // Afficher le numéro de la question
});

// Fonction pour mélanger un tableau (méthode de Fisher-Yates)
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Échange des éléments
  }
}

//checkbox
// $(function () {
//   // Équivalent de DOMContentLoaded
//   $('input[type="checkbox"]').on("change", function () {
//     if ($(this).prop("checked")) {
//       // Récupération du contenu du span adjacent
//       spanContent = $(this).next("span").text().trim();
//       point = 0;
//       //console.log("Contenu du span :", spanContent);
//       $.getJSON("Assets/json/quizz.json", function (data) {
//         console.log(spanContent);

//         if (spanContent == data.results[currentIndex].answer) {
//           point = point + 1;
//           console.log("Bonne réponse" + point);
//         } else {
//           console.log("Mauvaise réponse");
//         }
//       });

//       // Désélection des autres checkboxes
//       $('input[type="checkbox"]').not(this).prop("checked", false);
//     }
//   });
// });

$(function () {
  let point = 0; // Déclaré dans la portée parente
  // let currentIndex = 0; // À adapter selon votre logique

  $('input[type="checkbox"]').on("change", function () {
    if ($(this).prop("checked")) {
      const spanContent = $(this).next("span").text().trim();

      $.getJSON("Assets/json/quizz.json", function (data) {
        if (spanContent === data.results[currentIndex].answer) {
          point += 1; // Modification de la variable externe
          console.log("Bonne réponse. Points :", point);
        } else {
          console.log("Mauvaise réponse. Points :", point);
        }
      });

      $('input[type="checkbox"]').not(this).prop("checked", false);
    }
  });

  // Exemple d'utilisation ailleurs dans le script :
  function afficherPoints() {
    console.log("Total des points :", point);
  }
});

//Réinitialiser les checkbox
$(document).ready(function () {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  $("#suivante").click(function () {
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // checkbox.checked = !checkbox.checked;
        checkbox.checked = false;
      }
    });
  });
});
