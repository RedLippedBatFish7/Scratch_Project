import React, { useEffect, useState } from 'react';
import { CircularProgress, Box } from '@mui/material/';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api';

{
  /*   --  HOW TO USE  --

Mappy should be ready to go out the box, just set its props like below:

<Mappy
  sellerAddr = {'702 Sabre Lame St'}
  buyerAddr = {'15222'} || {'123 Another Address Road Pittsburgh PA 15222'}
  mapsize = {['600px', '500px']} // first width, then height
  loadSize = {3} // size of progress circle, X2 (3 --> 6rem)
  loadColor = 'rgb(255,255,255,0.3)' || 'gray' // color/opacity of placeholder while loading
/> 

Added loading icon until route has been created.

*/
}

function Mappy(props) {
  // function to create a route
  async function findRoute() {
    // create an instance of directionsService
    const directionsService = new window.google.maps.DirectionsService();
    // create a route, return information about it
    const results = await directionsService.route({
      origin: FROM,
      destination: TO,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    // update state : LOADED, RESULTS, STATS
    // results will be used in map render
    setRouteIsLoaded(true);
    setDirectionResp(results);
    const route = results.routes[0].legs[0];
    setRouteStats({ distance: route.distance, duration: route.duration });
  }

  // resolve unassigned props and convert all props to const
  const TO = props.sellerAddr; // reqiured for route
  const FROM = props.buyerAddr; // required for route
  const MAPSIZE =
    props.mapsize && props.mapsize.length === 2
      ? props.mapsize
      : ['100%', '100%'];
  const LOADSIZE = props.loadSize || 1;
  const LOADCOLOR = props.loadColor || 'white';
  // map vars
  const containerStyle = {
    width: MAPSIZE[0],
    height: MAPSIZE[1],
  };
  const center = {
    lat: 5.745,
    lng: 5.223,
  };

  // state vars
  const [directionResp, setDirectionResp] = useState(null);
  const [routeIsLoaded, setRouteIsLoaded] = useState(false);
  const [routeStats, setRouteStats] = useState({
    distance: '',
    duration: '',
  });

  // check if "google" is loaded yet, set T/F
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API,
    libraries: ['places'],
  });
  console.log(isLoaded);

  // if map is loaded AND route hasn't been created, create route
  if (isLoaded && !routeIsLoaded) {
    // setTimeout(() => {
    findRoute();
    // }, 1500);
  }

  //   if the route hasn't been created, display loading view, same size as map
  if (
    !routeIsLoaded // this shows the loading longer than !isLoaded, still have to create the route
    // !isLoaded // we at least need this
    // false // proof that we can't render the map until "isLoaded" is true
  ) {
    return (
      <div
        style={{
          width: MAPSIZE[0],
          height: MAPSIZE[1],
          backgroundColor: LOADCOLOR,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size={`${LOADSIZE * 2}rem`} />
      </div>
    );
  }

  // when findRoute runs, if route has been loaded,
  if (routeIsLoaded) {
    // here you could set upperstate to pass up info about the route
    console.log(routeStats);
    props.setMapStats(routeStats);
  }

  // else, show map
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {/* if we have a route made, display it */}
      {directionResp && <DirectionsRenderer directions={directionResp} />}
    </GoogleMap>
  );
}
export default Mappy;
