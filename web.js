var express = require('express');
var app = express();
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/test', function (req, res) {
  res.render('test');
});

app.get('/index', function (req, res) {
  var Client = require('node-rest-client').Client;
  var client = new Client();

  var args= {
    path: {
      "deviceId":11798538376,
      "sensorId":"Tracker_867726030099859"
    },
    headers: {"CK":"DKKY3FPE9ZKM9ZSE7R"}
  };

  // direct way  (http://, https://)
  client.get("https://iot.cht.com.tw/iot/v1/device/${deviceId}/sensor/${sensorId}/rawdata", args, function (data, response) {
      // parsed response body as js object
      console.log(data); 
      //res.render('index', {title : 'CHT Temperature', body: data.id + ': ' + data.value + '\u2301'});
      res.render('map', 
      	{title : 'CHT Tracker' 
      		,center_pos: '' + data.lat + ',' + data.lon 
//      		,DEV_CK: 'DKKY3FPE9ZKM9ZSE7R'
//      		,DEV_ID: '11798538376'
//      		,SENSOR_ID: 'Tracker_867726030099859'
      		});
      //res.send(data);
  }).on('error', function (err) {
    console.log('something went wrong on the request');
    res.render('map', {title : 'CHT Tracker', center_pos : '24.791203,120.994445'});
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function querySensorRawData(res) {
  var Client = require('node-rest-client').Client;
  var client = new Client();

  var args= {
    path: {
      "deviceId":11798538376,
      "sensorId":"temp_sensor_1"
    },
    headers: {"CK":"DKKY3FPE9ZKM9ZSE7R"}
  };

  // direct way  (http://, https://)
  client.get("https://iot.cht.com.tw/iot/v1/device/${deviceId}/sensor/${sensorId}/rawdata", args, function (data, response) {
      // parsed response body as js object 
      res.send(data);
  }).on('error', function (err) {
    console.log('something went wrong on the request');
  });
}