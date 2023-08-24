import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './modules/user/routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

// Establish mongodb connection
connectDB();

// Using middleware
app.use(express.json());
app.use(cookieParser());


// User Route
app.use('/', userRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT : ${process.env.PORT}`);
});

