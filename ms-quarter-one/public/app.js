// categories dropdown list
var dropdown = document.getElementsByClassName("dropdown-btn");
for (var i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}
// adding array for future purpose

let products = [
  {
    name: "cutting",
    tag: "cord",
    inCart: 0,
    price: 20,
  },
  {
    name: "electricCutter",
    tag: "cordless",
    inCart: 0,
    price: 40,
  },
  {
    name: "dewalt",
    tag: "cordless",
    inCart: 0,
    price: 10,
  },
  {
    name: "cutting",
    tag: "cord",
    inCart: 0,
    price: 20,
  },
  {
    name: "electricCutter",
    tag: "cordless",
    inCart: 0,
    price: 40,
  },
  {
    name: "dewalt",
    tag: "cordless",
    inCart: 0,
    price: 10,
  },
  {
    name: "cutting",
    tag: "cord",
    inCart: 0,
    price: 20,
  },
  {
    name: "electricCutter",
    tag: "cordless",
    inCart: 0,
    price: 40,
  },
  {
    name: "dewalt",
    tag: "cordless",
    inCart: 0,
    price: 10,
  },
];

//when button clicked, product gets added to the cart, the number of products increses

let carts = document.getElementsByClassName("cart-btn");
for (let i = 0; i < carts.length; i++) {
  console.log("my loop");
  carts[i].addEventListener("click", () => {
    cartNumbers();
  });
}

// maintaining old cart values

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.getElementById("cart-items").textContent = productNumbers;
  }
}

function cartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  console.log(productNumbers);

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.getElementById("cart-items").textContent = `CART: ${
      productNumbers + 1
    }`;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.getElementById("cart-items").textContent = `CART: ${1}`;
  }
}
onLoadCartNumbers();

window.onload = function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML = this.responseText;
      let data = JSON.parse(this.responseText);
      let parentDiv = document.getElementById("feature-cards");
      for (entry in data) {
        //TODO insert new card view for tool created using entry object into parentDiv
      }
    }
  };
  xhttp.open("GET", "/tools", true);
  xhttp.send();
};
