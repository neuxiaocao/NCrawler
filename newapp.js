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
  Index = require('./app/models/Index.js'),
  //IndexController = require('./app/controllers/IndexController.js'),
  Department = require('./app/controllers/DepartmentController'),
  Faculty = require('./app/controllers/FacultyController'),
  SubFaculty = require('./app/models/SubFaculty'),
  HDF = require("./app/configs/hdf"),
  DiseaseController = require('./app/controllers/DiseaseController.js'),
  ProfileController = require('./app/controllers/ProfileController.js');
  PROVINCELIST = require('./app/configs/province.js').PROVINCEES,
  RegionController = require('./app/Controllers/RegionController.js'),
  DISTINCTDOCIDS = require('./app/configs/distinctDocId.js').docIds,
  HOSIDS = require('./app/configs/distinctDocId.js').HosIDS,
  Region = require('./app/models/Region.js');

console.log("Crawler Begin Working....");

////////////////////////////////////////////////////////////////////////
//////////////////////// 基础数据抓取 /////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/**
 * 1. 查询并存储全国所有的医院  Hospital
 * Tip:  将PROVINCELIST[i]修改为对应省得信息
 */
//var i = 0;
//var temp ;
//temp = setInterval(function(){
//if(i==1){
//  clearInterval(temp);
//  return;
//};
//Hospital.getHospitalListByProvince(PROVINCELIST[i])
//  .then(function(data){
//   console.log("Finish get data.");
//   ++i;
//   return Hospital.parseAndStore(data);
//  }).then(function(){
//   console.log("Finish parse and store data.");
//  }, function(err){
//   console.log("oooo:" + err);
//  });
//},500);



/**
 * 2. 获取所有医院科室并关联该科室对应的医院信息  Department
 */
//Hospital.getHospitalId()
//.then(function(ids){
//  var i = 0;
//  //var idsArr = _.pluck(ids, 'id');
//  //console.log("Hospital list ##### : " + ids);
//  var temp;
//  temp = setInterval(function(){
//   if( i == ids.length){
//    clearInterval(temp);
//    return;
//   };
//   var id = ids[i];
//   ++i;
//   Department.getDepartmentListByHospitalId(id)
//    .then(function(data){
//     console.log("Finish get data.");
//
//     return Department.parseAndStore(data);
//    }, function(err){
//     console.log("oooo:" + err);
//    });
//
//  },500);
//});



/**
 * 将医院的_id写入department表
 * @deprecated
 */
/*Hospital.find({},'id').then(function(hospitals){
 console.log("**********Hospitals Length:"+hospitals.length);
 hospitals.forEach(function(hos){

 var con = {
 hosId : hos.id
 };
 var updates= {
 hospitalId: hos._id
 };

 return Department.updateIds(con, updates).then(function(deps){
 console.log("Success"+deps);
 });
 })
 });*/

/**
 * 将医院的id关联到相应地科室下面，并写入index表 ； hospitalId:科室所属的医院id
 * @deprecated
 */
//Hospital.find({},'id').then(function (hospitals) {
//  console.log("**********Hospitals Length:"+hospitals.length);
//  hospitals.forEach(function (hos) {
//   console.log("######Hospital id is:"+hos.id);
//   var con = {
//    hosId: hos.id
//   };
//   var updates = {
//    hospitalId: hos._id
//   };
//   return IndexController.update(con,updates).then(function(d){
//    console.log("Update department hospital id successfully!");
//   });
//  })
//});


/**
 * 3. 查询所有科室医生列表--医生基本信息  DoctorList
 *   每四秒 call 一次hdf api，防治ip被封锁
*/
//Department.getDepartmentId()
//  .then(function (ids) {
//   // var idsArr = _.pluck(ids, 'id');
//  //  console.log("##### " + idsArr);
//    var i = 0 ;
//    var temp = setInterval(function(){
//      if(i == ids.length){
//       clearInterval(temp);
//       return;
//      }
//     var data = ids[i];
//     ++i;
//      DoctorList.getDoctorListByDepartmentId(data)
//        .then(function (data) {
//          console.log("Finish get data.");
//          return DoctorList.parseAndStore(data, data.departmentId);
//        })
//        .then(function () {
//          console.log("Finish parse and store data.");
//        }, function (err) {
//          console.log("oooo:" + err);
//        });
//    },500);
//  });

