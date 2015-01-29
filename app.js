/**
 *  数据抓取demo
 *
 *  NCrawler
 *  Created by Jacky.L on 1/7/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  Hospital = require('./app/controllers/HospitalController');
  _ = require('underscore'),
  DoctorList = require('./app/controllers/DoctorListController'),
  Supplier = require('./app/controllers/SupplierController'),
  Doctor = require('./app/controllers/DoctorController'),
  Index = require('./app/models/Index'),
  Department = require('./app/controllers/DepartmentController');

console.log("测试fork-pull合并代码");

///**
// * 查询并存储北京所有的医院
// */
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
//          return Department.parseAndStore(data, data.id);
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
//Hospital.getHospitalId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    //var idsArr = _.pluck(ids, 'id');
//    //console.log("##### " + idsArr);
//    for (var i = 0; i < ids.length; i++) {
//      var hs = ids[i];
//
//      Department.getDepartmentListByHospitalIdAndUpdate(hs.id, hs._id)
//        .then(function (data) {
//          console.log("Finish get data.");
//        }, function (err) {
//          console.log("oooo:" + err);
//        });
//    }
//  });

/**
 * 关联所有医生的 hospitalId
 */
//Hospital.getHospitalId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    //var idsArr = _.pluck(ids, 'id');
//    //console.log("##### " + idsArr);
//    for (var i = 0; i < ids.length; i++) {
//      var hs = ids[i];
//
//      Doctor.getDoctorByHospitalIdAndUpdate(hs.id, hs._id)
//        .then(function (data) {
//          console.log("Finish get data.");
//        }, function (err) {
//          console.log("oooo:" + err);
//        });
//    }
//  });

/**
 * 关联所有医生的 hospitalFacultyId
 */
//Department.getDepartmentId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    //var idsArr = _.pluck(ids, 'id');
//    //console.log("##### " + idsArr);
//    for (var i = 0; i < ids.length; i++) {
//      var hs = ids[i];
//
//      Doctor.getDoctorHospitalFacultyIdByAndUpdate(hs.id, hs._id)
//        .then(function (data) {
//          console.log("Finish get data.");
//        }, function (err) {
//          console.log("oooo:" + err);
//        });
//    }
//  });

//createSupplier();
//createHptIndex();
//createDpmIndex();

//function createSupplier(){
//  Doctor.find({})
//    .then(function(ds){
//      var arr = [];
//
//      ds.forEach(function(d){
//        var ss = d.fullGrade.split(" ");
//        var pos = ss[0]||ss[1];
//
//        var s = {
//          _id: d._id,
//          name: d.name,
//          avatar: d.logoUrl,
//
//          doctorIntro: d.doctorIntro,
//          hospitalId: d.hospitalId,
//          hospital: d.hospitalName,
//          province: d.province,
//          departmentId: d.hospitalFacultyId,
//          department: d.hospitalFacultyName,
//          fullGrade: d.fullGrade,
//          position: pos,
//          specialize: d.specialize,
//          goodVoteCount: d.goodVoteCount
//        };
//
//        arr.push(s);
//      });
//
//      Supplier.create(arr);
//    });
//};
//
//function createDpmIndex(){
//  Department.find({})
//    .then(function(ds){
//      var arr = [];
//
//      ds.forEach(function(d){
//        var s = {
//          _id: d._id,
//          name: d.name,
//          type: 3,
//
//          hospitalId: d.hospitalId,
//          category: d.category,
//          order: d.order,
//
//          doctorCount: d.doctorCount,
//          caseDoctorCount: d.caseDoctorCount,
//          bookingDoctorCount: d.bookingDoctorCount
//        };
//
//        arr.push(s);
//      });
//
//      Index.create(arr);
//    });
//};
//
//function createHptIndex(){
//  Hospital.find({})
//    .then(function(ds){
//      var arr = [];
//
//      ds.forEach(function(d){
//        var s = {
//          _id: d._id,
//          name: d.name,
//          type: 2,
//
//          district: d.district,
//          grade: d.grade,
//          featuredFaculties: d.featuredFaculties,
//          province: d.province,
//
//          doctorCount: d.doctorCount,
//          caseDoctorCount: d.caseDoctorCount,
//          bookingDoctorCount: d.bookingDoctorCount
//        };
//
//        arr.push(s);
//      });
//
//      Index.create(arr);
//    });
//};
//
//function sleep(sleepTime) {
//  for(var start = Date.now(); Date.now() - start <= sleepTime; ) { }
//}