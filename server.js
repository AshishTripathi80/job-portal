import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddelware from './middelwares/errorMiddelware.js';
import "express-async-errors";

// config ENV
dotenv.config()

// rest object
const app= express()

// mongodb connection
connectDB();

//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use('/api/auth',authRoutes);

//validation middelwares
app.use(errorMiddelware)

const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});