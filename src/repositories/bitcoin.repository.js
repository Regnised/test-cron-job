// import { client } from '../db/client.js';
import BitcoinPrice from '../db/models/price.model.js';

const savePrice = async (price) => {
  // Todo: ADD sequelize
  // const result = await client.query(
  //   `INSERT INTO public.test_table (price_usd) VALUES (${price});`
  // );
  const result = await BitcoinPrice.create({ price_usd: price });
  console.log(`Saved price:`);
  console.log(result);
};

const getPrices = async (options) => {
  const results = await BitcoinPrice.findAll(options);
  console.log(`All prices:`);
  console.log(results);

  return results;
};

export { savePrice, getPrices };
