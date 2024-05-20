# My Learning Journey to get a Job

- JQuery [In Progress]
- NodeJS [In Progress]
- Express.js [In Progress]

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

# NodeJS

Made 3 projects with NodeJS.

- File system(fs): create, write and read file with NodeJS.
- NPM: node package manager - learned packages.
- Qr Code Generator: generate a qr code depend on user input. Used **inquirer** package to get the user input(URL) and **File system(fs)** to create file for qr code and url history.

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

### Basic methods or methods I used

**fs.readFile** - read contents of file, replacing the file if it

`fs.readFile(file, option, callback)`

`file` <String> - file path
`option` - encoding(utf-8)
Callback - to return `error` and data

Example:

```
fs.readFile("message.txt", "utf-8", (err, data) => {
     if (err) throw err;
     console.log(data);
});
```

**fs.writeFile** - writes data to a file, replacing the file if it is already exists.

`fs.writeFile(file, data:String, option)`

`file` <String> - file name
`data` <String> - data inside file
`option` <Object> - to return callback function and others

Example:

```
fs.writeFile("message.txt", "Hello World(Node File System)", (err) => {
     if (err) throw err;
     console.log("The file has been saved.");
});
```

**fs.appendFile** - writes data to a file, replacing the file if it is already exists. Similar with **fs.writeFile**

`fs.appendFile(file, data:String, option)`

`file` <String> - file name
`data` <String> - data inside file
`option` <Object> - to return callback function and others

Example:

```
fs.appendFile('qrcode_urls.txt', url, (err) => {
     if (err) throw err;
     console.log("The file has been saved.");
});
```

---

# Express.js

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
  ```
     app.listen(3000, () => {
          console.log("Server is running on port: 3000");
     });
  ```

**Example:**

```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
     res.send('Hello World!');
});

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`);
});
```

**[path](https://nodejs.org/api/path.html)** - provides utilities for working with files and directory paths.

- **path.dirname(path)** - return directory name of the `path`

**[url](https://nodejs.org/api/url.html)** - provides utilities for URL resolution and parsing

- **url.fileUrlToPath(url[, option])** - convert URL to file path.

`res.sendFile(path, [, option] [, fn])` - transfers the file at given path

`res.render(view)` - method to render view and send rendered HTML([EJS](#ejs---embedded-javascript-templating)) string to client.

### [Middlewares](https://expressjs.com/en/guide/using-middleware.html)

_Middleware_ functions are function that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

_Middleware_ functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

<!-- - [Application-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.application)
- [Router-level middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.router)
- [Error-handling middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.error-handling)
- [Built-in middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.built-in)
- [Third-party middleware](https://expressjs.com/en/guide/using-middleware.html#middleware.third-party) -->

- [Application-level middleware](#application-level-middleware)
- [Router-level middleware](#router-level-middleware)
- [Error-handling middleware](#error-handling-middleware)
- [Built-in middleware](#built-in-middleware)
- [Third-party middleware](#third-party-middleware)

### Application-level middleware

### Router-level middleware

### Error-handling middleware

### Built-in middleware

### Third-party middleware

# EJS - Embedded JavaScript templating

EJS is templating language to generate HTML markup with plain JavaScript

run `npm i ejs` to install ejs

- `<% %>` - to render JavaScript file
- `<%= %>` - return value inside HTML
- `<%- %>` - render EJS inside HTML markup
- `<%# %>` - comment
- `<%_ %>`
- `<%%` - return `<%`
