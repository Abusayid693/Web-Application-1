const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const https = require('https');
app.use(express.static("assets"));
app.use(bodyparser.urlencoded({
  extended: true
}));





// subscribe page
app.get("/subscribe", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

//suscribe function to mailchimp
app.post("/subscribe", function(req, res) {
  var firstName = req.body.firstname;
  var secondName = req.body.secondname;
  var email = req.body.email;
  firstName = firstName.toUpperCase();
  secondName = secondName.toUpperCase();
  email = email.toUpperCase();





  //converting  the data received to json formet
  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: secondName
      }
    }]
  }
  var jsondata = JSON.stringify(data);
//main http send formet
  const url = "https://us7.api.mailchimp.com/3.0/lists/02ee0bdbe9";
  const options = {
    method: "POST",
    auth: "Rehan:e20d9f7ae9530065fc06d7d970e0c91d-us7"
  }
  const request = https.request(url, options, function(response) {

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    })
  })
  request.write(jsondata);
  request.end();
//request sent to mailchimp server







  res.sendFile(__dirname + "/myindex.html");
});

// API KEY   =  e20d9f7ae9530065fc06d7d970e0c91d-us7
// API ID = 02ee0bdbe9









// main body page
app.get("/mainBody", function(req, res) {
  res.sendFile(__dirname + "/myindex.html");
})

app.post("/mainBody", function(req, res) {
  var search = req.body.search;
  res.sendFile(__dirname + "/myindex.html");
  console.log(search);
})









app.listen(3000, function() {
  console.log("Server is running");
});
