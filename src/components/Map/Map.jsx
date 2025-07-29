import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../contexts/CitiesContexts";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import Button from "../Button/Button";

export default function Map() {
  //setSearchParams is used to update the query string in the URL
  const [searchparams, setSearchParams] = useSearchParams();

  const lat = searchparams.get("lat");
  const lng = searchparams.get("lon");

  //setting the position of the map using the lat and lng that we got from the URL
  const [mapPosition, setMapPosition] = useState([40, 0]);

  //fetching the list of all the cities so we can show markers on the map
  const { cities } = useCities();

  //useGeolocation hoook that we have just created to get current position
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeoLocation();

  //synchronizing the map position i.e geolocationPosition with the mapPosition
  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading...." : "Use your Current Position"}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true} //now we can use mouse to zoom in and out
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* addding markers for each city */}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeLocation position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

//creating custom component to change the location of the map based on the city clicked
function ChangeLocation({ position }) {
  const map = useMap();
  map.setView(position);
  return null; // This component doesn't render anything
}

//creating another custom component to open form whenever someone clicks on the map
function DetectClick() {
  //usenavigate hook
  const navigate = useNavigate();

  const map = useMapEvents({
    click: (event) => {
      console.log(event);
      //console.log event gives this , so i can easily get lat and lng
      // latlng :
      // LatLng
      // lat: 40.22921818870117
      // lng : -0.12222290039062501
      navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
    },
  });
}
