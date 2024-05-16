# My Learning Journey to get a Job

- [x] JQuery [In Progress]
- [] NodeJS [In Progress]
- [] Express.js [In Progress]

## JQuery

Made a Project with JQuery (12 May 2024)

### Boss Level Challenge 2 - The Simon Game [Udemy - Web Development Course (Angels)]

**About Game**
Game is about play song and will harder while level is going up and need to memorize the random color tracks

What I have learned
: JQuery animation
: JQuery DOM
: How to search if I dun know anything

What I considered
: need more logical thinking
: how to search if I dun know anything

## NodeJS

Made 3 projects with NodeJS.

- File system(fs): create, write and read file with NodeJS - ==need to Learn more in Future==.
- NPM: node package manager - learned packages - ==need to Learn more in Future==.
- Qr Code Generator: generate a qr code depend on user input. Used ==inquirer== to get the user input(URL) and ==File system(fs)== to create file for qr code and url history.

### Node Package Manager - NPM

[NPM](https://www.npmjs.com/) standard package for **Node.js**

### Useful npm

- [Express.js](https://expressjs.com/) - framework for Node.js
- [Nodemon](https://nodemon.io/) - to restart Node.js server everytime code is updated
- [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
- [validator](https://www.npmjs.com/package/validator) - string validator and sanitizers
- [uuid](https://www.npmjs.com/package/uuid) - to generate UniqueId
- [axios](https://www.npmjs.com/package/axios)
- [path](https://www.npmjs.com/package/path)

### File system(fs) - Node

Node file system enables interacting with file system.
[Official documentation](https://nodejs.org/api/fs.html), [W3 School](https://www.w3schools.com/nodejs/nodejs_filesystem.asp), [Geeksforgeeks](https://www.geeksforgeeks.org/node-js-file-system/)

To use this -

old - `const fs = require('fs');`
modern - `import fs from "fs";`

### Basic methods or methods I have use

**fs.readFile**
read contents of file, replacing the file if it

`fs.readFile(file, option, callback)`

`file` <String> - file path
`option` - encoding(utf-8)
Callback - to return `error` and data

Example:
`fs.readFile("message.txt", "utf-8", (err, data) => {
     if (err) throw err;
     console.log(data);
});`

---

**fs.writeFile**
writes data to a file, replacing the file if it is already exists.

`fs.writeFile(file, data:String, option)`

`file` <String> - file name
`data` <String> - data inside file
`option` <Object> - to return callback function and others

Example:

`fs.writeFile("message.txt", "Hello World(Node File System)", (err) => {
     if (err) throw err;
     console.log("The file has been saved.");
});`

---

**fs.appendFile**
writes data to a file, replacing the file if it is already exists. Similar with **fs.writeFile**

`fs.appendFile(file, data:String, option)`

`file` <String> - file name
`data` <String> - data inside file
`option` <Object> - to return callback function and others

Example:

`fs.appendFile('qrcode_urls.txt', url, (err) => {
     if (err) throw err;
     console.log("The file has been saved.");
});`

---

## Express.js

Express.js is a **Node.js** web framework.

**To get started**

- **install express**
  `npm install express`
  or
  `npm i express`

- **import express**
  `import express from "express";`

- **declare express to app(variable)**
  `const app = express()`

- **start the app and listen on port(eg: 3000)**
  `app.listen(3000, () => {
   console.log("Server is running on port: 3000");
});`

**Example:**
`
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})
`
