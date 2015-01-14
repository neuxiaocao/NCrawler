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
  getHospitalListByProvince:'mobileapi/getHospitalListByProvince?',
  getHospitalFacultyListByHospitalId: 'mobileapi/getHospitalFacultyListByHospitalId?',
  getDoctorListByDepartmentId: 'mobileapi/getDoctorListByHospitalFacultyId?',
  getDoctorInfoByDoctorId: 'mobileapi/getDoctorInfoByDoctorId?'
};