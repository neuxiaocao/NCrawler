/**
 *
 *  NCrawler
 *  Created by Jacky.L on 1/7/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  request = require('request'),
  Q = require("q"),
  _ = require('underscore');

var
  host = 'http://mobile-api.haodf.com/',
  query = {
    "os": "android",
    "app": "haodf",
    "v": "3.1.1",
    "api": "1.2",
    "vd": "tc",
    "deviceToken": "359535053425882"
  },
  form = {
    "_s": "ZRcEKg96Bm5oSFx4e0gaNAVxKnpRbRxwUWRIaxkkP0ZsVAM7ECVmWz1aWDoJbQphPQ8LPihfFDkDcXwLAWNIYVo6FX8cYmlGNF9fLBYiagZoWw85Wi0EeA%3D%3D",
    "userId": "2048842998",
    "_t": "e5e90828a5ea4c38beeb1f450f49677e",
    "currentUserId": "2048842998"
  },
  //contentType = "application/x-www-form-urlencoded";
  path;

/**
 *
 * @param province
 */
var getHospitalListByProvince = function (province) {

  console.log("Begin getHospitalListByProvince");
  var deferred = Q.defer();
  province = province || '北京';
  path = 'mobileapi/getHospitalListByProvince?';

  var queryString =
    _.reduce(
      _.map(_.extend(query, {province: province}),
        function (value, key) {
          return key + "=" + value;
        }),
      function (memo, value) {
        return memo + "&" + value;
      });
  var url = host + path + queryString;

  console.log("QueryString: " + url);

  request.get(url)//.form(form)
    .on('response', function (response) {
      response.on('data', function (data) {
        console.log('received ' + data.length + ' bytes of compressed data');
        console.log('received data: ' + data );
        deferred.resolve(data);
      })
    })
    .on('error', function (err) {
      console.log(err);
      deferred.reject(err);
    });

  return deferred.promise;
};

/**
 * 解析并存储JSON数据
 */
var parseAndStore = function (){
  var deferred = Q.defer();

  deferred.resolve();

};

getHospitalListByProvince()
  .then(function(data){
    console.log("haha");
  }, function(err){
    console.log("oooo");
  });
