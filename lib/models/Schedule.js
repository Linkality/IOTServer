/**
 * Created by nathanieldavidson on 12/6/16.
 */
var Schedule = function(){
    this.new = function(db, name, time, roomName, teamName, func){
        var col = db.collection("schedule");
        var d = new Date();
        col.insertOne({name:name, time:time, roomName:roomName, teamName:teamName, created: d});
        new Schedule().getByName(db, name, func);
    }
    this.getByName = function(db, name, func){
        var col = db.collection("schedule");
        col.findOne({name:name}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("schedule");
        col.findOne({_id:id}, function(err, data){
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
module.exports=Schedule