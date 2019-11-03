const express = require('express');
const app = express();


const router = require('./router')

// invoked for any requests passed to this router
router.use(function (req, res, next) {
  
  console.log('hello g mid ');

  next()
})


app.use(router)
// app.use('/',router)


module.exports = app;