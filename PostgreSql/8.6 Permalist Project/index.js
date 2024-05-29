import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

// Task Service
class TaskService {
  constructor(){
    this.tasks = [
      { id: 1, title: "Buy milk" },
      { id: 2, title: "Finish homework" },
    ];
  }

  // Get task template | data format`
  taskTemplate(taskId, taskTitle){
    return {
      id: taskId,
      title: taskTitle
    };
  }

  // Get all tasks
  getAllTasks(){
    return this.tasks;
  }

  // Add task
  addTask(taskTitle){
    const id = this.tasks.length + 1;
    
    try{
      this.tasks.push(this.taskTemplate(id, taskTitle));
      console.log(this.tasks);
    }catch(err){
      console.log("Having error at adding new Task: " + err);
    }
  }

  // UPDATE task data
  updateTask(taskId, taskTitle){
    const task = this.tasks.find(t => t.id === taskId);

    if(task){
      task.title = taskTitle;

      return this.tasks;
    }else{
      console.log("error");
    }
  }

  // DELETE task
  deleteTask(taskId){
    const task = this.tasks.find(t => t.id === taskId);
    const taskIndex = parseInt(this.tasks.indexOf(task));

    this.tasks.splice(taskIndex, 1);
    console.log(this.tasks);
  }
}

// Declare TASK SERVICE
const taskService = new TaskService();


// Routing
app.get("/", (req, res) => {
  const allTasks = taskService.getAllTasks();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: allTasks,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  try{
    taskService.addTask(item);
    res.redirect("/");
  }catch(err){
    console.log(err);
    throw err;
  }
});

app.post("/edit", (req, res) => {
  const taskId = parseInt(req.body['updatedItemId']);
  const taskTitle = req.body['updatedItemTitle'];

  try{
    taskService.updateTask(taskId, taskTitle);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: taskService.getAllTasks(),
    });
  }catch(err){
    console.log("Error");
    throw err;
  }
});

app.post("/delete", (req, res) => {
  try{
    taskService.deleteTask(parseInt(req.body.deleteItemId));

    res.redirect('/');
  }catch(err){
    console.log("Having error deleting: " + err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
