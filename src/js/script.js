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
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

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

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;


// Function to create the map and add elements
function createMap() {
    // Create the map
    var map = L.map('map3').setView([43, -8], 8);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Load and transform the Shape file to GeoJSON
    fetch('VECTORIAL/zonas_validas_shp/zonas_validas.shp')
        .then(response => response.json())
        .then(data => {
            // Define the color ramp based on the Aptitude values
            var getColor = function(d) {
                return d > 2 ? 'green' :
                       d > 1 ? 'yellow' :
                               'red';
            };

            // Define the style for each feature
            var style = function(feature) {
                return {
                    fillColor: getColor(feature.properties.DN),
                    weight: 0.2,
                    opacity: 1,
                    color: 'black',
                    fillOpacity: 0.7
                };
            };

            // Define the popup content
            var onEachFeature = function(feature, layer) {
                if (feature.properties && feature.properties.DN) {
                    layer.bindPopup("Aptitud: " + feature.properties.DN);
                }
            };

            // Add GeoJSON layer to the map
            L.geoJson(data, {
                style: style,
                onEachFeature: onEachFeature
            }).addTo(map);

            // Add layer control
            L.control.layers(null, {
                'Galicia_Ecualiptus': L.geoJson(data, {
                    style: style,
                    onEachFeature: onEachFeature
                })
            }).addTo(map);
        });
}

// Call the function to create the map
createMap();
