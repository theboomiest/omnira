// db.ts
'use client'

import Dexie, { type EntityTable } from 'dexie';
import { dexieCloud } from 'dexie-cloud-addon';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { ConfirmDialog } from '../ui/confirm-dialogue';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface User {
  id: number;
  username: string;
}

const db = new Dexie('omniraDB', {addons: [dexieCloud]});

// Schema declaration:
db.version(1).stores({
  users: '@id, username', // '@' = auto-generated global ID
  domains: '@id, domainName',
  domainsUsers: 'domainID, userID, permissions'
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

  async function AddUser() {
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
      <TextField
        type="text"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
        className="mt-1 block w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <Button onClick={AddUser}>Add</Button>
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
            <Button
              onClick={() => {
                setConfirmUserId(user.id);
                setConfirmUsername(user.username);
              }}
              className="ml-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </Button>
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

export function AddDomainForm() {
  const [domainName, setDomainName] = useState('');
  const [status, setStatus] = useState('');

  async function AddDomain() {
    try {
      // Add the new domain!
      const id = await db.domains.add({
        domainName
      });

      setStatus(`Domain ${domainName} successfully added. Got id ${id}`);
      setDomainName('');
    } catch (error) {
      setStatus(`Failed to add ${domainName}: ${error}`);
    }
  }

  return (
    <>
      <p>{status}</p>
      Name:
      <TextField
        value={domainName}
        onChange={(ev) => setDomainName(ev.target.value)}
        className="mt-1 block w-full bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <Button onClick={AddDomain}>Add</Button>
    </>
  );
}