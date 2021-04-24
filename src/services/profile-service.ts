import { Injectable } from "@nestjs/common";
import { StateData } from "../models/base_model";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { LinkService } from "./link-service";

const BASE_URL = process.env.BASE_URL;

@Injectable()
export class ProfileService{

    constructor(private _linkService: LinkService){}

    async create(user:User){
        try {
            const profile = new Profile({
                theme: {
                    type: 'color',
                    color_main: 'rgb(57, 224, 155)',
                },
                user,
                url: `${BASE_URL}/${user.username.toLowerCase()}`
            });

            await profile.save();

            return profile;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id: string, profileUpdate: Partial<Profile>){
        const profile = await this.getById(id);

        Object.assign(profile, profileUpdate);

        console.log(profile);

        await profile.save();

        return profile;

    }

    async getById(id: string){
        console.log(id);
        
        return await this.getProfile(id);
    }

    async getByUsername(username: string){
        //return await Profile.findOne({where: { user.username: username}});
    }

    async delete(id:string){
        const profile = await this.getById(id);

        profile.state = StateData.DELECTED;

        await profile.save();

        return 'Delected';
    }

    async getByUser(user: Partial<User>){

        const profile = await this.getProfile({where:{
            user
        }});

        const {createdAt, updatedAt, state, ...rest} = profile;
        
        rest.links = await this._linkService.getByProfile(profile);


        return rest;
    }

    private async getProfile(condition) {
        const profile = await Profile.findOne(condition);
        
        if(!profile){
            throw new Error('Profile not found');
        }

        return profile;
    }
}