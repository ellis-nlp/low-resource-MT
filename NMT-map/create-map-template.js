var markers = [],
    langid2layers = {},
    flayers = {},
    map = L.map('map', {fullscreenControl: true}).setView([35, 160], 2);

// OLD: does not work anymore:
// var OpenStreetMap_BlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
var OpenStreetMap_BlackAndWhite = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
OpenStreetMap_BlackAndWhite.addTo(map);

function onEachFeature(feature, layer) {
    var srcid = feature.srcid,
	trgid = feature.trgid,
	langpair = feature.srcid + '-' + feature.trgid,
        html = "<h3>" + feature.properties.srclang + ' - ' + feature.properties.trglang + "</h3><dl>";
    html += '<dd>Language pair: ' + srcid + '-' + trgid + '</dd>';
    html += '<dd>Model info: <a href="https://github.com/Helsinki-NLP/Tatoeba-Challenge/tree/master/models/' + feature.modeldir + '">' + feature.modeldir + '/README.md</a></dd>';
    html += '<dd>Download: <a href="https://object.pouta.csc.fi/Tatoeba-MT-models/' + feature.model + '">' + feature.model + '</a></dd>';
    html += '<dd>BLEU = ' + feature.properties.bleu + '</dd>';
    html += '<dd>chr-F2 = ' + feature.properties.chrF + '</dd>';
    html += '<dd>test set size = ' + feature.properties.testset_size + '</dd>';
    html += "</dl>";
    layer.bindPopup(html);
    if (geojson.properties.legend.hasOwnProperty(TO_DIRECTION_id)) {
        if (langid2layers.hasOwnProperty(TO_DIRECTION_id)) {
            langid2layers[TO_DIRECTION_id].push(layer);
        } else {
            langid2layers[TO_DIRECTION_id] = [];
	    langid2layers[TO_DIRECTION_id].push(layer);
        }
    }
    layer.bindTooltip(feature.properties.FROM_DIRECTION_id);
    markers.push(layer);
}
L.geoJSON([geojson], {
    onEachFeature: onEachFeature,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: Math.round(5*feature.properties.size),
            fillColor: feature.properties.color,
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    }
}).addTo(map);

var group = new L.featureGroup(markers);
map.fitBounds(group.getBounds());

for (id in langid2layers) {
    flayers[geojson.properties.legend[id]] = L.layerGroup(langid2layers[id]);
    flayers[geojson.properties.legend[id]].addTo(map);
}
control = L.control.layers(flayers, {}, {"sortLayers": true}).addTo(map).expand().getContainer();

// Hacky for loop but attempts to do this nicely failed
var i;
for (i = 0; i < control.childNodes[1].length; ++i) {
    if (control.childNodes[1][i].nextSibling.innerHTML.endsWith("English")) {
	// checked = true isn't enough; the just checks the button,
	// we need to generate an actual click to change the layer
	control.childNodes[1][i].click();
	break;
    }
}
