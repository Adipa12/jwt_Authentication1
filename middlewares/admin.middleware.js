
const admin =(req,res,next)=>{
    if(req.body.role=="admin"){
        next();
    }else{
        res.send("you are not authorised person to access that part..!");
    }
}
module.exports = admin;