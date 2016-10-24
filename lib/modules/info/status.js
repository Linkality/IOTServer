var User = require('../../models/users.js');
var user = new User();
var init = function(session){
    this.events = [
        "status"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if (db) {
                    user.new(db, 'test', 'test', function(d){
                        console.log(d);
                        user.getByUser(db, 'test', function(d2){
                            console.log(d2);
                            user.delete(db, 'test', function(d3){
                                console.log(d3);
                                user.getByUser(db, 'test', function(d4) {
                                    console.log(d4);
                                });
                            });
                        });
                    });
                    socket.emit('status', {code: 1, uuid: session.id[socket.id]});
                } else {
                    socket.emit('status', {code: 0, uuid: session.id[socket.id]});
                }
            }
        }
    ];
}
module.exports=init;