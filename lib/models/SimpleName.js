/**
 * Created by nathanieldavidson on 12/8/16.
 */
var SimpleName = function(){
    this.new = function(db, combinedName, reference, func){
        var col = db.collection("simplename");
        col.insertOne( { combinedName:combinedName, reference:reference });
        new SimpleName().getByName( db, combinedName, func );
    }
    this.getByName = function(db, name, func){
        var col = db.collection("simplename");
        col.findOne( {combinedName:name}, function(err, data){
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
        new SimpleName().new(db, "Blue Cheese", "es292391231", function(d){
            console.log(d);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("simplename");
        col.deleteOne({ name:name }, {}, function(errr, r){
            func(r);
        });
    }
}
module.exports=SimpleName;