const mongoose = require('mongoose');
const express = require('express');

const cors = require('./src/middlewares/cors');
const auth = require('./src/middlewares/auth');
const usersController = require('./src/controllers/users');

require('dotenv').config();


async function start() {
    try {
        const db = await mongoose.connect('mongodb+srv://max:stratos5566@dog-adoption-center.p1wwvve.mongodb.net/?retryWrites=true&w=majority');

        console.log('DB Ready');
    } catch (err) {
        console.log('Error connecting to database');
        return process.exit(1);
    }

    const app = express();

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cors());
    app.use(auth());

    app.use('/users', usersController);

    app.listen(process.env.PORT || 3030, () => console.log('REST Service started on port 3030'));
}

start();