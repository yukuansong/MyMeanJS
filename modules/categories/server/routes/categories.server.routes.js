'use strict';

// the pass-in parameter 'app' is an instance of Express
// var app = require('express');
// app = express();
module.exports = function(app) {
  // Routing logic   
    var path = require('path');
    var controller = require(path.resolve('./modules/categories/server/controllers/categories.server.controller'));
    var users = require(path.resolve('./modules/users/server/controllers/users.server.controller'));
  app.route('/categories') 
     .get(controller.list)
     .post(controller.create);
    
  app.route('/categories/:categoryId')
     .get(controller.read)
     .put(controller.update)
     .delete(controller.delete);

  app.param('categoryId', controller.categoryByID);
    
};
