// db.ts
'use client'

import Dexie, { type EntityTable } from 'dexie';
import { dexieCloud } from 'dexie-cloud-addon';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { ConfirmDialog } from '../ui/confirm-dialogue';

interface User {
  id: number;
  username: string;
}

const db = new Dexie('omniraDB', {addons: [dexieCloud]});

// Schema declaration:
db.version(1).stores({
  users: '@id, username' // '@' = auto-generated global ID
});

// Connect your dexie-cloud database:
db.cloud.configure({
  databaseUrl: "https://zkhha4epl.dexie.cloud",
  requireAuth: false // optional
});

export { db };

export function AddUserForm() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState('');

  async function addUser() {
    try {
      // Add the new user!
      const id = await db.users.add({
        username
      });

      setStatus(`User ${username} successfully added. Got id ${id}`);
      setUsername('');
    } catch (error) {
      setStatus(`Failed to add ${username}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Name:
      <input
        type="text"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        className="mt-1 block w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button onClick={addUser}>Add</button>
    </>
  );
}

export function UserList() {
  const users = useLiveQuery(() => db.users.toArray());
  const [confirmUserId, setConfirmUserId] = useState<number | null>(null);
  const [confirmUsername, setConfirmUsername] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    await db.users.delete(id);
    setConfirmUserId(null);
    setConfirmUsername(null);
  };

  return (
    <>
      <ul>
        {users?.map((user) => (
          <li key={user.id} className="flex justify-between items-center py-1">
            <span>{user.username}</span>
            <button
              onClick={() => {
                setConfirmUserId(user.id);
                setConfirmUsername(user.username);
              }}
              className="ml-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {confirmUserId !== null && confirmUsername !== null && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${confirmUsername}"?`}
          onConfirm={() => handleDelete(confirmUserId)}
          onCancel={() => {
            setConfirmUserId(null);
            setConfirmUsername(null);
          }}
        />
      )}
    </>
  );
}