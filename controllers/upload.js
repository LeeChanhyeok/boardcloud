const upload = require("../middleware/upload");
var mongoose  = require('mongoose');
var Photo     = require('../models/Photo');


const multipleUpload = async (req, res, next) => {
  var document = [];
  try {
    await upload(req, res);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    } else {
      for(var i=0;i<req.files.length;i++){
        document[i] = {
            title: req.body.title,
            path: 'files/'+req.files[i].filename
        };
      }
    }
    //console.log(document);
    // var document = {
    //   title: req.body.title,
    //   path:  'files/'+req.files.originalname
    // };
    //var photo = new Photo(document);
    // photo.save(function(error){
    //   if(error){
    //      throw error;
    //    }
    // });
    Photo.collection.insertMany(document, function (err, docs) {
    if (err){
        return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });

    return next();

  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

module.exports = {
  multipleUpload: multipleUpload
};
