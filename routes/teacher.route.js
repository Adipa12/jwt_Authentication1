const express = require("express");
const TeacherModel = require("../models/teacher.model");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");
const bcrypt = require("bcrypt");
const blackListedToken = require("../blacklist");

const teacherRouter = express();


teacherRouter.post("/register",async(req,res)=>{
    const{name,email,password,department} = req.body;
    try{
        bcrypt.hash(password, 5,async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                res.status(500).json({
                    message:"error occur during hashing"
                });
            }
            else{
              const  teacher = new TeacherModel({
                    name,
                    email,
                    password: hash, // hash password
                    department
                });
               await teacher.save();
               res.status(201).json({msg:"registration done successfully"});
            }
           
        });        
    }catch(error){
        res.status(500).json({message:"unable to register",error})
    }
});

teacherRouter.post("/login",async(req,res)=>{
    const{email,password} = req.body;
    try{
        const teacher = await TeacherModel.findOne({email})
        if(!teacher){
            res.status(500).json({message:"credential not matched to login",error})
        }
        if(teacher){
            bcrypt.compare(password, teacher.password, function(err, result) {
                // result == true
                if(result){
                    const accesstoken = jwt.sign(
                        { name:teacher.name, role:teacher.role },
                        process.env.JWT_secret_key1,
                        { expiresIn:"10m" }
                    );
                    const refereshtoken = jwt.sign(
                        { name:teacher.name, role:teacher.role },
                        process.env.JWT_secret_key2,
                        { expiresIn:"10m" }
                    );
                    res.status(201).json({
                        msg:"login successfully",
                        accesstoken,
                        refereshtoken
                    });
                }
            });
        }else{
            res.status(400).json({message:"Invalid credentials"});
        }     
    }catch(error){
        res.status(500).json({message:"unable to login",error})
    }
})
teacherRouter.get("/update",auth,async(req,res)=>{
    try{
        res.status(201).json({
            msg:"update successfully",
        });
    }catch(error){
        res.status(500).json({message:"unable to update",error})
    }
})
teacherRouter.get("/office", [auth, admin] ,async(req,res)=>{
    try{
        res.status(201).json({
            msg:"office permission granted",
        });
    }catch(error){
        res.status(500).json({message:"unable to reached to office",error})
    }
})
teacherRouter.get("/logout",(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    blackListedToken.push(token)
    res.send("logout successfully...");
});

teacherRouter.get("/get-accesstoken",(req,res)=>{
    const refereshtoken = req.headers.authorization.split(" ")[1]
    jwt.verify(refereshtoken,process.env.JWT_secret_key1,function(err,decoded){
        if(decoded){
            const accesstoken = jwt.sign(
                { name:teacher.name, role:teacher.role },
                process.env.JWT_secret_key1,
                { expiresIn:"10m" }
            );
            res.status(201).json({
                msg:"accesstoken get successfully",
                accesstoken,
                refereshtoken
            });
        }
    })
});

module.exports = teacherRouter;