/**
 * Created by Nathaniel on 10/31/2016.
 */
var ejs = require('ejs');
var fs = require('fs');
var init = function(session, settings){
    this.events = [
        "new_beacon_page"
    ];
    this.classes = [
        function(socket, db){ // sending status of mongodb
            this.handle = function(data) {
                try {
                    parseFloat(data.lng);
                    parseFloat(data.lat);
                }catch (e){
                    return;
                }
                socket.emit('page_load', {wrapper: ".content", cover: "html", html: ejs.render(fs.readFileSync('views/new_location/new_beacon_page.ejs', 'utf8'),{settings:settings,lat:data.lat,lng:data.lng})});
            }
        }
    ];
}
module.exports=init;