exports.reqTime = (req,res,next)=>{
    console.log("Time:",new Date())
    next()
}

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

exports.checkID = (req, res, next, val) => {
  console.log(`Id is: ${val}`);

  next();
};