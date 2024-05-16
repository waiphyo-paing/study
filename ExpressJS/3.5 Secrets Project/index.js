//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 3000;

var userIsAuthorised = false;
const password = "ILoveProgramming";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended: true}));

function passwordCheck(req, res, next){
     var userInputPassword = req.body.password;

     if(userInputPassword === password){
          userIsAuthorised = true;
     }
     next();
}
app.use(passwordCheck);

app.get('/', (req, res) => {
     res.sendFile(__dirname + "/public/index.html");
});

app.post('/check', (req, res, next) => {
     if(userIsAuthorised){
          res.sendFile(__dirname + "/public/secret.html");
     }else{
          res.redirect('/');
     }
});

app.listen(port, () => {
     console.log("Server is running on port: " + port);
});