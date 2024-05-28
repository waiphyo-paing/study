import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { configDotenv } from "dotenv";

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

// let users = [
//   { id: 1, name: "Angela", color: "teal" },
//   { id: 2, name: "Jack", color: "powderblue" },
// ];

(async () => {
  await getUsers();
})();

// Functions
async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_countries;");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

let users = [];
async function getUsers(){
  const result = await db.query("SELECT * FROM users");
  result.rows.forEach(user => {
    users.push(user);
  });
}

async function getUserWithVisitedCountries (userId) {
  const query = `
      SELECT u.id, u.name, u.color, vc.country_code
      FROM users u
      LEFT JOIN visited_countries vc ON u.id = vc.user_id
      WHERE u.id = $1;
  `;
  const values = [userId];
  const res = await db.query(query, values);

  if (res.rows.length === 0) {
      return null;
  }

  const user = {
      id: res.rows[0].id,
      name: res.rows[0].name,
      color: res.rows[0].color,
      countries: res.rows
          .filter(row => row.country_code !== null)
          .map(row => row.country_code)
  };

  return user;
};

async function addUser(name, color){
  try{
    const query = `
      INSERT INTO users (name, color)
      VALUES ($1, $2);
    `;
    const values = [name, color];
    const res = await db.query(query, values);

    return "Added new user successfully" + res.rows;
  } catch (err){
    console.log(err);
    throw err;
  }
}

// Routes
// ======
// "/" GET route
app.get("/", async (req, res) => {
  const user = await getUserWithVisitedCountries(1);
  res.render("index.ejs", {
    countries: user.countries,
    total: user.countries.length,
    users: users,
    color: user.color,
    currentUser_id: user.id
  });
});

// "/add" POST route
app.post("/add", async (req, res) => {
  const input = req.body["country"];
  const user_id = parseInt(req.body['currentUser_id']);

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, user_id]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

// "/user" POST route
app.post("/user", async (req, res) => {
  const addMethod = req.body['add'];

  if(req.body['user']){
    // const user = users.find(u => u.id === parseInt(req.body['user']));
    const user = await getUserWithVisitedCountries(parseInt(req.body['user']));
    res.render("index.ejs", {
      countries: user.countries,
      total: user.countries.length,
      users: users,
      color: user.color,
      currentUser_id: user.id
    });
  }else if(req.body['add']){
    res.render('new.ejs');
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

  const data = await addUser(req.body['name'], req.body['color']);

  users = [];
  await getUsers();
  
  const user = await getUserWithVisitedCountries(1);
  res.render("index.ejs", {
    countries: user.countries,
    total: user.countries.length,
    users: users,
    color: user.color,
    currentUser_id: user.id
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
