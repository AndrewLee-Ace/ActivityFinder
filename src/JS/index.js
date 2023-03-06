// let cords = document.getElementById('demo')
let lat;
let lng;
let map;

let place = {
  placeAddress: '',
  placeName: '',
  placeStatus: '',
  placePhoto: [],
}

let carousel = document.querySelector(".carousel");

let activityList = document.getElementById('names'); 

const x = document.getElementById("demo");

//  navigator.geolocation.getCurrentPosition(initMap);

/*
Method to initialize a google map object 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Assigns map variable its position and location on page to map id
*/
function initMap(position) {
  const manhattan = new google.maps.LatLng(
    40.737661129048384,
    -73.98407565617671
  );

  const map = new google.maps.Map(document.getElementById("map"), {
    center: manhattan,
    zoom: 13,
  });

  const infowindow = new google.maps.InfoWindow();
  
  //for search by query
  let request = {
    query: 'eiffel tower',
    fields: ['name', 'geometry', 'business_status',  'formatted_address','photos', 'rating', 'icon_background_color', 'html_attributions'],
  }; 

  //for search by nearby search
  // let request = {
  //   location: manhattan,
  //   radius: '500',
  //   type: ['tourist_attraction'],
  // }; 


  const service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK){
      for (let i = 0; i < results.length; i++){
        const marker = new google.maps.Marker({
          position: results[i].geometry.location,
          map,
        });
        console.log(results[i].html_attributions);
        marker.addListener("click", () => {
          infowindow.setContent(`<strong>${results[i].name}</strong> <br> ${results[i].formatted_address}`|| "place");
          infowindow.open({
            anchor: marker,
            map,
          });
        });
        
        console.log(results[i]);

        place = {
          placeAddress: results[i].formatted_address,
          placeName: results[i].name,
          placeStatus: results[i].business_status,
          placePhoto: 
            [results[i].photos[0].getUrl({maxWidth: 1000, maxHeight: 1000})]
            // [results[i].photos.forEach(photo => {
            //   photo.getUrl({maxWidth: 100, maxHeight: 100});
            // })]
        };
        
        let carouselDiv = document.createElement("div");
        carouselDiv.setAttribute("class", "carousel_item");

        let image = document.createElement("img");
        image.setAttribute("alt", place.placeName);
        image.setAttribute("src", place.placePhoto); 


        carouselDiv.appendChild(image);
        carousel.appendChild(carouselDiv);

        let activityDiv = document.createElement("div");
        let activity = document.createElement("li");
        activity.innerHTML = place.placeName;

        activityDiv.appendChild(activity);
        activityList.appendChild(activityDiv);
      }
      map.setCenter(results[0].geometry.location);

      // console.log(place); 
    }
    
    
    const items = carousel.querySelectorAll(".carousel_item");
        const buttonsHTML = Array.from(items, () => {
          return `<span class="carousel_button"></span>`;
        });
      
        carousel.insertAdjacentHTML(
          "beforeend",
          `
        <div class="carousel_nav">
          ${buttonsHTML.join("")}
        </div>`
        );
      
        const buttons = carousel.querySelectorAll(".carousel_button");
        buttons.forEach((button, i) => {
          button.addEventListener("click", () => {
            //unselect all items
            items.forEach((item) => item.classList.remove("carousel_item_selected"));
            buttons.forEach((button) =>
              button.classList.remove("carousel_button_selected")
            );
      
            items[i].classList.add("carousel_item_selected");
            button.classList.add("carousel_button_selected");
          });
        });
      
        if (items.length > 0){
          //selects 1st item on page load
          items[0].classList.add("carousel_item_selected");
          buttons[0].classList.add("carousel_button_selected");
        }
  })

  
  // let request1 = {
  //   query: 'washington square park',
  //   fields: ['name', 'geometry', 'business_status',  'formatted_address','photos'],
  // }; 

  // service.findPlaceFromQuery(request1, function(results, status) {
  //   if (status === google.maps.places.PlacesServiceStatus.OK){
  //     for (let i = 0; i < results.length; i++){
  //       const marker = new google.maps.Marker({
  //         position: results[i].geometry.location,
  //         map,
  //         // icon: results[i].photos[0].getUrl({maxWidth: 100, maxHeight: 100}),
  //       });

  //       marker.addListener("click", () => {
  //         infowindow.setContent( results[i].name|| "place");
  //         infowindow.open({
  //           anchor: marker,
  //           map,
  //         });
  //       });
  //       // console.log(results[i]);
  //     }
      
      
  //     place = {
  //       placeAddress: results[0].formatted_address,
  //       placeName: results[0].name,
  //       placeStatus: results[0].business_status
  //     };
      

  //     console.log(place); 
      
  //   }
  // })

  // const marker = new google.maps.Marker({
  //   position: manhattan,
  //   map,
  //   title: "3rd Ave & E 21st St",
  // });

  // marker.addListener("click", () => {
  //   infowindow.open({
  //     anchor: marker,
  //     map,
  //   });
  // });
}


//////////////////////////////// //////////////////////////////////

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
// function setCurrentLocation(position) {
//     lat = position.coords.latitude
//     lng = position.coords.longitude
//     // console.log(`${lat} ${lng}`)
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: {lat: lat, lng: lng},
//         zoom: 13
//     })
// }

// function notify(){
//     let button = document.getElementById('curlocation')
//     button.innerHTML = 'Allow a couple seconds for location to be acquired'
// }

// function revert(){
//     let button = document.getElementById('curlocation')
//     button.innerHTML = 'Use Current Location'

// }

//   function useCurrentLocation(){
//       map = {
//           center: { lat: lat, lng: lng},
//           zoom: 13
//       }
//   }

window.initMap = initMap;
