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
  var input = document.getElementsByTagName("input");
  alert.addEventListener("click", function(){
    if(input.value != ""){
      swal("Succès !", "Le formulaire à bien été envoyé !", "success");
    }
    else if(input.value === "") { //email.validity.typeMismatch
      swal("Erreur !", "Veuillez vérifier les informations rentrées !", "error");
    }
  });
});

function initMap() {
  var map;
  var infoWindow;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 15
  });

  infoWindow = new google.maps.InfoWindow;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Vous êtes ici.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}

function dessiner() {
  var canevas = document.getElementById('canvas');
  if (canevas.getContext) {
    var ctx = canevas.getContext('2d');

    rectArrondi(ctx, 12, 12, 185, 170, 15);
    rectArrondi(ctx, 19, 19, 171, 155, 9);
    rectArrondi(ctx, 53, 53, 49, 33, 10);
    rectArrondi(ctx, 53, 119, 49, 16, 6);
    rectArrondi(ctx, 135, 53, 49, 33, 10);
    rectArrondi(ctx, 135, 119, 25, 49, 10);

    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI/7, -Math.PI/7, false);
    ctx.lineTo(31, 37);
    ctx.fill();
    ctx.stroke();

    for(var i = 0; i< 8; i++) {
      ctx.fillStyle = "black";
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }

    for(i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }

    for(i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

// Une fonction utilitaire pour tracer des rectangles avec des coins arrondis

function rectArrondi(ctx, x, y, largeur, hauteur, rayon) {
  ctx.beginPath();
  ctx.moveTo(x, y + rayon);
  ctx.lineTo(x, y + hauteur - rayon);
  ctx.quadraticCurveTo(x, y + hauteur, x + rayon, y + hauteur);
  ctx.lineTo(x + largeur - rayon, y + hauteur);
  ctx.quadraticCurveTo(x + largeur, y + hauteur, x + largeur, y + hauteur - rayon);
  ctx.lineTo(x + largeur, y + rayon);
  ctx.quadraticCurveTo(x + largeur, y, x + largeur - rayon, y);
  ctx.lineTo(x + rayon,y);
  ctx.quadraticCurveTo(x, y, x, y + rayon);
  ctx.stroke();
}
