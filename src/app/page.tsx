import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Cursor Variants</h1>
      <p className={styles.description}>
        This is a showcase of various cursor effects
      </p>
    </main>
  );
}
