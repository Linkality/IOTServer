/**
 * Created by nathanieldavidson on 12/6/16.
 */
var config = require('config');
var convertTime = require('../convert_created');
var Member = function(){
    this.new = function(db, name, link, teamName, func){
        var col = db.collection("schedule");
        var d = new Date();
        col.insertOne({name:name, link:link, teamName:teamName, created: d});
        new Member().getByName(db, name, func);
    }
    this.getByName = function(db, name, func){
        var col = db.collection("schedule");
        col.findOne({name:name}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("schedule");
        col.findOne({_id:id}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("schedule");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
}
module.exports=Member