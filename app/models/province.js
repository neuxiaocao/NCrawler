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


var doctorSchema = new Schema({
  // 基本属性
  sourceType: {type: String, default: 'hdf'},//hdf - 来源好大夫
  id: {type: String, unique: true}, //内部编号
  type: {type: Number, default: 0},//0-默认医生; 1-医院; 2-体检机构; 3-药店; 4-诊所
  createdAt: {type: Number, default: Date.now},//用户注册时间
  updatedAt: {type: Number, default: Date.now},//用户最近的更新时间
  isDeleted: {type: Boolean, default: false}//该条记录是否被删除

});

var Doctor = mongodb.mongoose.model('DoctorList', doctorSchema);

module.exports = Doctor;