/**
 * Created by Nathaniel on 10/23/2016.
 */
var crypto = require('crypto');
var User = function(){
    this.new = function(db, username, password, func){
        var col = db.collection("user_accounts");
        var d = new Date();
        var pass = crypto.createHash('sha256').update(password).digest('base64');
        col.insertOne({user:username, pass:pass, created: d});
        new User().getByUser(db, username, func);
    }
    this.getByUser = function(db, username, func){
        var col = db.collection("user_accounts");
        col.findOne({user:username}, function(err, data){
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
    this.wipe = function(db){
        var col = db.collection("user_accounts");
        col.remove();
    };
}
module.exports=User;