import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import AppNav from "../AppNav/AppNav";
import Footer from "../Footer/Footer";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of Cities</p>
      <Footer />
    </div>
  );
}
