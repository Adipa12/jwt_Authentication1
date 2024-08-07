const express = require("express");
const dotenv = require("dotenv").config();
const connection = require("./config/db");
const teacherRouter = require("./routes/teacher.route");

const app = express();
const PORT = process.env.PORT || 3038

app.use(express.json());
app.use("/teacher", teacherRouter);

app.listen(PORT,async()=>{
    try{
        await connection
        console.log(`server is running on ${PORT} and db is also running`);
    }catch(error){
        console.log(`error connection to server`,error);
    }
})