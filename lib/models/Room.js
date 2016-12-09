/**
 * Created by nathanieldavidson on 12/6/16.
 */
var Room = function(){
    this.generateRooms = function(db, roomData){
        var col = db.collection("rooms");
        col.drop();
        col.insertMany(roomData);
    }
    this.getByName = function(db, name, func){
        var col = db.collection("rooms");
        col.findOne({name:name}, function(err, data){
            func(data);
        });
    }
    this.getAll = function(db, func){
        var col = db.collection("rooms");
        col.find().toArray(function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("rooms");
        col.findOne({_id:id}, function(err, data){
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("rooms");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
}
module.exports=Room