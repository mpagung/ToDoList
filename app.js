const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))

app.get("/", function(req, res) {
  var today = new Date();
  var currentDay = today.getDay()

  var options={
    weekday:"long",
    day:"numeric",
    month: "long"
  }

  var day=today.toLocaleDateString("en-US", options);
  res.render('list', {listTitle: day,newListItems:items})
})

app.post("/", function(req,res){
  console.log(req.body)

  var item = req.body.newItem;
  // console.log(req.body) //checking what the value is returned when the button is pressed
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else{
    items.push(item);
    res.redirect("/");}


})

app.get("/work", function(req,res){
  res.render("list",{listTitle:"Work ",newListItems:workItems})
})

app.post("/work", function(req,res){
  var item = req.body.newItem;

  items.push(item);

  res.redirect("/work");
})

app.get("/about", function(req,res){
  res.render("about");
})

app.listen(3000, function() {
  console.log("Server started on port 3000")
})
