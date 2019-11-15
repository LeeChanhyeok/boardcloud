var express = require('express');
var router    = express.Router();
var mongoose  = require('mongoose');
var Photo     = require('../models/Photo');

var request = require('request');
var zip = require('express-zip');
// var path = require('path');
// var os = require('os');
// var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {

  Photo.find({}, ['path','caption'], {sort:{ _id: -1} }, function(err, photos) {
    res.render('download/index', { title: 'NodeJS file upload tutorial', msg:req.query.msg, photolist : photos });

  });

});

router.post("/", function(req, res){
  //console.log(req.body.multifile);

  let urlList = req.body.multifile;
  let jsonArray = [];
  urlList.forEach( function(str) {

  	var filename =  str.split('/').pop();
  	//console.log('Downloading ' + filename);
    // var fullUrl = req.protocol + '://' + req.get('host');
    // var filePath =  fullUrl +"/files/"+filename;
    // console.log('Path ' + filePath);

    jsonArray.push({"path":"public/files/"+filename,"name":filename});
    //jsonArray.append("name",filename);
    // console.log('Finished Downloading' + filename);
  	// download(filePath, filename, function(){console.log('Finished Downloading' + filename)});

  });

  //console.log(jsonArray);

  res.zip(jsonArray,"file");
  // var download = function(url, dest, callback){
  //
  //     request.get(url)
  //     .on('error', function(err) {console.log(err)} )
  //     .pipe(fs.createWriteStream(dest))
  //     .on('close', callback);
  //
  // };

  //urlList.forEach( function(str) {

  	//var filename =  str.split('/').pop();
  	//console.log('Downloading ' + filename);
    //var fullUrl = req.protocol + '://' + req.get('host');
    //var filePath =  fullUrl +"/files/"+filename;
    //console.log('Path ' + filePath);

    //res.download("public/files/"+filename);
    //console.log('Finished Downloading' + filename);
  	//download(filePath, filename, function(){console.log('Finished Downloading' + filename)});

  //});
  //res.redirect("/download");


  //res.end();
});




/* 다운로드 요청 처리 */
//
//router.post("/", function(req, res){
  // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
  //var _id = req.query.id;​
  //let files = req.body.multifile;
  // id를 사용해 데이터를 찾음
  // Photo.findOne({"_id":_id})
  //  .select("orgFileName saveFileName") // 해당파일의 원래이름과 저장된 이름을 가져옴
  //  .exec(function(err, data){ // 완료되면 찾은 데이터는 data에 담깁니다.
   // var filePath = path.join(`${__dirname}/../public/files`, files[0]); // 다운로드할 파일의 경로​
   // var fileName = files[0]; // 원본파일명​
   // // 응답 헤더에 파일의 이름과 mime Type을 명시한다.(한글&특수문자,공백 처리)
   // res.setHeader("Content-Disposition", "attachment;filename=" + encodeURI(fileName));
   // res.setHeader("Content-Type","binary/octet-stream");
   // // filePath에 있는 파일 스트림 객체를 얻어온다.(바이트 알갱이를 읽어옵니다.)
   // var fileStream = fs.createReadStream(filePath);
   // // 다운로드 한다.(res 객체에 바이트알갱이를 전송한다)
   // fileStream.pipe(res);
 //});
 //});
//
// /* 삭제 요청 처리 */
// router.get("/delete", funciton(req, res) {
//   // 요청시 해당 파일의 id값을 쿼리로 붙여서 전달합니다.(선택된 파일을 DB에서 찾기 위해)
//   var _id = req.query.id;
//  // id를 사용해 데이터를 찾음
//  Photo.findOne({"_id":_id})
//  .select("saveFileName") // 저장된 이름을 가져옵니다.
//  .exec(function(err, data){ // 완료되면 찾은 데이터는 data에 담깁니다. ​
//   var filePath = __dirname + "/../upload" + data.saveFileName; // 삭제할 파일의 위치​
//  fs.unlink(filePath, function(){ // fs 모듈을 이용해서 파일 삭제합니다.​
// // 삭제가 완료되면 여기가 실행됩니다.
// DBData.remove({"_id":_id}, function(err){ // MongoDB 에서 파일 정보 삭제하기​
//   if(err) res.send(err); // 에러 확인
//      res.end("ok"); // 응답
//  });
// });
// });

module.exports = router;
