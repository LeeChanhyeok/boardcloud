
$(function() {
 //$("#files").load("filelist");
 $("button[type='submit']").click(function() {
    var formData = new FormData();
    if($('#myFile').val()=='') {
     alert("Please choose file!");
     return false;
    }
    $('div.progress').show();
    //console.log(document.getElementById('myFile').files.length);
    for(i=0;i<document.getElementById('myFile').files.length;i++){
      var file = document.getElementById('myFile').files[i];
      formData.append('uploadfile', file);
  }
  var title = document.getElementById('title').value;
  console.log(document.getElementById('title').value);
  var body = document.getElementById('body').value;
  console.log(document.getElementById('body').value);
  //console.log(post.title);
   formData.append('title', title);
   formData.append('body', body);

   var xhr = new XMLHttpRequest();
    xhr.open('post', '/posts', true);
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;
        $('div.progress div').css('width', percentage.toFixed(0) + '%');
         $('div.progress div').html(percentage.toFixed(0) + '%');
      }
    };
    xhr.onerror = function(e) {
      alert('An error occurred while submitting the form. Maybe your file is too big');
      window.location.href = '/posts';
    };
   xhr.onload = function() {
      var file = xhr.responseText;
       $('div.progress div').css('width','0%');
       $('div.progress').hide();
       alert( "File uploaded successfully!");

       window.location.href = '/posts';
      $('#myFile').val('');
    };
      xhr.send(formData);

   return false;

 });



 //
 // function showMsg(className, msg) {
 //     $("#msg").fadeIn();
 //      $("#files").load("filelist");
 //      $("#msg").addClass(className);
 //      $("#msg").html(msg);
 //      $("#msg").fadeOut(3000,function() {
 //         $("#msg").removeClass(className);
 //      });
 //
 // }

 // $(document).on('click','#delete',function() {
 //   $(this).attr('href','javascript:void(0)');
 //   $(this).html("deleting..");
 //   var file = $(this).attr("file");
 //    $.ajax({
 //           url:'deleteFile/'+file,
 //           type:'GET',
 //           data:{},
 //           success:function(res){
 //            showMsg("alert alert-danger", "File deleted successfully!")
 //           }
 //    });
 // });


});
