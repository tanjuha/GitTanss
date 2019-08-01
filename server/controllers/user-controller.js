const db = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//get users
exports.getUsers = (req, res) =>  {
    db.query('SELECT * FROM users;', (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};


// get projects user
exports.getOwner = (req, res) =>  {
    db.query('SELECT projects.description, users.email from projects join users on projects.id_user = users.id where projects.id_user=2;', (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};


// get user by id
exports.getUserById = (req, res) =>  {
    db.query(`select * from users where id = ${req.params.id};`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};


// get user by username
exports.getUserByUsername = (req, res) =>  {
    db.query(`select * from users where username = '${req.params.username}';`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};


// delete user
exports.deleteUser = (req, res) =>  {
    db.query(`DELETE FROM users WHERE id =${req.params.id};`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};


// login user
exports.loginUser = (req, res) =>  {
    db.query(`select * from users where username ='${req.body.username}' AND password ='${req.body.password};'`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        if(result.length > 0){
            let payload = {username: req.body.username};
            let token = jwt.sign(payload, 'mySecretKey');
            res.json({
                user: result,
                token: token
            });
            //res.status(200).send(token)
        }else if(!req.body.username) {
            res.status(401).send('Invalid username');
        }else if(!req.body.password) {
            res.status(401).send('Invalid password');
        }else {
            res.status(401).send('Not exist user');
        }
        res.status(200).json(result.rows);
    });
};



// registration
exports.registrationUser = (req, res) =>  {
    db.query(`INSERT INTO public.users (email, username, password) VALUES ( '${req.body.email}', '${req.body.username}', '${req.body.password}' )`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};


