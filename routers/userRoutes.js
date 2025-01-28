'use strict';
var tasksList = require('../controllers/userController');

module.exports = function(app) {

  app.route('/users')
    .get(tasksList.getUsers)
    .post( tasksList.createUser);

  app.route('/users/:id')
    .get(tasksList.getUserById)
    .put(tasksList.updateUser)
    .delete(tasksList.deleteUser);

};