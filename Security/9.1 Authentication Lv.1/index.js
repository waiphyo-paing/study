import express from "express";
import bodyParser from "body-parser";
import { name } from "ejs";
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

class AuthUser {
  constructor() {
    this.loggedInUser;
  }

  // Search user with email
  async getUserWithEmail(email) {
    try {
      const req = await db.query("SELECT * FROM users WHERE email=$1", [email]);
      const user = req.rows;

      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async loginUser(email, password) {
    const checkUser = await this.getUserWithEmail(email);

    if (checkUser.length > 0) {
      if (checkUser[0].password === password) {
        return {
          status: 200,
          message: "Logged in successfully"
        };
      } else {
        return {
          status: 404,
          message: "User and password doesn't match. Please try again or register"
        }
      }
    } else {
      return {
        status: 404,
        message: "User and password doesn't match. Please try again or register",
      }
    }
  }

  async registerUser(email, password) {
    try {
      const userExist = await this.getUserWithEmail(email);
      console.log(userExist);
      if (userExist.length > 0) {
        return {
          status: 404,
          message: "User already exist",
        }
      } else {
        const req = await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
        const user = req.rows;

        console.log(user);
        return {
          status: 200,
          message: "Registered successfully. Please login"
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
}

// Use AuthUser
const user = new AuthUser();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body['username'];
  const password = req.body['password'];

  try {
    const request = await user.registerUser(email, password);
    console.log(request);
    if (request.status === 404) {
      console.log(request.message);
      res.send(request.message);
    } else {
      res.render('secrets.ejs');
    }
  } catch (err) {
    console.error(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body['username'];
  const password = req.body['password'];

  try {
    const request = await user.loginUser(email, password);
    console.log(request);
    if (request.status === 404) {
      console.log(request.message);
      res.send(request.message);
    } else {
      res.render('secrets.ejs');
    }
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
