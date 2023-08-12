/*
        Author: Ankita Mahadeo Shendge
        Course Name: Advance Website Design and Management
        ASSIGNMENT - BUILD MAP WITH THIRD-PARTY LIBRARY AND API
        Date: 25 July 2023
        Description: This script sets up a map using Leaflet and Mapbox with a marker at the provided coordinates.
        */

var map = L.map("map").setView([39.678121, -104.961753], 15);

var accessToken =
  "pk.eyJ1IjoiYW5raXRhc2hlbmRnZSIsImEiOiJjbGtpdnozbnIwbTV1M2dxbGd6cno4dHk1In0.VAC7AosMvBdJ-yDr10k7fw";

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
    accessToken,
  {
    maxZoom: 20,
    attribution: "© OpenStreetMap",

    id: "mapbox/navigation-guidance-night-v4",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);

var marker = L.marker([39.678121, -104.961753])
  .addTo(map)
  .bindPopup("University of Denver")
  .openPopup();

var circle = L.circle([39.678121, -104.961753], {
  color: "skyblue",
  fillColor: "yellow",
  fillOpacity: 0.2,
  radius: 300,
}).addTo(map);
