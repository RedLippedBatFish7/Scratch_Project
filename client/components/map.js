<<<<<<< HEAD
import React from 'react';
//import API_KEY from '../../personal.js';
import { Loader } from '@googlemaps/js-api-loader';
=======
import React from "react";
import API_KEY from "../../protect.js";
import { Loader } from "@googlemaps/js-api-loader";
>>>>>>> dev

const Map = () => {
  const loader = new Loader({
    apiKey: API_KEY,
<<<<<<< HEAD
    version: 'weekly',
  });

  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById('map'), {
=======
    version: "weekly",
  });

  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
>>>>>>> dev
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });
};

export default Map;
