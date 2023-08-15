/*Full Name: Ankita Mahadeo Shendge
  Course Name: Advance Web Design and Development
  Current Quarter: [Summer/2023]
  Description: This script fetches menu items from an API and dynamically populates a webpage with the retrieved menu data. It sends a GET request to a remote API, processes the response, and then generates HTML elements to display the menu items along with their descriptions and prices.
*/

function loadMenuItems() {
  fetch(
    "https://ict4510.herokuapp.com/api/menus?api_key=1d43499fe5a386bbe27cb1af5c2864b7",
    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((loadMenuItems) => {
      console.log(loadMenuItems);
      let displayCardData = "";
      loadMenuItems.menu.map((values) => {
        displayCardData += `
        <h5 class="menu-name" id="menu-name">${values.item}</h5>
        <p class="menu-description menu-price" id="menu-description" >${values.description} Price: $${values.price}</p>  
        `;
      });
      document.getElementById("menu-data").innerHTML = displayCardData;
    });
}
