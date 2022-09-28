var express = require('express');

var app = express();

var weather = require('weather-js');
var fetchUrl = require('fetch').fetchUrl;
app.set('view engine', 'ejs')
app.get('/', function (req, res) {

    weather.find({ search: 'Davao City, PH', degreeType: 'C' }, function (err, result) {
        var weather_data = null;
        if (err) console.log(err);
        else {
            console.log(JSON.stringify(result, null, 2));
            weather_data = result;
        }
        res.render('index', { title: "Home", weather: weather_data });
    });
});
app.get('/other', async function (req, res) {
    var data ={
        url: req.url,
        itemData: []
    }
    res.render('other', data)    
});
app.listen(8000);