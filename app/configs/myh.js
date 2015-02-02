/**
 *  名医汇  数据拉取
 *  NCrawler
 *  Created by Jacky.L on 2/2/15.
 *  Copyright (c) 2014 ZLYCare. All rights reserved.
 */

//var data = {};
//var sub = {};
//// 遍历科室
//$("div.main .layBC div").each(function () {
//  console.log("1====================");
//
//  var markList = [];
//  var mark;
//  // 遍历科室名称
//  $(this).find(".mark").each(function () {
//    mark = $(this).text();
//    mark = mark.substring(0,mark.length-4);
//    console.log("c1 : " + mark + " : ");
//    markList.push(mark);
//  });
//  if (!sub[mark] && mark) {
//    sub[mark] = [];
//    console.log("2====================" + markList.length);
//    var titleList = [];
//    //科室病症名
//    $(this).find(".m-cjjbA a").each(function () {
//      var title = $(this).attr("title");
//      console.log("c2 : " + title + " :" );
//      titleList.push(title);
//    });
//    if (titleList.length > 0)
//      sub[markList[0]] = titleList;
//    console.log(markList[0] + " list length: " + titleList.length + " : " + sub[markList[0]].length)
//  }else{
//    console.log("exists");
//  }
//});
//data["内科"] = sub;