/**
 * 4. 查询所有医生详情   Doctor
 *    每1s爬取数据一次防止被hdf封锁
 */
//DoctorList.getId()
//.then(function (ids) {
////var ids2 = JSON.parse(JSON.stringify(ids));
//// console.log(ids);
//  var idsArr = _.pluck(ids, 'id');
//  console.log("##### " + idsArr.length);
//  var i = 0;
//  var temp ;
//
//  temp   = setInterval(function(){
//   if(i==idsArr.length){
//    clearInterval(temp);
//    return;
//   };
//   var id = idsArr[i];
//   ++i;
//   Doctor.getDoctorInfoByDoctorId(id)
//    .then(function(data){
//     console.log("Finish get data.");
//
//     return Doctor.parseAndStore(data);
//    })
//    .then(function(){
//     console.log("Finish parse and store data.");
//    },function(err){
//     console.log("!!!!!! Error:oooo:" + err);
//    });
//  },100);
///* for (var i = 0; i < idsArr.length; i++) {
//   var id = idsArr[i];
//   Doctor.getDoctorInfoByDoctorId(id)
//    .then(function(data){
//     console.log("Finish get data.");
//     return Doctor.parseAndStore(data);
//    })
//    .then(function(){
//     console.log("Finish parse and store data.");
//    },function(err){
//     console.log("!!!!!! Error:oooo:" + err);
//    });
//}*/
//
//});

/**
 * 5. 查询并存储疾病二级科室列表 SubFaculty
 *    @deprecated
 */
/* var keys = HDF.FACULTY_KEYS;//疾病以及科室名已经存为常量
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
 *    @deprecated
 */
/*SubFaculty.find({},{id:1}).exec().then(function(ids){
  console.log("ids.length:"+ids.length);
  for(var id in ids){
    console.log(ids[id].id);
    DiseaseController.getDiseaseListByFacultyId(ids[id].id)
      .then(function(data){
        console.log("Finish get data.");
        return DiseaseController.parseAndStore(data.data,data.id);
      })
      .then(function(){
        console.log("Finish parse and store data.");
      },function(err){
        console.log("oooo:" + err);
      });
  };
});*/


////////////////////////////////////////////////////////////////////////
//////////////////////// 关系数据抓取、整理 ///////////////////////////////
////////////////////////////////////////////////////////////////////////


/**
 * 7. 初始化疾病一级科室
 * @deprecated
 */
//Faculty.initFaculty(HDF.FACULTY_KEYS)
//  .then(function(){
//    console.log("Success init");
//  }, function(err){
//    console.log("!!!!!!Err init : " + err);
//  });
/**
 * @deprecated
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
 * @deprecated
 */
//Faculty.connectFacSubWithDis()
/**
 * 10. 关联疾病一级科室、二级科室、疾病 与 医生 更新医生列表 (关系)
 *
 * Tip:修改Doctor.getDoctorListByDiseaseKey 方法querySring的privince为相应地省份或者直辖市
 * 直辖市，例如：北京市，去掉-市
 * 省份，例如：山东省，去掉-省
 */
//DiseaseController.getDiseaseList()
//  .then(function(list){
//    console.log("length: " + list.length);
//    var data = 0 ;
//    var temp = setInterval(function(){
//     if( data == list.length){
//      clearInterval(temp);
//      return;
//     };
//      var key = list[data].key;
//      var relation = {
//        func: 1,
//        facultyId: list[data].facultyId,
//        facultyName: list[data].facultyName,
//        facultyKey: list[data].facultyKey,
//        subFacultyId: list[data].subFacultyId,
//        subFacultyName: list[data].subFacultyName,
//        diseaseId: list[data]._id,
//        diseaseKey: key,
//        diseaseName: list[data].name
//      };
//      ++data;
//      Doctor.getDoctorListByDiseaseKey(key, relation)
//        .then(function (result){
//          var doctorList = (JSON.parse(result.data)).content;
//          var relation = result.relation;
//          var relationList = [];
//          var hdfID;
//          for (var index in doctorList){
//            hdfID = doctorList[index].id;
//            relationList.push(
//              _.extend(
//                _.clone(relation), {doctorId: hdfID}));
//          }
//          return Doctor.create(relationList);
//        })
//        .then(function(){
//          console.log("Create Success");
//        }, function(err){
//          console.log("!!!!!!Err: " + err);
//        });
//    },100);
//  });

