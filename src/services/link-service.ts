import { Injectable } from "@nestjs/common";
import { Link } from "../models/link";
import { Profile } from "../models/profile";


@Injectable()
export class LinkService {

    async create(profileId,linkData:Partial<Link>){
        const link = new Link(
            {
                profile: new Profile({id: profileId}),
                lastClickDate: new Date(Date.now()),
                ...linkData
            });

        await link.save();

        return link;
    }
    
    async getByProfile(profile: Partial<Profile>){
        return await Link.find({
            where:{
                profile
            }
        });


    }
}