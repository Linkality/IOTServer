/**
 * Created by Nathaniel on 10/29/2016.
 */
var People = function(){
    this.new = function(db, name, func){
        var col = db.collection("people");
        var d = new Date();
        col.insertOne({name:name, created: d});
        func({name:name, created: d});
    }
    this.getByName = function(db, name, func){
        var col = db.collection("people");
        col.findOne({name:name}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("people");
        col.findOne({_id:id}, function(err, data){
            func(data);
        });
    }
    this.delete = function(db, name, func){
        var col = db.collection("people");
        col.deleteOne({name:name},{},function(errr, r){
            func(r);
        });
    }
    this.password = function(password){
        return crypto.createHash('sha256').update(password).digest('base64')
    }
}
module.exports=People;