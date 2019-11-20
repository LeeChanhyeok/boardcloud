const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({

  destination: (req, file, callback) => {
    //console.log("confirm");
    //console.log(title.title);
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
  }


});

var uploadFiles = multer({ storage: storage }).array("uploadfile", 100);
var uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
