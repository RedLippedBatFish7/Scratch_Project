import React from "react";
import API_KEY from "../../protect.js";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
  });

  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });
};

export default Map;
