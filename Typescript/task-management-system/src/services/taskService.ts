import mongoose from "mongoose";
import Task from "../models/task.model";

export const createTask = async (title: string, description: string, status: string, assignedTo: string, projectId: string) => {     
     const task = new Task({ title, description, status, assignedTo, projectId });
     return await task.save();
};

export const getTasksByProject = async (projectId: string) => {
     return Task.find({projectId: projectId});
};

export const getAllTasksService = async () => {
     return await Task.find({});
}

export const updateTaskStatus = async (taskId: string, status: string) => {
     return Task.findByIdAndUpdate(taskId, { status: status }, { new: true });
};