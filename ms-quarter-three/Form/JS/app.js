/* 
  Name: Ankita Mahadeo Shendge
  Course: ICT-4510-1
  Assignments Week 4: Assignment - Manipulate an HTML form using the DOM
  Date: 5 July 2023
  Discription : This script handles the form submission, captures the entered data, and dynamically displays a message with the entered first name and email address.
*/

function getData() {
  let firstName = document.querySelector("#firstName").value;
  let lastName = document.querySelector("#lastName").value;
  let email = document.querySelector("#email").value;
  let form_info = {
    firstName: firstName,
    lastName: lastName,
    emailAddress: email,
  };
  displayData(form_info);
}

function displayData(form_info) {
  let result = document.querySelector("#result");
  let resultString =
    "Thank You " +
    form_info.firstName +
    "!" +
    " We have successfully received your email address which is " +
    form_info.emailAddress +
    "!";

  let submit_Info = document.createElement("P");

  let textNode = document.createTextNode(resultString);

  submit_Info.appendChild(textNode);
  result.appendChild(submit_Info);
}
