/**
 *
 *  NCrawler
 */
var
  HDF = require("../configs/hdf"),
  Q = require("q"),
  _ = require('underscore'),
  Supplier = require('../models/Supplier');


exports.find = function (con){
  return Supplier.find(con).exec();
};

exports.create = function(spl){
  return Supplier.create(spl);
};