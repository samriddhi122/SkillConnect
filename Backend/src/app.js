import express from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv';
import userRouter from './route/user.route.js';
import tutorRoutes from './route/tutor.route.js';

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
        origin: "*",
        credentials: true
    }
));
app.use(cookieParser());
app.use("/api/tutors", tutorRoutes);
app.use("/app/user",userRouter);
export  {app};
