import Image from "next/image";
import styles from "./page.module.css";
import "./globals.css";
import { SignupForm } from "./ui/signup-form";
import { AddUserForm, AddDomainForm, db, UserList, DomainList } from "./actions/db";
import { PlanetIcon, UserPlusIcon, UserCircleIcon } from "@phosphor-icons/react/ssr";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="flex flex-col gap-16">

          <div className="flex flex-col justify-end">
            <div className="t1 flex justify-end text-prim">Omnira</div>
            <div className="s1e flex justify-end text-quat">Virtual RPG</div>
          </div>

          <div className="flex flex-col gap-2 p-8 bg-omni-orange rounded-4xl border-b-amber-800 border-4">
            <div className="flex flex-row gap-3 h3 items-center">
              <PlanetIcon size="36px"/><div>Add Domain</div>
            </div>
            <AddDomainForm />
            <h2 className="w-[50vw] s4 text-tert">Domain List</h2>
            <DomainList />
          </div>

          <div className="flex flex-col gap-2 p-8 bg-omni-blue rounded-4xl border-b-blue-800 border-4">
            <div className="flex flex-row gap-3 h3 items-center">
                <UserCircleIcon size="36px"/><div>Add User</div>
            </div>
            <AddUserForm />
            <h2 className="w-[50vw] s4 text-tert">User List</h2>
            <UserList />
          </div>
        </div>
      </main>
      <footer /*className={styles.footer}*/>
        
      </footer>
    </div>
  );
}
