const express = require('express');
const bodyparser = require('body-parser');
const sequelize = require('./utils/database');
const User = require('./models/users');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

app.get('/', (req, res, next) => {
    console.log("serving the root path here");
    res.send('hello world!');
});

app.use('/users', require('./routes/users'));

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message: message});
});

// Connect to the database and start the server
if (process.env.NODE_ENV !== 'test') {
    sequelize
    .sync()
    .then(result => {
        console.log('Database connected');
        app.listen(3000, () => {
            console.log("App is running and listening to port 3000");
        });
    })
    .catch(err => console.log(err));
}

module.exports = app;