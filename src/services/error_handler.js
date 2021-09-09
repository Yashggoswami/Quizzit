// all kinds of errors handler code will be here
// 400 500 300 100 http status error code

error_handler = (err,req,res,next)=>{
    return res.json(err)
}

module.exports  = error_handler