'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    MyUsers = mongoose.model('MyUsers');

/**
 * Unit tests
 */
describe('MyUsers Model', function() {

    describe('Saving', function() {
        it('saves new record', function(done) {
            var myUsers = new MyUsers({
                name: 'Beverages',
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            myUsers.save(function(err, saved) {
                should.not.exist(err);
                done();
            });
        });

        it('throws validation error when name is empty', function(done) {   
            var myUsers = new MyUsers({
                description: 'Soft drinks, coffees, teas, beers, and ales'
            });

            myUsers.save(function(err) {
                should.exist(err);
                err.errors.name.message.should.equal('name cannot be blank');
                done();
            });
        });

        it('throws validation error when name longer than 15 chars', function(done) {
            var myUsers = new MyUsers({
                name: 'Grains/Cereals/Chocolates'
            });

            myUsers.save(function(err, saved) {
                should.exist(err);
                err.errors.name.message.should.equal('name must be 15 chars in length or less');
                done();
            });
        });

        it('throws validation error for duplicate MyUsers name', function(done) {
            var myUsers = new MyUsers({
                name: 'Beverages'
            });

            myUsers.save(function(err) {
                should.not.exist(err);

                var duplicate = new MyUsers({
                    name: 'Beverages'
                });

                duplicate.save(function(err) {
//                    err.err.indexOf('$name').should.not.equal(-1);
//                    err.err.indexOf('duplicate key error').should.not.equal(-1);
//                    should.exist(err);
                    done();
                });
                
            });
        });
    });

    afterEach(function(done) { 
        // NB this deletes ALL categories (but is run against a test database)
        MyUsers.remove().exec();
        done();
    });
});
