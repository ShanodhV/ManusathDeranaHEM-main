import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 7.8731,
    lng: 80.7718,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBMTCQplacKE1r0_3wSME5322PM6uroics">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      ></GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
