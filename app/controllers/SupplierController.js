/**
 *
 *  NCrawler
 *  Created by Jacky.L on 1/12/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
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