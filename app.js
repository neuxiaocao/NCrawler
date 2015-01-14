/**
 *  数据抓取demo
 *
 *  NCrawler
 *  Created by Jacky.L on 1/7/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  Hospital = require('./app/controllers/HospitalController'),
  _ = require('underscore'),
  DoctorList = require('./app/controllers/DoctorListController'),
  Doctor = require('./app/controllers/DoctorController'),
  Department = require('./app/controllers/DepartmentController');

/**
 * 查询并存储北京所有的医院
 */
//Hospital.getHospitalListByProvince()
//  .then(function(data){
//    console.log("Finish get data.");
//    return Hospital.parseAndStore(data);
//  })
//  .then(function(){
//    console.log("Finish parse and store data.");
//  },function(err){
//    console.log("oooo:" + err);
//  });

/**
 * 获取所有医院科室
 */
//Hospital.getHospitalId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    var idsArr = _.pluck(ids, 'id');
//    console.log("##### " + idsArr);
//    for (var i = 0; i < idsArr.length; i++) {
//      var id = idsArr[i];
//
//      Department.getDepartmentListByHospitalId(id)
//        .then(function (data) {
//          console.log("Finish get data.");
//          return Department.parseAndStore(data, id);
//        })
//        .then(function () {
//          console.log("Finish parse and store data.");
//        }, function (err) {
//          console.log("oooo:" + err);
//        });
//    }
//  });

//Department.getDepartmentListByHospitalId(1)
//  .then(function(data){
//    console.log("Finish get data.");
//    return Department.parseAndStore(data, 1);
//  })
//  .then(function(){
//    console.log("Finish parse and store data.");
//  },function(err){
//    console.log("oooo:" + err);
//  });

/**
 * 查询所有医生列表详情
 */
//Department.getDepartmentId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    var idsArr = _.pluck(ids, 'id');
//    console.log("##### " + idsArr);
//    for (var i = 0; i < idsArr.length; i++) {
//      var id = idsArr[i];
//      DoctorList.getDoctorListByDepartmentId(id)
//        .then(function (data) {
//          console.log("Finish get data.");
//          return DoctorList.parseAndStore(data, id);
//        })
//        .then(function () {
//          console.log("Finish parse and store data.");
//        }, function (err) {
//          console.log("oooo:" + err);
//        });
//
//      //sleep(5000);
//    }
//  });
//DoctorList.getDoctorListByDepartmentId(125)
//  .then(function (data) {
//    console.log("Finish get data.");
//    return DoctorList.parseAndStore(data,125);
//  })
//  .then(function () {
//    console.log("Finish parse and store data.");
//  }, function (err) {
//    console.log("oooo:" + err);
//  });

/**
 * 查询所有医生详情
 */
//DoctorList.getId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    var idsArr = _.pluck(ids, 'id');
//    console.log("##### " + idsArr);
//    for (var i = 0; i < idsArr.length; i++) {
//      var id = idsArr[i];
//      Doctor.getDoctorInfoByDoctorId(id)
//        .then(function(data){
//          console.log("Finish get data.");
//          return Doctor.parseAndStore(data);
//        })
//        .then(function(){
//          console.log("Finish parse and store data.");
//        },function(err){
//          console.log("oooo:" + err);
//        });
//
//    }
//  });

/**
 * 关联所有科室的医院_id
 */
Hospital.getHospitalId()
  .then(function (ids) {
    //var ids2 = JSON.parse(JSON.stringify(ids));
    //var idsArr = _.pluck(ids, 'id');
    //console.log("##### " + idsArr);
    for (var i = 0; i < ids.length; i++) {
      var hs = ids[i];

      Department.getDepartmentListByHospitalIdAndUpdate(hs.id, hs._id)
        .then(function (data) {
          console.log("Finish get data.");
          return Department.parseAndStore(data, id);
        })
        .then(function () {
          console.log("Finish parse and store data.");
        }, function (err) {
          console.log("oooo:" + err);
        });
    }
  });

function sleep(sleepTime) {
  for(var start = Date.now(); Date.now() - start <= sleepTime; ) { }
}