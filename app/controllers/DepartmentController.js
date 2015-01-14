/**
 *
 *  NCrawler
 *  Created by LuoMiao on 1/13/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  HDF = require("../configs/hdf"),
  request = require('request'),
  Q = require("q"),
  util = require("util"),
  _ = require('underscore'),
  Department = require('../models/Department');
/**
 * 查询某个地区下面的所有医院列表
 *
 */
exports.getDepartmentListByHospitalId = function (hospitalId) {

  var deferred = Q.defer();
  if (hospitalId == undefined){
    return;
  }

  var path = HDF.getHospitalFacultyListByHospitalId;
  var queryString =
    _.reduce(
      _.map(_.extend(HDF.query, {hospitalId: hospitalId}),
        function (value, key) {
          return key + "=" + value;
        }),
      function (memo, value) {
        return memo + "&" + value;
      });
  var url = HDF.host + path + queryString;

  console.log("QueryString: " + url);

  request(
    { method: 'GET'
      , uri: url
      , gzip: true
    },
    function (error, response, body) {
      console.log("statusCode" + response.statusCode);
      if (error){
        console.log(error);
        deferred.resolve("");
      }
      deferred.resolve(body);
    })
    .on('data', function(data) {
      // decompressed data as it is received
      console.log('decoded chunk: ' + data.length);
    });
  return deferred.promise;
};

exports.getDepartmentId = function () {
  return Department.find({}, "-_id id").exec();
};

/**
 * 查询某个地区下面的所有医院列表
 *
 */
exports.getDepartmentListByHospitalIdAndUpdate = function (hospitalId, _id) {
  return Department.update({hospitalId: hospitalId}, {hospitalId: _id}, {multi: true}).exec();
};

/**
 * 解析并存储JSON数据
 * @param json
 * @returns {*}
 */
exports.parseAndStore = function (json, id){
  console.log("Begin data parse and store function. " + json.length);
  var deferred = Q.defer();
  var res = JSON.parse(json);
  var content = res.content;

  if (id == undefined){
    console.log("id is undefined");
    return;
  }
  console.log("content:" + content.length);
  if (content.length > 0){
    for(var i =0; i<content.length; i++){
      _.extend(content[i], {hospitalId: id});
    }
    return Department.create(content)
      .then(function (result) {
        console.log("Create success: " + result);
        deferred.resolve(result);
        return deferred.promise;
      }, function (err) {
        console.log("Create error: "+err);
        deferred.reject(err);
        return deferred.promise;
      });
  }else{
    console.log("Create is null!!");
    deferred.resolve();
    return deferred.promise;
  }
};
//{
//  signature: ""
//  errorCode: "0"
//  msg: "正常"
//  content: [
//    {
//    id: "335"
//    name: "301医院"
//    district: "海淀"
//    doctorCount: "1379"
//    grade: "6"
//    featuredFaculties: "综合"
//    province: "北京"
//    caseDoctorCount: "536"
//    bookingDoctorCount: "117"
//    _s: "D31bdQJpA2FQb11rAj0MJVciAGACMgAjBmxScQQyVT8MM1x-VmMDNgRmBGdRNAxnBSdWflIlUz4AMQVwCGYHKA9zWzMCYAMsUDtdLgJnDGhXeQA9AmYAMAZhUmEEMFUsDClcclYjA2sEJgQlUWgMPwV2VjdSU1M7AD0FYQgtB2YPJFtmAjEDPFAwXTwCZwxjV2QANgJmACMGKw"
//    }
//  ]
//}
