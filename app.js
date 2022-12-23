const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const client = require("@mailchimp/mailchimp_marketing");
const app = express()

app.use(express.static("public"));


app.listen(process.env.PORT || 3000, function(){
  console.log("the server is running on port 3000")
});

client.setConfig({apiKey: "a0b89ba1dd2d80a64e7846db9265b083",  server: "us13",});

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
});


app.post("/", function(req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const user = {firstName: firstName, lastName: lastName, email: email};
  const run = async () => {
    try {
     const response = await client.lists.addListMember("052e91b657", {
       email_address: user.email,
       status: "subscribed",
       merge_fields: {
           FNAME: user.firstName,
           LNAME: user.lastName
       }
     });
     console.log(response);
     res.sendFile(__dirname + "/success.html");
   } catch (e) {
     console.log(e.status);
     res.sendFile(__dirname + "/failure.html");
   }
 };
   run();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


// 84157cef2cc1f285997ef4cefcce608d-us13 API KEY

 // 052e91b657 LIST ID


 // const data = {
 //   members:[
 //     {
 //       email_address: email,
 //       status: "suscribed",
 //       merge_fields:{
 //         FNAME: firstName,
 //         LNAME: lastName
 //       }
 //     }
 //   ]
 // };
 // const jsonData = JSON.stringify(data);
 // const url = "https://us13.api.mailchimp.com/3.0/lists/052e91b657"
 //
 // const options = {
 // method: "POST",
 // auth:"bx:84157cef2cc1f285997ef4cefcce608d-us13"
 // }
 // const request = https.request(url, options, function(response){
 // response.on("data", function(data){
 //   console.log(JSON.parse(data))
 // })
 // })
 //
 // request.write(jsonData);
 // request.end();
