/**
 * Created by nathanieldavidson on 12/8/16.
 */
var SimpleName = function(){
    this.new = function(db, combinedName, reference, func){
        var col = db.collection("combined");
        col.insertOne( { combinedName:combinedName, reference:reference });
        new SimpleName().getByName( db, name, func );
    }
    this.getByName = function(db, name, func){
        var col = db.collection("combined");
        col.findOne( {name:name}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("combined");
        col.findOne( {_id:id}, function(err, data){
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("combined");
        col.deleteOne({ name:name }, {}, function(errr, r){
            func(r);
        });
    }
}
module.exports=SimpleName;