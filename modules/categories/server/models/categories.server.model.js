'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Validation
 */
function validateLength(v) {
    // a custom validation function for checking string length to be used by the model
    return v.length < 15;
}
/**
 * Categories Schema
 */
var CategoriesSchema = new Schema({
  // Categories model fields
  created: {
      type: Date,
      default: Date.now
  },
  description: {
      type: String,
      default: '',
      trim: true,
      
  },
  name: {
      type: String,
      default: '',
      trime: true,
      unique: true,
      required: 'name cannot be blank',
      validate: [validateLength, 'name must be 15 chars in length or less']
  }
});

mongoose.model('Categories', CategoriesSchema);
