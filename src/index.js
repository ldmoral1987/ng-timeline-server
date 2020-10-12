const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const events = require('./events');
const bearerToken = require('express-bearer-token');
const oktaAuth = require('./auth');

const connection = mysql.createConnection({
  host     : '192.168.199.162',
  user     : 'timeline',
  password : '46f3vh35',
  database : 'timeline'
});

connection.connect();

const port = process.env.PORT || 8080;

//const app = express()
//  .use(cors())
//  .use(bodyParser.json())
//  .use(events(connection));

// Esta configuración funciona desde postman
//const app = express()
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(events(connection));

const app = express()
  .use(cors())
  .use(bodyParser.json())
  .use(bearerToken())
  .use(oktaAuth)
  .use(events(connection));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});