import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './modules/user/routes/userRoutes.js'

const app = express();
dotenv.config();

// Establish mongodb connection
connectDB();

// Using middleware
app.use(express.json());

// User Route
app.use('/', userRoutes)



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT : ${process.env.PORT}`);
});

