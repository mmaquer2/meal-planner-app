const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mealSchema = new Schema({
  meal: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  cals: {
    type: String,
    required: true,
    trim: true,
    minlength: 1

  },
  ingreds : {
    type:Array,
    required: true,
    trim: true,
    minlength: 1

  },
  type: {
    required: true,
    trim:true,
    minlength: 1,
  }
}, {
  timestamps: true,
});

let User = mongoose.model('Meal', mealSchema);

module.exports = Meal;