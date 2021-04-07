import { Injectable } from "@nestjs/common";
import { StateData } from "../models/base_model";
import { User } from "../models/user";
import { SecondStepUser } from "../validations/user-validations";
import { ProfileService } from "./profile-service";

@Injectable()
export class UserService {

    constructor(private _profileService: ProfileService) {

    }

    async create(userData: Partial<User>) {
        try {
            userData.username = userData.username?.toLowerCase();

            const user = new User(userData);

            await user.save();

            return user;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async additionalDataUser(id: string, data: SecondStepUser) {
        const { name, category } = data;

        const user = await User.findOne({
            where: {
                id,
                state: StateData.INCOMPLETE
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        user.name = name;
        user.category = category;
        user.state = StateData.ACTIVE;
        user.profile = await this._profileService.create(user);

        await user.save();

        console.log(user);

        return user;
    }


    async list() {
        return await User.find();

    }
}