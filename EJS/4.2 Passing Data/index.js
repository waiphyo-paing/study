import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.locals.header = "Enter your name below:";
app.locals.nameLength = 0;

app.get("/", (req, res) => {
  if(app.locals.nameLength > 0){
    app.locals.header = `Your name length is ${app.locals.nameLength}.`;
  }
  res.render('index.ejs');
});

app.post("/submit", (req, res) => {
  if(req.body['fName'].length !== 0 || req.body['lName'].length !== 0){
    console.log(req.body['fName'] + " " + req.body['lName']);
    app.locals.nameLength = req.body['fName'].length + req.body['lName'].length;
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
