(function(){
  var dndHandler = {
    draggedElement: null, // Propriété pointant vers l'élément en cours de déplacement
    applyDragEvents: function(element) {
      element.draggable = true;
      var dndHandler = this; // Cette variable est nécessaire pour que l'événement "dragstart" ci-dessous accède facilement au namespace "dndHandler"
      element.addEventListener('dragstart', function(e) {
        dndHandler.draggedElement = e.target; // On sauvegarde l'élément en cours de déplacement
        e.dataTransfer.setData('text/plain', ''); // Nécessaire pour Firefox
      }, false);
    },
    applyDropEvents: function(dropper) {
      dropper.addEventListener('dragover', function(e) {
        e.preventDefault(); // On autorise le drop d'éléments
        this.className = 'dropper drop_hover'; // Et on applique le design adéquat à notre zone de drop quand un élément la survole
      }, false);

      dropper.addEventListener('dragleave', function() {
        this.className = 'dropper'; // On revient au design de base lorsque l'élément quitte la zone de drop
      });

      var dndHandler = this; // Cette variable est nécessaire pour que l'événement "drop" ci-dessous accède facilement au namespace "dndHandler"

      dropper.addEventListener('drop', function(e) {
        var target = e.target,
            draggedElement = dndHandler.draggedElement, // Récupération de l'élément concerné
            clonedElement = draggedElement.cloneNode(true); // On créé immédiatement le clone de cet élément

        target.className = 'dropper'; // Application du design par défaut
        clonedElement = target.appendChild(clonedElement); // Ajout de l'élément cloné à la zone de drop actuelle
        dndHandler.applyDragEvents(clonedElement); // Nouvelle application des événements qui ont été perdus lors du cloneNode()
        draggedElement.parentNode.removeChild(draggedElement); // Suppression de l'élément d'origine
      });
    }
  };
  var elements = document.querySelectorAll('.draggable'),
      elementsLen = elements.length;

  for(var i = 0 ; i < elementsLen ; i++) {
    dndHandler.applyDragEvents(elements[i]); // Application des paramètres nécessaires aux élément déplaçables
  }

  var droppers = document.querySelectorAll('.dropper'),
      droppersLen = droppers.length;

  for(var i = 0 ; i < droppersLen ; i++) {
    dndHandler.applyDropEvents(droppers[i]); // Application des événements nécessaires aux zones de drop
  }
})();


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

$(document).ready(function(){
  var scrollLink  = $('.scroll');
  scrollLink.click(function(e){
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000);
  });
});

$(document).ready(function(){
  var alert = document.getElementById("submit");
  var target = document.getElementById("formulaire");
  var email = document.getElementById("validationServerEmail");
  alert.addEventListener("click", function(){
    if(target.className == "needs-validation" && target.className == "was-validated"){
      swal("Succès !", "Le formulaire à bien été envoyé !", "success");
    }
    else if(email.validity.typeMismatch || email.value === "") {
      swal("Erreur !", "Veuillez vérifier les informations rentrées !", "error");
    }
  });
});
