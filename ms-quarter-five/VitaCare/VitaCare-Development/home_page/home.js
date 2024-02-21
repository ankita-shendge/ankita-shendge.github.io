//  Ankita Shendge
// Descrption: Vitacare JS file

// line graph to show blood sugar levels
const timePoints = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const bloodSugarLevels = [88, 91, 88, 89, 92, 87, 93];

new Chart("myChart", {
  type: "line",
  data: {
    labels: timePoints,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "#D7E8E5",
        borderColor: "#3A6F6C",
        borderWidth: 4,
        pointRadius: 10,
        pointHoverRadius: 15,
        data: bloodSugarLevels,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      xAxes: [
        {
          display: false, // Hide the x-axis scale
          ticks: { min: 0, max: 7 },
        },
      ],
      yAxes: [
        {
          display: false, // Hide the y-axis scale
          ticks: { min: 85, max: 95 },
        },
      ],
    },
  },
});

// Display date for blood sugar levels
var date = new Date();
var display_date = document.getElementById("today_date");
display_date.innerHTML = date.toDateString(); // toDateString() to display the date in a readable format

// schedule-appoinmet dropdown section
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// categories-section

const swiper = new Swiper(".swiper", {
  slidesPerView: 8, // Adjust the number of cards displayed based on your preference
  spaceBetween: 8,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 8,
    },
    320: {
      slidesPerView: 7,
    },
  },
});
