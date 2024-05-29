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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Task Service
class TaskService {
  constructor(){
    this.tasks = [];
  }

  // Get task template | data format`
  taskTemplate(taskId, taskTitle){
    return {
      id: taskId,
      title: taskTitle
    };
  }

  // Get all tasks
  async getAllTasks(){
    try{
      const req = await db.query("SELECT * FROM items ORDER BY id");
      this.tasks = req.rows;
      return this.tasks;
    }catch(err){
      console.log("Error getting data.");
      throw err;
    }
  }

  // Search task with ID
  async searchTask(id){
    try{
      const req = await db.query("SELECT * from items WHERE items.id=$1", [id]);
      return req.rows;
    }catch(err) {
      console.log("Error getting task");
      throw err;
    }
  }

  // Add task
  async addTask(taskTitle){
    try{
      await db.query("INSERT INTO items(title) VALUES ($1)", [taskTitle]);
    }catch(err){
      console.log("Error adding data.");
      throw err;
    }
  }

  // UPDATE task data
  async updateTask(taskId, taskTitle){
    try{
      await db.query("UPDATE items SET title=$1 WHERE id=$2", [taskTitle, taskId]);
    }catch(err){
      console.log("Error updating task");
      throw err;
    }
  }

  // DELETE task
  async deleteTask(taskId){
    try{
      await db.query("DELETE FROM items WHERE id=$1", [taskId]);
    }catch (err){
      console.log("Error deleting task");
      throw err;
    }
  }
}

// Declare TASK SERVICE
const taskService = new TaskService();

// Routing
app.get("/", async (req, res) => {
  try {
    const allTasks = await taskService.getAllTasks();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: allTasks,
    });
  } catch (err) {
    console.log("Error retrieving tasks: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await taskService.addTask(item);
    res.redirect("/");
  } catch (err) {
    console.log("Error adding task: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/edit", async (req, res) => {
  const taskId = parseInt(req.body['updatedItemId']);
  const taskTitle = req.body['updatedItemTitle'];

  try{
    await taskService.updateTask(taskId, taskTitle);
    res.redirect('/');
  }catch(err){
    console.log("Error updating task: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/delete", async (req, res) => {
  try{
    await taskService.deleteTask(parseInt(req.body.deleteItemId));
    res.redirect('/');
  }catch(err){
    console.log("Error deleting task: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
