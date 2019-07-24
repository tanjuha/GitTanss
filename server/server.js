const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/database');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin: *");
    res.header("Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//controllers
const userController = require('./controllers/user-controller');

//routes

app.get('/users', userController.getUsers);

app.get('/projects', userController.getProjects);

app.get('/owner', userController.getOwner);

app.get('/user/:id', userController.getUserById);

 app.post('/auth/registration', userController.registration);

 app.post('/project', userController.createProject);

 app.put('/project/edit/:id', userController.editProject);

app.post('/auth/login', userController.loginUser);

app.delete('/projects/:id', userController.deleteProject);

app.delete('/user/delete/:id', userController.deleteUser);

db.sync().then(function () {
    app.listen(3000, function () {
        console.log('it is work!');
    })
});