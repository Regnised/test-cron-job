import express from 'express';
import bodyParser from 'body-parser';
import { HttpStatusCode } from 'axios';
import { getBitcoinPrice } from './src/services/coin-market.js';
import { setTimer } from './src/utils/set-interval.js';
import { getPrices, savePrice } from './src/repositories/bitcoin.repository.js';
import {
  getSetting,
  saveSetting,
} from './src/repositories/settings.repository.js';
import 'dotenv/config';

console.log(process.env);
let task;
const PORT = process.env.PORT || 5001;
const timeout = await getSetting();

const timerCallback = async () => {
  const price_usd = await getBitcoinPrice();

  await savePrice(price_usd);
};

// Default timer
task = setTimer(timeout, timerCallback);

express()
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
  })
  .use(bodyParser.json())
  .get('/interval', async (req, res) => {
    const interval = await getSetting('timeout');

    res.json({ status: HttpStatusCode.Ok, data: { interval } });
  })
  .put('/interval', async (req, res) => {
    const interval = parseInt(req.body.interval);
    if (interval && interval < 1000) {
      throw new Error('Interval is low. Set it in milliseconds');
    }

    if (task) {
      clearInterval(task);
    }
    task = setTimer(interval, timerCallback);

    await saveSetting(interval);

    res.json({
      status: HttpStatusCode.Ok,
      message: `Timer updated: ${interval}`,
    });
  })
  .get('/prices', async (req, res) => {
    const options = {
      offset: req.query.offset,
      limit: req.query.limit,
    };
    const prices = await getPrices(options);

    res.json({ status: HttpStatusCode.Ok, data: prices });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
