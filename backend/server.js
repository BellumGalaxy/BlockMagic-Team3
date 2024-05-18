var express = require('express');
var cors = require('cors');
var app = express();
 
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
 
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

  const eventListener = require('./src/OverTrustEvents.js');
  eventListener.listenOffChainEvents();

});