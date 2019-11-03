const express = require('express')
const controller = require('../controller')


const router = express.Router()

router.param('id',controller.checkID)

// router
//     .route('/')
//     .get(controller.reqTime, controller.data)



router.param(function (param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next()
    } else {
      res.sendStatus(403)
    }
  }
})

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate)
})






router
    // .route('/')
    .get('/',controller.reqTime, controller.data)

router
    .route('/id/:id')
    .get(controller.data)


router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
  const from = req.params[0]
  const to = req.params[1] || 'HEAD'
  res.json({
  	'commit range' : from,
  	'to' :  to})
})



module.exports=router