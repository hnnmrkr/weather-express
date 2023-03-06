const express = require('express')
const bodyParser = require('body-parser')
const request = require('request');
const app = express()

const apiKey = '0a255ae95c252dd54ad553867fcb343b'

app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')

app.get('/', function (req,res) {
    res.render('index', {weather: null, error: null});
})

app.post('/', function (req,res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&&appid=${apiKey}&units=metric`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main === undefined){
                res.render('index', {weather: null, error: 'Please try again'});
            } else {
                let weatherText = weather.main.temp;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
})


app.listen(3000)