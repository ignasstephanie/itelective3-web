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
    fetchUrl("https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian", function(error, meta, body){
        try {
            var meals_data = body.toString();
            console.log(meals_data);
        } catch (error) {
            console.log(error)
        }
        res.render('pages/other', { title: "Random Meals", random: meals_data });    
    });  
});
app.listen(8000);