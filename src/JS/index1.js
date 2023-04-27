// const express = require('express');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// async function search2(){
//   const response = await fetch('http://localhost:8080/');
//   const jsonData = response.json();
//   console.log(jsonData)
// }

// search2();

// const x = require('./index');


// const apiKey =
//   "RNx77U6BnXwS3g7NhN7maiClddv-59QHvokUq5qZIUNY5nbPcfURR52CmpBsYhUE01k5oqlcuLxAEs1gcP8Nb0c8fTUR4zq_BzYRIVfaZTMjWXkfA3FDt5_V_HLKY3Yx";
// // export const lat = 6;
let lng;
let map;

let place = {
  placeAddress: "",
  placeName: "",
  placeStatus: "",
  placePhoto: [],
};

let businessArr = [];

let carousel = document.querySelector(".carousel");

let activityList = document.getElementById("names");

let suggestion = document.getElementById("suggestion");

// const x = document.getElementById("demo");

//  navigator.geolocation.getCurrentPosition(initMap);

// async function search(term, location, sortBy) {
//   const response = await fetch(
//     `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
//     {
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//       },
//     }
//   );

//   const jsonResponse = await response.json();

//   if (jsonResponse.businesses) {
//     return jsonResponse.businesses.map((business) => {
//       return {
//         id: business.id,
//         imageSrc: business.image_url,
//         name: business.name,
//         address: business.location.address1,
//         city: business.location.city,
//         state: business.location.state,
//         zipCode: business.location.zip_code,
//         category: business.categories[0].title,
//         rating: business.rating,
//         reviewCount: business.review_count,
//       };
//     });
//   }
// }

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

  // console.log(document.getElementById('search-text').value)

  const map = new google.maps.Map(document.getElementById("map"), {
    center: manhattan,
    zoom: 13,
  });

  const infowindow = new google.maps.InfoWindow();

  //for search by query

  let request = {
    query: "New York",
    fields: [
      "name",
      "geometry",
      "business_status",
      "formatted_address",
      "photos",
      "rating",
      "icon_background_color",
      "html_attributions",
    ],
  };

  //for search by nearby search

  // let request = {
  //   location: manhattan,
  //   radius: '500',
  //   type: ['tourist_attraction'],
  // };

  const service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function (results, status) {
    // service.nearbySearch(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        const marker = new google.maps.Marker({
          position: results[i].geometry.location,
          map,
        });
       
        marker.addListener("click", () => {
          infowindow.setContent(
            `<strong>${results[i].name}</strong> <br> ${results[i].formatted_address
            }` || "place"
          );
          infowindow.open({
            anchor: marker,
            map,
          });
        });

        // console.log(results[i]);
        
        place = {
          placeAddress: results[i].formatted_address,
          placeName: results[i].name,
          placeStatus: results[i].business_status,
          placePhoto: [
            results[i].photos[0].getUrl()
          ],
        };

        let carouselDiv = document.createElement("div");
        carouselDiv.setAttribute("class", "carousel_item");

        let image = document.createElement("img");
        image.setAttribute("alt", place.placeName);
        try {
          image.setAttribute("src", place.placePhoto);
        } catch (error) {
          console.log('Cannot load image');
        }
        

        carouselDiv.appendChild(image);
        carousel.appendChild(carouselDiv);

        let activityDiv = document.createElement("div");
        let activity = document.createElement("li");
        let link = document.createElement("a");
        link.setAttribute("href", "");
        link.setAttribute("target", "_blank");
        activity.appendChild(link);
        link.innerHTML = place.placeName;

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

  //uncomment the following
  
  // try{
  //   // throw new Error("No restaurants found");
  // search('italian', 'paris', 'best_match').then(businesses => {
  //   businesses.forEach((business) => {
  //     console.log(business)
  //     let bodyDiv = document.createElement('div');
  //     let imgDiv = document.createElement('div');
  //     let infoDiv = document.createElement('div');
  //     let addressDiv = document.createElement('div');
  //     let reviewDiv = document.createElement('div');
  //     let img1 = document.createElement('img');
  //     let img2 = document.createElement('img');
  //     let headings = document.createElement('h2');
  //     let address = document.createElement('p');
  //     let city = document.createElement('p');
  //     let zipCode = document.createElement('p');
  //     let category = document.createElement('h3');
  //     let rating = document.createElement('h3');
  //     let review = document.createElement('h3');

  //     suggestion.appendChild(bodyDiv);
  //     bodyDiv.appendChild(imgDiv);
  //     imgDiv.appendChild(img1);
  //     imgDiv.appendChild(img2)
  //     bodyDiv.appendChild(infoDiv);
  //     infoDiv.appendChild(headings);
  //     infoDiv.appendChild(addressDiv);
  //     addressDiv.appendChild(address);
  //     addressDiv.appendChild(city);
  //     addressDiv.appendChild(zipCode);
  //     infoDiv.appendChild(reviewDiv);
  //     reviewDiv.appendChild(category);
  //     reviewDiv.appendChild(rating);
  //     reviewDiv.appendChild(review);

  //     bodyDiv.setAttribute('class', 'business');

  //     imgDiv.setAttribute('class', 'img-container');
  //     img1.setAttribute('src', business.imageSrc);
  //     img1.setAttribute('class', 'bpic');
  //     img2.setAttribute('src', business.imageSrc);
  //     img2.setAttribute('class', 'fpic');

  //     headings.innerHTML = business.name;
  //     address.innerHTML = business.address;
  //     city.innerHTML = business.city;
  //     zipCode.innerHTML = business.zipCode;
  //     category.innerHTML = business.category;
  //     rating.innerHTML = `Rating: ${business.rating}`;
  //     review.innerHTML = `${business.reviewCount} Reviews`;

  //     infoDiv.setAttribute('class', 'info');

  //     addressDiv.setAttribute('class', 'address');

  //     reviewDiv.setAttribute('class', 'review');
  //   })

  // })
  // }
  // catch(e){
  //   let errorDiv = document.createElement('div');
  //   let error = document.createElement('h1');
  //   let errorMessage = 'Error: ' + e.message;
  //   error.innerHTML = errorMessage;
  //   errorDiv.setAttribute('class', 'error');
  //   document.getElementById('title').appendChild(errorDiv);
  //   errorDiv.appendChild(error);
  // }
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
try {
  window.initMap = initMap;
} catch{
  alert('Error loading page: please reload the page')
}

