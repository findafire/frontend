/*
map rendering
*/

var map = L.map('map',{
    center: [38.82259, -2.8125],
    zoom: 2,
    minZoom: 0,
    maxZoom: 8
});

var osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { 
    noWrap: false, 
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})
.addTo(map);

/*
slider
*/

$(function() {
    var baseDate = new Date(2015, 6, 18);
    $('#datepicker').datepicker({
        defaultDate: baseDate
    }); 
    $('#slider').slider({
        min: 0,
        max: 31,
        slide: function(event, ui) { 
            var date = new Date(baseDate.getTime());
            date.setDate(date.getDate() + ui.value);
            $('#datepicker').datepicker('setDate', date); 
        }
    });
});

/*
getting the data
*/

var fireDataLayer = new L.geoJson().addTo(map);

$.ajax({
    dataType: "json",
    //url: 'http://api.findafire.org/v1/fire-places',
    //data: {'from-date': '2015-01-01','to-date':'2015-08-17'},
    url: 'data/countries_states.geojson',
    success: function(data) {
        $(data.features).each(function(key, data) {
            fireDataLayer.addData(data);
        });
    },
    error: function () {
    }
});