/**
 *
 *  NCrawler
 *  Created by Jacky.L on 1/12/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  HDF = require("../configs/hdf"),
  request = require('request'),
  Q = require("q"),
  _ = require('underscore'),
  Doctor = require('../models/Doctor');

var
  pageSize = 1000, //每一页获取的数据
  pageId = 1;

/**
 * 查询某个医院科室医生列表
 *
 * @param doctorId  科室id
 *
 */
exports.getDoctorInfoByDoctorId = function (doctorId) {
  console.log("Begin getDoctorByDepartmentId");

  if (doctorId == undefined) {//TODO 测试下，是否可以当id为undefined时返回所有科室医生信息？
    return;
  }

  var deferred = Q.defer();
  var path = HDF.getDoctorInfoByDoctorId;
  var queryString =
    _.reduce(
      _.map(_.extend(HDF.query, {doctorId: doctorId}),
        function (value, key) {
          return key + "=" + value;
        }),
      function (memo, value) {
        return memo + "&" + value;
      });
  var url = HDF.host + path + queryString;

  console.log("QueryString: " + url);

  request(
    {
      method: 'GET'
      , uri: url
      , gzip: true
    },
    function (error, response, body) {
      console.log("statusCode" + response.statusCode);
      if (error) {
        console.log(error);
        deferred.resolve('');
      }
      deferred.resolve(body);
    })
    .on('data', function (data) {
      // decompressed data as it is received
      console.log('decoded chunk: ' + data.length);
    });

  return deferred.promise;
};


/**
 * 解析并存储JSON数据
 * @param json
 * @returns {*}
 */
exports.parseAndStore = function (json) {
  console.log("Begin data parse and store function. " + json.length);

  var deferred = Q.defer();
  var raw = JSON.parse(json);
  var content = raw.content;

  if (!content) return;
  return Doctor.create(content)
    .then(function (result) {
      console.log("Create success: " + result);
      deferred.resolve(result);
      return deferred.promise;
    }, function (err) {
      console.log("Create error: " + err);
      deferred.reject(err);
      return deferred.promise;
    });
};

