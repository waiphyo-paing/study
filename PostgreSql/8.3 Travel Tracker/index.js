import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import pg from "pg";

configDotenv();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
});
db.connect();

async function getAllVistedCountries(){
  try{
    const res = await db.query("SELECT country_code FROM visited_countries");
    return res.rows;
  } catch(err){
    console.error("Error retrieving data: " + err);
    throw err;
  }
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
  //Write your code here.
  try{
    const countries = await getAllVistedCountries();
    const total = countries.length;

    console.log(typeof(countries));
    console.log(countries);

    res.render('index.ejs', {countries: countries, total: total});
  }catch(err){
    res.status(500).send("Error retrieving data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
