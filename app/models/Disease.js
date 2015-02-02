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

  facultyId:{type:String, default:""},//一级科室ID
  facultyName: {type: String, default: ""},//一级科室名称
  facultyKey: {type: String, default: ""},//一级科室key

  subFacultyId: {type:String, default: ""},//二级科室索引Id
  subFacultyName: {type:String, default: ""},//二级科室索引名

  //id: {type: String, default: ''},//疾病二级科室的hdf ID

  key:{type:String, default:""},//疾病key
  name:{type:String, default:""},//病名
  brief:{type:String, default:""},//疾病简介
  diseaseDoctorCount:{type:String, default:""},//总医生
  spaceDoctorCount:{type:String, default:""},//可用医生
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除
});

var Disease = mongodb.mongoose.model('Disease', DiseaseSchema);

module.exports = Disease;