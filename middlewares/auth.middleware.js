const jwt = require("jsonwebtoken");
const blackListedToken = require("../blacklist");

const auth =(req,res,next)=>{  // it is use to authenticates the user for checked before next stages
    const token = req.headers.authorization.split(" ")[1]
    if(blackListedToken.includes(token)){
        res.send("you are logged out please login first..")
        return;
    }
    jwt.verify(token,process.env.JWT_secret_key1,function(err,decoded){
        if(err){
            res.send("unothorised or login first")
        }
        if(decoded){
            req.body.name = decoded.name
            req.body.role = decoded.role
            next();
        }
    });
} 
module.exports = auth;