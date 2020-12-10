const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({path:'./config/config.env'})

connectDB();

const app = express();

// routes
const gameInfo = require('./routes/GameRoute.js');
const updateRoute = require('./routes/UpdateRoute.js');

app.use(express.json());

// use
app.use('/api/v1/storeGameInfo',gameInfo);
app.use('/api/v1/updateGameInfo',updateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`));