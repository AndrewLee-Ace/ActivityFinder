let map;
let check = false;

let place = {
  placeAddress: "",
  placeName: "",
  placeStatus: "",
  placePhoto: [],
};

let carousel = document.querySelector(".carousel");

let activityList = document.getElementById("names");

let suggestion = document.getElementById("suggestion");

// const x = document.getElementById("demo");

//  navigator.geolocation.getCurrentPosition(initMap);
// navigator.geolocation.getCurrentPosition(setCurrentLocation);

/*
Method to initialize a google map object 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Assigns map variable its position and location on page to map id
*/
function initMap() {
  let latlng;
  let searchAddress;
  let id;
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  const startPos = new google.maps.LatLng( //miami
    25.76136052122015,
    -80.19856387437098
  );

  // document.getElementById('search-text').value = 'Miami';

  //for search by query

  // let request = {
  //   query: 'Miami', //query string
  //   fields: [
  //     "name",
  //     "geometry",
  //     "business_status",
  //     "formatted_address",
  //     "photos",
  //     "rating",
  //     "icon_background_color",
  //     "html_attributions",
  //   ],
  // };

  // console.log(request.query);

  //for search by nearby search

  let request = {
    location: startPos, //query LatLng Object
    radius: "2000",
    type: ["tourist_attraction"],
  };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: startPos,
    zoom: 13,
  });

  const locationButton = document.getElementById("cur-location");
  
  locationButton.addEventListener("click", () => {
    if (check){
      return;
    }

    getLoaction();
    // try {
    //   while (document.getElementById("names").firstChild) {
    //     document
    //       .getElementById("names")
    //       .removeChild(document.getElementById("names").firstChild);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    // try {
    //   while (document.getElementById("carousel").firstChild) {
    //     document
    //       .getElementById("carousel")
    //       .removeChild(document.getElementById("carousel").firstChild);
    //   }
    // } catch (e) {
    //   console.log(e);
    // }

    // if (navigator.geolocation) {
    //   id = navigator.geolocation.watchPosition(
    //   // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //        let pos = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };
          // map.setCenter(pos);
    //       console.log('location used')
    //       // request.location = pos;

    //       // searchNearby();

    //       geocoder.geocode({location: pos}).then((response) => {
    //         // console.log(response.results[6].formatted_address);
    //         const fullAddy = response.results[6].formatted_address;

    //         const addy = fullAddy.substring(0, fullAddy.indexOf(','));
    //         document.getElementById('search-text').value = addy;
    //       })
    //       navigator.geolocation.clearWatch(id);
    //       check = true;
    //     }
        
    //   );
    // } else {
    //   // alert("Could not get current location");
    // }
  });

  navigator.geolocation.clearWatch(id);

  const service = new google.maps.places.PlacesService(map);

  document.getElementById("search-text").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchAddress = document.getElementById("search-text").value;

      if (searchAddress === ''){
        alert("Please enter a city to search");
        return;
      }
      // console.log(searchAddress)

      // request.query = searchAddress;

      try {
        while (document.getElementById("names").firstChild) {
          document
            .getElementById("names")
            .removeChild(document.getElementById("names").firstChild);
        }
      } catch (e) {
        console.log(e);
      }

      try {
        while (document.getElementById("carousel").firstChild) {
          document
            .getElementById("carousel")
            .removeChild(document.getElementById("carousel").firstChild);
        }
      } catch (e) {
        console.log(e);
      }

      // searchQuery();  //GET SINGULAR SEARCH. UNCOMMENT SEARCH BY QUERY

      geocoder.geocode({ address: searchAddress }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          latlng = new google.maps.LatLng(results[0].geometry.location);
          // console.log(latlng.lat);

          request.location = latlng;
        }
      });
      // console.log('SEARCH')
      searchNearby();  //GET AREA SEARCH. UNCOMMENT NEARBY SEARCH
    }
  });

  searchNearby(); //GET AREA SEARCH. UNCOMMENT NEARBY SEARCH
  
  // searchQuery();  GET SNGULAR SEARCH. UNCOMMENT SEARCH BY QUERY


    function searchQuery() {
      service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            const marker = new google.maps.Marker({
              position: results[i].geometry.location,
              map,
            });
  
            marker.addListener("click", () => {
              infowindow.setContent(
                `<strong>${results[i].name}</strong> <br> ` ||
                  "place"
              );
              infowindow.open({
                anchor: marker,
                map,
              });
            });
  
            // console.log(results[i]);
            try {
              place = {
                placeAddress: results[i].formatted_address,
                placeName: results[i].name,
                placeStatus: results[i].business_status,
                placePhoto: [results[i].photos[0].getUrl()],
              };
            } catch (error) {
              console.log("Cannot load image");
            }
  
            let carouselDiv = document.createElement("div");
            carouselDiv.setAttribute("class", "carousel_item");
  
            let imageName = document.createElement("h5");
            imageName.innerHTML = place.placeName;
  
            let image = document.createElement("img");
            image.setAttribute("alt", place.placeName);
            try {
              image.setAttribute("src", place.placePhoto);
            } catch (error) {
              console.log("Cannot load image");
            }

            carouselDiv.appendChild(imageName);
            carouselDiv.appendChild(image);
            carousel.appendChild(carouselDiv);
  
            let activityDiv = document.createElement("div");
            let activity = document.createElement("li");
            // let link = document.createElement("a");
            // link.setAttribute("href", "");
            // link.setAttribute("target", "_blank");
            // activity.appendChild(link);
            // link.innerHTML = place.placeName;
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
            items.forEach((item) =>
              item.classList.remove("carousel_item_selected")
            );
            buttons.forEach((button) =>
              button.classList.remove("carousel_button_selected")
            );
  
            items[i].classList.add("carousel_item_selected");
            button.classList.add("carousel_button_selected");
          });
        });
  
        if (items.length > 0) {
          //selects 1st item on page load
          items[0].classList.add("carousel_item_selected");
          buttons[0].classList.add("carousel_button_selected");
        }
      });
    }

  function searchNearby() {
    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          const marker = new google.maps.Marker({
            position: results[i].geometry.location,
            map,
          });

          marker.addListener("click", () => {
            infowindow.setContent(
              `<strong>${results[i].name}</strong> <br> ` ||
                "place"
            );
            infowindow.open({
              anchor: marker,
              map,
            });
          });

          // console.log(results[i]);
          try {
            place = {
              placeAddress: results[i].formatted_address,
              placeName: results[i].name,
              placeStatus: results[i].business_status,
              placePhoto: [results[i].photos[0].getUrl()],
            };
          } catch (error) {
            console.log("Cannot load image");
          }

          let carouselDiv = document.createElement("div");
          carouselDiv.setAttribute("class", "carousel_item");

          let description = document.getElementById("desc");
          let imageName = document.createElement("h5");
          imageName.innerHTML = place.placeName;

          let image = document.createElement("img");
          image.setAttribute("alt", place.placeName);
          try {
            image.setAttribute("src", place.placePhoto);
          } catch (error) {
            console.log("Cannot load image");
          }

          carouselDiv.appendChild(imageName);
          carouselDiv.appendChild(image);
          carousel.appendChild(carouselDiv);

          let activityDiv = document.createElement("div");
          let activity = document.createElement("li");
          // let link = document.createElement("a");
          // link.setAttribute("href", "");
          // link.setAttribute("target", "_blank");
          // activity.appendChild(link);
          // link.innerHTML = place.placeName;
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
          items.forEach((item) =>
            item.classList.remove("carousel_item_selected")
          );
          buttons.forEach((button) =>
            button.classList.remove("carousel_button_selected")
          );

          items[i].classList.add("carousel_item_selected");
          button.classList.add("carousel_button_selected");
        });
      });

      if (items.length > 0) {
        //selects 1st item on page load
        items[0].classList.add("carousel_item_selected");
        buttons[0].classList.add("carousel_button_selected");
      }
    });
  }

  function getLoaction(){
    check = true;
    if (navigator.geolocation) {
      id = navigator.geolocation.watchPosition(
      // navigator.geolocation.getCurrentPosition(
        (position) => {
           let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // map.setCenter(pos);
          // console.log('location used')
          // request.location = pos;

          // searchNearby();

          geocoder.geocode({location: pos}).then((response) => {
            // console.log(response.results[6].formatted_address);
            const fullAddy = response.results[6].formatted_address;

            const addy = fullAddy.substring(0, fullAddy.indexOf(','));
            document.getElementById('search-text').value = addy;
          })
          navigator.geolocation.clearWatch(id);
          check = true;
        }
        
      );
    } else {
      // alert("Could not get current location");
    }
  }
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
//     console.log(position);
//     let lat = position.coords.latitude
//     let lng = position.coords.longitude
//     console.log(`${lat} ${lng}`)
//     // setTimeout(map.setCenter({lat: lat, lng: lng}), 70000)
//     // map.setCenter({lat: lat, lng: lng});
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
try {
  window.initMap = initMap;
} catch {
  let err = document.getElementById("main");
  err.style.zIndex = 1;
  err.style.textAlign = "center";
  err.style.position = "absolute";
  err.style.color = "red";
  err.style.fontSize = "3rem";
  err.innerHTML = "An error has occurred. Please reload the page";
  // document.getElementById('main').appendChild(err);
}
