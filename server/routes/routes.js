module.exports = function (app){

//controllers
const userController = require('../controllers/user-controller');
const projectController = require('../controllers/project-controller');

app.get('/users', userController.getUsers);

app.get('/projects', projectController.getProjects);

app.get('/owner', userController.getOwner);

app.get('/user/:id', userController.getUserById);

app.get('/user/username/:username', userController.getUserByUsername);

app.post('/auth/registration', userController.registrationUser);

app.post('/project', projectController.createProject);

app.put('/project/edit/:id', projectController.editProject);

app.post('/auth/login', userController.loginUser);

app.delete('/project/:id', projectController.deleteProject);

app.delete('/user/delete/:id', userController.deleteUser);

};