/**
 * Created by Nathaniel on 10/30/2016.
 */
function newBeacon(){
    if(capturePoints.call){
        $( ".al-msg" ).effect( "bounce", { times: 3 }, "fast" );
        return;
    }
    $(".al-msg").html("Click the map to choose the location of the new <b>Beacon</b>!");
    $(".al-wrap").fadeIn();
    capturePoints.call=function(coords){
        showLoader();
        $(".al-wrap").fadeOut();
        socket.emit('new_beacon_page',{
            lat: coords.lat(),
            lng: coords.lng()
        });
    };
}
function newRFID(){
    if(capturePoints.call){
        $( ".al-msg" ).effect( "bounce", { times: 3 }, "fast" );
        return;
    }
    $(".al-msg").html("Click the map to choose the location of the new <b>RFID Reader</b>.");
    $(".al-wrap").fadeIn();
    capturePoints.call=function(coords){
        showLoader();
        $(".al-wrap").fadeOut();
        socket.emit('new_rfid_page',{
            lat: coords.lat(),
            lng: coords.lng()
        });
    };
}
function newLocationExec(type){
    var data = keyValue({label:".inputLabel", name:".inputName", reference:".inputReference", lat:".inputLat", lng:".inputLng"});
    data['type']=type;
    call('new_location',data,function(r){

    });
}
var capturePoints={
    call:null
};