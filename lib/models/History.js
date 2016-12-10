/**
 * Created by Nathaniel on 10/30/2016.
 */
var convertTime = require('../convert_created');
var History = function(){
    this.new = function(db, location, person, func){
        var col = db.collection("history");
        var d = new Date();
        col.insertOne({location:location, person:person, created: d});
        new History().getByPersonAndTime(db, person, d, func);
    }
    this.getByPerson = function(db, person, func){
        var col = db.collection("history");
        col.find({person:person}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.getByPersonLatest = function(db, person, func){
        var col = db.collection("history");
        col.findOne({person:person}, {
            "sort": [['created','desc']],
            "limit": 1
        }, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.getByPersonAndTime = function(db, person, time, func){
        var col = db.collection("history");
        col.findOne({person:person, created:time}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("history");
        col.findOne({_id:id}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("history");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
}
module.exports=History;