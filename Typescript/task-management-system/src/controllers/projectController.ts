import { Request, Response } from "express";
import { createProject, getAllProjectsService } from "../services/projectService";

export const getAllProjects = async (req: Request, res: Response): Promise<void> => {
     try{
          const projects = await getAllProjectsService();

          if(projects.length > 0){
               res.status(200).json(projects);
          }
          
          res.status(400).json({message: "There is no projects."});
     }catch(err){
          res.status(500).json({message: "Error retrieving all projects."});
     }
}

export const createNewProject = async (req: Request, res: Response): Promise<void> => {
     const { name, description } = req.body;
     console.log("test");

     try{
          const newProject = await createProject(name, description);
          res.status(201).json(newProject);
     }catch(err){
          res.status(500).json({message: "Error creating project", err});
     }
};

export const getAllProjectsRoute = async (req: Request, res: Response): Promise<void> => {
     try{
          const projects = await getAllProjectsService();

          if(projects.length > 0){
               res.status(200).json(projects);
          }else{
               res.status(400).json({message: "There is no project to be shown"});
          }
     }catch(err){
          res.status(500).json({message: "Error getting all projects", err});
     };
};