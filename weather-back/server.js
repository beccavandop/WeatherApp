const express = require('express'), 
      app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
   let city = 'toronto';
   let apiKey = '6aaa542599e7c1d2369129b37c010f2e';
   let url = `https://api.darksky.net/forecast/${apiKey}/34.0522,-118.2437`
   
//   res.send('index');
//   console.log(req.body.city);

  request(url, function (err, response, body) {
    // if(err){
    //   res.send(err);
    // } else {
    //     let weather = JSON.parse(body);
    //     if(weather.main === undefined){
    //         res.send(err)
    //     } else {
    //          console.log(weather);
            res.send(JSON.parse(body));
           
    //     // }
    // }


       }
    )  
})

app.listen(8080, function (){
    console.log('express listening on: Port 8080' );
})