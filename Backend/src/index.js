import dotenv from 'dotenv';
import express from 'express';
import connectdb from './db.js';
import {app} from './app.js';


dotenv.config({
    path: "./.env"
});
connectdb().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`sever is running on port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!! ", err);
})