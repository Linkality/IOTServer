/**
 * Created by nathanieldavidson on 12/6/16.
 */
var Room = function(){
    this.new = function(db, name, imageURL, lng, lat, beaconName, func){
        var col = db.collection("room");
        var d = new Date();
        col.insertOne({name:name, imageURL:imageURL, lng:lng, lat:lat, beaconName:beaconName, created: d});
        new Room().getByName(db, name, func);
    }
    this.generateRooms = function(db, roomData){
        for(var i=0;i<roomData.length;i++){
            new Room().new(
                db,
                roomData[i].name,
                roomData[i].imageURL,
                roomData[i].lng,
                roomData[i].lat,
                roomData[i].beaconName,
                func
            );
        }
    }
    this.getByName = function(db, name, func){
        var col = db.collection("room");
        col.findOne({name:name}, function(err, data){
            func(data);
        });
    }
    this.getAll = function(db, func){
        var col = db.collection("room");
        col.find({}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("room");
        col.findOne({_id:id}, function(err, data){
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("room");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
}
module.exports=Room