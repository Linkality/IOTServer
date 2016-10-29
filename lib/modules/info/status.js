var User = require('../../models/users.js');
var user = new User();
var init = function(session, settings){
    this.events = [
        "status"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if (db) {
                    user.new(db, 'test', 'test', function(d){
                        user.getByUser(db, 'test', function(d2){
                            user.delete(db, 'test', function(d3){
                                user.getByUser(db, 'test', function(d4) {
                                    if (data){
                                        socket.emit('response', {code: 1, ref: data.ref, uuid: session.id[socket.id]});
                                    }else{
                                        socket.emit('status', {code: 1, uuid: session.id[socket.id]});
                                    }
                                });
                            });
                        });
                    });
                } else {
                    socket.emit('response', {code: 0, ref: data.ref, uuid: session.id[socket.id]});
                }
            }
        }
    ];
}
module.exports=init;