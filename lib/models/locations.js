/**
 * Created by Nathaniel on 10/29/2016.
 */
var crypto = require('crypto');
var Location = function(){
    this.new = function(db, name, lat, lng, func){
        var col = db.collection("locations");
        var d = new Date();
        col.insertOne({user:username, pass:pass, created: d});
        func({user:username, pass:pass, created: d});
    }
    this.byReference = function(db, referenceString, func){
        var col = db.collection("locations");
        col.findOne({reference:referenceString}, function(err, data){
            func(data);
        });
    }
    this.getById = function(db, id, func){
        var col = db.collection("user_accounts");
        col.findOne({_id:id}, function(err, data){
            func(data);
        });
    }
    this.delete = function(db, username, func){
        var col = db.collection("user_accounts");
        col.deleteOne({user:username},{},function(errr, r){
            func(r);
        });
    }
    this.password = function(password){
        return crypto.createHash('sha256').update(password).digest('base64')
    }
}
module.exports=Location;