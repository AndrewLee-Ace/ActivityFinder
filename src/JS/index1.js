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

const apiKey =
  "RNx77U6BnXwS3g7NhN7maiClddv-59QHvokUq5qZIUNY5nbPcfURR52CmpBsYhUE01k5oqlcuLxAEs1gcP8Nb0c8fTUR4zq_BzYRIVfaZTMjWXkfA3FDt5_V_HLKY3Yx";
// export const lat = 6;
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

async function search(term, location, sortBy) {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  const jsonResponse = await response.json();

  if (jsonResponse.businesses) {
    return jsonResponse.businesses.map((business) => {
      return {
        id: business.id,
        imageSrc: business.image_url,
        name: business.name,
        address: business.location.address1,
        city: business.location.city,
        state: business.location.state,
        zipCode: business.location.zip_code,
        category: business.categories[0].title,
        rating: business.rating,
        reviewCount: business.review_count,
      };
    });
  }
}


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
    query: "eiffel tower",
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
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        const marker = new google.maps.Marker({
          position: results[i].geometry.location,
          map,
        });
        // console.log(results[i].html_attributions);
        marker.addListener("click", () => {
          infowindow.setContent(
            `<strong>${results[i].name}</strong> <br> ${results[i].formatted_address}` ||
              "place"
          );
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
          placePhoto: [
            results[i].photos[0].getUrl({ maxWidth: 1000, maxHeight: 1000 }),
          ],
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


  // search('italian', 'paris', 'best_match').then(businesses => {
  //   businesses.forEach((business) => {
  //     let bodyDiv = document.createElement('div');
  //     let imgDiv = document.createElement('div');
  //     let infoDiv = document.createElement('div');
  //     let addressDiv = document.createElement('div');
  //     let reviewDiv = document.createElement('div');
  //     let img = document.createElement('img');
  //     let headings = document.createElement('h2');
      
      
  //     suggestion.appendChild(bodyDiv);
  //     bodyDiv.appendChild(imgDiv);
  //     imgDiv.appendChild(img);
  //     bodyDiv.appendChild(headings);
  //     bodyDiv.appendChild(infoDiv);
  //     infoDiv.appendChild(addressDiv);
  //     infoDiv.appendChild(reviewDiv);

  //     bodyDiv.setAttribute('class', 'business');

  //     imgDiv.setAttribute('class', 'img_container');
  //     img.setAttribute('src', business.imageSrc);

  //     headings.innerHTML = business.name;

  //     infoDiv.setAttribute('class', 'info');

  //     addressDiv.setAttribute('class', 'address');

  //     reviewDiv.setAttribute('class', 'review');

  //     // businessArr.push(business);
  //     // console.log(business.name);
  //   })

  // })


  businessArr.forEach(business => {
    // console.log(business.)
    // <div class="Business">
    //             <div class="image-container">
    //                 <img src={business.imageSrc} alt=''/>
    //             </div>
    //             <h2>{business.name}</h2>
    //             <div class="Business-information">
    //                 <div class="Business-address">
    //                     <p>{business.address}</p>
    //                     <p>{business.city}</p>
    //                     <p>{business.state} {business.zipCode}</p>
    //                 </div>
    //                 <div class="Business-reviews">
    //                     <h3>{business.category}</h3>
    //                     <h3 class="rating">{business.rating} stars</h3>
    //                      <p>90 reviews</p>
    //                 </div>
    //             </div>
    //         </div>
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
