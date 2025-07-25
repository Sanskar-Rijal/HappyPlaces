import { useNavigate, useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../../contexts/CitiesContexts";
import Spinner from "../Spinner/Spinner";
import Button from "../Button/Button";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  //getting data from the url we use useParams hook
  const x = useParams();
  console.log(x); //outpuut of x is id that we passed in url so destructuring it
  const { id } = useParams();

  const { getCityById, currentCity, isLoading } = useCities();

  //usenavigate hook to go back
  const navigate = useNavigate();

  useEffect(
    function () {
      //fetching the current city from id that we've got before
      getCityById(id);
    },
    [id]
  );

  if (isLoading) {
    return <Spinner />;
  }

  //we will destructure the data only when the loading is done

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          type="back"
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          &larr; back
        </Button>
      </div>
    </div>
  );
}

export default City;
