import User from "../models/user.model"
import bcrypt from 'bcryptjs';

export const getAllUsersService = async () => {
     return await User.find({});
};

export const createUser = async (name: string, email: string, password: string) => {
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({ name: name, email: email, password: hashedPassword });
     await user.save();

     return user;
}

export const findUserByEmail = async (email: string) => {
     return User.findOne({email: email});
};