// jshint esveersion 6

const express = require("express");
const bodypraser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public")); // this will allow use of static part in express Js. It specify the static folder where all static files are
app.use(bodypraser.urlencoded({extended:true}));


app.get("/",function(req,res){
    // console.log("app started");
    res.sendFile(__dirname+"/signup.html");
})

// "/" <- this is called route
app.post("/", function(req,res){
    const fname = req.body.fName;
    const lname = req.body.lName;
    const email = req.body.email;
    // console.log(fname,lname,email);
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonobject = JSON.stringify(data);

    

})



const port = 3000;


app.listen(port, function(){
    console.log("App is started running at port: "+port);
})

// API key
// 407eda6ecb4f4c6e4872f7145bef1cc9-us11

// unique ID
// 39403659ed
