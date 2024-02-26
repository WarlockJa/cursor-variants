"use client";
import { useRouter } from "next/navigation";
import styles from "./nav.module.css";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <button
        className={styles.navButton}
        onClick={() => router.push("/circle-chaser")}
      >
        Circle Chaser
      </button>
      <button
        className={styles.navButton}
        onClick={() => router.push("/star-trail")}
      >
        Star Trail
      </button>
    </nav>
  );
}
