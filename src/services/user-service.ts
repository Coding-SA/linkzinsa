import { Injectable } from "@nestjs/common";
import { Connection, createConnection } from "typeorm";
import { FirstStepUser } from "../interfaces/user";
import { User } from "../models/user";

@Injectable()
export class UserService{

    constructor(){
        
    }

    async create(userData: FirstStepUser){
        try {
            const user = new User(userData);
    
            user.save();
    
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    
    }


    async list(){
        return User.find();
    
    }
}