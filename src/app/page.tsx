import Image from "next/image";
import styles from "./page.module.css";
import { SignupForm } from "./ui/signup-form";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl">VAN – Virtual Adventure Network</h1>
        <h1 className="text-3xl">Omnira - Omniscient + era/aura</h1>
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
