"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useTypedSelector } from "@/hook/use-typed-selector";
import useActions from "@/hook/use-actions";
import { optionsList } from "./options";

const MyMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  const [isRouteExists, setIsRouteExists] = useState<boolean>(false);
  const [MAP, setMAP] = useState<google.maps.Map>({} as google.maps.Map);

  const { from, to, travelTime } = useTypedSelector((state) => state.taxi);
  const { setTravelTime, setSelectedOption } = useActions();

  const center = from.location?.lat
    ? {
        lat: from.location.lat,
        lng: from.location.lng,
      }
    : {
        lat: 51.1,
        lng: 71.4,
      };

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    setMAP(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMAP({} as google.maps.Map);
  }, []);

  const renderWay = () => {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    const request = {
      origin: from.location,
      destination: to.location,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService
      .route(request)
      .then((res) => {
        directionsRenderer.setDirections(res);

        const durationSec = res.routes[0].legs[0].duration?.value;

        if (durationSec) {
          setTravelTime(Math.ceil(durationSec / 60));
          setSelectedOption(optionsList[0]._id);
        }
      })
      .catch((err) => alert(err));

    directionsRenderer.setOptions({
      markerOptions: {
        clickable: false,
      },
    });

    directionsRenderer.setMap(MAP);
  };

  useEffect(() => {
    if (from.location?.lat && to.location?.lat && MAP && !isRouteExists) {
      renderWay();
    }
  }, [from, to, MAP, isRouteExists]);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      center={center}
      zoom={13}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        clickableIcons: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
        scrollwheel: false,
        mapTypeControl: false,
      }}
    >
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
};

export default MyMap;