/**
 * 11. 新增北京索引
 *     在region表找到对应的地区信息
 */
//Index.create([{
//"_id" : "5509080d8faee0fbe0c4a6d3",
//"name" : "浙江",
//"isDeleted" : false,
//"updatedAt" : 1426655247511,
//"createdAt" : 1426655247511,
//"source" : "zly",
//"type" : 1
//}]);

/**
 * 12. 关联北京-医院
 *  MongoDB语句
 *
 *
 *  @deprecated
 */
//db.hospitals.update(
//  {province:"北京"},
//  {$set: {provinceId: "54b8bbd551f77c2d2a029402"}},
//  {multi:true});

//
// 14. 更新医院信息
//@deprecated
//db.hospitals.update(
//  {province:"北京"},
//  {$set: {provinceId: "54b8bbd551f77c2d2a029402"}},
//  {multi:true});


/**
 * 13. 关联医院-科室
 *     更新所有科室数据,关联到对应的医院_id
 *   @deprecated
 */
/*Hospital.getHospitalId()
  .then(function (data) {
    var list = JSON.parse(JSON.stringify(data));
    //var idsArr = _.pluck(ids, 'id');
    console.log("#####" + list.length);
    for (var i = 0; i < list.length; i++) {
      var hs = list[i];
      var updates = {
        provinceId: hs.provinceId,
        provinceName: hs.province,
        hospitalId: hs._id,
        hospitalName: hs.name
      };
      console.log(util.inspect(updates));
      Department.getDepartmentListByHospitalIdAndUpdate(hs.id, updates)
        .then(function (data) {
          console.log("Finish get data.");
        }, function (err) {
          console.log("oooo:" + err);
        });
    }
  });*/


/*
15. 更新医生关系信息  根据省、医院、科室拉出来的数据都是默认func=0, 所以这里面需要批量更新func= 2
    func=2的医生数据是func=1的医生数据的超集
    Tip:在数据库里面执行脚本
        修改provinceName为对应的省份  Region表查询 provinceId修改为对应的ID
        将provinceId 和 provinceName修改为对应的省*/
//db.doctors.update(
// {func:0},
// {$set: {func:2, provinceId: "5509080d8faee0fbe0c4a6d3", provinceName:"浙江"}},
// {multi:true});



/**
 * 16. 通过hdf的id关联地点科室与DoctorRelation
 * 将 对应的医院、科室信息关联到按照地点索引的医生Document里面
 */
