import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import { useCities } from "../../contexts/CitiesContexts";
export default function Map() {
  //setSearchParams is used to update the query string in the URL
  const [searchparams, setSearchParams] = useSearchParams();

  const lat = searchparams.get("lat");
  const lng = searchparams.get("lon");

  //setting the position of the map using the lat and lng that we got from the URL
  const [mapPosition, setMapPosition] = useState([40, 0]);

  //fetching the list of all the cities so we can show markers on the map
  const { cities } = useCities();

  function updateMapPosition() {
    setMapPosition([lat ? parseFloat(lat) : 40, lng ? parseFloat(lng) : 0]);
  }

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
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
      </MapContainer>
    </div>
  );
}
