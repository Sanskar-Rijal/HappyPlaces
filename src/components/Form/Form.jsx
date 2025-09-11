// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "../Button/Button";

import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";

//importing the css for date picker
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContexts";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const Base_Url = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  //creating emoji from country code
  const [emoji, setEmoji] = useState("");

  //fetching the lat and lng from the URL using our custom hook
  const [lat, lng] = useUrlPosition();

  //loading state to decode lat and lng to city name
  const [isLoadingGeolocation, setIsLoadingGeolocation] = useState(false);

  //Error if now city is found
  const [geocodingError, setGeocodingError] = useState("");

  //grabbinng function from context api
  const { createCity } = useCities();

  //now converting the lat and lng that we fetched to city
  useEffect(
    function () {
      //if user mannually types /form in url without clicking on map then we will not show form
      if (!lat && !lng) return;

      async function fetchCityData() {
        try {
          setIsLoadingGeolocation(true);
          setGeocodingError("");
          console.log(`${Base_Url}?latitude=${lat}&longitude=${lng}`);
          const response = await fetch(
            `${Base_Url}?latitude=${lat}&longitude=${lng}`
          );
          const data = await response.json();

          if (!data) {
            throw new Error(
              "It seems that it isn't a country click someone else 😉"
            );
          }

          setCityName(data.city || data.locality || "Unknown City");

          setCountry(data.countryName || "Unkown Country");

          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          console.error("error fetching city data:", error);
          setGeocodingError(error.message);
        } finally {
          setIsLoadingGeolocation(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );

  if (isLoadingGeolocation) {
    return <Spinner message="Finding your city..." />;
  }

  // if user clicks form manually we don't want to show lat and log
  if (!lat && !lng) {
    return <Message message={"You can access form only by clicking on map"} />;
  }
  if (geocodingError) {
    return <Message message={geocodingError} />;
  }

  //function to handle submit event
  function handleSubmit(event) {
    event.preventDefault(); //prevent page to reloding
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      postion: { lat, lng },
    };
    createCity(cityName);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          type="back"
          onClick={(event) => {
            event.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
