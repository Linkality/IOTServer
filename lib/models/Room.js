/**
 * Created by nathanieldavidson on 12/6/16.
 */
var Room = function(){
    this.new = function(db, name, imageURL, description, lng, lat, beaconName, func){
        var col = db.collection("rooms");
        var d = new Date();
        col.insertOne({name:name, imageURL:imageURL, description:description, lng:lng, lat:lat, beaconName:beaconName, created: d});
        new Room().getByName(db, name, func);
    }
    this.generateRooms = function(db, roomData){
        var col = db.collection("rooms");
        col.remove();
        for(var i=0;i<roomData.length;i++){
            new Room().new(
                db,
                roomData[i].name,
                roomData[i].imageURL,
                roomData[i].description,
                roomData[i].lng,
                roomData[i].lat,
                roomData[i].beaconName,
                function(){}
            );
        }
    }
    this.getByName = function(db, name, func){
        var col = db.collection("rooms");
        col.findOne({name:name}, function(err, data){
            func(data);
        });
    }
    this.getAll = function(db, func){
        var col = db.collection("rooms");
        col.find({}, function(err, data){
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