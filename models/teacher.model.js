const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'basic',
        required:true
    }
},{
    versionKey: false
});

const TeacherModel = mongoose.model('teacher',teacherSchema);

module.exports = TeacherModel;