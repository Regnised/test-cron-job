const express = require('express')

const PORT = process.env.PORT || 5001


express()
  .get('/', (req, res) => {
    res.send('Cron-jober');
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
