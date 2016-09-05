'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

var Categories = mongoose.model('Categories');

/**
 * Create a Category
 */
exports.create = function (req, res) {
    var category = new Categories(req.body);
    
    category.save(function(err){
       if(err){
           return res.status(400).send({
              message: errorHandler.getErrorMessage(err) 
           });
       } else {
           res.status(201).json(category);
       }
    });
};

/**
 * Show the current Category
 */
exports.read = function (req, res) {
    res.json(req.category);

};

/**
 * Update a Category
 */
exports.update = function (req, res) {
    var category = req.category;
    // replace category with the input data
    category = _.extend(category, req.body);
    
    category.save(function(err){
       if(err){
           return res.status(400).send({
               message: errorHandler.getErrorMessage(err)
           })
       } else {
           res.json(category);
       }
    });
};

/**
 * Delete an Category
 */
exports.delete = function (req, res) {
    var category = req.category;
    
    category.remove(function(err){
        if(err){
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            })
        } else {
            res.json(category);
        }
    })
};

/**
 * List of Categories
 */
exports.list = function (req, res) {
    Categories.find().exec(function(err, categories){
       if(err){
           return res.status(400).send({
              message: errorHandler.getErrorMessage(err)
           });
       } else {
           res.json(categories);
       }
    });

};

/**
* assign value to the parameter categoryId
*/
exports.categoryByID = function(req, res, next, id){
  Categories.findById(id).exec(function(err, category){
      if(err) {
          return next(err);
      }
      if(!category){
          return res.status(404).send({
             message: 'Category not Found' 
          });
      }
      req.category = category;
      next();
  })  
};
