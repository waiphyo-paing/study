import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post('/submit', (req, res) => {
  var form = req.body;
  res.send(`
    <h1>Your band name is:</h1>
    <h3>${form.street} ${form.pet}</h3>
  `)
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
