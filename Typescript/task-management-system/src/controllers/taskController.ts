import { Request, Response } from "express";
import { createTask, getTasksByProject, updateTaskStatus } from "../services/taskService";

export const createNewTask = async (req: Request, res: Response): Promise<void> => {
     const { title, description, status, assignedTo, projectId } = req.body;
     console.log('start creating task');

     try{
          const newTask = await createTask(title, description, status, assignedTo, projectId);
          res.status(201).json(newTask);
     }catch(err) {
          res.status(500).json({message: "Error creating task", err});
     }
};

export const getTasksForProject = async (req: Request, res: Response): Promise<void> => {
     const projectId: number = parseInt(req.params.projectId);
     console.log(projectId);

     try{
          const tasks = await getTasksByProject(projectId);
          res.status(201).json(tasks);
     }catch(err){
          res.status(500).json({message: "Error retrieving tasks", err});
     }
}

export const changeTaskStatus = async (req: Request, res: Response): Promise<void> => {
     const { taskId } = req.params;
     const { status } = req.body;

     try{
          const updatedTask = await updateTaskStatus(taskId, status);
          res.status(201).json(updatedTask);
     }catch(err){
          res.status(500).json({ message: "Error updating status", err });
     }
};