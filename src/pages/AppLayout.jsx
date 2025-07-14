import Sidebar from "../components/SideBar/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/Map/Map";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
