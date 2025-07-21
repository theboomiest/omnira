import Image from "next/image";
import styles from "./page.module.css";
import { SignupForm } from "./ui/signup-form";
import { AddUserForm, AddDomainForm, db, UserList } from "./actions/db";
import { PlanetIcon } from "@phosphor-icons/react/ssr";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl">Omnira</h1>
        <span>
          <PlanetIcon size="24px"/><p>Add Domain</p>
        </span>
        <AddDomainForm />
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
