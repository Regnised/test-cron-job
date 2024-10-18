const express = require('express');
const { Pool } = require('pg');
const cron = require('cronr');
const axios = require('axios');

let task;
const PORT = process.env.PORT || 5001;
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const getBitcoinPrice = async () => {
  const request = new Promise(async (resolve, reject) => {
    try {
      // Hide move endpoint and key to secrets
      response = await axios.get(process.env.COINMARKET_URL, {
        headers: {
          Accepts: 'application/json',
          'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
        },
        params: { slug: 'bitcoin', convert: 'USD' },
      });
    } catch (ex) {
      response = null;
      console.log(ex);
      reject(ex);
    }
    if (response) {
      const json = response.data;
      console.log(`Request to COINM: ${json.status}`);
      // TODO: validate response
      resolve(json.data['1'].quote.USD.price);
    }
  });

  return request;
};

const setTimer = (interval) => {
  task = setInterval(async () => {
    const price_usd = await getBitcoinPrice();
    console.log(`price ${price_usd} - ${Date.now()}`);

    const client = await pool.connect();
    // Todo: ADD sequelize
    const result = await client.query(
      `INSERT INTO public.test_table (price_usd) VALUES (${price_usd});`
    );
    console.log(`Saved: ${result.rowCount}`);
  }, interval);

  return task;
};

express()
  .get('/set-timer', (req, res) => {
    const interval = parseInt(req.query.interval || 60000 * 60);

    // Todo: set variable to cron from FE
    if (task) {
      clearInterval(task);
    }
    task = setTimer(interval);

    res.send(`Timer updated: ${Date.now()}`);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
