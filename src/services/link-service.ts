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

        const { createdAt, updatedAt, state, ...newData } = link;

        return newData as Link;
    }
    
    async getByProfile(profile: Partial<Profile>){
        return await Link.find({
            where:{
                profile
            }
        });
    }

    async updateLink(id:string, linkUpdate:Partial<Link>){
        const link = await this.findLink(id);

        return await this.update(link, linkUpdate);
        
    }

    async setClicked(id:string) {
        const link = await this.findLink(id);

        link.timesClicked++;

        return await this.update(link, link);
    }

    private async  update(link:Link, data:Partial<Link>){
        Object.assign(link, data);

        await link.save();

        return link;
    }

    private async findLink(query){
        const link = await Link.findOne(query);

        if(!link){
            throw new Error("Link not found");
        }

        return link
    }
}