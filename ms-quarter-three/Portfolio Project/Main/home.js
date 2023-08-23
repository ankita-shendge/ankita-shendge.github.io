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
    //   .then((loadMenuItems) => {
    //     let displaymenu = "";
    //     loadMenuItems.menu.map((element) => {
    //       displaymenu += `<div class="col-lg-3 col-sm-6">
    //   <div class="menu-item radius-bottom shadow-on-hover m-3">
    //     <img
    //       class="radius-top img-fluid"
    //       src="../Images/Breakfast/461573.jpg"
    //       alt=""
    //     />
    //     <div class="menu-item-content p-4 bg-dark radius-bottom">
    //       <div>
    //         <span>
    //           <i class="ri-star-fill star-icon"></i>
    //           <i class="ri-star-fill star-icon"></i>
    //           <i class="ri-star-fill star-icon"></i>
    //           <i class="ri-star-fill star-icon"></i>
    //           <i class="ri-star-half-fill star-icon"></i>
    //         </span>

    //         <h5 class="mt-2 mb-3 menu-name">${element.item}</h5>
    //         <p class="small menu-discription">
    //          ${element.description} Price : $${element.price}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    //   `;
    //     });
    //     document.getElementById("menu-data").innerHTML = displaymenu;
    //   });

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
