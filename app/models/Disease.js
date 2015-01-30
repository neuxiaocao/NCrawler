/**
 *
 *  Disease
 *  疾病名
 *  Authors: Jacky.L
 *  Created by Jacky.L on 1/29/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;


var DiseaseSchema = new Schema({
  // 基本属性
  sourceType: {type: String, default: 'hdf'},//hdf - 来源好大夫
  id: {type: String, default: 'hdf'},//疾病ID
  name:{type:String, default:""},//病名
  key:{type:String, default:""},//疾病名称
  facultyId:{type:String, default:""},//科室ID
  brief:{type:String, default:""},//疾病简介
  diseaseDoctorCount:{type:String, default:""},//总医生
  spaceDoctorCount:{type:String, default:""},//可用医生
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除
});

var Disease = mongodb.mongoose.model('Disease', DiseaseSchema);

module.exports = Disease;