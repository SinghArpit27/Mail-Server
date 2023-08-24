import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './modules/user/routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import userMailRoutes from './modules/user/routes/userMailRoutes.js';

const app = express();
dotenv.config();

// Establish Mongodb Connection
connectDB();

// Using Middleware
app.use(express.json());
app.use(cookieParser());

//Routes Definition
app.use('/', userRoutes);
app.use('/mail', userMailRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT : ${process.env.PORT}`);
});

