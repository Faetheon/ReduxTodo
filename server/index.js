require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(`${__dirname}/../react/dist/`));
app.use(bodyParser.urlencoded({extended: true}));
app.search(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});