/**
 *
 *  地址解析，显示医院对应的经纬度
 *  NCrawler
 *  Created by Jacky.L on 1/29/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */

var Hospital = require('../app/models/Hospital.js'),
  fs = require("fs");

Hospital.find({},{_id:0,name:1}).exec().then(function(result){
  for(var i in result){
    fs.appendFileSync('./hospitals.txt', result[i].name+"\n",'utf-8');
  };
  console.log("Write over!");
});

