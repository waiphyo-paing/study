import { Request, Response } from "express";
import { createProject } from "../services/projectService";

export const createNewProject = async (req: Request, res: Response): Promise<void> => {
     const { name, description } = req.body;

     try{
          const newProject = await createProject(name, description);
          res.status(201).json(newProject);
     }catch(err){
          res.status(500).json({message: "Error creating project", err});
     }
};