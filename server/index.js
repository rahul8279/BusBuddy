import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dbConnection from './config/dbConnection.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import busRoutes from './routes/bus.route.js';
import routeRoutes from './routes/routes.route.js';

const app = express();
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Replace with your frontend URL
        methods: ['GET', 'POST','put'],
        credentials: true,
    },
    });
    app.use(cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST','PUT'],
        credentials: true,
    }));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/v1/user',userRoutes)
app.use('/api/v1/bus', busRoutes);
app.use('/api/v1/route', routeRoutes);



app.listen(PORT, () => {
  dbConnection()
  console.log(`Server is running on port ${PORT}`);
});