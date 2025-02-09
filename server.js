import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddelware from './middelwares/errorMiddelware.js';

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

app.get("/",(req,res)=>{
    res.send("<h1>Welcome to Job Portal</h1>");
});

const PORT=process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});