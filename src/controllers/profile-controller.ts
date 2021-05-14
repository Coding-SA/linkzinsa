import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Request, UseGuards } from "@nestjs/common";
import { identity } from "rxjs";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { DefaultReturn } from "../interfaces/default-return-interface";
import { LinkService } from "../services/link-service";
import { ProfileService } from "../services/profile-service";
import * as Utils from '../utils';
import { CreateLinkBody, UpdateLinkBody } from "../validations/link-validation";
import { ProfileLinkParam, ProfileParam, UpdateProfile, UpdateThemeProfileBody } from "../validations/profile-validation";


@Controller('profiles')
export class ProfileController {
    constructor(private _profileService: ProfileService, private _linkService: LinkService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getById(@Request() req) {
        try {

            const { user } = req;

            return await this._profileService.getByUser(user);

        } catch (error) {
            throw this.getAuthError(error.message);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Patch(':profileId')
    @HttpCode(200)
    async updateData(@Param() params: ProfileParam, @Body() profileData:UpdateProfile) {
        const {profileId} = params;
        try {
            await this._profileService.update(profileId, profileData);
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
    async updateThemeData(@Param() params: ProfileParam, @Body() themeData: UpdateThemeProfileBody) {
        const {profileId} = params;
        try {
            await this._profileService.updateTheme(profileId, themeData)
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
    async addLink(@Param() params: ProfileParam, @Body() linkData: CreateLinkBody): Promise<DefaultReturn> {
        const {profileId} = params;

        try {

            const link = await this._linkService.create(profileId, linkData);
            return {
                statusCode: 201,
                message: "Link created",
                data: link
            };
        } catch (error) {
            console.log(error);
            
            throw this.getAuthError(error.message);
        }
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':profileId/links/:linkId')
    @HttpCode(200)
    async updateLink(@Param() params: ProfileLinkParam, @Body() linkData: UpdateLinkBody) {
        const {profileId, linkId} = params;
        try {
            await this._linkService.updateLink(linkId, linkData);
            return {
                "statusCode": 200,
                "message": "Link modified"
            }
        } catch (error) {
            throw this.getAuthError(error.message);
        }
    }

    private getAuthError(message: string) {
        const errors = {
            'Profile not found': Utils.HandleErrors.handleError('Profile not found', HttpStatus.NOT_FOUND),
            'Link not found': Utils.HandleErrors.handleError('Link not found', HttpStatus.NOT_FOUND)
        }

        return errors[message] || Utils.HandleErrors.handleError(message, HttpStatus.EXPECTATION_FAILED);
    }

}