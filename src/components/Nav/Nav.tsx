"use client";
import { useRouter } from "next/navigation";
import styles from "./nav.module.css";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <button
        className={styles.navButton}
        onClick={() => router.push("/", { scroll: false })}
      >
        Home
      </button>
      <button
        className={styles.navButton}
        onClick={() => router.push("/circle-chaser", { scroll: false })}
      >
        Circle Chaser
      </button>
      <button
        className={styles.navButton}
        onClick={() => router.push("/star-trail", { scroll: false })}
      >
        Star Trail
      </button>
    </nav>
  );
}
