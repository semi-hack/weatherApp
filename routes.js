const express = require('express');
const request = require('request');
const auth = require('./controller/auth');

const router = express.Router();
const controller = require('./controller/controller');
const baseUrl = process.env.BASEURL
const appid = process.env.appid

const weather = (city, done) => {
    url  = baseUrl + encodeURIComponent(city) + '&appid=' + appid;
    console.log(url)

    request({ url, json:true }, (err, {body}) => {
        if(err) {
            console.log(err);
        } else {
            done(undefined ,{
                city: body.name,
                temprature: Math.round(body.main.temp - 273.15),
                description: body.weather[0].description,
            })
        }
    });
}

router.get('/', (req, res) => {
    res.render('index', {
        city: null,
        temprature: null,
        description: null
    })
});

router.post('/weather', (req, res) => {
    const city = req.body.city

    weather(city, (error, {city, temprature, description}) => {
        if(error) {
            return error;
        } else {
            console.log(city, temprature, description);
            res.render("index", {
                city,
                temprature,
                description
            })
        }
    })

    
});

router.post('/signUp', controller.createUser);

router.post('/login', controller.login);


module.exports = router;