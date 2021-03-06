$('.datepicker').datepicker({
    dateFormat: 'yy-mm-dd ',
    maxDate:'0'
});

//Variables
var date,dateTime, dateUTC, timeHour = "";
var hour = "";
var phonenumber = null;
var zoneLocation,dateTimeSplit = [];
var isOnCampus = false;
var marker;
var markerLayer = L.layerGroup()

//HIDE ELEMNTS
$("#FormGroup2").hide();
$("#FormGroup3").hide();

//SELECTOR CHANGE VALUE: NAME=SELECTOR SEARCH
$('select[name=optionsView]').change(function() {
    let value = $(this).val()
    if(value==="who-was"){
        $("#FormGroup2").hide();
        $("#FormGroup1").show();
        $("#FormGroup3").hide();
        map.setView(new L.LatLng(0, 0), 2);
        markerLayer.clearLayers();
        map.removeLayer(markerLayer)
    }
    else if(value==="who-is"){
        $("#FormGroup1").hide();
        $("#FormGroup2").show();
        $("#FormGroup3").hide();
        map.setView(new L.LatLng(0, 0), 2);
        markerLayer.clearLayers();
        map.removeLayer(markerLayer)
    }
    else if (value==="devices-in-zone"){
        $("#FormGroup1").hide();
        $("#FormGroup2").hide();
        $("#FormGroup3").show();
        map.setView(new L.LatLng(0, 0), 2);
        markerLayer.clearLayers();
        map.removeLayer(markerLayer)
    }
    else if(value === ""){
        alert("Select an option view");
    }
});

L.MakiMarkers.accessToken = 'pk.eyJ1IjoiaGFpZGVlIiwiYSI6ImNqOXMwenczMTBscTIzMnFxNHVyNHhrcjMifQ.ILzRx4OtBRK7az_4uWQXyA';

var map = L.map("mapid", {
    fullscreenControl: true,
    layers: [markerLayer]
}).setView([0, -0], 2);

var roadMutant = L.gridLayer.googleMutant({
    maxZoom: 22,
    type:'roadmap'
}).addTo(map);

var hybridMutant = L.gridLayer.googleMutant({
    maxZoom: 22,
    type:'hybrid'
});


L.control.layers({
    StreetsMap: roadMutant,
    SateliteMap: hybridMutant
}, {}, {
    collapsed: false
}).addTo(map);


//GET ALL ZONES REGISTERED
$.get(`${smartService}/api/zone?status=1`, function(data){
    if(data.length===0){
        console.log("No se encontraron campus ");
    }
    else{
        campus = data;
        campus.forEach(element => {
            $('#zonelist1').append($('<option>', {
                value: element['idZone'],
                text: element['owner']
            })); 
            $('#zonelist2').append($('<option>', {
                value: element['idZone'],
                text: element['owner']
            })); 
            $('#zonelist3').append($('<option>', {
                value: element['idZone'],
                text: element['owner']
            })); 
        });
    }
});

//SELECTOR CHANGE VALUE: NAME=SELECTOR ZONE
$('#zonelist1').change(function() {
    let idZone = $(this).val()
    //GET ALL INFORMATION OF A SPECIFIC CAMPUS
    $.get(`${smartService}/api/zone/${idZone}?status=1`, function(data){
        if(data.length===0){
            console.log("No se encontró información del campus");
        }
        else{
            zoneLocation = data['location'];
            map.setView(new L.LatLng(data['centerPoint'][0], data['centerPoint'][1]), 18);
            polyline = L.polyline( data['location'], {color: '#ff6666'}).addTo(map);
        }
    });
});

function searching1(){
    //GET DATE AND HOUR FROM INPUTS
    tempDate = $("#dateInput").val();
    date = tempDate.substring(0,tempDate.length-1)
    hour = $('#timeInput').val();
    //CONCATENATE DATE AND TIME
    dateTime = date+"T"+hour+":00";
    dateUTC = new Date(dateTime).toISOString();
    //dateUTC  = moment.utc(dateTime).format()
    //ARRAY DATETIME
    dateTimeSplit = dateUTC.split("T");
    timeHour = dateTimeSplit[1].substring(0,2);
    //PHONE NUMBER FORM INPUT
    phonenumber = $('#phonenumber-countrycode').val()+$('#phonenumber-input').val();
    searchUserInfo(phonenumber);
    return;
}

