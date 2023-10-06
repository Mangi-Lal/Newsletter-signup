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
    // creating javascript object and taking parameters according to mentioned on Mailchimp`s website...
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname, // same as on the Mailchimp`s API website
                    LNAME: lname 
                }
            }
        ]
    };
    const jsonObject = JSON.stringify(data); // The JSON.stringify() static method converts a JavaScript value to a JSON string.


    const url = "https://us11.api.mailchimp.com/3.0/lists/39403659ed";
    const options = {
        method: "POST",
        auth: "mangi:fb524b5c0c606b68a3a7377937193a88-us11"
    }

     
    const request = https.request(url, options, function(response){
        
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        } else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonObject);
    request.end();

    

})



const port = 3000; // 3000 is a local port for heroku we use different port...

app.post("/failure", function(req,res){
    res.redirect("/");
})
// process.env.PORT is a dynamic port. the heroku will define on the go. here process object is defined by heroku.
// (process.env.PORT || port) using this we can listen on both heroku and local port.
app.listen(process.env.PORT || port, function(){
    console.log("App is started running at port: "+port);
})

// API key
// fb524b5c0c606b68a3a7377937193a88-us11

// unique ID
// 39403659ed
