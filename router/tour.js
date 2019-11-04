const express = require('express')
const tourController = require('../controller/tour')


const router = express.Router()

// router.param('id',controller.checkID)

// router
//     .route('/')
//     .get(controller.reqTime, controller.data)



router.get('/top5',tourController.gettop5TourMidw, tourController.getAllTour)
router.get('/tour-states',tourController.getTourStats)
router.get('/tour-plan/:year',tourController.getMonthlyPlan)

router
    .route('/')
    .get(tourController.getAllTour)
    .post(tourController.createTour)

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function (req, res) {
  const from = req.params[0]
  const to = req.params[1] || 'HEAD'
  res.json({
  	'commit range' : from,
  	'to' :  to})
})



module.exports=router