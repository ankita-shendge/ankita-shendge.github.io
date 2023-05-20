// To open full screen
// "esc"  to exit full screen

var pdfFrame = document.getElementById("myIframe");

function openFullscreen() {
  if (pdfFrame.requestFullscreen) {
    pdfFrame.requestFullscreen();
  }
}

document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    document.exitFullscreen();
  }
});

var pdfFrame2 = document.getElementById("myIframe2");

function openFullscreen2() {
  if (pdfFrame2.requestFullscreen) {
    pdfFrame2.requestFullscreen();
  }
}

document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    document.exitFullscreen();
  }
});

var pdfFrame3 = document.getElementById("myIframe3");

function openFullscreen3() {
  if (pdfFrame3.requestFullscreen) {
    pdfFrame3.requestFullscreen();
  }
}

document.addEventListener("fullscreenchange", function () {
  if (!document.fullscreenElement) {
    document.exitFullscreen();
  }
});
