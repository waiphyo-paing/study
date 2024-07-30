import { Task } from "./task";

export class TaskManager {
     private tasks: Task[] = [];
     private nextId: number = 1;

     addTask(title: string, description: string): Task{
          const task: Task = {id: this.nextId++, title, description, completed: false};
          this.tasks.push(task);

          return task;
     }

     removeTask(id: number): boolean {
          const index = this.tasks.findIndex(task => task.id === id);
          if(index !== -1){
               this.tasks.splice(index, 1);
               return true;
          }
          return false;
     }

     listTasks(): Task[] {
          return this.tasks;
     }

     completeTask(id: number): boolean {
          const task = this.tasks.find(t => t.id === id);
          if(task){
               task.completed = true;
               return true;
          }
          return false;
     }
}