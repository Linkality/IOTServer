/**
 * Created by nathanieldavidson on 12/8/16.
 */
var SimpleName = function(){
    this.new = function(db, combinedName, reference, func){
        var col = db.collection("simplename");
        col.insertOne( { combinedName:combinedName, reference:reference });
        new SimpleName().getByCombinedName( db, combinedName, func );
    }
    this.getByCombinedName = function(db, combinedName, func){
        var col = db.collection("simplename");
        col.findOne( {combinedName:combinedName}, function(err, data){
            func(data);
        });
    }
    this.getByName = function(db, combinedName, func){
            var col = db.collection("simplename");
            col.findOne( {combinedName:combinedName}, function(err, data){
                func(data);
            });
        }
    this.getByReference = function(db, reference, func){
        var col = db.collection("simplename");
        col.findOne( {reference:reference}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("simplename");
        col.findOne( {_id:id}, function(err, data){
            func(data);
        });
    }
    this.wipe = function(db){
        var col = db.collection("simplename");
        col.drop();
    }
    this.delete = function(db, combinedName, func){
        var col = db.collection("simplename");
        col.deleteOne({ combinedName:combinedName }, {}, function(errr, r){
            func(r);
        });
    }
}
module.exports=SimpleName;