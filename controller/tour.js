const Tour = require('./../models/Tour');

//aliasing top5 middleware
exports.gettop5TourMidw = (req, res, next) => {
    req.query.sort = '-ratingsAverage,price';
    req.query.limit = 5;

    next();
}

//create tour
exports.createTour = async (req,res)=>{
 
    try{
        const newTour = await Tour.create(req.body);
 
        res.status(201).json({
            status: 'success',
            tour: newTour
        })
    } catch(err){
 
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

//get all tour
exports.getAllTour = async (req,res)=>{

    try{

        //query filter
        const queryOb = { ...req.query };
        const excludeQuery = ['page','limit', 'sort', 'fields'];
        excludeQuery.forEach(el=> delete queryOb[el]);
        const queryStr = JSON.stringify(queryOb).replace(/\b(gte|gt|lte|lt)\b/g, m=> `$${m}`);

        //query
        const query = Tour.find(JSON.parse(queryStr));

        //sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query.sort(sortBy)
        };

        //fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query.select(fields)
        }else{
            query.select('-__v');
        };

        //pagination
        const page = (req.query.page * 1) || 1;
        const limit = (req.query.limit *  1) || 10;
        const skip = (page-1) * limit;

        const count = await Tour.countDocuments();
        if(skip>=count) throw new Error('Requested page not found');
        query.skip(skip).limit(limit);



        const tour = await query;
        res.status(200).json({
            status: 'success',
            results: tour.length,
            tour
        })
    } catch(err){

        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

//get tour
exports.getTour = async (req,res)=>{
 
    try{
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            tour
        })
    } catch(err){

        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

//update tour
exports.updateTour = async (req,res)=>{
 
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        });
 
        res.status(200).json({
            status: 'success',
            tour
        })
    } catch(err){

        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

//delete tour
exports.deleteTour = async (req,res)=>{
 
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch(err){

        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}







// const testTour = new Tour({
//     name: 'A tour',
//     city: 'brd',
//     rating:4.5
// })


// testTour.save().then(doc=> console.log(doc)).catch(err=> console.log(err));






// exports.reqTime = (req,res,next)=>{
//     console.log("Time:",new Date())
//     next()
// }

exports.reqUrl = (req,res,next)=>{
    console.log('Request URL:', req.originalUrl)
    next()
}

exports.reqType = (req,res,next)=>{
    console.log('Request Type:', req.method)
    next()
}

exports.data = (req,res)=>{
    console.log('hello data')
    res.json({
        status:true,
        id:req.params.id
    })
}

// exports.checkID = (req, res, next, val) => {
//   console.log(`Id is: ${val}`);

//   next();
// };