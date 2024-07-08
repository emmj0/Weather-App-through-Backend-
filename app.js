const express = require("express");
const https = require("https")
const dotenv = require('dotenv')
const bodyParser = require("body-parser");
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/",function(req,res){
    const apikey = "7724ed0e9da1675bc3294c9e4d28b0b2";
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid="+apikey+"&units=metrics";
    
    https.get(url, function(response){
        response.on("data",function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp;
            const weatherdescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
            res.write(`<h1>The temperature in ${city} is ${temp} °C with ${weatherdescription}</h1>`);
            res.write("<img src=" + imgurl + ">")
            res.send()
        })
    });
})

app.listen(process.env.PORT,function(){
    console.log('Server Started on port ' + process.env.PORT)
})