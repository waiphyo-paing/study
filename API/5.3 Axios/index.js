import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const API_URL = "https://bored-api.appbrewery.com/";

var activity;
var resError;

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + "random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    resError = error.message;
    res.render("index.ejs", {
      error: resError,
    });
  }
});

app.post("/", async (req, res) => {
  const request = req.body;

  try{
    const response = await axios.get(API_URL + `filter?type=${request.type}&participants=${request.participants}`);
    const result = response.data;
    const randomOutput = result[Math.floor(Math.random() * result.length)];

    res.render("index.ejs", { data: randomOutput });
  }catch(error){
    if(error.response.status === 404){
      resError = "There is no match acticity for this criteria!";
    }else{
      resError = error.message;
    }
    res.render("index.ejs", {
      error: resError,
    });
  }

  // Step 2: Play around with the drop downs and see what gets logged.
  // Use axios to make an API request to the /filter endpoint. Making
  // sure you're passing both the type and participants queries.
  // Render the index.ejs file with a single *random* activity that comes back
  // from the API request.
  // Step 3: If you get a 404 error (resource not found) from the API request.
  // Pass an error to the index.ejs to tell the user:
  // "No activities that match your criteria."
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
