const express = require('express');
const mongoose = require('mongoose')
const Client = require('./models/client');
const Project = require('./models/project');
const User = require('./models/user');
const Task = require('./models/task');

// Load routes
const routes = require('./routes/routes');
const clientRoutes = require('./routes/client.routes');
const projectRoutes = require('./routes/project.routes')
const userRoutes = require('./routes/user.routes')
const taskRoutes = require('./routes/task.routes')

require('dotenv').config();

// App
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true 
});

const db = mongoose.connection;
  
db.on('connected', () => {
    console.log('Mongoose default connection is open');
});

db.on('error', err => {
    console.log(`Mongoose default connection has occured \n${err}`);
});

db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
});

process.on('SIGINT', () => {
    db.close(() => {
        console.log(
        'Mongoose default connection is disconnected due to application termination'
        );
        process.exit(0);
    });
});

app.use('/', routes);
app.use('/', clientRoutes);
app.use('/', projectRoutes);
app.use('/', userRoutes);
app.use('/', taskRoutes);


module.exports = app;