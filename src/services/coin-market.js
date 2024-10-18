import axios from 'axios';

const getBitcoinPrice = async () => {
  const request = new Promise(async (resolve, reject) => {
    let response;

    try {
      response = await axios.get(process.env.COINMARKET_URL, {
        headers: {
          Accepts: 'application/json',
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
        },
        params: { slug: 'bitcoin', convert: 'USD' },
      });
    } catch (ex) {
      response = null;
      console.log(ex.status);
      reject(ex);
    }
    if (response) {
      const json = response.data;
      console.log(`Request to COINM:`);
      console.log(json.status);

      // TODO: validate response
      resolve(json.data['1'].quote.USD.price);
    }
  });

  return request;
};

export { getBitcoinPrice };
