/**
 *  数据抓取demo
 *
 *  NCrawler
 *  Created by Jacky.L on 1/7/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  Hospital = require('./app/controllers/HospitalController');

//Demo: 查询并存储北京所有的医院
Hospital.getHospitalListByProvince()
  .then(function(data){
    console.log("Finish get data.");
    return Hospital.parseAndStore(data);
  })
  .then(function(){
    console.log("Finish parse and store data.");
  },function(err){
    console.log("oooo:" + err);
  });
