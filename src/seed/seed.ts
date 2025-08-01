import { Client } from 'cassandra-driver';
import { v4 as uuidv4 } from 'uuid';

async function seed() {
  const client = new Client({
    contactPoints: ['127.0.0.1'],
    localDataCenter: 'datacenter1',
    keyspace: 'user_management',
  });

  await client.connect();

  const users = [
    { id: uuidv4(), name: 'hahahaha', email: 'hahahaha@example.com' },
    { id: uuidv4(), name: 'binh', email: 'binh@example.com' },
  ];

  for (const user of users) {
    await client.execute(
      'INSERT INTO user_management (id, name, email) VALUES (?, ?, ?)',
      [user.id, user.name, user.email],
      { prepare: true },
    );
  }

  await client.shutdown();
}

seed()
  .then(() => console.log('Seeding successful'))
  .catch((err) => console.error('loi ne:', err));
