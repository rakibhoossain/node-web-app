const express = require('express');
var bodyParser = require('body-parser');
const app = express();


const tourRouter = require('./router/tour')


app.use(express.json());
// app.use(bodyParser.json());

app.use(tourRouter)
// app.use('/',router)


module.exports = app;