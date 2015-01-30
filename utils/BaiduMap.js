/**
 *
 *  地址解析，显示医院对应的经纬度
 *  由于百度对频繁的批量API调用，所以使用senInterval()函数每隔2秒发送一个http REST请求
 *  NCrawler
 *  Created by Jacky.L on 1/29/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */

var fs = require("fs"),
  http = require('http'),
  Hospital = require('../app/models/Hospital.js'),
  HOST = "api.map.baidu.com",
  hospitals =  fs.readFileSync('./hospitals.txt','utf-8'),
  hosArrys = hospitals.split('\n'),
  length = hosArrys.length-1;


/**
 * 每隔2seconds请求一次百度API
 */
var i=-1;
setInterval(function(){
   if(i < length-1){
     i++;
     var options = {
       host:HOST,
       path:"/geocoder?address="+hosArrys[i]+"&coord_type=bd09ll&output=json",
       method: 'GET'
     };

     var req = http.request(options, function(res){
        console.log(options);
        var data = "";
        res.on('data', function(chunk){
        data += chunk;
        });
        res.on('end',function(){
        var d = JSON.parse(data);
        var gpsArray = [];
        if(d.hasOwnProperty('result') && d.result.length !=0 ){
        gpsArray.push(d.result.location.lng);
        gpsArray.push(d.result.location.lat);
        };

        var con ={
        gps: gpsArray
        };
        var fields = {
        name:name
        };

        Hospital.findOneAndUpdate(fields,con).exec().then(function(){
        console.log("插入GPS成功!");
        },function(err){
        console.log("更新GPS信息错误："+i+err);
        });
        });
     });
     req.end();
   }
  },2000);


/*function Sleep(numberMillis,i) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
  i++;
}*/




