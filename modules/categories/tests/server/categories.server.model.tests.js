'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Categories = mongoose.model('Categories');

/**
 * Globals
 */
var user, categories;

/**
 * Unit tests
 */
describe('Categories Model Unit Tests:', function() {

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
        var categories = new Categories ({
           name: 'Beverages',
           description: 'Soft drinks, coffees, teas, beers, adn ales'
        });
        categories.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
    it('throws validation error when name is empty', function(done){
        var category = new Categories({description: 'Soft drinks, coffee, teas, beers, and ales'});
        
        category.save(function(err){
           should.exist(err);
            err.errors.name.message.should.equal('name cannot be blank');
            done();
        });
    });
    it('throws validation error when name longer than 15 chars', function(done){
        var category = new Categories({name: '123456789abcdefxxxx', description: 'Soft drink, ......'});
        category.save(function(err){
           should.exist(err);
            err.errors.name.message.should.equal('name must be 15 chars in length or less');
            done();
        });
    });
    it('throws validation error for duplicate category name', function(done){
        var category = new Categories({name: 'Beverages'});
        
        category.save(function(err){
           should.not.exist(err);
           
           var duplicate = new Categories({name: 'Beverages'});
            duplicate.save(function(err){
               should.exist(err);
//                err.err.indexOf('$name').should.not.equal(-1);
//                err.err.indexOf('duplicate key error').should.not.equal(-1);
//                should.exist(err);
                done();
            });
        });
    });
  });

  afterEach(function(done) { 
    Categories.remove().exec();

    done();
  });
});
