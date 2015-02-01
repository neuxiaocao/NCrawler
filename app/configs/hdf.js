/**
 *  好大夫基本配置
 *
 *  NCrawler
 *  Created by Jacky.L on 1/12/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */
module.exports = {
  host : 'http://mobile-api.haodf.com/',
  query : {
    "os": "android",
    "app": "haodf",
    "v": "3.1.1",
    "api": "1.2",
    "vd": "tc",
    "deviceToken": "359535053425882"
  },
  form : {
    "_s": "ZRcEKg96Bm5oSFx4e0gaNAVxKnpRbRxwUWRIaxkkP0ZsVAM7ECVmWz1aWDoJbQphPQ8LPihfFDkDcXwLAWNIYVo6FX8cYmlGNF9fLBYiagZoWw85Wi0EeA%3D%3D",
    "userId": "2048842998",
    "_t": "e5e90828a5ea4c38beeb1f450f49677e",
    "currentUserId": "2048842998"
  },
  // 一级省市名
  PROVINCE_NAMES: ["北京","天津"],
  // 一级科室名称,手工录入
  FACULTY_KEYS : {
    "neike": "内科",
    "waike": "外科",
    "fuchanke": "妇产科",
    "shengzhiyixuezhongxin": "生殖医学中心",
    "xiaoerke": "小儿科",
    "guke": "骨科",
    "yanke": "眼科",
    "kouqiangke": "口腔科",
    "erbiyanhoutoujingke": "耳鼻喉头颈科",
    "zhongliuke": "肿瘤科",
    "pifuxingbingke": "皮肤性病科",
    "nanke": "男科",
    "yiliaomeirongke": "医疗美容科",
    "shaoshangke": "烧伤科",
    "jingshenbingke": "精神心理科",
    "zhongyike": "中医科",
    "zhongxiyijieheke": "中西医结合科",
    "chuanranbingke": "传染病科",
    "jiehebingke": "结核病科",
    "jieruyixueke": "接入医学科",
    "kangfuyixueke": "康复医学科",
    "yundongyixueke": "运动医学科",
    "mazuiyixueke": "麻醉医学科",
    "zhiyebingke": "职业病科",
    "difangbingke": "地方病科",
    "yingyangke": "营养科",
    "yixueyingxiangxue": "医学影像学科",
    "binglike": "病理科",
    "qitakeshi": "其它科室"
  },
  // 根据省市名获取医院列表
  // http://mobile-api.haodf.com/mobileapi/getHospitalListByProvince?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&province=%E5%8C%97%E4%BA%AC
  getHospitalListByProvince:'mobileapi/getHospitalListByProvince?',
  // 根据医院Id获取医院说明
  //http://mobile-api.haodf.com/mobileapi/getHospitalAnnounceByHospitalId?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&hospitalId=335
  getHospitalAnnounceByHospitalId: 'mobileapi/getHospitalAnnounceByHospitalId?',
  // 根据医院Id获取医院简介
  //http://mobile-api.haodf.com/mobileapi/getHospitalByHospitalId?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&hospitalId=335
  getHospitalByHospitalId: 'mobileapi/getHospitalByHospitalId?',
  // 根据医院Id获取医院科室列表
  //http://mobile-api.haodf.com/mobileapi/getHospitalFacultyListByHospitalId?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&hospitalId=335
  getHospitalFacultyListByHospitalId: 'mobileapi/getHospitalFacultyListByHospitalId?',
  // 根据医院科室Id获取医生列表
  //http://mobile-api.haodf.com/mobileapi/getDoctorListByHospitalFacultyId?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&pageSize=10&hospitalFacultyId=125&pageId=1
  getDoctorListByDepartmentId: 'mobileapi/getDoctorListByHospitalFacultyId?',
  // 根据医生Id获取医生的Profile
  //http://mobile-api.haodf.com/mobileapi/getDoctorInfoByDoctorId?os=android&app=haodf&v=3.1.1&api=1.0&vd=tc&deviceToken=862230024321994&doctorId=1213
  getDoctorInfoByDoctorId: 'mobileapi/getDoctorInfoByDoctorId?',
  //通过疾病一级科室key获取疾病二级科室列表
  //http://mobile-api.haodf.com/mobileapi/getDiseaseFacultyListByFacultyKey?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&facultyKey=neike
  //http://mobile-api.haodf.com/mobileapi/getDiseaseFacultyListByFacultyKey?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&facultyKey=waike
  getDiseaseFacultyListByFacultyKey: 'mobileapi/getDiseaseFacultyListByFacultyKey?',
  //通过疾病二级科室编号获取疾病列表 + 科室ID
  //http://mobile-api.haodf.com/mobileapi/getDiseaseListByFacultyId?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&facultyId=1011000
  getDiseaseListByFacultyId: 'mobileapi/getDiseaseListByFacultyId?',
  //通过疾病key获取医生列表 + 分页参数 + 疾病key + 省份名
  //http://mobile-api.haodf.com/mobileapi/getDoctorListByDiseaseKey?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&pageSize=10&pageId=1&diseaseKey=baixuebing
  //http://mobile-api.haodf.com/mobileapi/getDoctorListByDiseaseKey?os=android&app=haodf&v=3.1.1&api=1.2&vd=tc&deviceToken=862230024321994&province=%E5%8C%97%E4%BA%AC&pageSize=10&pageId=1&diseaseKey=baixuebing
  getDoctorListByDiseaseKey: 'mobileapi/getDoctorListByDiseaseKey?'
};

