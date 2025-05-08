// db.ts
'use client'

import Dexie, { type EntityTable } from 'dexie';
import { dexieCloud } from 'dexie-cloud-addon';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';

interface Friend {
  id: number;
  name: string;
  age: number;
}

const db = new Dexie('SyncFriends', {addons: [dexieCloud]});

// Schema declaration:
db.version(1).stores({
  friends: '@id, name, age' // '@' = auto-generated global ID
});

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://zkhha4epl.dexie.cloud",
  requireAuth: true // optional
});

export type { Friend };
export { db };

export function AddFriendForm({ defaultAge } = { defaultAge: 21 }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState('');

  async function addFriend() {
    try {
      // Add the new friend!
      const id = await db.friends.add({
        name,
        age
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}`);
      setName('');
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Name:
      <input
        type="text"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      Age:
      <input
        type="number"
        value={age}
        onChange={(ev) => setAge(Number(ev.target.value))}
      />
      <button onClick={addFriend}>Add</button>
    </>
  );
}

export function FriendList({ minAge, maxAge } : { minAge:any, maxAge:any }) {

  const friends = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const friends = await db.friends
        .where('age')
        .between(minAge, maxAge)
        .toArray();

      // Return result
      return friends;
    },
    // specify vars that affect query:
    [minAge, maxAge]
  );

  return (
    <ul>
      {friends?.map((friend) => (
        <li key={friend.id}>
          {friend.name}, {friend.age}
        </li>
      ))}
    </ul>
  );
}