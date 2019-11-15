var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var photoSchema = new Schema({
title:{type:String, required:[true,"Title is required!"]},
  path:  { type: String },
  caption: { type: String }
  });

//module.exports = mongoose.model('Photos', photoSchema);

// model & export
var Photo = mongoose.model("Photo", photoSchema);
module.exports = Photo;
