const setTimer = (interval, cb) => {
  interval = parseInt(interval);

  return setInterval(cb, interval);
};

export { setTimer };
