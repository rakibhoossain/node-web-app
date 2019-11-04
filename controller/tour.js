const Tour = require('./../models/Tour');
const APIFn = require('./../utils/apiFn');

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
        const tourQuery = new APIFn(Tour.find(), req.query)
        .filter()
        .sort()
        .fields()
        .paginate();
        const tour = await tourQuery.query;
        if(tour.length<1) throw new Error('Data not found');

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
        const query = Tour.findById(req.params.id);
        query.select('-__v');

        const tour = await query;
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

//stats tour
exports.getTourStats = async (req,res)=>{
    try{
        const stats = await Tour.aggregate([
            // { 
            //     $match: { ratingsAverage: {$gte: 4.5} }
            // },
            { 
                $group: {
                    _id: '$difficulty', 
                    items: {$sum: 1},
                    avgRating: { $avg: "$ratingsAverage" },
                    avgPrice: { $avg: "$price" },
                    maxRating: { $max: "$price" },
                    minRating: { $min: "$price" }
                } 
            }
        ]);
        res.status(200).json({
            status: 'success',
            data: stats
        })
    } catch(err){

        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}


//monthly plan
exports.getMonthlyPlan = async (req,res)=>{
    try{
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
            { 
                $unwind: '$startDates'
            },
            { 
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                    }
                }
            },
            {
                $group: {
                    _id: {$month: '$startDates'},
                    total: {$sum: 1},
                    tours: {$push: '$name'}

                }
            },
            {
               $addFields: {months: '$_id'} 
            },
            {
                $project: {_id: 0}
            },
            {
                $sort: {total: -1}
            }
            
            // { 
            //     $group: {
            //         _id: '$difficulty', 
            //         items: {$sum: 1},
            //         avgRating: { $avg: "$ratingsAverage" },
            //         avgPrice: { $avg: "$price" },
            //         maxRating: { $max: "$price" },
            //         minRating: { $min: "$price" }
            //     } 
            // }
        ]);
        res.status(200).json({
            status: 'success',
            data: plan
        })
    } catch(err){

        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}









