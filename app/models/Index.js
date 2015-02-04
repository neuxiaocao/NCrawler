/**
 *  索引表  地区、医院、科室信息
 *
 *  zlycare-web
 *  Created by Jacky.L on 1/13/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */

var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;

var indexSchema = new Schema({

  // 基本属性
  type: {type: Number, default: 0},//数据类型: 1 - 地区 2 - 医院 3 - 科室
  source: {type: String, default: 'hdf'},//数据来源hdf - 来源好大夫

  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false},//该条记录是否被删除


  hdfId: String, //(医院/科室)内部编号
  name: String,  //名称: 人名、地名、科室名

  // 医院属性
  provinceId: String,//
  provinceName: String,//原province
  district: String,   //地区名,例如: 海淀区
  grade: Number,      //医院评级:  6-三级甲等; 5-三级; 4-二级甲等; 3-二级; 2-一级甲等; 1-一级; 0-未评定等级医院;
  featuredFaculties: String,//医院特色: 综合、神经外科
  gps: [Number,Number],//经纬度


  //科室属性
  hospitalId: String,//医院uuid
  hospitalName: String, //医院名称
  category: String,    //科室所属类别:妇儿、内科、外科、其他
  order: Number,       //医院内科室排序编号

  //疾病一级科室属性
  key: String,   //hdf拼音key

  //疾病二级科室属性
  facultyId: String,
  facultyKey:String,
  facultyName: String,

  //疾病属性
  subFacultyId: String,
  subFacultyName: String,
  brief: String,
  diseaseDoctorCount: String,
  spaceDoctorCount: String,

  doctorCount: Number,//(医院/科室)医生数量
  caseDoctorCount: Number,//(医院/科室)医生接诊数量
  bookingDoctorCount: Number//(医院/科室)预约医生数量

});

var Index = mongodb.mongoose.model('Index', indexSchema);

module.exports = Index;