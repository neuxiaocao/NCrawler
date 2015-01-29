/**
 *
 *  Faculty
 *  疾病一级科室
 *  Authors: Jacky.L
 *  Created by Jacky.L on 1/29/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;

var FacultySchema = new Schema({
  // 基本属性
  source: {type: String, default: 'hdf'},//hdf - 来源好大夫

  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除
});

var Faculty = mongodb.mongoose.model('Faculty', FacultySchema);

module.exports = Faculty;