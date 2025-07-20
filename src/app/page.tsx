import Image from "next/image";
import styles from "./page.module.css";
import { SignupForm } from "./ui/signup-form";
import { AddUserForm, db, UserList } from "./actions/db";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl">Omnira</h1>
        <h2>Add User</h2>
        <AddUserForm />

        <h2 className="w-[50vw]">User List</h2>
        <UserList />
      </main>
      <footer className={styles.footer}>
        
      </footer>
    </div>
  );
}
