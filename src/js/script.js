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

// Close popup function
function openPopup(id) {
  document.getElementById(id).style.display = "block";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}
