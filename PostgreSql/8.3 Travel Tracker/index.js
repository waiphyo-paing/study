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

async function addVisitedCountryData(country_code){
  try{
    await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [country_code]);
    console.log('added');
  }catch(err) {
    console.error("Error adding data tt");
    throw err;
  };
};

async function findCountry(queryCountryName){
  try {
    const res = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'", [queryCountryName.toLowerCase()]);
    return res.rows[0];
  }catch(err) {
    console.log("Country not found");
  };
};

// Fetch all countries once at server startup
let errMsg;
let allCountries = [];
(async () => {
  allCountries = await getAllCountries();
})();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
  //Write your code here.
  try{
    const countries = await getAllVistedCountries();
    const total = countries.length;

    res.render('index.ejs', {countries: countries, total: total, error: errMsg});
  }catch(err){
    res.status(500).send("Error retrieving data");
  }
});

app.post('/add', async (req, res) => {
  try{
    const insertedCountry = req.body.country;
    // const country = allCountries.find(c => c.country_name.toLowerCase().trim() === insertedCountry.toLowerCase());

    const country = await findCountry(insertedCountry);
    errMsg = "";

    if(!country){
      errMsg = "Sorry, we couldn't find the country that you enter.";
      res.redirect('/');
    }else{
      const { country_code } = country;
      await addVisitedCountryData(country_code);
      res.redirect('/');
    }
  }catch (err) {
    errMsg = "The country that you entered is already exist.";
    console.log(err.detail);
    res.redirect('/');
  };
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
