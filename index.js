var express=require("express")
var fs= require("fs")
var app=express()

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/',function(req,res){
res.send("hello it is my first express application")
})
app.listen(3000,function(){console.log("server is running on port 3000")})