//Department.getDepartmentId()
//  .then(function(data){
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    for (var i = 0; i < list.length; i++) {
//      var hs = list[i];
//      var updates = {
//        //provinceId: hs.provinceId,
//        //provinceName: hs.province,
//        hospitalId: hs.hospitalId,
//        hospitalName: hs.hospitalName,
//        departmentId: hs._id,
//        departmentName: hs.name
//      };
//      console.log("Update doctor: " + util.inspect(updates));
//      Doctor.updateDoctor({func: 2, hospitalFacultyId: hs.id}, updates);
//    }
//  });

// 17. 将所有func=2的医生关系记录中的doctorId字段置为空
 // @deprecated
// db.doctors.update({func: 2}, {$set: {doctorId: ""}}, {multi:true})

/**
* 18. 科室关系  关联到医生profile表 Step1
* 从func=2的doctor信息中提取医生profile，并存储
* 提取单点执业的医生profile
 * // @deprecated
*/
//Doctor.find({func: 2, name: {$nin: HDF.DUPLICATE_NAMES}})
//  .then(function (data) {
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    for (var i = 0; i < list.length; i++) {
//      var hs = list[i];
//      var id = hs._id;
//      delete hs._id;
//      delete hs.__v;
//
//      ProfileController.create(hs, id)
//        .then(function(data){
//          var newProfileId = data.profile._id;
//          var relationId = data.id;
//          var conds = {
//            func:2,
//            _id: relationId
//          };
//          var updates = {
//            doctorId: newProfileId
//          };
//          console.log("Cond: " + util.inspect(conds) + " Updates: " + util.inspect(updates));
//          Doctor.updateDoctor(conds, updates)
//            .then(function(){
//            }, function (err){
//              console.log("!!!!!!!UpdateErr:"+err);
//            });
//        }, function(err){
//          console.log("!!!!!!!CreateErr:"+err);
//        });
//
//    }
//  });

/**
 * 19. 科室关系  关联到医生profile表 Step2
 * 从func=2的doctor信息中提取医生profile，并存储
 * 提取非单点执业的医生profile
 * // @deprecated
 */
//Doctor.find({func: 2, name: {$in: HDF.DUPLICATE_NAMES}})
//  .then(function (data) {
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    //for (var i = 0; i < list.length; i++) {
//    var num = -1;
//    setInterval(function(){
//      num++;
//      if (num >= list.length) return;
//      var hs = list[num];
//      //var id = hs._id;
//      //判断医生唯一的标准: 姓名相同 + 个人简介相同 + 个人专长投票信息相同
//      var name  = hs.name;
//      var intro = hs.doctorIntro;//个人简介信息
//      var vote  = hs.diseaseVotes;//个人专长投票信息
//      delete hs.__v;
//      var con = {
//        name: name,
//        doctorIntro: intro,
//        diseaseVotes: vote
//      };
//      console.log("Profile conditions: " + util.inspect(con));
//      ProfileController.find(con, hs)
//        .then(function(data){
//          if (data.profile){
//            console.log("Exists!!");
//            var conds = {
//              func:2,
//              _id: data.param._id
//            };
//            var updates = {
//              doctorId: data.profile._id
//            };
//            Doctor.updateDoctor(conds,updates)
//              .then(function(){
//              }, function (err){
//                console.log("!!!!!!!UpdateErr:"+err);
//              });
//          }else{
//            var pro = data.param;
//            var id  = pro._id;
//            delete pro._id;
//            ProfileController.create(pro, id)
//              .then(function(data){
//                var newProfileId = data.profile._id;
//                var relationId = data.id;
//                var conds = {
//                  func:2,
//                  _id: relationId
//                };
//                var updates = {
//                  doctorId: newProfileId
//                };
//                console.log("Cond: " + util.inspect(conds) + " Updates: " + util.inspect(updates));
//                Doctor.updateDoctor(conds, updates)
//                  .then(function(){
//                  }, function (err){
//                    console.log("!!!!!!!UpdateErr:"+err);
//                  });
//              }, function(err){
//                console.log("!!!!!!!CreateErr:"+err);
//              });
//          }
//        }, function(err){
//          console.log("!!!!!!!FindErr:"+err);
//        });
//
//    }, 100);
//  });

/**
 * 20. 疾病关系 通过科室关系 关联到profile表
 * @deprecated
 *
 */
//Doctor.find({func: 2, id:{$in: HDF.TMP_LIST}},
//  {_id: 0, id: 1, doctorId: 1, name: 1, logoUrl: 1})
//  .then(function (data){
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    for (var i = 0; i < list.length; i++) {
//      var d = list[i];
//      var con = {
//        func: 1,
//        doctorId: d.id//,
//        //doctorName: {$exists: false}
//      };
//      var updates = {
//        doctorId: d.doctorId,
//        doctorName: d.name//,
//        //doctorIntro: d.doctorIntro,
//        //logoUrl: d.logoUrl
//      };
//      //console.log(i + "update " + util.inspect(updates));
//      Doctor.updateDoctor(con, updates)
//        .then(function(){
//          console.log("update success!");
//        },function(err){
//          console.log("!!!!!!!UpdateErr:"+err);
//        });
//    }
//  }, function(err){
//    console.log("!!!!!!!FindErr:"+err);
//  });
//
//
//  有部分为关联上的关系,标识删除  MongoDB脚本
//@deprecated
//db.doctors.find(  {func:1, doctorName:{$exists: false}});
//db.doctors.update(
//  {func:1, doctorName:{$exists: false}},
//  {$set: {isDeleted: true}},
//  {multi: true});

/**
 * 21.1 Index合并表操作 Province
 * @deprecated
 */
//Index.create([{
//  "_id" : ObjectId("54b8bbd551f77c2d2a029402"),
//  "name" : "北京",
//  "isDeleted" : false,
//  "updatedAt" : 1421391992497,
//  "createdAt" : 1421391992497,
//  "source" : "zly",
//  "type" : 1
//}]);
/**
 * 21.2 Index合并表操作 Hospital
 */
//Hospital.find({},
//  "_id id name district gps doctorCount grade featuredFaculties provinceId provinceName " +
//    " caseDoctorCount bookingDoctorCount ")
//  .then(function(data){
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    var newList = [];
//    for (var i = 0; i < list.length; i++) {
//      var hos = list[i];
//
//      newList.push(
//        _.extend(
//          _.clone(hos),{hdfId: hos.id, type:2}));
//    }
//    //console.log("List: " + util.inspect(newList));
//    return Index.create(newList);
//  })
//  .then(function(){
//    console.log("Success")
//  },function(err){
//    console.log("!!!!!!!Err:"+err);
//  });

///**
// * 21.3 Index合并表操作 Department
// */
//Department.find({},
//  "_id id provinceId provinceName hospitalId hospitalName name doctorCount " +
//    " category order caseDoctorCount bookingDoctorCount ")
//  .then(function(data){
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    var newList = [];
//    for (var i = 0; i < list.length; i++) {
//      var dep = list[i];
//
//      newList.push(
//        _.extend(
//          _.clone(dep),{hdfId: dep.id, type:3}));
//    }
//    //console.log("List: " + util.inspect(newList));
//    Index.create(newList);
//  });

///**
// * 21.4 Index合并表操作 Faculty
      //  生产机Index已经有此数据
// */
//Faculty.find({},
//    "_id key name ")
//  .then(function(data){
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    var newList = [];
//    for (var i = 0; i < list.length; i++) {
//      var fac = list[i];
//
//      newList.push(
//        _.extend(
//          _.clone(fac),{type:4}));
//    }
//    console.log("List: " + util.inspect(newList));
//    Index.create(newList);
//  });

/**
* 21.5 Index合并表操作 SubFaculty
 *  生产机已经有此数据
*/
//SubFaculty.find({},
//  "_id id name facultyId facultyKey facultyName").exec()
//  .then(function(data){
//    var list = JSON.parse(JSON.stringify(data));
//    console.log("#####" + list.length);
//    var newList = [];
//    for (var i = 0; i < list.length; i++) {
//      var sub = list[i];
//
//      newList.push(
//        _.extend(
//          _.clone(sub),{hdfId: sub.id, type:5}));
//    }
//    //console.log("List: " + util.inspect(newList));
//    Index.create(newList);
//  });

/**
 * 21.6 Index合并表操作 Disease
 * 生产机已经有此数据
 */
/*DiseaseController.find({},
  "_id id key name brief  diseaseDoctorCount spaceDoctorCount " +
    "facultyId facultyKey facultyName subFacultyId subFacultyName")
  .then(function(data){
    var list = JSON.parse(JSON.stringify(data));
    console.log("#####" + list.length);
    var newList = [];
    for (var i = 0; i < list.length; i++) {
      var dis = list[i];

      newList.push(
        _.extend(
          _.clone(dis),{hdfId: dis.id, type:6}));
    }
//    console.log("List: " + util.inspect(newList));
    Index.create(newList);
  });*/



/**
 * 提取 地点索引 与 医生的关系， 并在doctor中单独存储
 * 废弃
 */
/*var conds   = {func : 0};
var fields  = "id name hospitalFacultyId hospitalFacultyName hospitalFacultyFullName " +
  " hospitalId hospitalName";
Doctor.getDoctorInfo(conds, fields)
  .then(function(data){
    var list = JSON.parse(JSON.stringify(data));
    var relations = [];
    var relation;
    console.log("Length : " + list.length);
    for (var i = 0; i < 10 ; i++){
      relation = list[i];
      delete relation._id;
      relations.push(
        _.extend(
          _.clone(relation),
          {func: 2, provinceId: "54b8bbd551f77c2d2a029402", provinceName:"北京"}));
    }
    //console.log("Data : " + util.inspect(relations));
    Doctor.create(relations);
  });*/
//Doctor.changeHdfId2DocMongoId();
//遍历疾病名 获取医生列表 更新现有医生关联的key


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
/**
 * 整理按照地区、一二级科室拉出来的医生数据
 * 首先整理func = 2 [按照地区索引出来的医生数据]
 * 废弃
 */
/*Doctor.find({func:2}).then(function(data){
 if(data.length == 0){
  console.log("Data length equals 0! ")
  return;
 };

  var i=0;
  var temp;
  temp = setInterval(function(){

   console.log("Data Length"+data.length+"#########"+i);
   if(i==data.length){
    clearInterval(temp);
    return;
   };
   var id = data[i].hospitalId;
   var hospitalSchema = {};
   var diseaseSchema = {};
   ++i;
   Hospital.find({id:id}).then(function(hos){
    var distrit = hos[0].district+"区";
    console.log(distrit);
   });
  }, 100)
*//*  if(data[i].hospitalId && data[i].departmentId){

  };*//*



});*/

/**
 * 从doctor表里面dictinct func=2[fun=2的医生包含func=1的医生]医生数据，批量创建profile表
 * 数据库查找对应的dosIds
 */
 //Doctor.getDisDoctorIds('doctorId',{func:2}).then(function(dosIds){
 ////var dosIds = _.values(DISTINCTDOCIDS);
 //dosIds.forEach(function(d){
 //  Doctor.find({doctorId: d, func:2}).then(function(doc){
 //   var doctor = JSON.parse(JSON.stringify(doc[0]));
 //   //console.log("Doctors :"+ doctor);
 //   var profile = {};
 //   if(doctor.type != undefined){
 //    profile.type = doctor.type;
 //    // console.log("###########"+profile.type);
 //    //console.log("#####"+ doctor.type);
 //   }
 //   if(doctor.sourceType)
 //    profile.source = doctor.sourceType;
 //   if(doctor.createdAt)
 //    profile.createdAt = doctor.createdAt;
 //   if(doctor.updatedAt)
 //    profile.updatedAt = doctor.updatedAt;
 //   if(doctor.isDeleted != undefined)
 //    profile.isDeleted = doctor.isDeleted;
 //   if(doctor.name)
 //    profile.name = doctor.name;
 //   if(doctor.alias)
 //    profile.alias = doctor.alias;
 //   if(doctor.pinyin)
 //    profile.pinyin = doctor.pinyin;
 //   if(doctor.avatar)
 //    profile.avatar =doctor.avatar;
 //   if(doctor.sex)
 //    profile.sex = doctor.sex;
 //   if(doctor.doctorIntro)
 //    profile.doctorIntro = doctor.doctorIntro;
 //   if(doctor.contact)
 //    profile.contact = doctor.contact;
 //   if(doctor.address)
 //    profile.address = doctor.address;
 //   if(doctor.position)
 //    profile.position = doctor.position;
 //   if(doctor.fullGrade)
 //    profile.fullGrade = doctor.fullGrade;
 //   if(doctor.specialize)
 //    profile.specialize = doctor.specialize;
 //   if(doctor.practicingNumber)
 //    profile.practicingNumber =doctor.practicingNumber;
 //   if(doctor.descriptionImages)
 //    profile.descriptionImages = doctor.descriptionImages;
 //   if(doctor.descriptionTags)
 //    profile.descriptionTags = doctor.descriptionTags;
 //   if(doctor.searchTags)
 //    profile.searchTags = doctor.searchTags;
 //   if(doctor.eduBackground)
 //    profile.eduBackground = doctor.eduBackground;
 //   if(doctor.brokerActiveNum)
 //    profile.brokerActiveNum = doctor.brokerActiveNum;
 //   if(doctor.serviceActiveNum)
 //    profile.serviceActiveNum = doctor.serviceActiveNum;
 //   if(doctor.brokerId)
 //    profile.brokerId = doctor.brokerId;
 //   if(doctor.checkStatus != undefined)
 //    profile.checkStatus = doctor.checkStatus;
 //   if(doctor.failReason)
 //    profile.failReason = doctor.failReason;
 //   if(doctor.hdfId)
 //    profile.hdfId = doctor.hdfId;
 //   if(doctor.doctorNo)
 //    profile.doctorNo = doctor.doctorNo;
 //   if(doctor.hospitalFacultyId != undefined)
 //    profile.hospitalFacultyId = doctor.hospitalFacultyId;
 //   if(doctor.doctorId != undefined)
 //    profile.doctorId = doctor.doctorId;
 //
 //   return Doctor.CreateProfile(profile).then(function(d){
 //    console.log("Create Success!")
 //   });
 //  });
 //});
 //});




/**
 * 基于医院id查找对应的区域信息，然后查找医院对应的科室列表，
 * 基于每一个科室下面的医生列表更新profile表relatedHospital字段
 *
 * 当拉去省数据时候：
 * RegionController 里面需拼接：济南市
 * 当拉取直辖市数据的时候：
 *  RegionController 里面需拼接：朝阳区
 */
//
//Hospital.find({},'_id id district').then(function(hospitals){
//hospitals.forEach(function(hospital){
//  console.log(hospital);
//RegionController.find(hospital).then(function(region){
//  var body = region.body;
//  var districId = body._id;
//  var districtName = body.name;
//  var hospitalId = region.hos._id;
//
//  Department.find({hospitalId:hospitalId}).then(function(deps){
//
//   console.log("#####"+deps.length);
//   deps.forEach(function(dep){
//   var data = {
//     provinceId: dep.provinceId,
//     provinceName: dep.provinceName,
//     districtId: districId,
//     districtName: districtName,
//     hospitalId: dep.hospitalId,
//     hospitalName: dep.hospitalName,
//     departmentId: dep._id,
//     departmentName: dep.name
//   };
//
//   return Doctor.updateDoctorProfileRelatedHospital({hospitalFacultyId:dep.id},data).then(function(d){
//   console.log("Add relatedHospital Success!");
//   });
//   });
//})
//});
//});
//});



/**
 * 查找func = 1[疾病索引出来]的医生信息，然后更新对应profile表relatedDisease字段
 */
//var i = 0;
//Doctor.getDisDoctorIds('doctorId',{func:1}).then(function(docs){
//console.log(" *******Distinct Doc length:"+ docs.length);
//_.values(docs).forEach(function(id){
//  return Doctor.find({doctorId: id, func:1}).then(function(doctors){
//   console.log("Doctor length########"+ doctors.length);
//   doctors.forEach(function(doc){
//    var data = {
//     facultyId: doc.facultyId,
//     facultyName: doc.facultyName,
//     subFacultyId: doc.subFacultyId,
//     subFacultyName: doc.subFacultyName,
//     diseaseId: doc.diseaseId,
//     diseaseName: doc.diseaseName
//    };
//
//    return Doctor.updateDoctorProfileRelatedDisease({doctorId:doc.doctorId},data)
//     .then(function(d){
//      ++i;
//     console.log("Add RelatedDisease Success!"+ i);
//    });
//   });
//  });
//});
//});

/**
 *
 * 2. 将医院关联到相应地地区下面
 * tip:  Region表查出对应省的privinceId
 */

//var privinceId = "5509080d8faee0fbe0c4a6d3";
//
//Region.find({type:2,"provinceId" : privinceId}).exec().then(function(rs){
//rs.forEach(function(r){
//  var disName = r.name.substring(0,2);
//  var disId = r._id;
//  console.log("DisName:"+disName+";disId:"+disId);
//  var updates = {
//   districtId:disId,
//   districtName: r.name
//  };
//
//  var cons ={
//   type:2,
//   "provinceId" : privinceId,
//   "district" : disName
//  };
//
//  Index.update(cons,{$set:updates},{multi:true}).exec();
//  ;
//});
//
//});
