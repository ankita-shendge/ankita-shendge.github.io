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

let carts = document.getElementsByClassName("cart-btn");
for (let i = 0; i < carts.length; i++) {
  console.log("my loop");
  carts[i].addEventListener("click", () => {
    cartNumbers();
  });
}
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
