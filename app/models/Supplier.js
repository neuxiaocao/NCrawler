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
  type: {type: Number, default: 0},//数据类型: 0-默认医生; 1-医院; 2-体检机构; 3-药店; 4-诊所
  source: {type: String, default: 'hdf'},//数据来源hdf - 来源好大夫

  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false},//该条记录是否被删除

  id: String, //hdf内部编号
  name: {type: String, default: ''},//名称
  alias:[String], //别名, 可以是 医生 或者 机构的曾用名、常用简称
  pinyin: [String],//姓名拼音数组
  avatar: {type: String, default: ''},  //医生/机构头像 logoUrl
  sex: String,        //性别
  doctorIntro: String,    //个人简介
  contact: String,    //联系方式：手机号、座机
  hospitalId: {type: String, default:''}, //所属医院的UUID
  hospital: String,   //所属医院
  province: String,   //省市
  address: String,    //地址
  departmentId: {type:String, default:''},//所属科室的UUID
  department: String, //科室
  position: String,   //职位
  fullGrade: String,  //职称全称,例如: “主任医师 教授”
  descriptionImages: [String],//表述性图片
  descriptionTags: [String],  //描述标签
  searchTags: [String],       //搜索标签
  eduBackground: [String],  //教育背景
  specialize: {type: String, default: ""},//擅长, 例如: "骨创伤及晚期修复"
  goodVoteCount: {type: String, default: "0"},//好评数
  brokerActiveNum: {type:Number, default: 0 } //活跃代理人得数量

  // homePageUrl: {type: String, default: ""},//个人主页
  // hospitalFacultyFullName: {type: String, default: ""},//医院机构的全称, 例如: "301医院骨科"
  // caseIntro: {type:String, default:""}//接诊意愿,例如: "只接受16岁以上患者咨询，16岁以下患者请咨询小儿骨科医生。"
});

var Supplier = mongodb.mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;