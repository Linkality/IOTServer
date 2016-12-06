/**
 * Created by Nathaniel on 10/30/2016.
 */
var History = function(){
    this.new = function(db, location, person, func){
        var col = db.collection("history");
        var d = new Date();
        col.insertOne({location:location, person:person, created: d});
        func({name:name, created: d});
    }
    this.getByPerson = function(db, person, func){
        var col = db.collection("history");
        col.findOne({person:person}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("history");
        col.findOne({_id:id}, function(err, data){
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
module.exports=People;