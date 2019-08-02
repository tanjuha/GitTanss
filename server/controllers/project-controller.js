const db = require('../database/database');

//get all projects
module.exports.getProjects = function (req, res) {
    let query = "select * from projects order by id desc;";
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

// get my projects
module.exports.getMyProjects = function (req, res) {
    let query = `select * from projects where user_id = ${req.params.id} order by id desc`;
    db.query(query).spread(function (result, metadata) {
        if(result.length > 0){
            res.json(result);
        }else{
            res.status(400).send(" 400 error get my projects");
        }
    }).catch(function (err) {
        res.status(500).send(" error get my projects");
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
// delete project
module.exports.deleteProject = function (req, res) {
    let query = `DELETE FROM projects WHERE id = ${req.params.id};`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send("successfully project delete");
    }).catch(function (err) {
        res.status(500).send(" 505 error delete project");
    })
};