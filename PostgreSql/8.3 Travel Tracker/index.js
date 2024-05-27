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

async function getAllCountries(){
  try{
    const res = await db.query("SELECT * FROM countries");
    return res.rows;
  }catch(err) {
    console.error("Error retrieving all countries data: " + err);
  }
}

async function addVisitedCountryData(country_code, country_name){
  try{
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
    console.log("Added data successfully.");
  }catch(err) {
    console.error("Error adding data dsd");
    throw err;
  };
};

// Fetch all countries once at server startup
let allCountries = [];
(async () => {
  allCountries = await getAllCountries();
})();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
  //Write your code here.
  console.log('working');
  try{
    const countries = await getAllVistedCountries();
    const total = countries.length;
    console.log(countries);

    res.render('index.ejs', {countries: countries, total: total});
  }catch(err){
    res.status(500).send("Error retrieving data");
  }
});

app.post('/add', async (req, res) => {
  try{
    const insertedCountry = req.body.country.trim();
    const country = allCountries.find(c => c.country_name.toLowerCase().trim() === insertedCountry.toLowerCase());

    if(!country){
      res.status(404).send("Country not found");
    }else{
      const { country_code } = country;
      await addVisitedCountryData(country_code);
      res.redirect('/');
    }
  }catch (err) {
    console.error("Error adding data: " + err);
    res.status(500).send("Error adding data");
  };
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
