
const db = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//get users
module.exports.getUsers = function (req, res) {
    let query = "SELECT * FROM users";
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            res.json(result);
        }else{
            res.status(400).send(" 400 error get users");
        }
    }).catch(function (err) {
        res.status(500).send(" 500 error get users");
    })

};


//get project
module.exports.getProjects = function (req, res) {
    let query = "SELECT * FROM projects";
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            res.json(result);
        }else{
            res.status(400).send(" 400 error get users");
        }
    }).catch(function (err) {
        res.status(500).send(" 500 error get users");
    })

};

// get projects user
module.exports.getOwner = function (req, res) {
    let query = "SELECT projects.description, users.email from projects join users on projects.id_user = users.id where projects.id_user=2;";
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            res.json(result);
        }else{
            res.status(400).send(" 400 error get users");
        }
    }).catch(function (err) {
        res.status(500).send(" error get owner");
    })

};

// get user by id
module.exports.getUserById = function (req, res) {
    let query = `select * from users where id = ${req.params.id}`;
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            res.json(result);
        }else{
            res.status(400).send(" 400 error get users by id");
        }
    }).catch(function (err) {
        res.status(500).send(" error get owner by id");
    })
};

// delete project
module.exports.deleteProject = function (req, res) {
    let query = `DELETE FROM projects WHERE id = ${req.params.id};`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send("successfully project delete");
    }).catch(function (err) {
        res.status(500).send(" 505 error delete project");
    })
};
// delete user
module.exports.deleteUser = function (req, res) {
    let query = `DELETE FROM users WHERE id =${req.params.id};`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send("successfully users delete");
    }).catch(function (err) {
        res.status(500).send(" 505 error delete users");
    })
};

// login user
module.exports.loginUser = (req, res) => {
    let query = `select * from users where username ='${req.body.username}' AND password ='${req.body.password}'`;
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            let payload = {subject: req.body.id};
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
        }
    }).catch((err)  => {
        res.status(500).send(err);
    })
};

// registration
module.exports.registration = function (req, res) {
    let query = `INSERT INTO public.users (email, username, password) VALUES ( '${req.body.email}', '${req.body.username}', '${req.body.password}' )`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send('successfully registration');
    }).catch(function (err) {
        res.status(500).send(err);
    })
};

// create project
module.exports.createProject = function (req, res) {
    let query = `INSERT INTO public.projects (name_project, description, user_id) VALUES ( '${req.body.name_project}', '${req.body.description}', '${req.body.user_id}' )`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send('successfully create project');
    }).catch(function (err) {
        res.status(500).send(err);
    })
};

// edit project
module.exports.editProject = function (req, res) {
    let query = `UPDATE public.projects SET name_project = '${req.body.name_project}', description = '${req.body.description}' WHERE id = ${req.params.id}`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send('successfully update project');
    }).catch(function (err) {
        res.status(500).send(err);
    })
};