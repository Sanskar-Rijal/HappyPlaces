import styles from "./CityItem.module.css";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ cities }) {
  //destructuring the cities
  const { cityName: name, country, emoji: flag, date } = cities;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}> {flag}</span>
      <h3 className={styles.name}>{name}</h3>
      <time className={styles.data}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}> &times; </button>
    </li>
  );
}
