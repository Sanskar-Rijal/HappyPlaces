import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "../Message/Message";

export default function CityList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message />;
  }

  return (
    <div className={styles.cityList}>
      {cities.map((item) => {
        return <CityItem key={item.id} cities={item} />;
      })}
    </div>
  );
}
