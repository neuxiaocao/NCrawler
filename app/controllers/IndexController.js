/**
 * Created by cao on 15/4/13.
 */
var Index = require('../models/Index.js');

 exports.find = function(con, fields){
  return Index.find(con, fields);
 }

/*
update.update = function(conds, updates){
 console.log("Conds:"+ JSON.stringify(conds) +";Updates:"+ JSON.stringify(updates));
 //return Index.update(conds,{'$set':updates},{multi: true}).exec();
}*/
