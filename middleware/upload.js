const util = require("util");
const path = require("path");
const multer = require("multer");
var mongoose  = require('mongoose');
var Photo     = require('../models/Photo');


var storage = multer.diskStorage({

  destination: (req, file, callback) => {
    console.log("confirm");
    console.log(req.body.title);
    callback(null, path.join(`${__dirname}/../public/files`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "video/mp4"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    //var filename = `${Date.now()}-bezkoder-${file.originalname}`;
    var filename = `${file.originalname}`;
    callback(null, filename);


    /**
    * Create new record in mongoDB
    */
       //var fullPath = path.join(`${__dirname}/../files/`)+file.originalname;
       var document = {
         title: 'req.body.title',
         path:     'files/'+file.originalname
       };
       var photo = new Photo(document);
         photo.save(function(error){
         if(error){
         throw error;
       }
    });

  }


});

var uploadFiles = multer({ storage: storage }).array("uploadfile", 100);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
