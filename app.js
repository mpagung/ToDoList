const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items=["Buy Food","Cook Food","Eat Food"];

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

  // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  // const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  // const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  var day=today.toLocaleDateString("en-US", options);
  res.render('list', {day: day,newListItems:items})
})

app.post("/", function(req,res){
  var item = req.body.newItem;

  items.push(item);

  res.redirect("/");
})

app.listen(3000, function() {
  console.log("Server started on port 3000")
})
