import { Injectable } from "@nestjs/common";
import { StateData } from "../models/base_model";
import { User } from "../models/user";
import { SecondStepUser } from "../validations/user-validations";

@Injectable()
export class UserService {

    constructor() {

    }

    async create(userData: Partial<User>) {
        try {

            const user = new User(userData);

            await user.save();

            return user;

        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    async additionalDataUser(id: string, data: SecondStepUser) {
        const { name, category } = data;

        const user = await User.findOne(id);

        if (!user) {
            throw new Error('User not found');
        }


        user.name = name;
        user.category = category;
        user.state = StateData.ACTIVE;

        await user.save();

        return user;
    }


    async list() {
        return User.find();

    }
}