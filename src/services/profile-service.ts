import { Injectable } from "@nestjs/common";
import { getRepository } from "typeorm";
import { StateData } from "../models/base_model";
import { Link } from "../models/link";
import { Profile } from "../models/profile";
import { User } from "../models/user";
import { LinkService } from "./link-service";

const BASE_URL = process.env.BASE_URL;

@Injectable()
export class ProfileService {

    constructor(private _linkService: LinkService) { }

    async create(user: User) {
        try {
            const profile = new Profile({
                theme: {
                    type: 'color',
                    color_main: 'rgb(57, 224, 155)',
                },
                user,
                url: `${BASE_URL}/${user.username.toLowerCase()}`,
                state: StateData.ACTIVE
            });

            await profile.save();

            return profile;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async update(id: string, profileUpdate: Partial<Profile>) {
        const profile = await this.getById(id);

        Object.assign(profile, profileUpdate);

        await profile.save();

        return profile;

    }

    async updateTheme(id: string, theme) {
        return await this.update(id, { theme });
    }

    async getById(id: string) {
        console.log(id);

        return await this.getProfile(id);
    }

    async getByUsername(username: string) {
        const profile = await getRepository(Profile)
            .createQueryBuilder('profile')
            .innerJoin('profile.user', 'user')
            .innerJoinAndMapMany('profile.links', 'profile.links', 'links')
            .where('user.username = :username', { username })
            .getOne();

        if (!profile) {
            throw new Error('Profile not found');
        }

        this.setViewProfile(profile);

        const { createdAt, updatedAt, state, view, ...rest } = profile;

        rest.links = await Promise.all(rest.links.map(link => {

            const { createdAt, updatedAt, state, lastClickDate, timesClicked, ...newData } = link;

            return newData as Link;

        }));

        return rest;
    }

    async delete(id: string) {
        const profile = await this.getById(id);

        profile.state = StateData.DELECTED;

        await profile.save();

        return 'Delected';
    }

    async getByUser(user: Partial<User>) {

        const profile = await this.getProfile({
            where: {
                user
            }
        });

        const { createdAt, updatedAt, state, ...rest } = profile;

        const links = await this._linkService.getByProfile(profile);

        rest.links = await Promise.all(links.map(link => {

            const { createdAt, updatedAt, state, ...newData } = link;

            return newData as Link;

        }));

        return rest;
    }

    private async getProfile(condition) {
        const profile = await Profile.findOne(condition);

        if (!profile) {
            throw new Error('Profile not found');
        }

        return profile;
    }

    private async setViewProfile(profile: Profile){
        profile.view++;
        await profile.save();
    }
}