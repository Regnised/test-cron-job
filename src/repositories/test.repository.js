import { client } from '../db/client.js';

const savePrice = async (price) => {
  // Todo: ADD sequelize
  const result = await client.query(
    `INSERT INTO public.test_table (price_usd) VALUES (${price});`
  );
  console.log(`Saved: ${result.rowCount}`);
};

export { savePrice };
