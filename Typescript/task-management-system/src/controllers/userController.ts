import { Request, Response } from "express";
import { createUser, findUserByEmail, getAllUsersService } from "../services/userService";

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
     try{
          const users = await getAllUsersService();

          res.status(200).json(users);
     }catch(err){
          res.status(500).json({message: "Error retrieving user datas."});
     }
}

export const registerUser = async (req: Request, res: Response): Promise<void> => {
     const { name, email, password } = req.body;
     
     try{
          const isExistingUser = await findUserByEmail(email);

          if(isExistingUser){
               res.status(400).json({message: "User already exists."});

               return;
          }

          const newUser = await createUser(name, email, password);
          res.status(200).json(newUser);
     }catch(err){
          res.status(500).json({message: "Error registering user", err});
     }
}