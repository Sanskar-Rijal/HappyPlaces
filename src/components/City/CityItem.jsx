import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContexts";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ cities }) {
  const { currentCity } = useCities();

  //destructuring the cities
  const {
    cityName: name,
    country,
    emoji: flag,
    date,
    id: cityid,
    position,
  } = cities;

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity &&
          (currentCity.id === cityid ? styles["cityItem--active"] : "")
        }`}
        to={`${cityid}?lat=${position.lat}&lon=${position.lng}`}
      >
        <span className={styles.emoji}> {flag}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.data}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}> &times; </button>
      </Link>
    </li>
  );
}
