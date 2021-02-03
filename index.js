//imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require('morgan');
const axios = require('axios')
const app = express();

//Uses
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//enable CORS from client-side
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

//setting up basic middleware for all Express requests
app.use(logger('dev')); // Log requests to API using morgan

app.get('/', (req, res) => {
  var responseText = 'Hello World!<br>'
  responseText += '<small>Requested at: ' + req.requestTime + '</small>'
  res.send(responseText)
});

async function start() {
  try {
    app.listen("3000", () => console.log('Server is running on port ' + "3000"));
  } catch (e) {
    console.log(e)
    console.log("Fail to retrieve config data.")
  }
}

const router = require("./router");
router(app);

start()

