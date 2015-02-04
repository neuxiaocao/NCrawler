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

var aSchema = new Schema({
  // 基本属性
  sourceType: {type: String, default: 'hdf'},//hdf - 来源好大夫
  type: {type: Number, default: 0},//0-默认医生; 1-医院; 2-体检机构; 3-药店; 4-诊所s
  func: {type: Number, default: 0},//0-医生的Profile：1-疾病索引关系 2-地区索引关系
  //疾病一级科室
  facultyId:{type:String, default:""},//一级科室ID
  facultyName: {type: String, default: ""},//一级科室名称
  facultyKey: {type: String, default: ""},//一级科室key
  //疾病二级科室
  subFacultyId: {type:String, default: ""},//二级科室索引UID
  subFacultyName: {type:String, default: ""},//二级科室索引名
  //疾病
  diseaseId: {type:String, default: ""},//疾病索引UUID
  diseaseKey: {type:String, default:""},
  diseaseName: {type:String, default:""},

  province: String,
  hospitalId: String, //医院ID
  hospitalName: String,
  departmentId: String,
  departmentName: String,

  hospitalFacultyId: String,
  hospitalFacultyName: String,//科室
  hospitalFacultyFullName: String,//医院科室全称

  id: String,//{type: String, unique: true}, //hdf内部编号
  doctorId: String, //医生id
  newCaseIntro: String, //最新接诊介绍
  doctorCommentCnt: String,
  doctorName: String,
  name: {type: String, default: ''},
  logoUrl: String, //头像 TODO 转存到青牛服务器上
  fullGrade: String, //职称
  specialize: String,  //专长
  diseaseVotes: String,
  goodVoteCount: String,
  needUserInfo: String,
  schedule: String,        //出诊时间描述
  isStrictComment: String,
  doctorIntro: String,//医生简介
  articleCount: String,
  caseCount: String,
  canVote: String,
  canComment: String,
  homePageUrl: String,    //个人主页面url
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除
});

var Model = mongodb.mongoose.model('Doctor', aSchema);

module.exports = Model;