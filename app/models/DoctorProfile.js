/**
 *
 *  Doctor
 *  服务供应方, 可以是 医生、医院、服务机构等, 可以被经纪人中介的服务提供方
 *  Authors: Jacky.L
 *  Created by Jacky.L on 1/7/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
var
 mongodb = require('../configs/db'),
 Schema = mongodb.mongoose.Schema;

var hospitalSchema = new Schema(
 {
  provinceId:     String,
  provinceName:   String,
  districtId:     String,
  districtName:   String,
  hospitalId:     String,
  hospitalName:   String,
  departmentId:   String,
  departmentName: String
 }
);
var diseaseSchema = new Schema(
 {
  facultyId:      String,
  facultyName:    String,
  subFacultyId:   String,
  subFacultyName: String,
  diseaseId:      String,
  diseaseName:    String
 }
);
var doctorSchema = new Schema({

 // 基本属性
 //func: {type: Number, default: 0},//0-医生的Profile
 type: {type: Number, default: 0},//数据类型: 0-默认医生; 1-医院; 2-体检机构; 3-药店; 4-诊所 ; 10-自营医生
 source: {type: String, default: 'bd'},//数据来源hdf - 来源好大夫;默认是bd - 商务发展; app

 createdAt: {type: Number, default: Date.now},//用户注册时间
 updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
 isDeleted: {type: Boolean, default: false},//该条记录是否被删除

 ////////Profile信息/////////
 name: {type: String, default: ''},//名称
 alias:[String], //别名, 可以是 医生 或者 机构的曾用名、常用简称
 pinyin: [String],//姓名拼音数组
 avatar: {type: String, default: ''},  //医生/机构头像 logoUrl
 sex: {type: Number, default: 0},        //性别: 0-男， 1-女
 doctorIntro: {type: String, default: ""},//医生简介
 contact: String,    //联系方式：手机号、座机
 address: String,    //地址
 position: String,   //职位
 fullGrade: String,  //职称全称,例如: “主任医师 教授”
 specialize: {type: String, default: ""},//擅长, 例如: "骨创伤及晚期修复"

 practicingNumber: String,   //执业编号
 descriptionImages: [String],//表述性图片
 descriptionTags: [String],  //描述标签
 searchTags: [String],       //搜索标签
 eduBackground: [String],  //教育背景
 brokerActiveNum: {type:Number, default: 0 }, //活跃医疗顾问数量
 serviceActiveNum: {type:Number, default: 0 }, //活跃服务数量

 //新增医生和审核属性
 brokerId: String,       //添加brokerID
 checkStatus: Number,    //状态：1-正在审核  10-通过审核  -1-审核失败
 failReason: String,      //审核失败原因

 //关系: 相关的执业医院信息
 relatedHospital: [hospitalSchema],

 //关系: 相关的疾病科室信息
 relatedDisease: [diseaseSchema],

 //其它信息
 hdfId: String,  //hdf内部编号
 doctorNo: Number,//医生编号
 hospitalFacultyId: String,
 doctorId:String
 // 地点信息
 //"hospitalName": String,     //执业地点
 //"hospitalId": String,       //执业地点
 //"departmentName": String,   //科室
 //"departmentId": String,     //科室
 // 主治信息
 //"facultyId": String,        //一级科室ID
 //"facultyName": String,      //一级科室
 //"subFacultyId": String,     //疾病二级科室
 //"subFacultyName": String,   //疾病二级科室
 //"diseaseId": [String],      //疾病
 //"diseaseName": [String],    //疾病

 //其它信息-hdf冗余
 //diseaseVotes: String,
 //goodVoteCount: String,
 //needUserInfo: String,
 //schedule: String,     //出诊时间描述
 //newCaseIntro: String, //最新接诊介绍
 //doctorCommentCnt: String,
 //isStrictComment: String,
 //articleCount: String,
 //caseCount: String,
 //canVote: String,
 //canComment: String,
 //homePageUrl: {type: String, default: ""}//个人主页
 // hospitalFacultyFullName: {type: String, default: ""},//医院机构的全称, 例如: "301医院骨科"
 // caseIntro: {type:String, default:""}//接诊意愿,例如: "只接受16岁以上患者咨询，16岁以下患者请咨询小儿骨科医生。"
},{
 collection: 'profiles'
});

var DoctorProfile = mongodb.mongoose.model('profile', doctorSchema);

module.exports = DoctorProfile;