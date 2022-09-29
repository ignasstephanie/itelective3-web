var express = require('express');

var app = express();

var weather = require('weather-js');
var fetchUrl = require("fetch").fetchUrl;

app.set('view engine', 'ejs')
app.get('/', function (req, res) {

    weather.find({ search: 'Davao City, PH', degreeType: 'C' }, function (err, result) {
        var weather_data = null;
        if (err) console.log(err);
        else {
            console.log(JSON.stringify(result, null, 2));
            weather_data = result;
        }
        res.render('pages/index', { title: "Home", weather: weather_data });
    });
});
app.get('/other', async function (req, res) {
    fetchUrl("https://www.themealdb.com/api/json/v1/1/random.php", function(error, meta, body){
        try {
            console.log(body.toString());
            // var meals_data = body;
            var meals_data = JSON.parse(body.toString());
            // console.log();
        } catch (err) {
            console.log(err)
        }
        var data = {
            url: req.url
        }
        res.render('pages/other', { title: "Random Meals", data, random: meals_data });    
    });  
});
app.listen(8000);