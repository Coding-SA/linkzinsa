import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import * as Utils from '../utils';


@Controller()
export class IndexController{
    @Get(':username')
    getByUsername(@Param() username){
        try {
            return {
                "title":"",
                "url": "http://localhost:3000/perfil1",
                "profileIconUrl": "",
                "bio":"",
                "theme" :{
                    "type": "color",
                    "color_main": "rgb(57, 224, 155)",
                },
                "links":[{
                    "title":"string",
                    "url":"string",
                    "image_url": "string",
                    "isPriority": "false",
                }]
            };
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