const express = require('express'),
    app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', function (req, res) {

let long, lat;
let city = req.body.text;
let apiKey1 = 'pk.eyJ1IjoiYmVjY2F2ZG9wIiwiYSI6ImNqNXh6Mmw0dDA5YWwzM3FkeTZrenZjZnAifQ.OHnt1eAwlaV0t9ISvrzokQ';
let url1 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${apiKey1}`
let apiKey2 = '6aaa542599e7c1d2369129b37c010f2e';

axios.get(url1)
    .then(function (response) {
        var result = (response.data);
        lat = result.features[0].center[1];
        long = result.features[0].center[0];
        console.log(lat + ' ' + long)

        let url2 = `https://api.darksky.net/forecast/${apiKey2}/${lat},${long}`
        return axios.get(url2)
    })
    .then((response) => {
        weather = response.data
        res.send(weather)
    })
    .catch(function (error) {
        res.send(error + 'Error from DarkSky')

        
    })
})

app.listen(8080, function () {
    console.log('express listening on: Port 8080');
})