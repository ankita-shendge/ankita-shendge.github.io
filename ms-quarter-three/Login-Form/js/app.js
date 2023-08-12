/*
  Author: Ankita Mahadeo Shendge
  Course: ICT 4510 - Adv Web Design and Development 
  Date: 20 July 2023
  Description: This script sends a POST request to the server for user login,
  saves the user object to sessionStorage upon successful login,
  and displays a welcome message with the user's first name.
*/

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
