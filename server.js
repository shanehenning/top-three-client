'use strict';

const express = require('express');
const app = express();
const serverPort = process.env.PORT || 8080;
const cors = require('cors');

app.pre(cors());
app.use(express.static(`${__dirname}/build`));

app.listen(serverPort, function() {
  console.log('server up on ' + serverPort);
});
