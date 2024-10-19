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
  options = {
    limit: options.limit || 10,
    offset: options.offset || 0,
    order: [[options.sortBy || 'createdAt', options.sortType || 'DESC']],
  };

  const [prices, count] = await Promise.all([
    BitcoinPrice.findAll(options),
    BitcoinPrice.count(),
  ]);
  console.log(`All prices:`);
  console.log(prices);
  console.log(count);

  return { prices, count };
};

export { savePrice, getPrices };
