import mongoose, { model, Schema } from "mongoose";

export interface ITASK {
     title: string;
     description: string;
     status: string;
     assignedTo: mongoose.Types.ObjectId;
     projectId: mongoose.Types.ObjectId;
     createdAt: Date;
     updatedAt: Date;
}

const taskSchema = new Schema({
          title: { type: String, require: true },
          description: { type: String, require: true },
          status: { type: String, require: true, enum: ['pending', 'in-progree', 'completed'] },
          assignedTo: { type: mongoose.Types.ObjectId, ref: 'User', require: true },
          projectId: { type: mongoose.Types.ObjectId, ref: 'Project', require: true },
     },{
          timestamps: true,
     }
)

const Task = model<ITASK>('Task', taskSchema);

export default Task;