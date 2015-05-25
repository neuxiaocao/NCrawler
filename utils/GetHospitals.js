/**
 *
 *  地址解析，显示医院对应的经纬度
 */

var Hospital = require('../app/models/Hospital.js'),
  fs = require("fs");

Hospital.find({},{_id:1,id:1}).exec().then(function(result){
  for(var i in result){
    fs.appendFileSync('./hospitals.txt', result[i].id+"\n",'utf-8');
  };
  console.log("Write over!");
});

