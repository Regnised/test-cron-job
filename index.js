import express from 'express';
import 'dotenv/config';

let task;
const PORT = process.env.PORT || 5001;

import { getBitcoinPrice } from './src/services/coin-market.js';

import { setTimer } from './src/utils/set-interval.js';
import { savePrice } from './src/repositories/test.repository.js';
import {
  getSetting,
  saveSetting,
} from './src/repositories/settings.repository.js';

const timeout = await getSetting();
console.log(`timeout - ${timeout}`);

const timerCallback = async () => {
  const price_usd = await getBitcoinPrice();

  await savePrice(price_usd);
};

// Default timer
task = setTimer(timeout, timerCallback);

express()
  .get('/set-timer', async (req, res) => {
    const interval = parseInt(req.query.interval);
    if (interval < 1000) {
      throw new Error('Interval is low. Set it in milliseconds');
    }

    if (task) {
      clearInterval(task);
    }
    task = setTimer(interval, timerCallback);

    await saveSetting(interval);

    res.send(`Timer updated: ${Date.now()}`);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
