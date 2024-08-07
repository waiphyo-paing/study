import mongoose from "mongoose";
import Task from "../models/task.model";

export const createTask = async (title: string, description: string, status: string, assignedTo: string, projectId: string) => {     
     console.log('start');

     // Convert id to objectId
     const assignedToId = new mongoose.Types.ObjectId(assignedTo);
     const projectIdId = new mongoose.Types.ObjectId(projectId);

     const task = new Task({ title, description, status, assignedTo: assignedToId, projectId: projectIdId });
     console.log('creating task');
     return await task.save();
};

export const getTasksByProject = async (projectId: number) => {
     return Task.findById(projectId);
};

export const updateTaskStatus = async (taskId: string, status: string) => {
     return Task.findByIdAndUpdate(taskId, { status }, { new: true });
};