import User from "../models/user.model"


export const createUser = async (name: string, email: string, password: string) => {
     const user = new User({ name, email, password });
     await user.save();

     return user;
}

export const findUserByEmail = async (email: string) => {
     return User.findOne({email: email});
};