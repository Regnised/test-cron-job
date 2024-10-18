import Pg from 'pg';

const client = new Pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

await client.connect();

export { client };
