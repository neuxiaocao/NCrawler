/**
 * Created by Administrator on 2015/1/30.
 */

var
  HDF = require("../configs/hdf"),
  request = require('request'),
  Q = require("q"),
  util = require("util"),
  _ = require('underscore'),
  Disease = require('../models/Disease'),
  Faculty = require('../models/Faculty'),
  SubFaculty = require('../models/SubFaculty');

/**
 * 初始化疾病一级科室
 * @param json
 * @returns {faculties}
 */
exports.initFaculty = function (json) {

  var faculties = [];
  var faculty;
  for (var key in json){
    console.log("key : " + key + " value : " + json[key]);
    faculty = {
      key : key,
      name: json[key]
    };
    faculties.push(faculty);
  }
  return Faculty.create(faculties);
};
/**
 *
 */
exports.connectFacultyWithSub = function () {
  //var faculties , subs;
  Faculty.find({},"key name").exec()
    .then(function(faculties){
      var count = faculties.length;
      console.log("Faculties length : " + count);
      for (var i = 0 ; i < count ; i++){
        var key = faculties[i].key;
        var updates = {
          facultyId: faculties[i]._id,
          facultyName: faculties[i].name
        };
        console.log("Key : " + key + " ; Updates : " + util.inspect(updates) );
        SubFaculty.update({key:key},updates,{multi: true}).exec()
          .then(function(){
            console.log("update Ok  ");
          }, function(err){
            console.log("!!!!!!!Error 1: " + err);
          });
      }
    }, function(err){
      console.log("!!!!!!!Error 2: " + err);
    });
};

/**
 *
 */
exports.connectFacSubWithDis = function () {
  //

  SubFaculty.find({}, "facultyId facultyKey facultyName id name").exec()
    .then(function(list){
      var count = list.length;
      console.log("SubFaculty length : " + count);
      for (var i = 0; i < count ; i++) {
        var hdfID = list[i].id;
        var updates = {
          facultyId:      list[i].facultyId,
          facultyKey:     list[i].facultyKey,
          facultyName:    list[i].facultyName,
          subFacultyId:   list[i]._id,
          subFacultyName: list[i].name
        };
        console.log("ID : " + hdfID + " ; Updates : " + util.inspect(updates) );
        Disease.update({id: hdfID}, updates, {multi: true}).exec()
          .then(function(){
            console.log("update Ok  ");
          }, function(err){
            console.log("!!!!!!!Error 1: " + err);
          });
      }
    });
};

/**
 * 通过疾病一级科室key获取疾病二级科室列表
 * @param key
 * @returns {adapter.deferred.promise|*|promise|Q.promise}
 */
exports.getDiseaseFacultyListByFacultyKey = function(key){
  var deferred = Q.defer();
  var path = HDF.getDiseaseFacultyListByFacultyKey;
  var queryString =
    _.reduce(
      _.map(_.extend(HDF.query, {facultyKey: key}),
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
      deferred.resolve({data:body,key:key})
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
exports.parseAndStore = function (json,key) {
  console.log("Begin data parse and store function. " + json.length);

  var deferred = Q.defer();
  var raw = JSON.parse(json);
  var content = raw.content;
  console.log("content:" + content.length);
  if (content.length > 0) {
    for (var i = 0; i < content.length; i++) {
      _.extend(content[i],{key:key});
    }

    console.log("---" + content[0]);

    return SubFaculty.create(content)
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


