'use strict';

module.exports = function(app) {
    var logger = require('morgan');
//    app.use(logger());
    var path  = require('path');
    var myUsersController = require(path.resolve('./modules/users/server/controllers/my-users-controller.server.controller'));
	app.route('/MyUsers')
		.get(myUsersController.list)
        .post(myUsersController.create);
    
    //the myUserId param is added to the params object for the request
    app.route('/myUsers/:myUserId')
        .get(myUsersController.read)
        .put(myUsersController.update)
        .delete(myUsersController.delete);
    
    app.param('myUserId', myUsersController.parameterized);
};