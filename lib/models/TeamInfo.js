/**
 * Created by nathanieldavidson on 12/6/16.
 */
var config = require('config');
var convertTime = require('../convert_created');
var TeamInfo = function(){
    this.new = function(db, name, logoURL, members, description, func){
        var col = db.collection("team");
        var d = new Date();
        if(!members) {
            var members = new Array();
        }
        col.insertOne({name:name, members:members, logoURL:logoURL, description:description, created: d});
        new TeamInfo().getByName(db, name,func);
    }
    this.getByName = function(db, name, func){
        var col = db.collection("team");
        col.findOne({name:name}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("team");
        col.findOne({_id:id}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("team");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
}
module.exports=TeamInfo