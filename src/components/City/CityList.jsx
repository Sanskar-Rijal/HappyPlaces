import Spinner from "../Spinner/Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContexts";

export default function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return <Message message={"no cities yet!"} />;
  }

  return (
    <div className={styles.cityList}>
      {cities.map((item) => {
        return <CityItem key={item.id} cities={item} />;
      })}
    </div>
  );
}
