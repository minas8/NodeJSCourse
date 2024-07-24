// -- INPORTS --
const express = require('express');
const bodyParser = require('body-parser');
const resLogger = require('./middlewares/response-logger');
const authMiddleware = require('./middlewares/auth');

// -- DB & CONFIG INPORTS --
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Account = require('./models/account');

// -- CONTROLLERS IMPORTS --
const accountController = require('./controllers/account');
const authController = require('./controllers/auth');

const app = express();
const port = 3000;

// -- MIDDLEWARES --
// Use Template Engine for EJS
app.set('view engine', 'ejs');

// Define a public static folder
app.use(express.static('public'));

// Define a body parser for forms
app.use(bodyParser.urlencoded({ extended: true })); // allows to parse an HTML form

// Use ResponseLogger Middleware
// app.use(resLogger);

// -- DATA / DB / CONFIG --
dotenv.config();

const user = {
    name: 'John Doe',
    accounts: [
        { number: '12345678', balance: 5000 },
        { number: '87654321', balance: 3000 }
    ]
};

// -- USE MONGODB
// 1. Create connection string
const connectionString = process.env.MONGODB_URI;
// 2. Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected Successfully!');
    })
    .catch(err => {
        console.log(`MongoDB FAiled to Connect XXX: ${err.message}`);
    });

// const transactions = [];


// -- CONTROLLERS -- MVC --
app.use('/accounts', authMiddleware, accountController);
app.use('/auth', authController);

app.listen(port, () => {
    console.log(`Banking app listening at http://localhost:${port}`);
});