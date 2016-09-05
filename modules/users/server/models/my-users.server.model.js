'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Validation
 */
 function validateLength (v) {
  // a custom validation function for checking string length to be used by the model
  return v.length <= 15;
 }

/**
 * MyUsers Schema
 */
var MyUsersSchema = new Schema({
  // MyUsers model fields
  create: {
     // types are defined e.g. String, Date, Number 
	 type: Date,
	 default: Date.now
  },
  description: {
    type: String,
	default: '',
	trim: true
  },
  name: {
    type: String,
    default: '',
    trim: true,
    unique: true,
    // make this a required field
	required: 'name cannot be blank',
    // wires in a custom validator function
    validate: [validateLength, 'name must be 15 chars in length or less']
  }
});

mongoose.model('MyUsers', MyUsersSchema);
