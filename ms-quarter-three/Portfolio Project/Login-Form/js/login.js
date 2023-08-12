/*
  Author: Ankita Mahadeo Shendge
  Course: ICT 4510 - Adv Web Design and Development 
  Date: 20 July 2023
  Description: This script sends a POST request to the server for user login,
  saves the user object to sessionStorage upon successful login,
  and displays admin page, after clicking to logout sucessfully redirect to home page.
*/
// Login POST request
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("https://ict4510.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },

      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((userObject) => {
        sessionStorage.setItem("user", JSON.stringify(userObject));
        document.getElementById("login-form").style.display = "none";
        document.getElementById("welcomeMessage").style.display = "block";
        document.getElementById("firstName").innerText =
          userObject.user.first_name;
      })
      .catch((error) => console.log("Error occurred during fetch:", error));
  });

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
      loadMenu();
    });
}

document.getElementById("logoutButton").addEventListener("click", function () {
  sessionStorage.removeItem("user");
  window.location.href = "../../HTML/home.html";
});

// document.getElementById("delete").addEventListener("click", deleteMenuItem());
// function deleteMenuItem() {
//   fetch(
//     "https://ict4510.herokuapp.com/api/menus?api_key=1d43499fe5a386bbe27cb1af5c2864b7&id=1474",
//     {
//       method: "DELETE",
//       headers: {
//         id: JSON.parse(sessionStorage.getItem("user")).user.id,
//         "x-access-token": JSON.parse(sessionStorage.getItem("user")).user.token,
//       },
//     }
//   ).then((response) => {
//     if (response.ok) {
//       console.log(response.json());
//       return response.json();
//     }
//   });
// }
