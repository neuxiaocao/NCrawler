/**
 * Created by Administrator on 2015/1/30.
 */

var
  HDF = require("../configs/hdf"),
  request = require('request'),
  Q = require("q"),
  util = require("util"),
  _ = require('underscore'),
  Disease = require('../models/Disease');

exports.find = function (con, fields){
  return Disease.find(con, fields).exec();
};
exports.connectIndexWithDoctor = function (id) {
  //
  Disease.find({}, "facultyId facultyKey facultyName subFacultyId subFacultyName " +
    " key name").exec()
    .then(function(list){
      var count = list.length;
      console.log("Disease length : " + count);
      for (var i = 0; i < count ; i++) {
        var key = list[i].key;
        var updates = {
          facultyId:      list[i].facultyId,
          facultyKey:     list[i].facultyKey,
          facultyName:    list[i].facultyName,
          subFacultyId:   list[i].subFacultyId,
          subFacultyName: list[i].subFacultyName,
          diseaseId: list[i]._id,
          diseaseKey: list[i].key,
          diseaseName: list[i].name
        };
        console.log("ID : " + key + " ; Updates : " + util.inspect(updates) );
        Doctor.update({id: key}, updates, {multi: true}).exec()
          .then(function(){
            console.log("update Ok  ");
          }, function(err){
            console.log("!!!!!!!Error 1: " + err);
          });
      }
    });
};
/**
 * 通过疾病二级科室编号获取疾病列表 + 科室ID
 * @param key
 * @returns {adapter.deferred.promise|*|promise|Q.promise}
 */
exports.getDiseaseListByFacultyId = function(id){
  var deferred = Q.defer();
  var path = HDF.getDiseaseListByFacultyId;
  var queryString =
    _.reduce(
      _.map(_.extend(HDF.query, {facultyId: id}),
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
      method:"GET"
      , uri: url
      , gzip: true
    },

    function (error, response, body) {
      console.log("statusCode" + response.statusCode);
      if (error) {
        console.log("!!!!!ReqError: "+error);
        deferred.resolve('');
      }
      deferred.resolve({data:body,id:id});
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
exports.parseAndStore = function (json,id) {
  console.log("Begin data parse and store function. " + json.length);

  var deferred = Q.defer();
  var raw = JSON.parse(json);
  var content = raw.content;
  console.log("content:" + content.length);
  if (content.length > 0) {
    for (var i = 0; i < content.length; i++) {
      _.extend(content[i],{id:id});
    }

    console.log("---" + content[0]);

    return Disease.create(content)
      .then(function (result) {
        //console.log("Create success: " + result);
        deferred.resolve(result);
        return deferred.promise;
      }, function (err) {
        console.log("!!!!!Create error: " + err);
        deferred.reject(err);
        return deferred.promise;
      });
  } else {
    console.log("Create is null!!");
    deferred.resolve();
    return deferred.promise;
  }
};
/**
 *
 */
exports.getDiseaseList = function(){
  console.log("begin get list");
  return Disease.find().exec();
};
