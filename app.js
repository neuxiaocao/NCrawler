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
  util = require('util'),
  DoctorList = require('./app/controllers/DoctorListController'),
  Supplier = require('./app/controllers/SupplierController'),
  Doctor = require('./app/controllers/DoctorController'),
  Index = require('./app/models/Index'),
  Department = require('./app/controllers/DepartmentController'),
  Faculty = require('./app/controllers/FacultyController'),
  SubFaculty = require('./app/models/SubFaculty'),
  HDF = require("./app/configs/hdf"),
  DiseaseController= require('./app/controllers/DiseaseController.js');

console.log("Crawler Begin Working....");

////////////////////////////////////////////////////////////////////////
//////////////////////// 基础数据抓取 /////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/**
* 1. 查询并存储北京所有的医院  Hospital
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
 * 2. 获取所有医院科室  Department
 */
/*Hospital.getHospitalId()
  .then(function (ids) {
    //var ids2 = JSON.parse(JSON.stringify(ids));
    var idsArr = _.pluck(ids, 'id');
    console.log("Hospital list ##### : " + idsArr);
    for (var i = 0; i < idsArr.length; i++) {
      var id = idsArr[i];

      Department.getDepartmentListByHospitalId(id)
        .then(function (data) {
          console.log("Finish get data.");
          return Department.parseAndStore(data, data.id);
        })
        .then(function () {
          console.log("Finish parse and store data.");
        }, function (err) {
          console.log("oooo:" + err);
        });
    }
  });
  */

/**
 * 3. 查询所有科室医生列表--医生基本信息  DoctorList
 */
/*Department.getDepartmentId()
  .then(function (ids) {
    var idsArr = _.pluck(ids, 'id');
    console.log("##### " + idsArr);
    for (var i = 0; i < idsArr.length; i++) {
      var id = idsArr[i];
      DoctorList.getDoctorListByDepartmentId(id)
        .then(function (data) {
          console.log("Finish get data.");
          return DoctorList.parseAndStore(data, id);
        })
        .then(function () {
          console.log("Finish parse and store data.");
        }, function (err) {
          console.log("oooo:" + err);
        });
    }
  });*/

/**
 * 4. 查询所有医生详情   Doctor
 */
/*DoctorList.getId()
  .then(function (ids) {
    //var ids2 = JSON.parse(JSON.stringify(ids));
    var idsArr = _.pluck(ids, 'id');
    console.log("##### " + idsArr);
    for (var i = 0; i < idsArr.length; i++) {
      var id = idsArr[i];
      Doctor.getDoctorInfoByDoctorId(id)
        .then(function(data){
          console.log("Finish get data.");
          return Doctor.parseAndStore(data);
        })
        .then(function(){
          console.log("Finish parse and store data.");
        },function(err){
          console.log("!!!!!! Error:oooo:" + err);
        });

    }
  });*/

/**
 * 5. 查询并存储疾病二级科室列表 SubFaculty
 */
/*
var keys = HDF.FACULTY_KEYS;//疾病以及科室名已经存为常量
//console.log("keys: "+keys);
for(var key in keys){//遍历所有key值
  console.log("key:"+ key);
  Faculty.getDiseaseFacultyListByFacultyKey(key)
    .then(function(data){
      console.log("Finish get data.");
      return Faculty.parseAndStore(data.data,data.key);
    })
    .then(function(){
      console.log("Finish parse and store data.");
    },function(err){
      console.log("oooo:" + err);
    });
};*/

/**
 * 6. 通过疾病二级科室编号获取疾病列表 + 科室ID  Disease
 */
//SubFaculty.find({},{id:1}).exec().then(function(ids){
//  console.log("ids.length:"+ids.length);
//  for(var id in ids){
//    console.log(ids[id].id);
//    DiseaseController.getDiseaseListByFacultyId(ids[id].id)
//      .then(function(data){
//        console.log("Finish get data.");
//        return DiseaseController.parseAndStore(data.data,data.id);
//      })
//      .then(function(){
//        console.log("Finish parse and store data.");
//      },function(err){
//        console.log("oooo:" + err);
//      });
//  };
//});


////////////////////////////////////////////////////////////////////////
//////////////////////// 关系数据抓取、整理 ///////////////////////////////
////////////////////////////////////////////////////////////////////////


/**
 * 7. 初始化疾病一级科室
 */
//Faculty.initFaculty(HDF.FACULTY_KEYS)
//  .then(function(){
//    console.log("Success init");
//  }, function(err){
//    console.log("!!!!!!Err init : " + err);
//  });
/**
 * 8. 关联疾病一级科室 与 二级科室, 批量更新二级科室
 */
//Faculty.connectFacultyWithSub();
//Format batch
//db.subfaculties.find({}).forEach(function(d){
//  var key = d.key;
//  d.facultyKey = key;
//  db.subfaculties.save(d);
//})
/**
 * 9. 关联疾病一级科室、二级科室 与 疾病
 */
//Faculty.connectFacSubWithDis();
/**
 * 10. 关联疾病一级科室、二级科室、疾病 与 医生 更新医生列表 (关系)
 */
DiseaseController.getDiseaseList()
  .then(function(list){
    //console.log("Finish get disease list")
    console.log("length: " + list.length);
    //for (var data in list){
    var data = -1;
    setInterval(function(){
      data++;
      console.log("********"+data);
      var key = list[data].key;
      var relation = {
        func: 1,
        facultyId: list[data].facultyId,
        facultyName: list[data].facultyName,
        facultyKey: list[data].facultyKey,
        subFacultyId: list[data].subFacultyId,
        subFacultyName: list[data].subFacultyName,
        diseaseId: list[data]._id,
        diseaseKey: key,
        diseaseName: list[data].name
      };
      Doctor.getDoctorListByDiseaseKey(key, relation)
        .then(function (result){
          console.log("Result return! " + util.inspect(result) );
          var doctorList = (JSON.parse(result.data)).content;
          var relation = result.relation;
          var relationList = [];
          var hdfID;
          for (var index in doctorList){
            hdfID = doctorList[index].id;
            console.log( index + " : id : " + hdfID);
            relationList.push(_.extend(relation, {doctorId: hdfID}));
          }
          console.log("==========================data: " + util.inspect(relationList));
          return Doctor.create(relationList);
        })
        .then(function(){
          console.log("Create Success");
        }, function(err){
          console.log("!!!!!!Err: " + err);
        });
    },5000);
    //}
  });

/**
 * 11. update医生表，更新医生索引关系记录
 *  表内聚合命令
 */
//Doctor.changeHdfId2DocMongoId();
//遍历疾病名 获取医生列表 更新现有医生关联的key







/**
 * 更新所有科室数据,关联到对应的医院_id
 */
//Hospital.getHospitalId()
//  .then(function (ids) {
//    //var ids2 = JSON.parse(JSON.stringify(ids));
//    //var idsArr = _.pluck(ids, 'id');
//    //console.log("#####
// " + idsArr);
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
 * 更新所有医生详情数据,关联到有医生的 hospitalId
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
 * 更新医生信息,关联医生的 hospitalFacultyId，将hdf的id替换为MongoId
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

//createSupplier();
//createHptIndex();
//createDpmIndex();