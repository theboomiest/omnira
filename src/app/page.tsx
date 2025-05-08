import Image from "next/image";
import styles from "./page.module.css";
import { SignupForm } from "./ui/signup-form";
import { AddFriendForm, db, FriendList } from "./actions/db";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl">Omnira - Omniscient + era/aura</h1>
        <h2>Add Friend</h2>
        <AddFriendForm defaultAge={21} />

        <h2>Friend List</h2>
        <FriendList minAge={18} maxAge={65} />
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
