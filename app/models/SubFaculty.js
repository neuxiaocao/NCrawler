/**
 *
 *  SubFaculty
 *  疾病二级科室
 *  Authors: Jacky.L
 *  Created by Jacky.L on 1/29/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;


var SubFacultySchema = new Schema({
  // 基本属性
  sourceType: {type: String, default: 'hdf'},//hdf - 来源好大夫
  id: {type: String, unique: true}, //内部编号
  key: {type: String,default:""}, //索引键
  name:{type: String, default:"" },//二级科室名
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除
});

var SubFaculty = mongodb.mongoose.model('SubFaculty', SubFacultySchema);

module.exports = SubFaculty;