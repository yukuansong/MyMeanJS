'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var MyUsers = mongoose.model('MyUsers');

/**
 * Create a My users controller
 */
exports.create = function (req, res) {
    var myUser = new MyUsers(req.body);
    
    myUser.save(function(err){
       if(err){
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       } else {
           res.status(201).json(myUser);
       }
    });
};

/**
 * Show the current My users controller
 */
exports.read = function (req, res) {
    MyUsers.findById(req.params.myUserId).exec(function(err, myUser){
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            if(!myUser){
                return res.status(404).send({
                    message: 'Category not found'
                });
            }
            res.json(myUser);
        }
    });
};

/**
 * Update a My users controller
 */
exports.update = function (req, res) {

    var myUser = req.myUser;
    console.log('==========================update ======');
    console.log(myUser);
    console.log('-----------------------');
    myUser = _.extend(myUser,req.body);
    console.log(myUser);
    _.each(req, function(value,key){
       console.log(key); 
    });
    
    myUser.save(function(err){
       if(err){
           return res.status(400).send({
              message: errorHandler.getErrorMessage(err) 
           });
       } else {
           res.json(myUser);
       }
    });
};

/**
 * Delete an My users controller
 */
exports.delete = function (req, res) {
    var myUser = req.myUser;
    
    myUser.remove(function(err){
       if(err){
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           });
       } else {
           res.json(myUser);
       }
    });
};

/**
 * List of My users controllers
 */
exports.list = function(req, res) {
         console.log('--------------begining of list------------------');
    MyUsers.find().exec(function(err, myUsers) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            console.log('--------------------------------');
            console.log(myUsers);
            var testObj =[{name: 'John Smith', description: 'This is a testing description'}];
            res.json(myUsers);
        }
    });
};

/**
* Express named Parameter
*/
exports.parameterized = function(req, res, next, id) {
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({
         message: 'MyUserId is invalid' 
      });
  }
  
  MyUsers.findById(id).exec(function(err, myUser){
     if(err) return next(err);
      if(!myUser) {
          return res.status(404).send({
             message: 'MyUserId not found' 
          });  
      }
      req.myUser = myUser;
      next();
  });
};
