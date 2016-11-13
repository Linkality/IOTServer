/**
 * Created by Nathaniel on 10/30/2016.
 */
function newBeacon(){
    if(capturePoints.call){
        $( ".al-msg" ).effect( "bounce", { times: 3 }, "fast" );
        return;
    }
    $(".al-msg").html("Click the map to choose the location of the new <strong>Beacon</strong>! <p style='float:right;'><small>Click to cancel</small></p>");
    $(".al-wrap").fadeIn();
    $(".al-wrap").click(function(){
        if(capturePoints.call){
            delete capturePoints.call;
            $(".al-wrap").fadeOut();
        }
    });
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
    $(".al-msg").html("Click the map to choose the location of the new <strong>RFID Reader</strong>. <p style='float:right;'><small>Click to cancel</small></p>");
    $(".al-wrap").fadeIn();
    $(".al-wrap").click(function(){
        if(capturePoints.call){
            delete capturePoints.call;
            $(".al-wrap").fadeOut();
        }
    });
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
        socket.emit('index');
        showLoader();
    });
}
var capturePoints={
    call:null
};
function openLocation(name){
    socket.emit('edit_location', {name:name});
    showLoader();
}
function deleteLocation(name){
    var values = keyValue({name_key:".inputNameKey"});
    call('delete_location', values, function(data){
        if(data.code=="1"){
            socket.emit('index');
            showLoader();
        }else{
            $('.edit-box').effect('shake');
        }
    });
}
function saveLocation(){
    var values = keyValue({label:".inputLabel", name:".inputName", reference:".inputReference", lat:".inputLat", lng:".inputLng", name_key:".inputNameKey"});
    call('save_location', values, function(data){
        if(data.code=="1"){
            socket.emit('index');
            showLoader();
        }else{
            $('.edit-box').effect('shake');
        }
    });
}
function openLocationEvents(){
    
}