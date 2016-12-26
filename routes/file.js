/**
 * Created by 杨浪 on 2016/9/21.
 */
var express = require('express');
var router = express.Router();
var fs = require("fs");
var multiparty = require('multiparty');
var updateTempDir = './public/files/temp';
var updateDir = './public/files/';
var utils = require('../libs/utils');
/**
 * 文件上传
 */
router.post('/file/upload', function (req, res, next) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: updateTempDir});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
            res.json(utils.returns([err,null]));
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.upfile[0];
            var filename = utils.guid();
            var filetype = inputFile.originalFilename.match(/.*\.(.*)$/)[1];
            var uploadedPath = inputFile.path;
            var dstPath = updateDir + filename+'.'+filetype;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
            res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
            res.end(JSON.stringify({
                error:0,
                name:filename+'.'+filetype,
                originalName:inputFile.originalFilename,
                size:inputFile.size,
                state:"SUCCESS",
                type:filetype,
                url :'/file/'+filename+'.'+filetype
            }));
        }

    });
});

router.get('/file/:filename',function(req,res,next){
    if(req.params.filename == 'upload'){
        next();
        return;
    }
   fs.readFile(updateDir+req.params.filename,function(err,data){
       res.writeHead('200', {'Content-Type': 'image/jpeg'});    //写http头部信息
       res.end(data,'binary');
   });
});

router.post('/file/remove',function(req,res,next){
    fs.unlink(updateDir+req.body.filename.match(/file\/(.*)$/)[1],function(err,data){
        res.json(utils.returns(arguments));
    });
});


module.exports = router;