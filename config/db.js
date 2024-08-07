const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.mongodb_URl)

connection.then(()=>{
    console.log("connection with mongodb done");
}).catch((error)=>{
    console.log("error occurs during mongDb connection",error);
});
module.exports = connection;