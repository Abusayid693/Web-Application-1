const express = require('express');
const bodyparser = require('body-parser');
const app=express();
app.use(express.static("assets"));
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);

app.use(bodyparser.urlencoded({extended:true}));

// subscribe page
app.get("/subscribe",function(req,res){
  res.sendFile(__dirname+"/index.html");
})
app.post("/subscribe",function(req,res){
  var firstName=req.body.firstname;
  var secondName=req.body.secondname;
  var email=req.body.email;
  firstName=firstName.toUpperCase();
  secondName=secondName.toUpperCase();
  email=email.toUpperCase();
  console.log(firstName);
  console.log(secondName);
  console.log(email);
  res.sendFile(__dirname+"/main.html");
})
// subscribe page end





// main body page
app.get("/mainBody",function(req,res){
  res.sendFile(__dirname+"/myindex.html");
})

app.post("/mainBody",function(req,res){
  var search=req.body.search;
    res.sendFile(__dirname+"/myindex.html");
      console.log(search);
})











app.listen(3000,function(){
  console.log("Server is running");
});
