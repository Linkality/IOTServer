/**
 * Created by Nathaniel on 10/29/2016.
 */
var ejs = require('ejs');
var fs = require('fs');
var init = function(session, settings){
    this.events = [
        "index"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                if(session.account[socket.id]) {
                    socket.emit('page_load', {
                        wrapper: ".content",
                        cover: "html",
                        html: ejs.render(fs.readFileSync('views/main.ejs', 'utf8'), {settings: settings})
                    });
                }else{
                    socket.emit('redirect',{to: 'status_page'});
                }
            }
        }
    ];
}
module.exports=init;