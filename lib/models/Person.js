/**
 * Created by Nathaniel on 10/29/2016.
 */
var config = require('config');
var convertTime = require('../convert_created');
var Person = function(){
    this.new = function(db, name, identifier, func){
        var col = db.collection("persons");
        var d = new Date();
        col.insertOne({name:name, identifier:identifier, created: d});
        new Person().getByName(db, name, func);
    }
    this.getByName = function(db, name, func){
        var col = db.collection("persons");
        col.findOne({name:name}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("persons");
        col.findOne({_id:id}, function(err, data){
            convertTime(data, 'created');
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("persons");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
    this.wipe = function(db){
        var col = db.collection("persons");
        col.drop();
    };
}
module.exports=Person;