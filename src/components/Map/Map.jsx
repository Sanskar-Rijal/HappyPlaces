import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

export default function Map() {
  //setSearchParams is used to update the query string in the URL
  const [searchparams, setSearchParams] = useSearchParams();

  const lat = searchparams.get("lat");
  const lng = searchparams.get("lon");

  return (
    <div className={styles.mapContainer}>
      <h2>Map</h2>
      <p>
        latitude = {lat} and longitude ={lng}
      </p>
      <button
        onClick={() => {
          setSearchParams({ lat: 77, lon: 67 });
        }}
      >
        Click to Change
      </button>
    </div>
  );
}
