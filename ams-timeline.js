
// Create a variable for the API endpoint. In this example, we're accessing Xano's API
let xanoUrl = new URL('https://x8ki-letl-twmt.n7.xano.io/api:3MPn7XpL/'); 
// Define a function (set of operations) to get restaurant information.
// This will use the GET request on the URL endpoint
function getRestaurants() {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    // XMLHttpRequest is the standard way you access an API in plain Javascript.
    let request = new XMLHttpRequest();

    // Define a function (set of operations) to get restaurant information.
    // Creates a variable that will take the URL from above and makes sure it displays as a string. 
    // We then add the word 'restaurant" so the API endpoint becomes https://x715-fe9c-6426.n7.xano.io/api:Iw1iInWB/restaurant
    let url = xanoUrl.toString() + 'record';


    // Remember the 'request' was defined above as the standard way to access an API in Javascript.
    // GET is the verb we're using to GET data from Xano
    request.open('GET', url, true)

    // When the 'request' or API request loads, do the following...
    request.onload = function() {

        // Store what we get back from the Xano API as a variable called 'data' and converts it to a javascript object
        //let data = JSON.parse(this.response)
        let fetched_data = JSON.parse(this.response)
        let data = fetched_data.slice().sort((a, b) => a.manual_record_date - b.manual_record_date);

        // Status 200 = Success. Status 400 = Problem.  This says if it's successful and no problems, then execute 
        if (request.status >= 200 && request.status < 400) {

            // Map a variable called cardContainer to the Webflow element called "Cards-Container"
            const cardContainer = document.getElementById("Cards-Container")

            // This is called a For Loop. This goes through each object being passed back from the Xano API and does something.
            // Specifically, it says "For every element in Data (response from API), call each individual item restaurant"
            data.forEach(restaurant => {

            // For each restaurant, create a div called card and style with the "Sample Card" class
                const style = document.getElementById('samplestyle');
                // Copy the card and it's style
                const card = style.cloneNode(true);

                //card.setAttribute('class', 'timeline_item');
                card.setAttribute('id', '');
                card.style.display = 'grid';

               // Convert epoch date stamp to standard format
               var recordDate = moment(restaurant.manual_record_date).format('MMM Do YY');
               //console.log(dateTest);

                // When a restuarant card is clicked, navigate to the item page by passing the restaurant id
              //  card.addEventListener('click', function() {
              //      document.location.href = "/item?id=" + restaurant.id;
             //   });

                // For each restaurant, Create an image and use the restaurant image coming from the API
                const img = card.getElementsByTagName('IMG')[0]
                if (restaurant.record_type === "image"){
                img.src = restaurant.image.url + "?tpl=big:box"; // using Xano's template engine to re-size the pictures down and make them a box
}
else
{
img.style.display = "none";
}
                // For each restaurant, create an h3 and set the text content to the restaurant's title
                const h3 = card.getElementsByTagName('H3')[0]
                h3.textContent = restaurant.title;
                
                const title = card.getElementsByClassName('heading_large')[0]
                title.textContent = restaurant.title;
                
                const paragraph = card.getElementsByClassName('paragraph_standard')[0]
                paragraph.textContent = restaurant.description;
                
                const date = card.getElementsByTagName('H5')[0]
                date.textContent = recordDate;

                // For each restaurant, create an paragraph and set the text content to the restaurant's description
             //   const p = document.getElementsByClassName('record-img')[0]
             //   p.textContent = `${restaurant.description.substring(0, 240)}` // Limit to 240 chars
             
             
            
             

                // Place the card into the div "Cards-Container" 

                cardContainer.appendChild(card);
            })
        }
    }

    // Send Restaurant request to API
    request.send();
}



// This fires all of the defined functions when the document is "ready" or loaded
(function() {
    getRestaurants();
})();

