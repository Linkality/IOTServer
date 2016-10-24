/**
 * Created by Nathaniel on 10/23/2016.
 */
var User = function(){
    this.getByUser = function(db, username, func){
        var col = db.collection("user_accounts");
        col.findOne({user:username}, function(err, data){
            func(data);
        });
    }
}
module.exports=User;