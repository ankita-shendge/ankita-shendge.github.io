// SAVE form POST request

document
  .getElementById("menuItem")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name1 = document.getElementById("name").value;
    const price1 = document.getElementById("price").value;
    const description1 = document.getElementById("description").value;

    console.log(name1, price1, description1);

    fetch(
      "https://ict4510.herokuapp.com/api/menus?api_key=1d43499fe5a386bbe27cb1af5c2864b7",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-access-token": JSON.parse(sessionStorage.getItem("user")).user
            .token,
        },
        body: JSON.stringify({
          item: name1,
          price: price1,
          description: description1,
        }),
      }
    )
      .then((response) => {
        if (response.status === 201) {
          console.log("Item added successfully");
          return response.json();
        } else {
          console.error("Error adding item:", response.statusText);
        }
      })

      .then((menu_item) => {
        console.log("Item added successfully:", menu_item);
        loadMenu();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// to GET menu and display
function loadMenu() {
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
        return response.json(); //converted to object
      }
    })
    .then((loadedMenu) => {
      // console.log(loadedMenu);
      let tableData = " ";
      loadedMenu.menu.map((values) => {
        tableData += ` <tr>
                   <td id="menu-id"> ${values.id}</td>
                  <td id="menu-name">${values.item}</td>
                  <td id="menu-price"> ${values.price}</td>
                  <td id="menu-description">${values.description}</td>
                </tr>`;
      });

      document.getElementById("table-data").innerHTML = tableData;
    });
}
// logout redirect to home.html
document.getElementById("logoutButton").addEventListener("click", function () {
  sessionStorage.removeItem("user");
  window.location.href = "../Main/home.html";
});
