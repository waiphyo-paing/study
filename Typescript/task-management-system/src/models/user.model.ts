import mongoose, { Model, model, Schema } from "mongoose";

interface IUSER {
     name: string;
     email: string;
     password: string;
     createdAt: Date;
     updatedAt: Date;
}

const userSchema = new Schema<IUSER> ({
          name: {type: String},
          email: {type: String, required: true, unique: true},
          password: {type: String, required: true},
     },
     {
          timestamps: true
     }
);

const User = model<IUSER>('User', userSchema);

export default User;