function searchUser(userData){
    $.get(`${smartService}/crate/locationOwnerDateTime?owner=${userData[0]['id']}&date=${dateTimeSplit[0]}&time=${timeHour}`, function(data){
        if(data.length===0){
            var text = "No se encontraron registros con el Usuario: "+userData[0]['firstName']+" en la fecha y hora especificados: "+date+" "+hour+" hours";
            showNotification('top','right', text, "danger");
            //console.log("No se encontraron registros con el Usuario: "+userData[0]['firstName']+" en la fecha y hora especificados: "+date+" "+hour+" hours");
            //alert("No se encontraron registros con el Usuario: "+userData[0]['firstName']+" en la fecha y hora especificados: "+date+" "+hour+" hours");
        }
        else{
            console.log(data);
            let searchUserinCampus = searchingUserInCampus(data[0]['location']);
            searchUserinCampus.then(function(result) {
                if(result){
                   showMap(data[0]['location'], data);
                }
                else{
                    var text = "El usuario: "+userData[0]['firstName']+" no se encontró en la zona  en la fecha y hora especificada: "+date+" "+hour+" hours";
                    showNotification('top','right', text, "danger");
                    
                    //alert("El usuario: "+userData[0]['firstName']+" no se encontró en la zona  en la fecha y hora especificada: "+date+" "+hour+" hours");
                }    
            })
        }
    }); 
}
async function searchingUserInCampus(locationCoordinates){
    let Point = locationCoordinates
    let Polygon = zoneLocation
    x = Point[0]
	y = Point[1]
    let j = Polygon.length - 1
    let inzone = false

    for (let i = 0 ; i<= Polygon.length-1 ; i++){
    	if( (Polygon[i][1] < y && Polygon[j][1] >= y) || (Polygon[j][1] < y && Polygon[i][1] >= y)){
    		if (Polygon[i][0] + (y - Polygon[i][1]) / (Polygon[j][1] - Polygon[i][1]) * (Polygon[j][0] - Polygon[i][0]) < x) {
    			inzone = !inzone
    		}
    	}
    	j=i

    }
    return inzone;
}



function searchUserInfo(phoneNumber){
    console.log(phoneNumber);
    fetch(`${smartService}/api/user?phoneNumber=${phoneNumber}&status=1`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        },
    })
    .then((res) => res.json())
    .then((data)=> {
        if(data.length > 0){
            searchUser(data);
        }else {
            var text = "No se encontró ningun usuario con el número de teléfono especificado";
            showNotification('top','right', text, "danger")
        }
    })
    .catch((error)=>{
        var text = "No se encontró ningun usuario con el número de teléfono especificado";
        showNotification('top','right', text, "danger");
    })
}



function showMap(location, data){
    markerLayer.clearLayers();
    map.removeLayer(markerLayer)
    //===============================DATE BLOCK====================================
    //MEXICO TIMEZONE
    moment.tz.add("America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6");
    //ZURICH TIMEZONE
    //moment.tz.add("Europe/Zurich|CET CEST|-10 -20|01010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-19Lc0 11A0 1o00 11A0 1xG10 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|38e4"):
    let date = data[0]['time_index'];
    let dateUnFormatted = moment.tz(date,'America/Mexico_City');
    // DATE ZÚRICH
    //let dateUnFormatted = moment.tz(date,'Europe/Zurich');
    let dateFormated = dateUnFormatted.format();
    console.log(dateFormated);
    
    map.setView(new L.LatLng(location[0], location[1]), 18);
    polyline = L.polyline(zoneLocation).addTo(map);
    fetch(`${smartService}/api/user?id=${data[0]['owner']}&status=1`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE'
        },
    })
    .then((res) => res.json())
    .then((dataUser)=> {
        if(dataUser){
            markerLayer.addTo(map);
            marker = L.marker(location, {
                icon: L.MakiMarkers.icon({
                    icon: "pitch",
                    color: "#3498db",
                    size: "l"
                })
            })
            .bindPopup('ID Device: '+data[0]['entity_id']+'<br> Owner ID: '+data[0]['owner']+'<br> DateTime: '+dateFormated+'<br> Name User: '+dataUser[0]['firstName']+ ' '+dataUser[0]['lastName']+'<br> Phone Number: +'+dataUser[0]['phoneNumber'])
            .addTo(markerLayer)
            .openPopup()
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}


