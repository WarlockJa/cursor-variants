import CircleCursor from "./components/CircleCursor";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <CircleCursor />
    </main>
  );
}
