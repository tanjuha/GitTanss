module.exports = function (app){

//controllers
const userController = require('../controllers/user-controller');
const projectController = require('../controllers/project-controller');

// auth
app.post('/auth/registration', userController.registrationUser);
app.post('/auth/login', userController.loginUser);

// user
app.get('/users', userController.getUsers);
app.get('/owner', userController.getOwner);
app.get('/user/:id', userController.getUserById);
app.get('/user/username/:username', userController.getUserByUsername);

app.delete('/user/delete/:id', userController.deleteUser);

// project
app.get('/projects', projectController.getProjects);
app.get('/projects/:id', projectController.getMyProjects);

app.post('/project', projectController.createProject);

app.put('/project/edit/:id', projectController.editProject);

app.delete('/project/:id', projectController.deleteProject);



};