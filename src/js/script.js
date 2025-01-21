const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Save user preference on load
const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

// Function to create the map and add elements
function createMap() {
  // Create the map
  var map = L.map("map3").setView([42, -5], 7);

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Load and transform the Shape file to GeoJSON
  fetch("assets/VECTORIAL/zonas_validas_shp/ZONAS_VALIDAS.geojson")
    .then((response) => response.json())
    .then((data) => {
      // Create a color scale
      var colorScale = chroma.scale(["red", "yellow", "green"]).domain([5, 4, 3]);

      // Define the style for each feature
      var style = function (feature) {
        return {
          fillColor: colorScale(feature.properties.DN),
          weight: 0.2,
          opacity: 1,
          color: "black",
          fillOpacity: 0.7,
        };
      };

      // Define the popup content
      var onEachFeature = function (feature, layer) {
        if (feature.properties && feature.properties.DN) {
          layer.bindPopup("Aptitud: " + feature.properties.DN);
        }
      };

      L.geoJson(data, {
        style: style,
        onEachFeature: onEachFeature,
      }).addTo(map);
      
      // Add color scale legend
      var legend = L.control({ position: "bottomright" });
      legend.onAdd = function () {
        var div = L.DomUtil.create("div", "info legend"),
          grades = [3, 4, 5],
          labels = [];
        div.innerHTML += "<strong>Aptitud</strong><br>";
        // Loop through intervals to generate legend labels
        for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' +
            colorScale(grades[i]) +
            '"></i> ' +
            grades[i] +
            (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
        }
        return div;
      };
      legend.addTo(map);
    });
}

// Function to create the raster map and add elements
function createRasterMap() {
  // Create the map
  var map = L.map("map6").setView([38.9, -0.28], 11);

  // Add OpenStreetMap tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Function to load PNG
  function loadPNG(url, bounds) {
    return L.imageOverlay(url, bounds, { opacity: 0.7 });
  }

  // Load PNG layers
  var saviPreLayer = loadPNG("assets/RASTER/savi_pre_prac9.png", [
    [38.8, -0.40],
    [39.0, -0.15],
  ]);
  var saviPostLayer = loadPNG("assets/RASTER/savi_post_prac9.png", [
    [38.8, -0.40],
    [39.0, -0.15],
  ]);

  // Add layers to map
  saviPreLayer.addTo(map);

  // Add layer control
  L.control.layers(null, {
    "SAVI Pre": saviPreLayer,
    "SAVI Post": saviPostLayer,
  }).addTo(map);
}

// Close popup function
function openPopup(id) {
  document.getElementById(id).style.display = "block";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}




function openPopup(id) {
  document.getElementById(id).style.display = 'flex';
  if(id=='popup3'){
    createMap();
  }
}

function closePopup(id) {
  document.getElementById(id).style.display = 'none';
}




//  Scroll del botón 
document.querySelector('.btn-secondary').addEventListener('click', function (e) {
  e.preventDefault(); // Evita el comportamiento predeterminado del enlace
  const target = document.querySelector('#projects'); // Selecciona la sección de destino
  const targetPosition = target.offsetTop; // Calcula la posición en píxeles desde el top
  const startPosition = window.scrollY; // Posición actual
  const distance = targetPosition - startPosition; // Distancia total a desplazarse
  const duration = 800; // Duración en milisegundos (0.8 segundos)
  let start = null;

  // Función para realizar la animación
  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const easeInOutQuad = progress / duration < 0.5
      ? 2 * Math.pow(progress / duration, 2)
      : 1 - Math.pow(-2 * (progress / duration) + 2, 2) / 2;
    const scrollPosition = startPosition + distance * easeInOutQuad;

    window.scrollTo(0, scrollPosition);

    if (progress < duration) {
      window.requestAnimationFrame(step); // Sigue la animación
    } else {
      window.scrollTo(0, targetPosition); // Asegura la posición final exacta
    }
  }

  window.requestAnimationFrame(step); // Inicia la animación
});








document.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("scroll");
  } else {
    navbar.classList.remove("scroll");
  }
});








 // Script para actualizar la barra de progreso
 window.addEventListener("scroll", () => {
  const progressBar = document.querySelector(".progress__bar");
  const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (window.scrollY / scrollTotal) * 100;
  progressBar.style.width = `${scrollPercentage}%`;
});





