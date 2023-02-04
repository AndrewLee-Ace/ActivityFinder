// let cords = document.getElementById('demo')
let lat
let lng
let map
const x = document.getElementById("demo");

//  navigator.geolocation.getCurrentPosition(setCurrentLocation);
 navigator.geolocation.getCurrentPosition(initMap);

/*
Method to initialize a google map object with its current position centered around user's coordinates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Assigns map variable its position and location on page to map id
*/
function initMap(position) {
    map = new google.maps.Map(document.getElementById("map"), {
    // center: { lat: 40.737661129048384, lng: -73.98407565617671 },
      center: { lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 13,
    });
  }

/*
Method to get current location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
getCurrentPosition returns coordinate object to function within its parameter 
*/
// function getLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(setCurrentLocation);
//   } else { 
//     x.innerHTML = "Geolocation is not supported by this browser.";
//   }
// }

/*
Method used in button to use current location on google maps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
longitude and latitude saved into variables that creates a map object that displays the map with your
current location as its center.
*/
function setCurrentLocation(position) {
    lat = position.coords.latitude
    lng = position.coords.longitude
    // console.log(`${lat} ${lng}`)
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: lat, lng: lng},
        zoom: 13
    })
}

function notify(){
    let button = document.getElementById('curlocation')
    button.innerHTML = 'Allow a couple seconds for location to be acquired'
}

function revert(){
    let button = document.getElementById('curlocation')
    button.innerHTML = 'Use Current Location'

}




//   function useCurrentLocation(){
//       map = {
//           center: { lat: lat, lng: lng},
//           zoom: 13
//       }
//   }
  
  window.initMap = initMap;