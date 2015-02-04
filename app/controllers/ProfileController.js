var
  HDF = require("../configs/hdf"),
  request = require('request'),
  Q = require("q"),
  util = require("util"),
  _ = require('underscore'),
  Profile = require('../models/Profile');


exports.create = function (data, param){
  var deferred = Q.defer();

  return Profile.create(data)
    .then(function (d){
      //console.log("Profile create success");
      deferred.resolve({profile: d, id: param});
      return deferred.promise;
    },function (err){
      console.log("!!!!!!Profile create Err");
      deferred.reject(err);
      return deferred.promise;
    });
  //return deferred.promise;
};