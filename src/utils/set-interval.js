const setTimer = (interval = 3600000, cb) => {
  interval = parseInt(interval);

  return setInterval(cb, interval);
};

export { setTimer };
