/**
 *
 *  Supplier
 *  服务供应方, 可以是 医生、医院、服务机构等, 可以被经纪人中介的服务提供方
 *  Authors: Jacky.L
 *  Created by Jacky.L on 1/7/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
  mongodb = require('../configs/db'),
  Schema = mongodb.mongoose.Schema;


var supplierSchema = new Schema({
  // 基本属性
  type: {type: Number, default: 0},//0-默认医生; 1-医院; 2-体检机构; 3-药店; 4-诊所
  name: {type: String, default: ''},//名称
  alias:[String], //别名, 可以是 医生 或者 机构的曾用名
  pinyin: [String],//姓名拼音数组
  avatar: {type: String, default: ''},  //医生/机构头像
  sex: String,        //性别
  profile: String,    //个人简介
  contact: String,    //联系方式：手机号、座机
  hospital: String,   //所属医院
  address: String,    //地址
  department: String, //科室
  position: String,   //职位
  descriptionImages: [String],//表述性图片
  descriptionTags: [String],  //描述标签
  searchTags: [String],       //搜索标签
  goodAt: String,             //擅长
  eduBackground: [String],  //教育背景
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除

});

var Supplier = mongodb.mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;