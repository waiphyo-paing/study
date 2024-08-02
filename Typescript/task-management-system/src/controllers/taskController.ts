import { Request, Response } from "express";
import { createTask, getTasksByProject } from "../services/taskService";

export const createNewTask = async (req: Request, res: Response): Promise<void> => {
     const { title, description, status, assignedTo, projectId } = req.body;

     try{
          const newTask = await createTask(title, description, status, assignedTo, projectId);
          res.status(201).json(newTask);
     }catch(err) {
          res.status(500).json({message: "Error creating task", err});
     }
};

export const getTasksForProject = async (req: Request, res: Response): Promise<void> => {
     const { projectId } = req.body;

     try{
          const tasks = await getTasksByProject(projectId);
          res.status(201).json(tasks);
     }catch(err){
          res.status(500).json({message: "Error retrieving tasks", err});
     }
}