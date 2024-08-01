import { model, Schema } from "mongoose";

export interface IPROJECT {
     name: string;
     description: string;
     createdAt: Date;
     updatedAt: Date;
}

const projectSchema = new Schema(
     {
          name: {type: String, require: true},
          description: {type: String, require: true},
     },{
          timestamps: true
     }
)

const Project = model<IPROJECT>('Project', projectSchema);

export default Project;