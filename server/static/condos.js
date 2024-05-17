var map;

var locationModal = document.getElementById('location-modal');
locationModal.style.display = 'none';

// Function to add marker to map
function addMarker(lat, lng) {
    L.marker([lat, lng]).addTo(map);
}

function showMap() {
    locationModal.style.display = 'block';
    var map = L.map('condo-location-container').setView([lat, lng], 13); // Default view (world map)
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);
}

 // Click event listener for "View Map" buttons
 var mapButtons = document.querySelectorAll('.view-map-btn');
 mapButtons.forEach(function(button) {
    console.log(button);
    locationModal.style.display = 'Block';
    button.addEventListener('click', function() {
        // Get latitude and longitude from data attributes
        var lat = parseFloat(button.getAttribute('data-lat'));
        var lng = parseFloat(button.getAttribute('data-lng'));
    
        var map = L.map('condo-location-container').setView([lat, lng], 13); // Default view (world map)
        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
        }).addTo(map);
            addMarker(lat, lng);
        });
 });

 // Click event listener for "Add Condo" button
 var addCondoBtn = document.getElementById('add-condo-btn');
 var addCondoModal = document.getElementById('add-condo-modal');
 var addCondoCloseBtn = document.getElementsByClassName('close')[0];

 addCondoModal.style.display = 'none';
 addCondoCloseBtn.onclick = function() {
     addCondoModal.style.display = 'none';
 };

 window.onclick = function(event) {
     if (event.target == addCondoModal) {
         addCondoModal.style.display = 'none';
     }
 };

 // Define variables for map and marker
 var mapModal;
 var marker;

 // Function to initialize Leaflet map in the modal
 function initMapModal() {

     if (mapModal) {
         mapModal.remove();
     }
     // Create map object
     mapModal = L.map('map-modal-container').setView([40, -8], 5); // Default view (world map)
     
     if (marker) {
         mapModal.removeLayer(marker);
         marker = null;
     }

     // Add OpenStreetMap tile layer
     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
         maxZoom: 18,
     }).addTo(mapModal);

     // Click event listener for the map
     mapModal.on('click', function(event) {
         var latlng = event.latlng;
         if (!marker) {
             marker = L.marker(latlng).addTo(mapModal);
         } else {
             marker.setLatLng(latlng);
             console.log(latlng);
         }
         mapModal.setView(latlng,mapModal.getZoom(),{animate: true})
     });
 }

 // Open map modal when "Add Condo" button is clicked
 addCondoBtn.onclick = function() {
     addCondoModal.style.display = 'block';
     // Initialize map in the modal
     initMapModal();
 };

 // Submit event listener for "Add Condo" form
 var addCondoForm = document.getElementById('add-condo-form');
 addCondoForm.onsubmit = function(event) {
     event.preventDefault();

     var name = document.getElementById('name').value;
     var location = document.getElementById('location').value;
     var owner = document.getElementById('owner').value;

     // Split location string into latitude and longitude
     var locationArray = location.split(",");
     var lat = parseFloat(locationArray[0]);
     var lng = parseFloat(locationArray[1]);

     // Add a new row to the table
     var tableBody = document.querySelector('#condo-table tbody');
     var newRow = tableBody.insertRow();
     
     
     newRow.innerHTML = `
         <td>${tableBody.rows.length}</td>
         <td>${name}</td>
         <td>${location}</td>
         <td><button class="view-map-btn" data-lat="${lat}" data-lng="${lng}" onclick="showMap(\'' + result.name + '\')")">View Map</button></td>
         <td>${owner}</td>
     `;

     // Close modal
     addCondoModal.style.display ='none';

     // Reset form fields
     addCondoForm.reset();
 };

// // Call initMap function when the page is loaded
// window.onload = function() {
//     initMap();
// };
