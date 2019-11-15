var express  = require("express");
var router   = express.Router();
var Post     = require("../models/Post");
var Photo     = require('../models/Photo');
var util     = require("../util");
const uploadController = require("../controllers/upload");
// Index
router.get("/", function(req, res){
  Post.find({})
  .populate("author")
  .sort("-createdAt")
  .exec(function(err, posts){
    if(err) return res.json(err);
    res.render("posts/index", {posts:posts});
  });
});

// New
router.get("/new", util.isLoggedin, function(req, res){
  var post = req.flash("post")[0] || {};
  var errors = req.flash("errors")[0] || {};
  res.render("posts/new", { post:post, errors:errors });
});

// create
router.post("/", util.isLoggedin, uploadController.multipleUpload, function(req, res){

  req.body.author = req.user._id;
  Post.create(req.body, function(err, post){
    if(err){
      req.flash("post", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/posts/new");
    }
    res.redirect("/posts");
  });
});

// show
router.get("/:id", function(req, res){
  Post.findOne({_id:req.params.id})
  .populate("author")
  .exec(function(err, post){
    if(err) return res.json(err);
    res.render("posts/show", {post:post});
  });
});


// show Photos
router.get("/:id/photos", function(req, res){
  Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {
    res.render('posts/photos', { title: 'NodeJS file upload tutorial', msg:req.query.msg, photolist : photos });
  });
});



// edit
router.get("/:id/edit", util.isLoggedin, checkPermission, function(req, res){
  var post = req.flash("post")[0];
  var errors = req.flash("errors")[0] || {};
  if(!post){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render("posts/edit", { post:post, errors:errors });
    });
  } else {
    post._id = req.params.id;
    res.render("posts/edit", { post:post, errors:errors });
  }
});

// update
router.put("/:id", util.isLoggedin, checkPermission, function(req, res){
  req.body.updatedAt = Date.now();
  Post.findOneAndUpdate({_id:req.params.id}, req.body, {runValidators:true}, function(err, post){
    if(err){
      req.flash("post", req.body);
      req.flash("errors", util.parseError(err));
      return res.redirect("/posts/"+req.params.id+"/edit");
    }
    res.redirect("/posts/"+req.params.id);
  });
});

// destroy
router.delete("/:id", function(req, res){
  Post.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect("/posts");
  });
});

module.exports = router;

// private functions
function checkPermission(req, res, next){
  Post.findOne({_id:req.params.id}, function(err, post){
    if(err) return res.json(err);
    if(post.author != req.user.id) return util.noPermission(req, res);

    next();
  });
}
