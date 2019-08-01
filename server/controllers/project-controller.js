const db = require('../database/database');

// get all projects
exports.getProjects = (req, res) =>  {
  db.query('SELECT * FROM projects ORDER BY id DESC;', (err, result) => {
      if (err) {
          return res.status(400).send("Bad request", err);
      }
      res.status(200).json(result.rows);
  });
};


// get my projects
exports.getMyProjects = (req, res) => {
    db.query(`select * from projects where user_id = ${req.params.id};`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json(result.rows);
    });
};

// create project
exports.createProject = (req, res) => {
    db.query(`INSERT INTO public.projects (name_project, description, user_id) VALUES ( '${req.body.name_project}', '${req.body.description}', '${req.body.user_id}' );`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json('successfully create project');
    });
};

// edit project
exports.editProject = (req, res) => {
    db.query(`UPDATE public.projects SET name_project = '${req.body.name_project};', description = '${req.body.description}' WHERE id = ${req.params.id};`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json('successfully update project');
    });
};

// delete project
exports.deleteProject = (req, res) => {
    db.query(`DELETE FROM projects WHERE id = ${req.params.id};`, (err, result) => {
        if (err) {
            return res.status(400).send("Bad request", err);
        }
        res.status(200).json('successfully project delete');
    });
};

//get all projects
/*
module.exports.getProjects = function (req, res) {
    let query = "SELECT * FROM projects ORDER BY id DESC";
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
*/

// get my projects
/*
module.exports.getMyProjects = function (req, res) {
    let query = `select * from projects where user_id = ${req.params.id}`;
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
*/

// create project
/*module.exports.createProject = function (req, res) {
    let query = `INSERT INTO public.projects (name_project, description, user_id) VALUES ( '${req.body.name_project}', '${req.body.description}', '${req.body.user_id}' )`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send('successfully create project');
    }).catch(function (err) {
        res.status(500).send(err);
    })
};*/


// edit project
/*module.exports.editProject = function (req, res) {
    let query = `UPDATE public.projects SET name_project = '${req.body.name_project}', description = '${req.body.description}' WHERE id = ${req.params.id}`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send('successfully update project');
    }).catch(function (err) {
        res.status(500).send(err);
    })
};*/
// delete project
/*
module.exports.deleteProject = function (req, res) {
    let query = `DELETE FROM projects WHERE id = ${req.params.id};`;
    db.query(query).spread(function (result, metadata) {
        res.status(200).send("successfully project delete");
    }).catch(function (err) {
        res.status(500).send(" 505 error delete project");
    })
};*/
