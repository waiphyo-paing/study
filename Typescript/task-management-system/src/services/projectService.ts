import Project from "../models/project.model";

export const createProject = async (name: string, description: string) => {
     const project = new Project({ name, description });
     return await project.save();
};

export const getAllProjectsService = async () => {
     return Project.find({});
};