var config = require('config');
var i = function(data, entry){
    if(data)
        data[entry] = new Date(new Date(data[entry]).getTime() - config.get('date.timezoneOffset'));
}
module.exports=i;