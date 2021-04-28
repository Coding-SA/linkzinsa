import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { ProfileService } from "../services/profile-service";
import * as Utils from '../utils';


@Controller()
export class IndexController{

    constructor(private readonly _profileService: ProfileService){}

    @Get(':username')
    async getByUsername(@Param('username') username){
        try {
            return await this._profileService.getByUsername(username);
        } catch (error) {
            throw this.getAuthError(error.message);
        }

    }


    private getAuthError(message:string){
        const errors = {
            'Profile not found': Utils.HandleErrors.handleError('Profile not found', HttpStatus.NOT_FOUND),
            'Link not found': Utils.HandleErrors.handleError('Link not found', HttpStatus.NOT_FOUND)
        }

        return errors[message] || Utils.HandleErrors.handleError(message, HttpStatus.EXPECTATION_FAILED);
    }
}