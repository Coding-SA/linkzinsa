import { Injectable } from "@nestjs/common";
import { StateData } from "../models/base_model";
import { Link } from "../models/link";
import { Profile } from "../models/profile";


@Injectable()
export class LinkService {

    async create(profileId,linkData:Partial<Link>){
        const link = new Link(
            {
                profile: new Profile({id: profileId}),
                lastClickDate: new Date(Date.now()),
                state: StateData.ACTIVE,
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

    async updateLink(id:string, linkUpdate:Partial<Link>){
        const link = await Link.findOne(id);

        if(!link){
            throw new Error("Link not found");
        }

        Object.assign(link, linkUpdate);

        await link.save();

        return link;
    }
}