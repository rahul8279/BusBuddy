import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import dbConnection from './config/dbConnection.js';


const app = express();
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
    });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  dbConnection()
  console.log(`Server is running on port ${PORT}`);
});