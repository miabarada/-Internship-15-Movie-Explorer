import { useEffect } from "react";
import styles from './Dashboard.module.scss'

export function Dashboard() {
   useEffect(() => {
      document.title = "Dashboard - Movie Explorer"
   }, []);

   return (
      <section className={styles.dashboard}>
         <h2>Welcome to Movie Explorer</h2>
         <p>Find all your favorite movies and more!</p>
      </section>
   );
}