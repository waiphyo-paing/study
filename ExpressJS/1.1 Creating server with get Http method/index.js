import express from "express";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
     // console.log(req.headers.connection); Need to search about (req) ***
     res.send("<h1>Home Page</h1>");
});

app.get('/about', (req, res) => {
     res.send("<h1>About Page</h1>");
});

app.get('/contact-us', (req, res) => {
     res.send("<h1>Contact us Page</h1>");
});

app.listen(port, () => {
     console.log(`Server is listening on port ${port}`);
});