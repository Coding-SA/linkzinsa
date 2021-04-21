import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { identity } from "rxjs";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { ProfileService } from "../services/profile-service";
import * as Utils from '../utils';


@Controller('profiles')
export class ProfileController {
    constructor(private _profileService: ProfileService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get(':profileId')
    async getById(@Param() profileId,) {
        try {
            return {
                "title": "",
                "url": "http://localhost:3000/perfil1",
                "profileIconUrl": "",
                "bio": "",
                "theme": {
                    "type": "color",
                    "color_main": "rgb(57, 224, 155)",
                },
                "view": 0,
                "links": [{
                    "title": "string",
                    "url": "string",
                    "image_url": "string",
                    "isPriority": "false",
                    "timesClicked": 0,
                    "lastClickDate": "2021/02/01H13:00:00"
                }]
            };
        } catch (error) {
            throw this.getAuthError(error.message);
        }   

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':profileId')
    @HttpCode(200)
    updateData(@Param() profileId ,@Body() profileData){
        try {
            return {
                "statusCode": 200,
                "message": "Profile modified"
            }
        } catch (error) {
            throw this.getAuthError(error.message);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':profileId/theme')
    @HttpCode(200)
    updateThemeData(@Param() profileId, @Body() themeData){
        try {
            return {
                "statusCode": 200,
                "message": "Profile modified"
            }
        } catch (error) {
            throw this.getAuthError(error.message);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Post(':profileId/links')
    addLink(@Param() profileId, @Body() linkData){
        try {
          return {
            "statusCode": 201,
            "message": "Link created"
        }  
        } catch (error) {
            throw this.getAuthError(error.message);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':profileId/links/:linkId')
    @HttpCode(200)
    updateLink(@Param() profileId, @Body() linkData){
        try {
          return {
            "statusCode": 200,
            "message": "Link modified"
        }  
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