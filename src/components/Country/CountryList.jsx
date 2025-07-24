import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import CountryItem from "./CountryItem";
import { useCities } from "../../contexts/CitiesContexts";

export default function CountryList() {
  const { isLoading, cities } = useCities();

  if (isLoading) {
    return <Spinner />;
  }
  if (!cities.length) {
    return <Message message={"no country added yet"} />;
  }

  //filtering country from  the data
  const country = cities.reduce((accumulator, current) => {
    if (!accumulator.map((item) => item.country).includes(current.country)) {
      console.log("hehe", accumulator);
      return [
        ...accumulator,
        { country: current.country, emoji: current.emoji },
      ];
    } else {
      return accumulator;
    }
  }, []);

  return (
    <div className={styles.countryList}>
      {country.map((item) => {
        return <CountryItem country={item} key={item.country} />;
      })}
    </div>
  );
}
