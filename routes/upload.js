var express = require('express');
var router    = express.Router();
var upload    = require('./upload');
var mongoose  = require('mongoose');
var Photo     = require('../models/Photo');
const uploadController = require("../controllers/upload");
/* GET home page. */
router.get('/', function(req, res, next) {

  Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {
    res.render('upload/index', { title: 'NodeJS file upload tutorial', msg:req.query.msg, photolist : photos });

  });

});

/** Upload file to path and add record to database */
router.post("/", uploadController.multipleUpload);



module.exports = router;
